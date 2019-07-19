module.exports = (connection, DataTypes) => {
	return connection.define('jp', {
		id_ficha: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome_personagem: {
			type: DataTypes.STRING,
			allowNull: false
		},
		veneno_raio: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		varinha: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		imobilizacao: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		sopro_de_dragao: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		feiticos_magias: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		timestamps: false
	});
};
