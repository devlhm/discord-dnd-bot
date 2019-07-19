module.exports = (connection, DataTypes) => {
	return connection.define('atributos', {
		id_ficha: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome_personagem: {
			type: DataTypes.STRING,
			allowNull: false
		},
		forca: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		inteligencia: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		destreza: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		carisma: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		constituicao: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		sabedoria: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	});
};
