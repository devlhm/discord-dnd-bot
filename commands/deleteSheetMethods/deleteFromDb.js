const { InfoBasicas, Ajustes, Atributos, JP } = require('../../dbObjects');

module.exports = async (message, char) => {
	const foundChar = await InfoBasicas.findOne({
		where: { nome_personagem: char }
	});

	if (!foundChar) {
		message.channel.send('Personagem não encontrado!');
		return;
	}

	if (foundChar.nome_jogador !== message.author.username) {
		message.channel.send('Você não é o dono deste personagem!');
		return;
	}

	InfoBasicas.destroy({
		where: { nome_personagem: char }
	});

	Ajustes.destroy({
		where: { nome_personagem: char }
	});

	Atributos.destroy({
		where: { nome_personagem: char }
	});

	JP.destroy({
		where: { nome_personagem: char }
	});

	message.channel.send('Personagem deletado com sucesso!');
};
