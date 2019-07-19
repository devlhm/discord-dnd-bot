module.exports = {
	name: 'adicionar-ca',
	desc: '<personagem> <quantia-xp> - Adiciona CA ao personagem selecionado',
	execute (client, message, args) {
		if (!message.member.roles.some(role => role.name === 'Bot Admin')) {
			message.channel.send('Você precisa do cargo "Bot Admin" para poder fazer isso!');
			return;
		}

		if (args.length === 0 || args.length === 1) {
			message.channel.send('Escolha um personagem para adicionar CA e a quantia desejada!');
			return;
		}

		if (args.length > 2) {
			message.channel.send('Escolha um personagem e uma quantia por vez!');
			return;
		}

		const argToNum = Number(args[1]);
		console.log('argToNum :', argToNum);
		if (!Number.isInteger(argToNum)) {
			message.channel.send('A quantia precisa ser um número inteiro!');
			return;
		}

		const updateCaAtDb = require('./addCaMethods/updateCaAtDb');
		updateCaAtDb(message, args[0], argToNum);
	}
};
