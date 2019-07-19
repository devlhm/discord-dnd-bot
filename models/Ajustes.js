module.exports = (connection, DataTypes) => {
	return connection.define('ajustes', {
		id_ficha: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome_personagem: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ajuste_xp: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ajuste_forca: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ajuste_inteligencia: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ajuste_sabedoria: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ajuste_constituicao: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ajuste_destreza: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ajuste_carisma: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	});
};
