const { InfoBasicas } = require('../dbObjects');

module.exports = {
	name: 'ver-todos',
	desc: 'Mostra o nome e o dono de todos os personagens',
	async execute (client, message, args) {
		if (args.length > 0) {
			message.channel.send('Obs: esse comando não precisa de argumentos');
		}

		const basicInfo = await InfoBasicas.findAll({
			attributes: ['nome_personagem, nome_jogador']
		});
	
		let messageToSend = '';
		basicInfo.forEach(elem => {
			messageToSend += `**${elem.nome_personagem}** - **${elem.nome_jogador}**\n`;
		});
	
		message.channel.send(messageToSend);
	}
};
