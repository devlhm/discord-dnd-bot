const { InfoBasicas } = require('../../dbObjects');

module.exports = async (message, char, amountToAdd) => {
	const foundChar = await InfoBasicas.findOne({
		where: { nome_personagem: char }
	});

	if (!foundChar) {
		message.channel.send('Personagem não encontrado!');
		return;
	}

	const newCa = foundChar.ca + amountToAdd;
	message.channel.send(`**_${foundChar.nome_personagem}_** agora tem **${newCa}** de CA`);

	await InfoBasicas.update(
		{ ca: newCa },
		{ where: { nome_personagem: char } }
	);
};
