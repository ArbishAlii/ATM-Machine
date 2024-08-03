#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let mybalance = 500000;
let myPin = 2002;
console.log(chalk.blue("\n \tWelcome to Arbish Ali ~ATM machine \n"));
let PinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your Pin Code")
    },
]);
if (PinAnswer.pin === 2002) {
    console.log(chalk.green("Login Successful, Correct Password"));
    // console.log(`Current account Balance is ${mybalance}`);
    let operationAnswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an operation:"),
            choices: ["Withdraw Amount", "Check balance"]
        }
    ]);
    if (operationAnswer.operation === "Withdraw Amount") {
        let WithdrawAns = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                message: "Select Withdrawal method",
                choices: ["Fast cash", "Enter Amount"]
            }
        ]);
        if (WithdrawAns.WithdrawMethod === "Fast cash") {
            let FashcashAns = await inquirer.prompt([{
                    name: "FastCash",
                    type: "list",
                    message: "Select amount",
                    choices: [10000, 20000, 100000]
                }
            ]);
            if (FashcashAns.FastCash > mybalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                mybalance -= FashcashAns.FastCash;
                console.log(chalk.blue(`${FashcashAns.FastCash} Withdraw Successfuly`));
                console.log(chalk.green(`Your remaining balance is: ${mybalance}`));
            }
        }
        else if (WithdrawAns.WithdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > mybalance) {
                console.log("Insufficient Balance");
            }
            else {
                mybalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw successfully`);
                console.log(`your remaining balance is ${mybalance}`);
            }
        }
    }
    else if (operationAnswer.operation === "Check balance") {
        console.log(`Your current account balance is ${mybalance}`);
    }
}
else {
    console.log(chalk.red("Incorrect Pin, Try Again!"));
}
