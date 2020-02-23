module.exports = (ficha, message, client, updating) => {
	message.channel.send('**Calculando pontos de vida...**');
	const charClass = ficha.otherStats.classe;
	const classInfo = require('../../classInfo');
	const min = 1;
	const max = classInfo[charClass].dv;
	console.log('max :', max);
	const hpAdjust = ficha.adjusts.ajuste_constituicao;
	console.log('hpAdjust :', hpAdjust);
	const hpToAdd = (Math.floor(Math.random() * (max - min + 1)) + min) + hpAdjust;
	let hp = ficha.otherStats.vida;
	hp += hpToAdd > 0 ? hpToAdd : 1;

	ficha.otherStats.vida = hp;
	message.channel.send(`${client.charName} tem **${hp}** ${hp === 1 ? 'ponto' : 'pontos'} de vida`);
	const setJp = require('./setJp');
	if (!updating) {
		setJp(client, ficha, message);
	} else {
		setJp(client, ficha, message, updating);
	}
};
