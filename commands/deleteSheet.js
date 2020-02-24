const { InfoBasicas, Ajustes, Atributos, JP } = require('../dbObjects');

module.exports = {
	name: 'deletar',
	desc: '<personagem> -  Deleta a ficha do personagem escolhido',
	async execute (client, message, args) {
		if (args.length === 0) {
			message.channel.send('Escolha um personagem para ter a ficha deletada!');
			return;
		}

		if (args.length > 1) {
			message.channel.send('Escolha apenas um personagem por vez!');
			return;
		}

		const charName = args[0]; //check later

		const foundChar = await InfoBasicas.findOne({
			where: { nome_personagem: charName }
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
			where: { nome_personagem: charName }
		});
	
		Ajustes.destroy({
			where: { nome_personagem: charName }
		});
	
		Atributos.destroy({
			where: { nome_personagem: charName }
		});
	
		JP.destroy({
			where: { nome_personagem: charName }
		});
	
		message.channel.send('Personagem "' + charName + '" deletado com sucesso!');
	}
};
