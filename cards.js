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

// In a normal game of Monopoly, cards are reshuffled once the deck is empty

// Shuffling the Community Chest/Chance decks
export function shuffle(deck) 
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
export function draw(deck, masterDeck) 
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

