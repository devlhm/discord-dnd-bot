const { InfoBasicas } = require('../dbObjects');

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

		const amountToAdd = Number(args[1]);
		if (!Number.isInteger(amountToAdd)) {
			message.channel.send('A quantia precisa ser um número inteiro!');
			return;
		}

		const charName = args[0];		
		const foundChar = await InfoBasicas.findOne({
			where: { nome_personagem: charName }
		});

		if (!foundChar) {
			message.channel.send('Personagem não encontrado!');
			return;
		}

		const newCa = foundChar.ca + amountToAdd;
		await InfoBasicas.update(
			{ ca: newCa },
			{ where: { nome_personagem: charName } }
		);
		message.channel.send(`**_${foundChar.nome_personagem}_** agora tem **${newCa}** de CA`);
	}
};
