const usersCreating = require('../../../usersCreating');
const usersChoosingMainAttribute = require('../../../usersChoosingMainAttribute');

module.exports = (ficha, client, message, mainAtbToSend) => {
	function parseAttributeToSend (string) {
		if (typeof string === 'string') {
			let parsedString = string.replace(/^(for)(c)(a)$/, '$1ç$3');
			parsedString = parsedString.replace(/^(constitui)(ca)(o)$/, '$1çã$3');
			parsedString = parsedString.replace(/^(intelig)(e)(ncia)$/, '$1ê$3');
			const upperString = parsedString.charAt(0).toUpperCase() + parsedString.slice(1);
			return upperString;
		}

		return string;
	}

	function parseAttribute (input) {
		const lowerInput = input.toLowerCase();
		let parsedInput = lowerInput.replace('ç', 'c');
		parsedInput = parsedInput.replace('ê', 'e');
		parsedInput = parsedInput.replace('ã', 'a');
		return parsedInput;
	}

	function validateAttribute (input) {
		let parsedInput;

		if (Array.isArray(input)) {
			parsedInput = input.map(attribute => {
				return parseAttribute(attribute);
			});
		} else {
			parsedInput = parseAttribute(input);
		}

		console.log('parsedInput :', parsedInput);

		const attributeNames = Object.keys(ficha.attributes);
		console.log('attributeNames :', attributeNames);

		const tests = {
			inexistent: false,
			smallerThanNine: false,
			moreThanTwo: false,
			equalsMainAttribute: false,
			isDestreza: false
		};

		const mainAttribute = ficha.otherStats.atributoPrincipal;

		if (Array.isArray(parsedInput)) {
			parsedInput.forEach((elem) => {
				if (attributeNames.indexOf(elem) === -1) {
					tests.inexistent = true;
					return tests;
				}

				if (Array.isArray(mainAttribute)) {
					mainAttribute.forEach(mainAttributeElem => {
						if (mainAttributeElem === elem) {
							tests.equalsMainAttribute = true;
						}
					});
					return tests;
				}

				if (mainAttribute === elem) {
					tests.equalsMainAttribute = true;
					return tests;
				}

				if (ficha.attributes[elem] - 1 < 9) {
					tests.smallerThanNine = true;
					return tests;
				}

				if (elem === 'destreza') {
					tests.isDestreza = true;
					return tests;
				}
			});

			if (parsedInput.length > 2) {
				tests.moreThanTwo = true;
				return tests;
			}
		} else {
			if (attributeNames.indexOf(parsedInput) === -1) {
				tests.inexistent = true;
				return tests;
			}

			if (Array.isArray(mainAttribute)) {
				mainAttribute.forEach(mainAttributeElem => {
					if (mainAttributeElem === parsedInput) {
						tests.equalsMainAttribute = true;
					}
				});

				return tests;
			}

			if (mainAttribute === parsedInput) {
				tests.equalsMainAttribute = true;
				return tests;
			}

			if (ficha.attributes[parsedInput] - 2 < 9) {
				tests.smallerThanNine = true;
				return tests;
			}

			if (parsedInput === 'destreza') {
				tests.isDestreza = true;
				return tests;
			}
		}
		console.log('tests :', tests);
		return tests;
	}

	const attributeAdjusts = require('./attributeAdjusts');

	console.log('ficha.otherStats.classe :', ficha.otherStats.classe);

	if (ficha.attributes[ficha.otherStats.atributoPrincipal] === 18) {
		message.channel.send('Atributo principal já no nível máximo');
		attributeAdjusts(client, ficha, message);
		return;
	}

	const statement = `**<@!${message.author.id}>, escolha dois atributos (separados por ", ") de onde será subtraído um ponto ` +
	`ou um atributo de onde será subtraído dois pontos ` +
	`para aumentar em um ponto o seu Atributo Principal (*${mainAtbToSend}*). ` +
	`Envie "fim" quando terminar**`;

	const messageToSend =
	statement +
	'\n\nObs: a *destreza* não pode ser diminuída ' +
	'e nenhum atributo pode ser deixado abaixo de 9 ' +
	'para aumentar o(s) seu(s) atributo(s) principal(is),' +
	' assim como seu atributo principal não pode ultrapassar o valor máximo (18)';

	message.channel.send(messageToSend);
	const messageAuthor = message.author;

	const handler = async message => {
		if (messageAuthor !== message.author || client.choosingMainAttribute) return;
		let input = message.content;

		if (message.content.toLowerCase() === 'cancelar') {
			message.channel.send('Operação cancelada');
			client.off('message', handler);
			usersCreating[message.author.id] = false;
			return;
		}

		if (input.toLowerCase() === 'fim') {
			client.off('message', handler);
			attributeAdjusts(client, ficha, message);
			return;
		}

		const separator = ', ';
		if (input.includes(separator)) {
			input = input.split(separator);
		}

		const tests = validateAttribute(input);
		if (Object.values(tests).includes(true)) {
			let messageToSend = `${client.userMention}, `;

			if (tests.inexistent) {
				message.channel.send('Oops, opção inválida. Tente novamente');
				return;
			} else if (tests.moreThanTwo) {
				messageToSend += 'escolha no máximo dois atributos!';
			} else if (tests.equalsMainAttribute) {
				messageToSend += 'você não pode diminuir o(s) seu(s) Atributo(s) Principal(is)!';
			} else if (tests.isDestreza) {
				messageToSend += 'você não pode diminuir a sua *destreza*!';
			} else if (tests.smallerThanNine) {
				messageToSend += 'um dos atributos escolhidos é pequeno demais!';
			}

			message.channel.send(messageToSend);
			return;
		}

		const mainAttribute = ficha.otherStats.atributoPrincipal;
		if (Array.isArray(mainAttribute)) {
			const chooseMainAtbAdjust = require('./chooseMainAtbAdjust');
			usersChoosingMainAttribute[message.author.id] = true;
			const chosenMainAttribute = await chooseMainAtbAdjust(client, message, mainAttribute, statement);
			if (chosenMainAttribute === 'cancelled') {
				client.off('message', handler);
				return;
			}
			if (ficha.attributes[chosenMainAttribute] === 18) {
				message.channel.send(`${client.userMention}, Atributo Principal escolhido já está no valor máximo`);
				return;
			}

			console.log('chosenMainAttribute :', chosenMainAttribute);
			ficha.attributes[chosenMainAttribute]++;
		} else {
			const parsedAttribute = parseAttribute(mainAttribute);
			console.log('parsedAttribute :', parsedAttribute);
			if (ficha.attributes[parsedAttribute] === 18) {
				message.channel.send(`${client.userMention}, o seu Atributo Principal já está no valor máximo`);
				return;
			}
			ficha.attributes[parsedAttribute]++;
		}

		if (Array.isArray(input)) {
			input.forEach(elem => {
				const parsedAttribute = parseAttribute(elem);
				ficha.attributes[parsedAttribute]--;
			});
		} else {
			const parsedAttribute = parseAttribute(input);
			ficha.attributes[parsedAttribute] -= 2;
		}

		const attributesEntries = Object.entries(ficha.attributes);
		const attributesArray = attributesEntries.map(elem => {
			elem[0] = `**${parseAttributeToSend(elem[0])}**`;
			return elem.join(': ');
		});

		message.channel.send(
			'**Atributos:** \n' +
			attributesArray.join(' \n') +
			'\n\n' + statement
		);
	};

	client.on('message', handler);
};
