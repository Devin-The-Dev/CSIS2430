// This will be our main file
import { clearBoard, displayData } from './board.js';
import  { playerSpot, turn } from './turn.js';

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

const populateTable = (tableID, dataArray) =>
{
    const table = document.getElementById(tableID);
    dataArray.forEach(item => {
        const row = table.insertRow();
        const propertyCell = row.insertCell(0);
        const countCell = row.insertCell(1);

        propertyCell.textContent = item[0];
        propertyCell.textContent = item[1];
    });
}

populateTable('trategy', data1.a1k);
populateTable('trategy', data1.b1k);