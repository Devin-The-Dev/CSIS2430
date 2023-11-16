<?php
    // Function to read a specific column from a CSV file
    function readColumn($columnIndex, $maxRows = 40) {
        $file = fopen('a_1k.csv', 'r');
        $rowNumber = 0;
        
        while (($row = fgetcsv($file)) !== false) {
            $rowNumber++;
            
            if ($rowNumber === 1) {
                continue; // Skip the first row (headers)
            }

            if (isset($row[$columnIndex])) {
                $columnData = $row[$columnIndex];
                // So the rest of my data needs to go in here
                echo 
                "<tr>
                    <td>" . $columnData . "</td>
                    <td><td>
                    <td><td>
                </tr>" . PHP_EOL;
            }

            if ($rowNumber >= $maxRows + 1) {
                break; // Break the loop after reading the desired number of rows
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
            <title>Document</title>
        </head>
        <body>
            <h1>Monopoly Stats</h1>
            <h2>Strategy A</h2>
            <table>
                <thead>
                    <th></th>
                    <th colSpan="2">Set 1</th>
                    <!-- <th colSpan="2">Set 2</th>
                    <th colSpan="2">Set 3</th>
                    <th colSpan="2">Set 4</th>
                    <th colSpan="2">Set 5</th>
                    <th colSpan="2">Set 6</th>
                    <th colSpan="2">Set 7</th>
                    <th colSpan="2">Set 8</th>
                    <th colSpan="2">Set 9</th>
                    <th colSpan="2">Set 10</th> -->
                </thead>
                <tr>
                    <th>Properties</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <!-- <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th>
                    <th>Count</th>
                    <th>Percentage</th> -->
                </tr>
                <?php
                    echo readColumn(1);
                ?>
            </table>
        </body>
    </html>
