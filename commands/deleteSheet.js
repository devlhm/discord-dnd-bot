module.exports = {
	name: 'deletar',
	desc: '<personagem> -  Deleta a ficha do personagem escolhido',
	execute (client, message, args) {
		if (args.length === 0) {
			message.channel.send('Escolha um personagem para ter a ficha deletada!');
			return;
		}

		if (args.length > 1) {
			message.channel.send('Escolha apenas um personagem por vez!');
			return;
		}

		const deleteFromDb = require('./deleteSheetMethods/deleteFromDb');
		deleteFromDb(message, args);
	}
};
