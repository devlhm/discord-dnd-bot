module.exports = {
	name: 'definir-imagem',
	desc: '<personagem> - Adiciona uma imagem à ficha do personagem selecionado',
	execute (client, message, args) {
		if (args.length > 1) {
			message.channel.send('Escolha um personagem por vez!');
			return;
		}

		const setImage = require('./setImageMethods/catchAttachment');
		setImage(client, message, args[0]);
	}
};
