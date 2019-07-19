const { InfoBasicas, Ajustes } = require('../../dbObjects');

module.exports = async (client, message, char, amountToAdd) => {
	const foundChar = await InfoBasicas.findOne({
		where: { nome_personagem: char }
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
		where: { nome_personagem: char }
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
		{ where: { nome_personagem: char } }
	);

	client.charName = `**_${foundChar.nome_personagem}_**`;
	if (newLvl > foundChar.nivel) {
		message.channel.send(`O nível de ${client.charName} subiu para ${newLvl}!`);
		const getFromDb = require('../getSheetMethods/getFromDb');
		getFromDb(client, message, char, true);
	} else {
		message.channel.send(`O XP de ${client.charName} agora é de **${newXp}**`);
	}
};
