let { board, eraseBoard, boardIndex } = require('./board.js');
// May need to remove for more versitivity
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let csvWriter = createCsvWriter({
    path: 'a_1k.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

// Variables needed to create the 80 sets of data
// const reports = 10;
// const turns = [1000, 10000, 100000, 1000000];
// ======================================================================================================================================================
// cards.js
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
    // Copy of Community Chest/Chance decks
    let CopyDeck = [...deck];
    let shuffledDeck = [];

    for (var i = 0; i < deck.length; i++)
    {
        // Random index value from our copied deck
        let index = Math.floor(Math.random() * CopyDeck.length);
        // Same index is pushed to the end of our shuffled deck
        shuffledDeck.push(CopyDeck[index]);
        // We're not going to use filter() because the Chance cards have a duplicate
        // According to the filter() documentation, it'll remove values that are of equal value
        CopyDeck.splice(index, 1);
    }

    return shuffledDeck;
}

const nearest = (arr, bIndex) => {
    // Value set to 40 for setting the minimum value later
    let min = 40;
    // Possible nearest railroad
    let placement;

    // A loop to locate nearest railroad
    for (var i = 0; i < 4; i++){
        if (Math.abs(bIndex - arr[i] < min)){
            min = Math.abs(bIndex - arr[i])
            placement = arr[i];
        }
    }

    return placement;
}

const drawCard = (deck, masterDeck) => {
    
    // In case a deck is empty
    if (deck.length === 0)
    {
        deck.push(...masterDeck);
        deck = shuffle(deck);
    }

    let rr = [5, 15, 25, 35];
    let utilities = [12, 28];

    // Switch statement for all cards results
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

let shuffledCC = shuffle(communityChest);
let shuffledChance = shuffle(chance);

// ======================================================================================================================================================
// dice.js
let doublesCount = 0;

// Rolling the dice
// Returns dice total and if it was doubles
const rollDice = () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const doubles = dice1 === dice2;

    if(doubles){
        doublesCount++;
    } else {
        doublesCount = 0;
    }

    return [dice1 + dice2, doubles];
}

// Move token along board
const move = (roll, index) => {
    // index isn't saved outside the scope
    boardIndex = (index + roll) % board.length;
    board[index][1]++;
}
// ======================================================================================================================================================
// jail.js
// 'Get Out of Jail Free' cards only apply to Strategy B
let strategyB = false;
let jailFree = false;

const jail = () => {
    if (strategyB && !jailFree)
    {
        let jailCount = 0;

        do
        {
            let jailDoubles = rollDice();
            jailCount++;

            if(jailDoubles[1]){
                jailCount = 3;
            }

            boardIndex = 10;
            board[boardIndex][1]++;

        } while (jailCount < 3)
    } else 
    {
        boardIndex = 10;
        board[boardIndex][1]++;
    }
};
// ======================================================================================================================================================
// turn.js
function simulateTurn(turns, initialBoard) {
    for (var i = 0; i < turns; i++ ){
        // This variable isn't updating
        let dice = rollDice();

        do
        {
            if  ( doublesCount === 3 || boardIndex === 30 )
            {
                if(boardIndex === 30){
                    board[boardIndex][1]++;
                }
                // console.log("*3 doubles*");
                jail();
            } 
            else 
            {
                move(dice[0], boardIndex);
            }

            // If landed on Community Chest, draw a card from that deck
            if (boardIndex === 2 || boardIndex === 17, boardIndex === 33)
            {
                drawCard(shuffledCC, communityChest);
            } 
            // If landed on Chance, draw a card from that deck
            else if (boardIndex === 7 || boardIndex === 22 || boardIndex === 36)
            {
                drawCard(shuffledChance, chance);
            }

            // This will update our dice outside the do-while loop
            dice = rollDice();
        } while (dice[1])
    }

    return board;

}

const pushData = (tableNum, turnNum) => {
    let data = simulateTurn(turnNum);
    console.log(data);
    for (var i = 0; i < board.length; i++) {
        // This is where I'll push the data
        console.log(tableNum, data[i][0], data[i][1], (data[i][1]/turnNum * 100).toFixed(2));
        records.push({table: tableNum, property: data[i][0], count: data[i][1], percent: (data[i][1]/turnNum * 100).toFixed(2)});
    }

    eraseBoard();
}

let records = [];
let turnNumber = [1000, 10000, 100000, 1000000];

// Strategy A - 1k Turns
for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[0]);
    csvWriter.writeRecords(records);
}

// Strategy A - 10k Turns
records = [];
csvWriter = createCsvWriter({
    path: 'a_10k.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[1]);
    csvWriter.writeRecords(records);
}

// Strategy A - 100k Turns
records = [];
csvWriter = createCsvWriter({
    path: 'a_100k.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[2]);
    csvWriter.writeRecords(records);
}

// Strategy A - 1m Turns
records = [];
csvWriter = createCsvWriter({
    path: 'a_1m.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[3]);
    csvWriter.writeRecords(records);
}

///////////////////////////////////////////////////////////

strategyB = true;

// Strategy B - 1k Turns
records = [];
csvWriter = createCsvWriter({
    path: 'b_1k.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[0]);
    csvWriter.writeRecords(records);
}

// Strategy A - 10k Turns
records = [];
csvWriter = createCsvWriter({
    path: 'b_10k.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[1]);
    csvWriter.writeRecords(records);
}

// Strategy A - 100k Turns
records = [];
csvWriter = createCsvWriter({
    path: 'b_100k.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[2]);
    csvWriter.writeRecords(records);
}

// Strategy A - 1m Turns
records = [];
csvWriter = createCsvWriter({
    path: 'b_1m.csv',
    header: [
        {id: 'table', title: 'TABLE'},
        {id: 'property', title: 'PROPERTY'},
        {id: 'count', title: 'COUNT'},
        {id: 'percent', title: 'PERCENT'}
    ] 
});

for(var i = 0; i < 10; i++){
    pushData(i + 1, turnNumber[3]);
    csvWriter.writeRecords(records);
}