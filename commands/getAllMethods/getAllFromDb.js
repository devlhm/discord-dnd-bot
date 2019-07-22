const { InfoBasicas } = require('../../dbObjects');

module.exports = async message => {
	const basicInfo = await InfoBasicas.findAll({
		attributes: ['nome_personagem, nome_jogador']
	});

    let messageToSend = '';
    basicInfo.forEach(elem => {
        messageToSend += `**${elem.nome_personagem}** - **${elem.nome_jogador}**\n`;
    });

    message.channel.send(messageToSend);
};
