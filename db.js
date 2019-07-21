const Sequelize = require('sequelize');

const connection = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
	port: 5432,
	host: 'ec2-54-221-215-228.compute-1.amazonaws.com',
	operatorAliases: false
});

connection.import('models/InfoBasicas');
connection.import('models/Atributos');
connection.import('models/JP');
connection.import('models/Ajustes');

const force = process.argv.includes('-f');

connection.sync({ force });
