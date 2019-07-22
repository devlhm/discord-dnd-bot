module.exports = {
	name: 'ver-todos',
	desc: 'Mostra o nome e o dono de todos os personagens',
	execute (client, message, args) {
		if (args.length > 0) {
			message.channel.send('Obs: esse comando não precisa de argumentos');
		}

		const getAllFromDb = require('./getAllMethods/getAllFromDb');
		getAllFromDb(message);
	}
};
