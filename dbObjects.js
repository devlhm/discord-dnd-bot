const Sequelize = require('sequelize');

const connection = new Sequelize('fichas', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	operatorAliases: false,
	storage: 'fichas.sqlite'
});

const Atributos = connection.import('models/Atributos');
const InfoBasicas = connection.import('models/InfoBasicas');
const JP = connection.import('models/JP');
const Ajustes = connection.import('models/Ajustes');

module.exports = { Atributos, InfoBasicas, JP, Ajustes };
