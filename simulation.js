const reports = 10;
const turns = [1000, 10000, 100000, 1000000];
// ======================================================================================================================================================
// board.js
// All the manipulation outputs to here
const board = 
[
    ["Go", 0],
    ["Meditaranean Avenue", 0],
    ["Community Chest #1", 0],
    ["Baltic Avenue", 0],
    ["Income Tax", 0],
    ["Reading Railroad", 0],
    ["Oriental Avenue", 0],
    ["Chance #1", 0],
    ["Vermont Avenue", 0],
    ["Connecticut Avenue", 0],
    ["Jail", 0],
    ["St. Charles Place", 0],
    ["Electric Company", 0],
    ["States Avenue", 0],
    ["Virginia Avenue", 0],
    ["Pennsylvania Railroad", 0],
    ["St. James Place", 0],
    ["Community Chest #2", 0],
    ["Tennessee Avenue", 0],
    ["New York Avenue", 0],
    ["Free Parking", 0],
    ["Kentucky Avenue", 0],
    ["Chance #2", 0],
    ["Indiana Avenue", 0],
    ["Illinois Avenue", 0],
    ["B. & O. Railroad", 0],
    ["Atlantic Avenue", 0],
    ["Ventnor Avenue", 0],
    ["Water Works", 0],
    ["Marvin Gardens", 0],
    ["Go To Jail", 0],
    ["Pacific Avenue", 0],
    ["North Carolina Avenue", 0],
    ["Community Chest #3", 0],
    ["Pennsylvania Avenue", 0],
    ["Short Line Railroad", 0],
    ["Chance #3", 0],
    ["Park Place", 0],
    ["Luxury Tax", 0],
    ["Boardwalk", 0]
];

let boardIndex = 0;
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

const drawCard = (deck, masterDeck) => {
    
    // In case a deck is empty
    if (deck.length === 0)
    {
        deck.push(...masterDeck);
        deck = shuffle(deck);
    }

    return deck.pop();
}

let shuffledCC = shuffle(communityChest);
let shuffledChance = shuffle(chance);

drawCard(shuffledCC, communityChest);
drawCard(shuffledChance, chance);
// ======================================================================================================================================================
// dice.js
let doublesCount = 0;

const rollDice = () => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const doubles = dice1 === dice2;

    if(doubles){
        doublesCount++;
    } else{
        doublesCount = 0;
    }

    return [dice1 + dice2, doubles];
}

const dice = rollDice();
console.log(dice);

const move = (roll, index) => {
    index = (index + roll) % board.length;
    board[index][1]++;
}
move(dice[0], boardIndex)
console.log(board);
console.log(`Doubles Count: ${doublesCount}`);
// ======================================================================================================================================================
// jail.js
// 'Get Out of Jail Free' cards only apply to Strategy B
let strategyB = false;
let jailFree = false;

const jail = () => {
    if (strategyB && !jailFree){
        let jailCount = 0;

        // Make sure you find a way to increment a turn if still in the do-while loop
        do
        {
            console.log(`Before Jail roll: ${jailCount}`);

            let jailDoubles = rollDice();
            jailCount++;
            console.log(`Jail Doubles: ${jailDoubles[1]}`); 

            if(jailDoubles[1]){
                jailCount = 3;
            }

            console.log("Go To Jail");
            boardIndex = 10;
            board[boardIndex][1]++;
            console.log(`After Jail roll: ${jailCount}`); 
            console.log(`=============================`);
        } while (jailCount < 3)
    } else {
        console.log("Go To Jail");
        boardIndex = 10;
        board[boardIndex][1]++;
    }
};

if  
( 
    doublesCount === 3 || 
    boardIndex === 30 ||
    // This is for testing purposes. This parameter will be moved to a switch statement in cards.js
    (boardIndex === 2 && drawCard() === communityChest[5]) 
)
{
    jail();
}

// Community Chest switch statement
// This could be condensed to one switch statement by using a function
switch (drawCard(shuffledCC, communityChest)) {
    case "Advance to Go (Collect $200)":
        boardIndex = 0;
        board[boardIndex][1]++;
        break;

    case "Get Out of Jail Free":
        jailFree = true;
        break;    
    
    case "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200":
        jail();
        break;

}

let rr = [5, 15, 25, 35];
let utilities = [12, 28];

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

// Chance switch statement
switch (drawCard(shuffledChance, chance)) {
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
        board[playerboardIndexSpot][1]++;
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
        boardIndex -= 3; 
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
// ======================================================================================================================================================
// turn.js
// function simulateTurn() {
//     const diceTotal = rollDice();


// }

// const simulateGame = (strategy) => {


// }

// const runSimulations = (strategy) => {
//     for (const numTurns of turns) {

//     }

//     for (let i = 0; i < reports; i++) {


//     }
// }

// runSimulations("Strategy A");
// runSumilations("Strategy B");

module.exports = { board };