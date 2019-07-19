const { InfoBasicas, JP } = require('../../dbObjects');

module.exports = async (ficha) => {
	InfoBasicas.update(
		{ vida: ficha.otherStats.vida },
		{ where: { nome_personagem: ficha.basicStats.nome_personagem.value } }
	);

	JP.update(
		{
			veneno_raio: ficha.jp.veneno_raio,
			varinha: ficha.jp.varinha,
			imobilizacao: ficha.jp.imobilizacao,
			sopro_de_dragao: ficha.jp.sopro_de_dragao,
			feiticos_magias: ficha.jp.feiticos_magias
		},
		{ where: { nome_personagem: ficha.basicStats.nome_personagem.value } }
	);
};
