// Picking a random number between 1 and 6 (inclusive)
const dice = () => 
{
    return Math.floor(Math.random() * 6) + 1;
}

// Rolling 2 dice
const roll = () => 
{
    return [dice(), dice()];
}
roll();

module.exports = { roll }