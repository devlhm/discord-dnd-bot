const { InfoBasicas } = require('../../dbObjects');

module.exports = async (client, message, char) => {
	const basicInfo = await InfoBasicas.findOne({
		where: { nome_personagem: char }
	});

	if (!basicInfo) {
		message.channel.send('Personagem não encontrado!');
		return;
	}

	const messageAuthor = message.author;

	const handler = message => {
		if (messageAuthor !== message.author) return;

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
				{ where: { nome_personagem: char } }
			);
		}
	};

	client.on('message', handler);
};
