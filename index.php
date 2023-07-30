<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./player.js"></script>
    <title>Monopoly Stats</title>
</head>
<body>
    <?php 
        // Retrieving JSON data
        $jsonData = file_get_contents('php://input');

        // Parsing data into an associative array to make code a little cleaner
        $data = json_decode($jsonData, true);

        // Assigning arrays to their PHP variables
        $a1k = $data['a1k'];
        $a10k = $data['a10k'];
        $a100k = $data['a100k'];
        $a1m = $data['a1m'];

        $b1k = $data['b1k'];
        $b10k = $data['b10k'];
        $b100k = $data['b100k'];
        $b1m = $data['b1m']; 
    ?>

    <h1>Monopoly Stats</h1>
    <div>
        <h2>Strategy A</h2>
        <table>
            <tr>
                <th></th>
                <th colspan="2">n = 1,000</th>
                <th colspan="2">n = 10,000</th>
                <th colspan="2">n = 100,000</th>
                <th colspan="2">n = 1,000,000</th>
            </tr>
            <tr>
                <th>Properties</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
            </tr>
        </table>
    </div>
    <div>
        <h2>Strategy B</h2>
        <table>
            <tr>
                <th></th>
                <th colspan="2">n = 1,000</th>
                <th colspan="2">n = 10,000</th>
                <th colspan="2">n = 100,000</th>
                <th colspan="2">n = 1,000,000</th>
            </tr>
            <tr>
                <th>Properties</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
            </tr>           
            <tr>
                <th>Properties</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
                <th>count</th>
                <th>%</th>
            </tr>
        </table>
        <?php
            for ($i = 0; $i < $a1k.count(); i++){
                echo "<p>".$a1k[i][0]."</p><br>";
            }
        ?>
    </div>
</body>
</html>