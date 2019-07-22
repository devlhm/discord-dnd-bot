module.exports = (client, ficha, message, updating) => {
	const jpTable = require('../../../jpTable');
	const jpTypes = Object.keys(jpTable);
	const lvl = ficha.otherStats.nivel;
	message.channel.send('**Calculando JP...**');

	function parseType (input) {
		let parsedInput = input;

		if (input.includes('_')) {
			if (input === 'sopro_de_dragao') {
				const spacedInput = input.replace(/_/g, ' ');
				return spacedInput.replace(/(sopro de drag)(a)(o)/, '$1ã$3');
			}

			parsedInput = parsedInput.replace('_', '/');
		}

		parsedInput = parsedInput.replace(/(imobiliza)(ca)(o)/, '$1çã$3');
		parsedInput = parsedInput.replace(/(feiti)(c)(os)/, '$1ç$3');
		return parsedInput;
	}

	jpTypes.forEach(type => {
		Object.keys(jpTable[type]).forEach(elem => {
			const elemArr = elem.split('_');
			if (elemArr[0] === ficha.otherStats.classe) {
				if (elemArr.length === 2) {
					if (elemArr[1] === lvl) {
						ficha.jp[type] = jpTable[type][elem];
						message.channel.send(`${client.charName} tem **${jpTable[type][elem]}** de JP contra **${parseType(type)}**`);
					}
				} else if (elemArr.length === 3) {
					if (lvl >= elemArr[1] && lvl <= elemArr[2]) {
						ficha.jp[type] = jpTable[type][elem];
						message.channel.send(`${client.charName} tem **${jpTable[type][elem]}** de JP contra **${parseType(type)}**`);
					}
				}
			}
		});
	});

	message.channel.send('**JP calculado!**');
	const calculateCa = require('./calculateCa');
	if (!updating) {
		calculateCa(client, message, ficha);
	} else {
		const updateFieldsAtDb = require('../../addXpMethods/updateFieldsAtDb');
		updateFieldsAtDb(ficha);
	}
};
