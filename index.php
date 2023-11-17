<?php
    // $propertyArr = pushToArray('a_1k.csv', 1, 1, 40);

    // function pushToArray($csv, $initialRow, $columnIndex, $tableHeight) {
    //     $file = fopen($csv, 'r');
    //     $rowNumber = 0;

    //     while (($set = fgetcsv($file)) !== false) {
    //         $rowNumber++;
            
    //         if ($rowNumber <= $initialRow) {
    //             continue; // Skip the first row (headers)
    //         }

    //         // This is where I'll push things
    //         if (isset($set[$columnIndex])) {
    //             $entry = $set[$columnIndex];

    //             // This template needs to step out of this scope
    //             array_push($array, $entry);

    //             // This needs to be inside so we can hit the rows after the first 40
    //             if ($rowNumber >= $tableHeight + 1) {
    //                 break; // Break the loop after reading the desired number of rows
    //             }
    //         }

    //     }

    //     fclose($file);
    // }
    
    // Function to read a specific column from a CSV file
    // To make this more dynamic, move $rowNumber up to a parameter, have that and $maxRows undefined. When calling the function, define those perameters (arguments)
    function readTable($csv, $columnIndex = 1, $tableHeight = 40) {
        $file = fopen($csv, 'r');
        $rowNumber = 0;

        while (($set = fgetcsv($file)) !== false) {
            $rowNumber++;
            
            if ($rowNumber <= 1) {
                continue; // Skip the first row (headers)
            }

            // Ok, so all the properties are displayed with no repeats, but not in the right order, and the numbers aren't matching with their properties
            if (isset($set[$columnIndex])) {
                $properties = $set[$columnIndex];
                $count1 = $set[$columnIndex + 1];
                $percentage1 = $set[$columnIndex + 2];

                $count2 = $set[$columnIndex + 1];
                $percentage2 = $set[$columnIndex + 2];

                // I'm just going to call the functions here... or arrays
                echo 
                "<tr>
                    <td>" . $properties . "</td>
                    <td>" . $count1 . "</td>
                    <td>" . $percentage1 . "</td>
                </tr>" . PHP_EOL;

                // This needs to be inside so we can hit the rows after the first 40
                if ($rowNumber >= $tableHeight + 1) {
                    break; // Break the loop after reading the desired number of rows
                }
            }

        }

        fclose($file);
    }

    // What if I moved things out of readTable(), have another function to store the columns into their own arrays?
    // function test($array){
    //     foreach($array as $entry){
    //         echo 
    //             "<tr>
    //                 <td>" . $entry . "</td>
    //             </tr>" . PHP_EOL;
    //     }
    // }

    
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
        </style>
        <body>
            <h1>Monopoly Stats</h1>
            <h2>Strategy A</h2>
            <table>
                <thead>
                    <th>1,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('a_1k.csv');
                ?>
            </table>
            <table>
                <thead>
                    <th>10,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('a_10k.csv');
                ?>
            </table>
            <table>
                <thead>
                    <th>100,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('a_100k.csv');
                ?>
            </table>
            <table>
                <thead>
                    <th>1,000,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('a_1m.csv');
                ?>
            </table>

            <h2>Strategy B</h2>
            <table>
                <thead>
                    <th>1,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('b_1k.csv');
                ?>
            </table>
            <table>
                <thead>
                    <th>10,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('b_10k.csv');
                ?>
            </table>
            <table>
                <thead>
                    <th>100,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('b_100k.csv');
                ?>
            </table>
            <table>
                <thead>
                    <th>1,000,000 Turns</th>
                    <?php
                        for($i = 1; $i < 11; $i++){
                            echo
                            '<th colspan="2">Set ' . $i . '</th>';
                        }
                    ?>
                </thead>
                <tr>
                    <th>Property</th>
                    <?php
                        for($i = 0; $i < 10; $i++){
                            echo
                            "<th>Count</th>
                             <th>Percentage</th>";
                        }
                    ?>
                </tr>
                <?php
                    echo readTable('b_1m.csv');
                ?>
            </table>
        </body>
    </html>
