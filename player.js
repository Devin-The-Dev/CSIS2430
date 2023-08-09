// This will be our main file
// Variable to switch to Strategy B
let strategyB = false;

// Variables of Strategy A
let arrA1k = [];
let arrA10k = [];
let arrA100k = [];
let arrA1m = [];

// Variables of Strategy B
let arrB1k = [];
let arrB10k = [];
let arrB100k = [];
let arrB1m = [];

// The spot/property the player is on
let playerSpot = 0;

// 2D array for the Monopoly spaces and a numerical value to store number of times they've been landed on
let board = 
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
    ["Go to jail", 0],
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

// Cards for Monopoly
const communityChest = 
[
    "Advance to Go (Collect $200)", //Movement
    "Bank error in your favor. Collect $200",
    "Doctor’s fee. Pay $50",
    "From sale of stock you get $50",
    "Get Out of Jail Free", //Player keeps, immediately used if player is in jail
    "Go to Jail. Go directly to jail, do not pass Go, do not collect $200", //movement
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

// Clears the tallys on each space being landed on
const clearBoard = () =>
{
    for(var i = 0; i < board.length; i++) 
    {
        board[i][1] = 0;
    }
}
clearBoard();

// Returns Monopoly space name and number of times it's been landed on
const displayData = () =>
{
    board.forEach(space => 
    {
        console.log(space);
        return space;
    });
    console.log("=============================================");
}
displayData();

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

// Variables for when we need to shuffle our decks
let newCC = shuffle(communityChest);
let newChance = shuffle(chance);

// Drawing a card from the shuffled deck
let draw = (deck, masterDeck) => 
{
    // In case a deck is empty
    if (deck.length === 0)
    {
        deck.push(...masterDeck);
        deck = shuffle(deck);
    }

    return deck.pop();
}

draw(newCC, communityChest);
draw(newChance, chance);

// Picking a random number between 1 and 6 (inclusive)
const dice = () => 
{
    return Math.floor(Math.random() * 6) + 1;
}

// Rolling 2 dice
const roll = () => 
{
    return [dice(), dice()];
}
roll();

// The players turn 
// strategyB is used when the player is sent to jail
let turn = (strategyB) => 
{
    // Variables used in the event of rolling doubles
    let doublesCount = 0;
    let doubles = false;

    // The players turn
    do
    {
        // Rolling our dice
        let diceArr = roll();

        // Booleans for "Get Out of Jail Free" cards
        let freeJailCC = false;
        let freeJailChance = false;

        // Condition for rolling a double
        if (diceArr[0] === diceArr[1])
        {
            doubles = true;
            doublesCount += 1;
        } else 
        {
            doubles = false;
        }

        // Conditions for going to jail:
        // * "Go to Jail" cards are further down
        if (doublesCount === 3 || playerSpot === 30)
        {
            // Jail condition specifically for Strategy B
            if (strategyB && !freeJailCC || strategyB && !freeJailChance)
            {
                
                // roll for doubles within next 3 turns
                for(var k = 0; k < 3; k++)
                {
                    diceArr = roll();

                    // If dice are not the same number
                    // * Tally Jail space (player should still be on "Go To Jail" to keep meeting this condition)
                    // * Roll again
                    if (diceArr[0] != diceArr[1])
                    {
                        board[10][1] += 1;
                        break;
                    } else 
                    {
                        // Upon rolling a double
                        // * Move player to Jail space (exit the doubles if statement)
                        playerSpot = 10; 
                        board[playerSpot][1] += 1;
                        doubles = false;
                    }
                }
            // This else statement is for both strategies
            // * Stretegy A: Move to "Jail"
            // * Strategy B: Player has a "Get Out of Jail Free" card
            } else 
            {
                // Player moves to jail
                playerSpot = 10; 
                board[playerSpot][1] += 1;

                // Ensure "Get Out of Jail Free" cards have been used
                freeJailCC = false; //Get out of jail free
                freeJailChance = false; //Get out of jail free

                // doubles set to false to end the turn
                doubles = false;

            }            
            break;
        } 
        // A player's normal turn
        else
        {
            // Move to space and tally the space
            playerSpot = (playerSpot + diceArr[0] + diceArr[1]) % board.length;
            board[playerSpot][1] += 1;

            // Condition if player lands on Community Chest
            if (playerSpot === 2 || playerSpot === 17 || playerSpot === 33)
            {
                // Player draws a card
                const card = draw(newCC, communityChest);
                
                // Player goes to jail
                if (card === "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200")
                {
                    
                    //playerSpot is 30 so it hits the jail if statement (Strategy B)
                    playerSpot = 30;
                    // We'll tally for jail because that's technically where the player's at
                    board[10][1] += 1;

                    // player turn ends
                    doubles = false;

                // Advance to "Go"
                } else if (card === "Advance to Go (Collect $200)")
                {
                    playerSpot = 0; 
                    board[playerSpot][1] += 1;

                // "Get Out of Jail Free"
                } else if (card === "Get Out of Jail Free")
                {
                    freeJailCC = true;
                }
            }            
            // Condition if player lands on Chance
            if (playerSpot === 7 || playerSpot === 22 || playerSpot === 36)
            {
                // Player draws a card
                const card = draw(newChance, chance);

                // Player goes to jail
                if (card === "Go to Jail. Go directly to Jail, do not pass Go, do not collect $200")
                {
                    
                    //playerSpot is 30 so it hits the jail if statement (Strategy B)
                    playerSpot = 30;
                    // We'll tally for jail because that's technically where the player's at
                    board[10][1] += 1;

                    // player turn ends
                    doubles = false;
                
                // Go to Boardwalk
                } else if(card === "Advance to Boardwalk")
                {
                    playerSpot = 39;
                    board[playerSpot][1] += 1;
                // Advance to "Go"
                } else if (card === "Advance to Go (Collect $200)")
                {
                    playerSpot = 0; 
                    board[playerSpot][1] += 1;
                // Go to Illinois Ave
                } else if (card === "Advance to Illinois Avenue. If you pass Go, collect $200")
                {
                    playerSpot = 24; 
                    board[playerSpot][1] += 1;
                // Go to St. Charles Place
                } else if (card === "Advance to St. Charles Place. If you pass Go, collect $200")
                {
                    playerSpot = 11; 
                    board[playerSpot][1] += 1;
                // Go to nearest railroad 
                } else if (card === "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled")
                {
                    // Absolute value will be used to determine the railroad nearest to the player
                    let absValue = () => {
                        // These numbers represent each spot a railroad is located
                        let rrArr = [5, 15, 25, 35];
                        // Starting min number needs to be high enough to reassign a smaller number
                        let min = 40;

                        // placement will be used to nearest railroad
                        let placement;

                        // A loop to locate nearest railroad
                        for (var k = 0; k < 4; k++)
                        {
                            // min is reassigned with a lower number
                            // placement is reassigned with possible nearest railroad
                            if (Math.abs(playerSpot - rrArr[k]) < min)
                            {
                                min = Math.abs(playerSpot - rrArr[k]);
                                placement = rrArr[k];
                            }
                        }

                        // The nearest railroad according to player's location
                        return placement;
                    }
                    
                    // Play moves to nearest railroad
                    playerSpot = absValue(); 
                    board[playerSpot][1] += 1;

                // "Get Out of Jail Free" card
                } else if (card === "Get Out of Jail Free")
                {
                    freeJailChance = true;
                
                // Same as going to the nearest railroad, but utilities instead
                } else if (card === "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.")
                {
                    let absValue = () => {
                        // These numbers represent the spots the utilities are located
                        let utArr = [12, 28];
                        let min = 40;
                        let placement;
                        for (var k = 0; k < 4; k++){
                            if (Math.abs(playerSpot - utArr[k]) < min)
                            {
                                min = Math.abs(playerSpot - utArr[k]);
                                placement = utArr[k];
                            }
                        }
                        // The nearest railroad according to player's location
                        return placement;
                    }
                    
                    playerSpot = absValue(); 
                    board[playerSpot][1] += 1;
                
                // Player goes back 3 spaces
                } else if (card === "Go Back 3 Spaces")
                {
                    playerSpot -= 3; 
                    board[playerSpot][1] += 1;
                
                // Player goes to Reading Railroad
                } else if (card === "Take a trip to Reading Railroad. If you pass Go, collect $200")
                {
                    playerSpot = 5; 
                    board[playerSpot][1] += 1;
                }
            }
        }
    }
    while(doubles === true)
}

turn();

// Function to update the data for Strategy A
const updateStrategyATable = (dataArr) => {
    const table = document.querySelector('#strategyA table');
    for (let i = 0; i < dataArr.length; i++) {
      const row = table.insertRow(i + 2); // Start inserting rows from the third row
      for (let j = 0; j < dataArr[i].length; j++) {
        const cell = row.insertCell(j);
        cell.textContent = dataArr[i][j];
      }
    }
  };
  
  // Function to update the data for Strategy B
  const updateStrategyBTable = (dataArr) => {
    const table = document.querySelector('#strategyB table');
    for (let i = 0; i < dataArr.length; i++) {
      const row = table.insertRow(i + 2); // Start inserting rows from the third row
      for (let j = 0; j < dataArr[i].length; j++) {
        const cell = row.insertCell(j);
        cell.textContent = dataArr[i][j];
      }
    }
  };

// Strategy A
for (var i = 0; i < 10; i++)
{
    console.log(`Strategy A - ${i}`);
    // 1 thousand turns
    for (var j = 0; j < 1000; j++)
    {
        // The players turn
        turn();
    }
    // Data/report is stored
    arrA1k.push(displayData());

    // Data is reset
    playerSpot = 0;
    clearBoard();

    // 10 thousand turns
    for (var j = 0; j < 10000; j++)
    {
        turn();
    }

    arrA10k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 100 thousand turns
    for (var j = 0; j < 100000; j++)
    {
        turn();
    }

    arrA100k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 1 million turns
    for (var j = 0; j < 1000000; j++)
    {
        turn();
    }

    arrA1m.push(displayData());

    playerSpot = 0;
    clearBoard();
}

// Strategy B
strategyB = true;
for (var i = 0; i < 10; i++)
{
    console.log(`Strategy B - ${i + 1}`);
    console.log("=============================================");
    // 1 thousand turns
    console.log("1,000 turns");
    for (var j = 0; j < 1000; j++)
    {
        turn(strategyB);
    }

    arrB1k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 10 thousand turns
    console.log("10,000 turns");
    for (var j = 0; j < 10000; j++)
    {
        turn();
    }

    arrB10k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 100 thousand turns
    console.log("100,000 turns");
    for (var j = 0; j < 100000; j++)
    {
        turn();
    }

    arrB100k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 1 million turns
    console.log("1,000,000 turns");
    for (var j = 0; j < 1000000; j++)
    {
        turn();
    }

    arrB1m.push(displayData());

    playerSpot = 0;
    clearBoard();
}

// updateStrategyATable(arrA1k);
// updateStrategyATable(arrA10k);
// updateStrategyATable(arrA100k);
// updateStrategyATable(arrA1m);

// updateStrategyBTable(arrB1k);
// updateStrategyBTable(arrB10k);
// updateStrategyBTable(arrB100k);
// updateStrategyBTable(arrB1m);