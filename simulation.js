// Variables needed to populate the datasets
let { board, eraseBoard, boardIndex } = require('./board.js');
// Variables used to Create and write to a CSV file
// It'll start with a file named 'a_1k.csv' (Strategy A - 1,000 turns). After that dataset is complete, it will start over again with a different CSV file (rinse and repeat). 
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let csvWriter = createCsvWriter(
    {
    path: 'a_1k.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ]
    }
);

// ======================================================================================================================================================
// Decks for Community Chest and Chance
const communityChest = 
[
    "Advance to Go (Collect $200)", //Movement
    "Bank error in your favor. Collect $200",
    "Doctor’s fee. Pay $50",
    "From sale of stock you get $50",
    "Get Out of Jail Free", //Player keeps, immediately used if player is in jail
    "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200", //Movement
    "Holiday fund matures. Receive $100",
    "Income tax refund. Collect $20",
    "It is your birthday. Collect $10 from every player",
    "Life insurance matures. Collect $100",
    "Pay hospital fees of $100",
    "Pay school fees of $50",
    "Receive $25 consultancy fee",
    "You are assessed for street repair. $40 per house. $115 per hotel",
    "You have won second prize in a beauty contest. Collect $10",
    "You inherit $100"
];
const chance = 
[
    "Advance to Boardwalk", //Movement
    "Advance to Go (Collect $200)", //Movement
    "Advance to Illinois Avenue. If you pass Go, collect $200", //Movement
    "Advance to St. Charles Place. If you pass Go, collect $200", //Movement
    "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled", //Movement
    "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled", //Movement
    "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.", //Movement
    "Bank pays you dividend of $50",
    "Get Out of Jail Free", //Player keeps, immediately used if player is in jail
    "Go Back 3 Spaces", //Movement
    "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200", //Movement
    "Make general repairs on all your property. For each house pay $25. For each hotel pay $100",
    "Speeding fine $15",
    "Take a trip to Reading Railroad. If you pass Go, collect $200", //Movement
    "You have been elected Chairman of the Board. Pay each player $50",
    "Your building loan matures. Collect $150"
];

// In a normal game of Monopoly, cards are reshuffled once the deck is empty

// Shuffling the Community Chest/Chance decks
const shuffle = (deck) =>
{
    // A copy of Community Chest/Chance decks prevents loosing cards from the master deck (when reshuffling is required)
    let CopyDeck = [...deck];
    let shuffledDeck = [];

    for (var i = 0; i < deck.length; i++)
    {
        // Random index value from our copied deck
        let index = Math.floor(Math.random() * CopyDeck.length);
        // Same index is pushed to the end of our shuffled deck
        shuffledDeck.push(CopyDeck[index]);
        // We're not going to use filter() because the Chance cards have duplicates
        // According to the filter() documentation, it'll remove values that are of equal value
        CopyDeck.splice(index, 1);
    }

    return shuffledDeck;
}

// Used to move us to the nearest railroad/utility
const nearest = (arr, bIndex) => 
{
    // Value set to 40 for setting the minimum value later
    let min = 40;
    // Possible nearest railroad/utility
    let placement;

    // A loop to locate possible nearest railroad/utility, eventually the nearest railroad/utility
    for (var i = 0; i < 4; i++)
    {
        if (Math.abs(bIndex - arr[i] < min))
        {
            min = Math.abs(bIndex - arr[i])
            placement = arr[i];
        }
    }

    // The actual nearest railroad/utility
    return placement;
}

// Draw cards from a shuffled deck
const drawCard = (deck, masterDeck) => 
{
    
    // In case a deck is empty
    if (deck.length === 0)
    {
        deck.push(...masterDeck);
        deck = shuffle(deck);
    }

    // In case we draw nearest railroad or utility
    let rr = [5, 15, 25, 35];
    let utilities = [12, 28];

    // Switch statement for all cards results (Just the ones that require us to move; Banks don't exist in this simulation)
    switch (deck.pop()) 
    {
        case "Advance to Boardwalk":
            boardIndex = 39;
            board[boardIndex][1]++;
            break;

        case "Advance to Go (Collect $200)":
            boardIndex = 0;
            board[boardIndex][1]++;
            break;

        case "Advance to Illinois Avenue. If you pass Go, collect $200":
            boardIndex = 24; 
            board[boardIndex][1]++;
            break;

        case "Advance to St. Charles Avenue. If you pass Go, collect $200":
            boardIndex = 11; 
            board[boardIndex][1]++;
            break;

        case "Advance to St. Charles Avenue. If you pass Go, collect $200":
            boardIndex = 11; 
            board[boardIndex][1]++;
            break;

        case "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled":
            boardIndex = nearest(rr, boardIndex); 
            board[boardIndex][1]++;
            break;
        
        case "Get Out of Jail Free":
            freeJailChance = true;
            break;

        case "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.":
            boardIndex = nearest(utilities, boardIndex); 
            board[boardIndex][1]++;
            break;

        case "Go Back 3 Spaces":
            boardIndex = boardIndex - 3; 
            board[boardIndex][1]++;
            break;

        case "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200":
            jail();
            break;

        case "Take a trip to Reading Railroad. If you pass Go, collect $200":
            boardIndex = 5; 
            board[boardIndex][1]++;
            break;

        default:
            break;
    }
}

// Shuffled decks to draw cards from
let shuffledCC = shuffle(communityChest);
let shuffledChance = shuffle(chance);

// ======================================================================================================================================================
// Variable to keep track of how many times doubles we roll in a row
let doublesCount = 0;

// Rolling the dice
// Returns dice total and if it was doubles
const rollDice = () => 
{
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const doubles = dice1 === dice2;

    if(doubles)
    {
        doublesCount++;
    } 
    else 
    {
        doublesCount = 0;
    }

    return [dice1 + dice2, doubles];
}

// Move token along board
const move = (roll, index) => {
    boardIndex = (index + roll) % board.length;
    board[index][1]++;
}
// ======================================================================================================================================================
// Variables used when we get to Strategy B 
let strategyB = false;
let jailFree = false;

// Function used to send us to jail
const jail = () => 
{
    // For Strategy B
    if (strategyB && !jailFree)
    {
        // How long we've been in jail
        let jailCount = 0;

        // Roll until we get a double or we've rolled 3 times
        do
        {
            let jailDoubles = rollDice();
            jailCount++;

            // If we get a double, it'll break the loop early
            if(jailDoubles[1])
            {
                jailCount = 3;
            }

            boardIndex = 10;
            board[boardIndex][1]++;

        } while (jailCount < 3)
    } 
    else 
    // For Strategy A
    {
        boardIndex = 10;
        board[boardIndex][1]++;
    }
};
// ======================================================================================================================================================
// Bringing everything together
// What to do during each turn

function simulateTurn(turns) { // Parameter is the number of turns of current dataset
    for (var i = 0; i < turns; i++ )
    {
        // Returns the sum of two dice, and if we rolled a double
        let dice = rollDice();

        do
        {
            // Rolling/movement condition for going to jail
            if  ( doublesCount === 3 || boardIndex === 30 )
            {
                if(boardIndex === 30){
                    board[boardIndex][1]++;
                }
                jail();
            } 
            else 
            // Otherwise, move to designated spot
            {
                move(dice[0], boardIndex);
            }

            // Conditions for landing on Community chest or Chance
            if (boardIndex === 2 || boardIndex === 17, boardIndex === 33)
            {
                drawCard(shuffledCC, communityChest);
            } 
            else if (boardIndex === 7 || boardIndex === 22 || boardIndex === 36)
            {
                drawCard(shuffledChance, chance);
            }

            // This will update our dice outside the do-while loop
            dice = rollDice();
        } while (dice[1]) //If rolling a double is true, we roll again
    }

    // Updates board for current dataset
    return board;

}

// Upon end of number of turns (dataset), everything is pushed to the associated csv file
const pushData = (tableNum, turnNum) => 
{
    // Variable used to populate dataset
    let data = simulateTurn(turnNum);
    console.log(data);

    // Goes through the entire array. Each element is equal to a line in the csv file
    for (var i = 0; i < board.length; i++) 
    {
        console.log(tableNum, data[i][0], data[i][1], (data[i][1]/turnNum * 100).toFixed(2));
        // Pushing the data to the associated csv file
        records.push(
            {
                table: tableNum, 
                property: data[i][0], 
                count: data[i][1], 
                percent: (data[i][1]/turnNum * 100).toFixed(2)
            }
        );
    }

    // Erasing the board array to be ready for the next dataset
    eraseBoard();
}

// Empty array to store dataset awaiting to be pushed
let records = [];
// Array for number of turns to be applied per data set
let turnNumber = [1000, 10000, 100000, 1000000];

// Strategy A - 1k Turns
for(var i = 0; i < 10; i++)
{
    pushData(i + 1, turnNumber[0]);
    csvWriter.writeRecords(records);
}

// Strategy A - 10k Turns
// Very similar from 'a_1k.csv' only difference is the file path (the dataset)
records = [];
csvWriter = createCsvWriter(
    {
    path: 'a_10k.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ]
    }
);

for(var i = 0; i < 10; i++)
{
    pushData(i + 1, turnNumber[1]);
    csvWriter.writeRecords(records);
}

// Strategy A - 100k Turns
records = [];
csvWriter = createCsvWriter(
    {
    path: 'a_100k.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
    }
);

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[2]);
    csvWriter.writeRecords(records);
}

// Strategy A - 1m Turns
records = [];
csvWriter = createCsvWriter(
    {
    path: 'a_1m.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ]
    }
);

for(var i = 0; i < 10; i++)
{
    pushData(i + 1, turnNumber[3]);
    csvWriter.writeRecords(records);
}

///////////////////////////////////////////////////////////

// Used to generate the datasets for Strategy B
strategyB = true;

// Strategy B - 1k Turns
records = [];
csvWriter = createCsvWriter(
    {
    path: 'b_1k.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ]
    }
);

for(var i = 0; i < 10; i++)
{
    pushData(i + 1, turnNumber[0]);
    csvWriter.writeRecords(records);
}

// Strategy B - 10k Turns
records = [];
csvWriter = createCsvWriter(
    {
    path: 'b_10k.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
    }
);

for(var i = 0; i < 10; i++)
{
    pushData(i + 1, turnNumber[1]);
    csvWriter.writeRecords(records);
}

// Strategy B - 100k Turns
records = [];
csvWriter = createCsvWriter(
    {
    path: 'b_100k.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
    }
);

for(var i = 0; i < 10; i++)
{
    pushData(i + 1, turnNumber[2]);
    csvWriter.writeRecords(records);
}

// Strategy B - 1m Turns
records = [];
csvWriter = createCsvWriter(
    {
    path: 'b_1m.csv',
    header: 
    [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
    }
);

for(var i = 0; i < 10; i++)
{
    pushData(i + 1, turnNumber[3]);
    csvWriter.writeRecords(records);
}