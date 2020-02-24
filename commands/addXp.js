const { InfoBasicas, Ajustes } = require('../dbObjects');

module.exports = {
	name: 'adicionar-xp',
	desc: '<personagem> <quantia-xp> - Adiciona XP ao personagem selecionado',
	async execute (client, message, args) {
		if (!message.member.roles.some(role => role.name === 'Bot Admin')) {
			message.channel.send('Você precisa do cargo "Bot Admin" para poder fazer isso!');
			return;
		}

		if (args.length === 0 || args.length === 1) {
			message.channel.send('Escolha um personagem para adicionar XP e a quantia desejada!');
			return;
		}

		if (args.length > 2) {
			message.channel.send('Escolha um personagem e uma quantia por vez!');
			return;
		}

		const charName = args[0];
		const amountToAdd = Number(args[1]);
		console.log('argToNum :', amountToAdd);
		if (!Number.isInteger(amountToAdd)) {
			message.channel.send('A quantia precisa ser um número inteiro!');
			return;
		}

		const foundChar = await InfoBasicas.findOne({
			where: { nome_personagem: charName }
		});
	
		if (!foundChar) {
			message.channel.send('Personagem não encontrado!');
			return;
		}
	
		if (foundChar.nivel === 5) {
			message.channel.send('Personagem já no nível máximo!');
			return;
		}
	
		const adjusts = await Ajustes.findOne({
			where: { nome_personagem: charName }
		});
	
		const adjustedAmountToAdd = amountToAdd + Math.ceil((amountToAdd * adjusts.ajuste_xp) / 100);
		let newXp = foundChar.xp + adjustedAmountToAdd;
		let newLvl = foundChar.nivel;
	
		const classInfo = require('../../classInfo');
	
		if (newXp >= (classInfo[foundChar.classe].xpToUp * Math.pow(2, foundChar.nivel - 1))) {
			newXp = 0;
			newLvl++;
		}
	
		await InfoBasicas.update(
			{ xp: newXp, nivel: newLvl },
			{ where: { nome_personagem: charName } }
		);
	
		client.charName = `**_${foundChar.nome_personagem}_**`;
		if (newLvl > foundChar.nivel) {
			message.channel.send(`O nível de ${client.charName} subiu para ${newLvl}!`);
			const getFromDb = require('../getSheetMethods/getFromDb');
			getFromDb(client, message, charName, true);
		} else {
			message.channel.send(`O XP de ${client.charName} agora é de **${newXp}**`);
		}
	}
};
