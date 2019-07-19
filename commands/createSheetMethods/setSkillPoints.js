module.exports = (ficha, client, message) => {
	message.channel.send('**Sorteando atributos...**');

	function uppercaseFirstLetter (string) {
		if (typeof string === 'string') {
			let parsedString = string.replace(/^(for)(c)(a)$/, '$1ç$3');
			parsedString = parsedString.replace(/^(constitui)(ca)(o)$/, '$1çã$3');
			parsedString = parsedString.replace(/^(intelig)(e)(ncia)$/, '$1ê$3');
			const upperString = parsedString.charAt(0).toUpperCase() + parsedString.slice(1);
			return upperString;
		}

		return string;
	}

	const name = ficha.basicStats.nome_personagem.value;
	client.charName = `**_${uppercaseFirstLetter(name)}_**`;

	const attributeNames = Object.keys(ficha.attributes);
	attributeNames.forEach(attribute => {
		const min = 3;
		const max = 18;
		const value = Math.floor(Math.random() * (max - min + 1)) + min;
		ficha.attributes[attribute] = value;
		message.channel.send(`${client.charName} tem **${uppercaseFirstLetter(attribute)} ${value}**`);
	});
	message.channel.send('**Atributos sorteados!**');
	const characterClass = require('./characterClass');
	client.receivingClass = true;
	characterClass(ficha, client, message);
};
