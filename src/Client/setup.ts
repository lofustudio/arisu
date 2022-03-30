import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import inquirer from 'inquirer';
import clui from 'clui';
import minimist from 'minimist';
import Cookie from '.';

export function SetUp(client: Cookie) {
    // varibles
    let owner = {
        discordID: '',
    };

    let config = {
        token: '',
        prefix: '',
        url: '',
        apiPort: '',
        dashPort: '',
    };

    const greet = async () => {
        figlet('Cookie', function (err, data) {
            console.log(data);
        });

        await new Promise(res => setTimeout(res, 2000));

        const { discordID } = await inquirer.prompt({
            type: 'input',
            name: 'discordID',
            message: 'What is your discord ID?',
        });

        owner.discordID = discordID;
    }
}

export default SetUp;