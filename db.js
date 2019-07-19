const Sequelize = require('sequelize');

const connection = new Sequelize('fichas', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	operatorAliases: false,
	storage: 'fichas.sqlite'
});

connection.import('models/InfoBasicas');
connection.import('models/Atributos');
connection.import('models/JP');
connection.import('models/Ajustes');

const force = process.argv.includes('-f');

connection.sync({ force });
