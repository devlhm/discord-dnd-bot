const { InfoBasicas } = require('../../dbObjects');

module.exports = async (client, message, char, valueToDefine, field) => {
	const foundChar = await InfoBasicas.findOne({
		where: { nome_personagem: char }
	});

	if (!foundChar) {
		message.channel.send('Personagem não encontrado!');
		return;
	}

	InfoBasicas.update({
		[field]: valueToDefine
	}, {
		where: { nome_personagem: char }
	});

	client.charName = `**_${foundChar.nome_personagem}_**`;

	message.channel.send(`${client.charName} agora tem **${field} ${valueToDefine}**`);
	if (field === 'nivel') {
		const getFromDb = require('../getSheetMethods/getFromDb');
		getFromDb(client, message, char, false, true);
	}
};
