module.exports = (connection, DataTypes) => {
	return connection.define('info_basicas', {
		id_ficha: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome_jogador: {
			type: DataTypes.STRING,
			allowNull: false
		},
		nome_personagem: {
			type: DataTypes.STRING,
			allowNull: false
		},
		imagem: DataTypes.STRING,
		aparencia: DataTypes.STRING,
		historia: DataTypes.STRING,
		alinhamento: {
			type: DataTypes.STRING,
			allowNull: false
		},
		classe: {
			type: DataTypes.STRING,
			allowNull: false
		},
		vida: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		ca: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		nivel: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		xp: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	});
};
