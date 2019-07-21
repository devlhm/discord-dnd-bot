const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
	port: 5432,
	host: 'ec2-54-221-215-228.compute-1.amazonaws.com',
	operatorAliases: false
});

const Atributos = connection.import('models/Atributos');
const InfoBasicas = connection.import('models/InfoBasicas');
const JP = connection.import('models/JP');
const Ajustes = connection.import('models/Ajustes');

module.exports = { Atributos, InfoBasicas, JP, Ajustes };
