module.exports = (client, message, ficha) => {
	message.channel.send('**Calculando CA...**');
	const adjustCa = ficha.adjusts.ajuste_destreza;
	const newCa = 9 + adjustCa;

	ficha.otherStats.ca = newCa;
	message.channel.send(`${client.charName} tem **${newCa}** de CA`);
	message.channel.send(`**Criação de ficha de** ${client.charName} **concluída!**`);
	const displaySheet = require('./displaySheet');
	displaySheet(ficha, message, true);
};
