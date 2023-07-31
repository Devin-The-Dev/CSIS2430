// Picking a random number between 1 and 6 (inclusive)
export function dice()
{
    return Math.floor(Math.random() * 6) + 1;
}

// Rolling 2 dice
export function roll()
{
    return [dice(), dice()];
}
roll();

// Re-rolls will be taken care of outside of this file because we need to know if we land on 'Go to Jail'