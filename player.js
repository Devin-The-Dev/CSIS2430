// This will be our main file
const { clearBoard, displayData } = require('./board.js');
let { playerSpot, turn }= require('./turn.js');

let strategyB = false;

let arrA = [];
let arrB = [];

// Strategy A
for (var i = 0; i < 10; i++)
{
    // 1 thousand turns
    for (var j = 0; j < 1000; j++)
    {
        // The players turn
        turn();
    }
    // Data/report is stored
    arrA.push(displayData());

    // Data is reset
    playerSpot = 0;
    clearBoard();

    // 10 thousand turns
    for (var j = 0; j < 10000; j++)
    {
        turn();
    }

    arrA.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 100 thousand turns
    for (var j = 0; j < 100000; j++)
    {
        turn();
    }

    arrA.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 1 million turns
    for (var j = 0; j < 1000000; j++)
    {
        turn();
    }

    arrA.push(displayData());

    playerSpot = 0;
    clearBoard();
}

// Strategy B
strategyB = true;
for (var i = 0; i < 10; i++)
{
    // 1 thousand turns
    for (var j = 0; j < 1000; j++)
    {
        turn(strategyB);
    }

    arrB.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 10 thousand turns
    for (var j = 0; j < 10000; j++)
    {
        turn();
    }

    arrB.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 100 thousand turns
    for (var j = 0; j < 100000; j++)
    {
        turn();
    }

    arrB.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 1 million turns
    for (var j = 0; j < 1000000; j++)
    {
        turn();
    }

    arrB.push(displayData());

    playerSpot = 0;
    clearBoard();
}

export default arrA;
export { arrB };
module.exports = { arrA, arrB }