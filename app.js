// Using Express to allow Node to write HTML
const express = require('express');
const app = express();
const port = 3000;
const { roll } = require('./dice.js');
const { arrA1k } = require('./player.js');

const itemArr = arrA1k.map(item => `<p>${item}</p>`).join('');

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
        <div id="strategyA">
            <h2>Strategy A</h2>
            <table>
                <thead>
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
                </thead>
                <tbody id="table-body">
                    <!-- How do I loop these? -->
                    <tr>
                        <td>Baltic Avenue</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
        <div>
            ${roll()}
        </div>
        <div>
            ${itemArr} 
        </div>
    </body>
    </html>
    `;

    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});