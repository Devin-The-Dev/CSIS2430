<?php
    // Function to read a specific column from a CSV file
    // To make this more dynamic, move $rowNumber up to a parameter, have that and $maxRows undefined. When calling the function, define those perameters (arguments)
    function readTable($csv, $columnIndex = 1, $tableHeight = 400) {
        $file = fopen($csv, 'r');
        $rowNumber = 0;

        echo
        "<tr>
            <th>Set</th>
            <th>Property</th>
            <th>Count</th>
            <th>Percentage</th>
            </tr>";

        while (($set = fgetcsv($file)) !== false) {
            $rowNumber++;
            
            if ($rowNumber <= 1) {
                continue; // Skip the first row (headers)
            }

            // Ok, so all the properties are displayed with no repeats, but not in the right order, and the numbers aren't matching with their properties
            if (isset($set[$columnIndex])) {
                $setNum = $set[$columnIndex - 1];
                $properties = $set[$columnIndex];
                $count = $set[$columnIndex + 1];
                $percentage = $set[$columnIndex + 2];


                // I'm just going to call the functions here... or arrays
                echo 
                "<tr>
                    <td class = " . $setNum . ">" . $setNum . "</td>
                    <td>" . $properties . "</td>
                    <td>" . $count . "</td>
                    <td>" . $percentage . "</td>
                </tr>" . PHP_EOL;

                // This needs to be inside so we can hit the rows after the first 40
                if ($rowNumber >= $tableHeight + 1) {
                    break; // Break the loop after reading the desired number of rows
                }
            }

        }

        fclose($file);
    }
?>

<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Monopoly Stats</title>
        </head>
        <style>
            table, th, td {
                border: 1px solid black;
            }
            section {
                display: inline-block;
            }

            td:nth-child(40n) {
                border-bottom: 2px solid black;
            }
        </style>
        <body>
            <h1>Monopoly Stats</h1>
            <section>
                <h2>Strategy A</h2>
                <table>
                    <thead>
                        <th colspan="4">1,000 Turns</th>
                    </thead>
                    <?php
                        // echo headerRow();
                        echo readTable('a_1k.csv');
                    ?>
                </table>
                <table>
                    <thead>
                        <th colspan="4">10,000 Turns</th>
                    </thead>
                    <?php
                        echo readTable('a_10k.csv');
                    ?>
                </table>
                <table>
                    <thead>
                        <th colspan="4">100,000 Turns</th>
                    </thead>
                    <?php
                        echo readTable('a_100k.csv');
                    ?>
                </table>
                <table>
                    <thead>
                        <th colspan="4">1,000,000 Turns</th>
                    </thead>
                    <?php
                        echo readTable('a_1m.csv');
                    ?>
                </table>
            </section>
            <section>
                <h2>Strategy B</h2>
                <table>
                    <thead>
                        <th colspan="4">1,000 Turns</th>
                    </thead>
                    <?php
                        echo readTable('b_1k.csv');
                    ?>
                </table>
                <table>
                    <thead>
                        <th colspan="4">10,000 Turns</th>
                    </thead>
                    <?php
                        echo readTable('b_10k.csv');
                    ?>
                </table>
                <table>
                    <thead>
                        <th colspan="4">100,000 Turns</th>
                    </thead>
                    <?php
                        echo readTable('b_100k.csv');
                    ?>
                </table>
                <table>
                    <thead>
                        <th colspan="4">1,000,000 Turns</th>
                    </thead>
                    <?php
                        echo readTable('b_1m.csv');
                    ?>
                </table>
            </section>
        </body>
    </html>
