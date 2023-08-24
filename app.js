// Using Express to allow Node to write HTML
const express = require('express');
const app = express();
const port = 3000;

// Arrays to display
const { board } = require('./simulation.js');

// I may need to refactor this into a nested for-loop
// Maybe not... I think if I do some more work in board.js or player.js, I'll be done

const aDataSets = board.map(item => 
`
    <tr style="background-color: rgba(150, 212, 212, 0.4)">
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${((item[1]/1000) * 100).toFixed(2)}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
                
`).join(``);

app.get('/', (req, res) => {
    const html =
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Monopoly Stats</title>
    </head>
    <body>
        <h1>Monopoly Stats</h1>
        <h2>Strategy A</h2>
        <div id="strategyA">
            <table>
                <thead>
                    <tr>
                        <th></th> <!--Blank for properties column down below-->
                        <th colspan="2">n = 1,000</th>
                        <th colspan="2">n = 10,000</th>
                        <th colspan="2">n = 100,000</th>
                        <th colspan="2">n = 1,000,000</th>
                    </tr>
                
                    <tr>
                        <td>Properties</td>
                        <td>Count</td>
                        <td>Percentage</td>
                        <td>Count</td>
                        <td>Percentage</td>
                        <td>Count</td>
                        <td>Percentage</td>
                        <td>Count</td>
                        <td>Percentage</td>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <!-- How do I loop these? -->
                    <!-- There are 10 results... that represents the number of data sets -->
                    <!-- So itemArr[0] should show the first data set for Strategy A: 1k Turns -->
                    <!-- May need to do a nested for-loop -->
                    ${aDataSets}
                </tbody>
            </table>
        </div>
    </body>
    </html>
    `;

    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});