// This will be our main file
const { clearBoard, displayData } = require('./board.js');
let { playerSpot, turn }= require('./turn.js');

let strategyB = false;

let arrA1k = [];
let arrA10k = [];
let arrA100k = [];
let arrA1m = [];

let arrB1k = [];
let arrB10k = [];
let arrB100k = [];
let arrB1m = [];

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
    // 1 thousand turns
    for (var j = 0; j < 1000; j++)
    {
        turn(strategyB);
    }

    arrB1k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 10 thousand turns
    for (var j = 0; j < 10000; j++)
    {
        turn();
    }

    arrB10k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 100 thousand turns
    for (var j = 0; j < 100000; j++)
    {
        turn();
    }

    arrB100k.push(displayData());

    playerSpot = 0;
    clearBoard();

    // 1 million turns
    for (var j = 0; j < 1000000; j++)
    {
        turn();
    }

    arrB1m.push(displayData());

    playerSpot = 0;
    clearBoard();
}

// Convert arrays to JSON
let jsonData = JSON.stringify(
    {
        a1k: arrA1k, 
        a10k: arrA10k, 
        a100k: arrA100k, 
        a1m: arrA1m,
        b1k: arrB1k,
        b10k: arrB10k,
        b100k: arrB100k,
        b1m: arrB1m
    }
);

// Use fetch to send the data from here to index.php
fetch('index.php', 
{
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: jsonData
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error("Error: ", error));