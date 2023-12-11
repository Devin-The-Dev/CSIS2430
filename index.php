<?php
    // Function to read specific columns from a CSV file
    // Parameters:
    // $csv = file path
    // $columnIndex = column number
    // $tableHeight = height of dataset in the file
    function readTable($csv, $columnIndex = 1, $tableHeight = 400) 
    {
        // Variables to read the file, row by row
        $file = fopen($csv, 'r');
        $rowNumber = 0;

        echo
        "<tr>
            <th>Set</th>
            <th>Property</th>
            <th>Count</th>
            <th>Percentage</th>
            </tr>";
        
        // Read until the end of the file 
        while (($set = fgetcsv($file)) !== false) 
        {
            // Used ot move down a row
            $rowNumber++;
            
            // Allows us to skip the headers row
            if ($rowNumber <= 1) 
            {
                continue; 
            }

            // Allows us to read certain cells in each row
            if (isset($set[$columnIndex])) 
            {
                // Variables for:
                // Trial number
                $setNum = $set[$columnIndex - 1];
                // Property names
                $properties = $set[$columnIndex];
                // Number of times the proprty was landed on
                $count = $set[$columnIndex + 1];
                // The percentage the proprty was landed on
                $percentage = $set[$columnIndex + 2];


                // Formating the numbers for the webpage
                echo 
                "<tr>
                    <td class = " . $setNum . ">" . $setNum . "</td>
                    <td>" . $properties . "</td>
                    <td>" . $count . "</td>
                    <td>" . $percentage . "</td>
                </tr>" . PHP_EOL;
            }

        }
        
        // Close the file after reaching its end
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
        <!-- Simple Styling -->
        <style>
            table, th, td 
            {
                border: 1px solid black;
            }
            section 
            {
                display: inline-block;
            }
        </style>
        <body>
            <h1>Monopoly Stats</h1>
            <!-- Datasets for Strategy A -->
            <section>
                <h2>Strategy A</h2>
                <table>
                    <thead>
                        <th colspan="4">1,000 Turns</th>
                    </thead>
                    <?php
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
            <!-- Datasets for Strategy B -->
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
