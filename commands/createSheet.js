const usersCreating = require('../usersCreating');

module.exports = {
	name: 'novo',
	desc: '- Cria uma nova ficha',
	execute (client, message, args) {
		if (args.length > 0) {
			message.channel.send(
				'Obs: você não precisa de argumentos ao usar este comando'
			);
		}

		const messageAuthor = message.author;
		client.userMention = `<@!${messageAuthor.id}>`;
		const catchInput = require('./createSheetMethods/catchInput');

		const SheetClass = require('../sheetClass');
		const ficha = new SheetClass();

		usersCreating[message.author.id] = true;
		ficha.otherStats.nome_jogador = message.author.username;
		console.log('ficha :', ficha);
		catchInput(ficha, client, message);

		const handler = message => {
			if (message.author !== messageAuthor) return;

			catchInput(ficha, client, message, handler);
		};

		client.on('message', handler);
	}
};
