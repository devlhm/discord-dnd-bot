const usersCreating = require('../../usersCreating');

module.exports = (ficha, client, message) => {
	function parseAttribute (input) {
		const lowerInput = input.toLowerCase();
		let parsedInput = lowerInput.replace('ç', 'c');
		parsedInput = parsedInput.replace('ê', 'e');
		parsedInput = parsedInput.replace('ã', 'a');
		return parsedInput;
	}

	function parseMainAttribute (input) {
		const separator = ' ou ';
		if (input.includes(separator)) {
			const inputArr = input.split(separator);
			const parsedInputArr = inputArr.map(elem => {
				return parseAttribute(elem);
			});

			return parsedInputArr;
		}

		return parseAttribute(input);
	}

	function parseClass (input) {
		const lowerInput = input.toLowerCase();
		let parsedInput = lowerInput.replace('ã', 'a');
		parsedInput = parsedInput.replace('é', 'e');
		return parsedInput;
	}

	function validateClass (input) {
		const alternatives = ['guerreiro', 'clerigo', 'mago', 'ladrao', 'anao', 'elfo', 'halfling'];

		const tests = {
			restricted: false,
			inexistent: false
		};

		if (alternatives.indexOf(input) === -1) {
			tests.inexistent = true;
			return tests;
		}

		switch (input) {
		case 'anao':
			tests.restricted = ficha.attributes.constituicao < 9;
			break;

		case 'elfo':
			tests.restricted = ficha.attributes.inteligencia < 9;
			break;

		case 'halfling':
			tests.restricted = ficha.attributes.constituicao < 9 && ficha.attributes.destreza < 9;
			break;
		}

		return tests;
	}

	const messageAuthor = message.author;
	message.channel.send(
		`**<@!${messageAuthor.id}>, escolha uma dessas classes para o seu personagem: \n` +
		'_Guerreiro_ - Atributo Principal: Força\n' +
		'_Clérigo_ - Atributo Principal: Sabedoria\n' +
		'_Mago_ - Atributo Principal: Inteligência\n' +
		'_Ladrão_ - Atributo Principal: Destreza\n' +
		'_Anão (É necessário ter constituição igual ou maior à 9)_ - Atributo Principal: Força\n' +
		'_Elfo (É necessário ter inteligência igual ou maior à 9)_ - Atributo Principal: Força e Inteligência\n' +
		'_Halfling (É necessário ter constituição e destreza igual ou maior à 9)_ - Atributo Principal: Força e Destreza**'
	);

	console.log('called');
	const handler = message => {
		if (messageAuthor !== message.author) return;

		if (message.content.toLowerCase() === 'cancelar') {
			message.channel.send('Operação cancelada');
			usersCreating[message.author.id] = false;
			client.off('message', handler);
			return;
		}

		const input = message.content;
		const parsedInput = parseClass(input);
		const tests = validateClass(parsedInput);

		if (Object.values(tests).includes(true)) {
			if (tests.inexistent) {
				message.channel.send('Oops, opção inválida. Tente novamente');
			} else if (tests.restricted) {
				message.channel.send(`${client.userMention}, seu personagem não tem possui os requerimentos para escolher esta classe`);
			}

			return;
		}

		let mainAttribute;

		switch (parsedInput) {
		case 'guerreiro':
		case 'anao':
			mainAttribute = 'força';
			break;

		case 'clerigo':
			mainAttribute = 'sabedoria';
			break;

		case 'mago':
			mainAttribute = 'inteligência';
			break;

		case 'ladrao':
			mainAttribute = 'destreza';
			break;

		case 'halfling':
			mainAttribute = 'força ou destreza';
			break;

		case 'elfo':
			mainAttribute = 'força ou inteligência';
			break;
		}

		ficha.otherStats.atributoPrincipal = parseMainAttribute(mainAttribute);
		ficha.otherStats.classe = parsedInput;
		client.off('message', handler);

		const adjustMainAttribute = require('./adjustMainAttribute');
		adjustMainAttribute(ficha, client, message, mainAttribute);
	};

	client.on('message', handler);
};
