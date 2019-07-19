const { prefix } = require('./botconfig.json');
const fs = require('fs');
const Discord = require('discord.js');
const token = process.env.DISCORD_TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const usersCreating = require('./usersCreating');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require('./commands/' + file);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	console.log('usersCreating :', usersCreating);
	if (command === 'novo' && usersCreating[message.author.id]) return;

	if (!client.commands.get(command)) {
		message.channel.send('Comando inválido! Digite "ajuda" para ver os comandos');
		return;
	}

	client.commands.get(command).execute(client, message, args);
});
