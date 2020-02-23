module.exports = (client, ficha, message) => {
	const mainAttribute = ficha.otherStats.atributoPrincipal;
	const mainAttributeValue = ficha.attributes[mainAttribute];
	message.channel.send('**Calculando ajustes de atributos...**');

	function displayMessage (attribute, adjustValue, adjustField) {
		let messageToSend = `${client.charName} tem um ajuste de **${adjustValue > 0 ? '+' + adjustValue : adjustValue}** `;
		switch (attribute) {
		case 'forca':
			messageToSend += 'ao atingir, ferir, e, abrir portas';
			break;

		case 'inteligencia':
			switch (adjustValue) {
			case -3:
			case -2:
				messageToSend = `${client.charName} é **analfabeto**`;
				break;
			case -1:
				messageToSend = `${client.charName} pode **escrever palavras simples em Língua Comum**`;
				break;
			case 0:
				messageToSend = `${client.charName} pode **ler e escrever em línguas nativas**`;
				break;
			case 1:
				messageToSend = `${client.charName} lê e escreve em **línguas nativas +1 língua adicional**`;
				break;
			case 2:
				messageToSend = `${client.charName} lê e escreve em **línguas nativas +2 línguas adicionais**`;
				break;
			case 3:
				messageToSend = `${client.charName} lê e escreve em **línguas nativas +3 línguas adicionais**`;
				break;
			}

			break;

		case 'carisma':
			messageToSend += 'nas reações das criaturas com quem conversa';
			break;

		case 'sabedoria':
			messageToSend += 'em jogadas de proteção baseadas em magia';
			break;

		case 'constituicao':
			messageToSend += 'nos pontos de vida por cada dado de vida';
			break;

		case 'destreza':
			messageToSend += 'nas jogadas de ataque à distância e na classe de armadura';
			break;
		}

		message.channel.send(messageToSend);
	}

	const mainAttributeIntervals = [[3, 5, -20], [6, 8, -10], [9, 12, 0], [13, 15, 5], [16, 18, 10]];
	mainAttributeIntervals.forEach(elem => {
		if (mainAttributeValue >= elem[0] && mainAttributeValue <= elem[1]) {
			const adjust = elem[2];
			ficha.adjusts.ajuste_xp = adjust;
			message.channel.send(`${client.charName} tem **${adjust > 0 ? '+' + adjust : adjust}%** de ajuste no XP ganho`);
		}
	});

	const attributeIntervals = [[3, -3], [4, 5, -2], [6, 8, -1], [9, 12, 0], [13, 15, 1], [16, 17, 2], [18, 3]];
	const attributeList = ficha.attributes;
	Object.keys(attributeList).forEach(attribute => {
		const adjustField = `ajuste_${attribute}`;
		const attributeValue = attributeList[attribute];

		attributeIntervals.forEach(interval => {
			if (interval.length === 2) {
				if (attributeValue === interval[0]) {
					ficha.adjusts[adjustField] = interval[1];
					displayMessage(attribute, interval[1], adjustField);
				}
			} else {
				if (attributeValue >= interval[0] && attributeValue <= interval[1]) {
					ficha.adjusts[adjustField] = interval[2];
					displayMessage(attribute, interval[2], adjustField);
				}
			}
		});
	});

	message.channel.send('**Ajustes calculados!**');
	const calculateHealth = require('./calculateHealth');
	calculateHealth(ficha, message, client);
};
