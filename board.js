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

module.exports = 
{
    board,
    clearBoard, 
    displayData
}