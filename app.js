//1) deposit money *
//2) determine num of lines to bet on
//3) collect a bet
//4) spin the slot machine
//5) check if user won
//6) give the user their winnings
//7) play again
//prompt, 1) git init, 2) enter through everything, 3) npm i prompt-sync
//to run terminal.   node app.js
//have to save every time you make an edit file save
const prompt = require("prompt-sync")();

//global variables
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {//keys mapped with letters that have attributes
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUES ={
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}



const deposit = () => {
    while(true) {
        const depositAmount = prompt("Enter a deposit amount: " ); //prompt user input, user input taken is as string
        const numberDepositAmount = parseFloat(depositAmount);//parse the string into an int

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        }
        else {
            return numberDepositAmount;
        }   
    }
};

const getNumberLines = () => {
    while (true) {
        const numLines = prompt("Enter the number of lines to bet on (1-3): ");
        const NumOfLines = parseFloat(numLines);

        if (isNaN(NumOfLines) || NumOfLines <= 0 || NumOfLines > 3) {
            console.log("Invalid number of lines. Try again.");
        }
        else {
            return NumOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance/lines)) {
            console.log("Invalid bet, try again");
        }
        else {
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];//array is reference data type, can change whats inside array
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {//for each loop
        //console.log(symbol, count);
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);//adds to array push
        }
    }
    
    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {//for every reel generate whats inside
        const reelSymbols = [...symbols]; //copys symbols
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length) //  (random int 0-1) * (lentgh of symbols we have, max), round
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let i = 0; i < lines; i++) {
        const symbols = rows[i]
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
}

const runGame = () => {
    while(true) {
        let balance = deposit();
        const numberOfLines = getNumberLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet,numberOfLines);
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money.");
            break;
        }
        const playAgain = prompt("Would you like to play again? (y/n): ");
        
        if (playAgain != "y") break;
    }
}

//const = constant, let = change value, 
runGame();


