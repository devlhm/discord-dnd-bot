module.exports = {
	name: 'ver',
	desc: '<personagem> - Mostra a ficha do personagem escolhido',
	execute (client, message, args) {
		if (args.length === 0) {
			message.channel.send('Escolha um personagem para ver a ficha!');
			return;
		}

		if (args.length > 1) {
			message.channel.send('Você só pode escolher um personagem por vez!');
			return;
		}

		const getFromDb = require('./getSheetMethods/getFromDb');
		getFromDb(client, message, args);
	}
};
