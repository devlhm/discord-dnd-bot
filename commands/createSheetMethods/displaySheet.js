const Discord = require('discord.js');
const usersCreating = require('../../usersCreating');
const classInfo = require('../../classInfo');

module.exports = (ficha, message, creating) => {
	function parseField (input, toUpper) {
		let parsedInput = input;

		parsedInput = parsedInput.replace(/^(ca)(o)(tico)$/, '$1ó$3');
		parsedInput = parsedInput.replace(/^(cl)(e)(rigo)$/, '$1é$3');
		parsedInput = parsedInput.replace(/^(an)(a)(o)$/, '$1ã$3');
		parsedInput = parsedInput.replace(/^(ladr)(a)(o)$/, '$1ã$3');

		return toUpper ? uppercaseFirstLetter(parsedInput) : parsedInput;
	}

	function uppercaseFirstLetter (string) {
		const upperString = string.charAt(0).toUpperCase() + string.slice(1);
		return upperString;
	}

	console.log('sending sheet');

	const embedSheet = new Discord.RichEmbed()
		.setColor('#2b2b2b')
		.setTitle(`**Ficha de ${ficha.basicStats.nome_personagem.value}**`)
		.addField('Nome do Jogador', ficha.otherStats.nome_jogador);

	if (ficha.otherStats.imagem) {
		embedSheet
			.setImage(ficha.otherStats.imagem);
	}

	if (ficha.basicStats.aparencia.value !== 'null') {
		embedSheet
			.addField('Aparência', ficha.basicStats.aparencia.value);
	}

	if (ficha.basicStats.historia.value !== 'null') {
		embedSheet
			.addField('História', ficha.basicStats.historia.value);
	}

	embedSheet
		.addField('Alinhamento', parseField(ficha.basicStats.alinhamento.value, true))
		.addField('Classe', parseField(ficha.otherStats.classe, true))
		.addField('Vida', ficha.otherStats.vida)
		.addField('Nível', ficha.otherStats.nivel)
		.addField('XP', `${ficha.otherStats.xp} | ${ficha.otherStats.nivel === 5 ? 'Nível Máximo' : classInfo[ficha.otherStats.classe].xpToUp * Math.pow(2, ficha.otherStats.nivel - 1)}`)
		.addField('CA', ficha.otherStats.ca)
		.addField('Atributos',
			`Força: ${ficha.attributes.forca}\n` +
			`Inteligência: ${ficha.attributes.inteligencia}\n` +
			`Sabedoria: ${ficha.attributes.sabedoria}\n` +
			`Destreza: ${ficha.attributes.destreza}\n` +
			`Constituição: ${ficha.attributes.constituicao}\n` +
			`Carisma: ${ficha.attributes.carisma}`
		)
		.addField('JP',
			`Veneno/Raio: ${ficha.jp.veneno_raio}\n` +
			`Varinha: ${ficha.jp.varinha}\n` +
			`Imobilização: ${ficha.jp.imobilizacao}\n` +
			`Sopro de Dragão: ${ficha.jp.sopro_de_dragao}\n` +
			`Feitiços/Magias: ${ficha.jp.feiticos_magias}`
		)
		.addField('Ajustes',
			`Ajuste ao ganhar XP: ${ficha.adjusts.ajuste_xp > 0 ? '+' + ficha.adjusts.ajuste_xp : ficha.adjusts.ajuste_xp}% \n` +
			`Ajuste ao atingir, ferir, e, abrir portas: ${ficha.adjusts.ajuste_forca}\n` +
			`Ajuste ao conversar: ${ficha.adjusts.ajuste_carisma}\n` +
			`Ajuste em jogadas de proteção baseadas em magia: ${ficha.adjusts.ajuste_sabedoria}\n` +
			`Ajuste nos pontos de vida por dado de vida: ${ficha.adjusts.ajuste_constituicao}\n` +
			`Ajuste nas jogadas de ataque à distância e na CA: ${ficha.adjusts.ajuste_destreza}\n`
		);

	message.channel.send(embedSheet);

	if (creating) {
		usersCreating[message.author.id] = false;
		const saveToDb = require('./saveToDb');
		saveToDb(ficha);
	}
};
