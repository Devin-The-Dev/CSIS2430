// Using Express to allow Node to write HTML
const express = require('express');
const app = express();
const port = 3000;

// Arrays to display
const { arrA1k } = require('./player.js');

const aDataSets = arrA1k.map(item => 
    `
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
                    <tr>
                        <!-- There are 10 results... that represents the number of data sets -->
                        <!-- So itemArr[0] should show the first data set for Strategy A: 1k Turns -->
                        <!-- May need to do a nested for-loop -->
                        <td>${item[0]}</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `).join('');

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
            ${aDataSets}
        <div id="strategyB">
            <h2>Strategy B</h2>
            <table>
                <tr>
                    <th></th> <!--Blank for properties down below-->
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