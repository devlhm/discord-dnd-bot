module.exports = {
	name: 'definir-imagem',
	desc: '<personagem> - Adiciona uma imagem à ficha do personagem selecionado',
	async execute (client, message, args) {
		if (args.length > 1) {
			message.channel.send('Escolha um personagem por vez!');
			return;
		}

		const charName = args[0];

		const basicInfo = await InfoBasicas.findOne({
			where: { nome_personagem: charName }
		});
	
		if (!basicInfo) {
			message.channel.send('Personagem não encontrado!');
			return;
		}
	
		const messageAuthor = message.author;
	
		const handler = message => {
			if (messageAuthor !== message.author) return;
			if (message.content.toLowerCase() === 'cancelar') {
				message.channel.send('Operação cancelada');
				client.off('message', handler);
				return;
			}
	
			const attachments = message.attachments;
			if (attachments.length === 0) {
				message.channel.send('Envie a imagem!');
				return;
			}
	
			if (attachments.length > 1) {
				message.channel.send('Envie apenas uma imagem!');
			}
	
			const attachment = attachments[0];
			if (attachment.url.indexOf('png', attachment.url.length - 'png'.length) !== -1) {
				InfoBasicas.update(
					{ imagem: attachment.url },
					{ where: { nome_personagem: charName } }
				);
			}
	
			client.off('message', handler);
		};
	
		client.on('message', handler);
	}
};
