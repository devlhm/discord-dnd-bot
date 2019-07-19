const usersCreating = require('../../usersCreating');
const { InfoBasicas } = require('../../dbObjects');

module.exports = async (ficha, client, message, handler) => {
	function validateAlignment (input) {
		const lowerInput = input.toLowerCase();
		const alternatives = ['ordeiro', 'neutro', 'caotico', 'caótico'];
		if (alternatives.findIndex(elem => elem === lowerInput) === -1) {
			return false;
		}

		return true;
	}

	if (message.content.toLowerCase() === 'cancelar') {
		message.channel.send('Operação cancelada');
		ficha.fieldIndex = -1;
		client.off('message', handler);
		usersCreating[message.author.id] = false;
		return;
	}

	const fields = Object.keys(ficha.basicStats);
	if (ficha.fieldIndex === 0) {
		const char = await InfoBasicas.findOne({
			where: { nome_personagem: message.content }
		});

		if (char) {
			message.channel.send('Nome já escolhido! Escolha outro');
			return;
		}
	}

	if (ficha.fieldIndex === 2) {
		if (!validateAlignment(message.content)) {
			message.channel.send('Oops, opção inválida, tente novamente');
			return;
		}
	}

	if (ficha.fieldIndex > -1) {
		ficha.basicStats[fields[ficha.fieldIndex]].value = message.content;
		console.log('ficha.basicStats :', ficha.basicStats);
	}

	ficha.fieldIndex++;
	if (ficha.fieldIndex === fields.length) {
		ficha.fieldIndex = -1;
		client.off('message', handler);
		const setSkillPoints = require('./setSkillPoints');
		setSkillPoints(ficha, client, message);
		return;
	}
	const desc = ficha.basicStats[fields[ficha.fieldIndex]].desc;
	message.channel.send(`**<@!${message.author.id}>, ${desc}**`);
};
