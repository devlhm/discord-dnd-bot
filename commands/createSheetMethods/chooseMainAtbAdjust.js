const usersChoosingMainAttribute = require('../../usersChoosingMainAttribute');

module.exports = (client, message, mainAttributes, statement) => {
	return new Promise(resolve => {
		const messageAuthor = message.author;

		function parseAttribute (input) {
			const lowerInput = input.toLowerCase();
			let parsedInput = lowerInput.replace('ç', 'c');
			parsedInput = parsedInput.replace('ê', 'e');
			parsedInput = parsedInput.replace('ã', 'a');
			return parsedInput;
		}

		message.channel.send(
			`**${client.userMention}, escolha um atributo principal para aumentar: *${mainAttributes[0]}* ou *${mainAttributes[1]}***`
		);

		const handler = message => {
			if (messageAuthor === message.author) {
				if (message.content.toLowerCase() === 'cancelar') {
					message.channel.send('Operação cancelada');
					client.off('message', handler);
					usersChoosingMainAttribute[message.author.id] = false;
					resolve('cancelled');
				} else {
					const input = message.content;
					const parsedInput = parseAttribute(input);
					const parsedMainAttributes = mainAttributes.map(elem => {
						return parseAttribute(elem);
					});

					if (parsedInput !== parsedMainAttributes[0] && parsedInput !== parsedMainAttributes[1]) {
						message.channel.send(
							`<${client.userMention}, escolha **${mainAttributes[0]}** ou **${mainAttributes[1]}**` +
							`\n\n${statement}`
						);
					} else {
						client.off('message', handler);
						usersChoosingMainAttribute[message.author.id] = false;
						resolve(parsedInput);
					}
				}
			}
		};

		client.on('message', handler);
	});
};
