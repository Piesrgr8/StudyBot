const {GatewayIntentBits, Client, Collection} = require("discord.js");
const path = require('node:path');
const fs = require("fs");
const mysql = require('mysql');
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});

const con = mysql.createConnection({
    host: "localhost",
    user: "pies",
    password: "dsjs123"
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.on("ready", () => {
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Success!");
    });

    console.log("We are online!");
    client.user.setStatus("online");
    client.user.setActivity("$help", { type: "LISTENING" });
});

client.login(process.env.TOKEN);