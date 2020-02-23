const { Ajustes, Atributos, JP, InfoBasicas } = require('../../dbObjects');

module.exports = (ficha) => {
	console.log('saving');
	console.log('ficha :', ficha);

	InfoBasicas.create({
		nome_jogador: ficha.otherStats.nome_jogador,
		nome_personagem: ficha.basicStats.nome_personagem.value,
		aparencia: ficha.basicStats.aparencia.value,
		historia: ficha.basicStats.historia.value,
		alinhamento: ficha.basicStats.alinhamento.value,
		classe: ficha.otherStats.classe,
		vida: ficha.otherStats.vida,
		ca: ficha.otherStats.ca,
		nivel: ficha.otherStats.nivel,
		xp: ficha.otherStats.xp
	});

	Atributos.create({
		nome_personagem: ficha.basicStats.nome_personagem.value,
		forca: ficha.attributes.forca,
		inteligencia: ficha.attributes.inteligencia,
		destreza: ficha.attributes.destreza,
		carisma: ficha.attributes.carisma,
		constituicao: ficha.attributes.constituicao,
		sabedoria: ficha.attributes.sabedoria
	});

	JP.create({
		nome_personagem: ficha.basicStats.nome_personagem.value,
		veneno_raio: ficha.jp.veneno_raio,
		varinha: ficha.jp.varinha,
		imobilizacao: ficha.jp.imobilizacao,
		sopro_de_dragao: ficha.jp.sopro_de_dragao,
		feiticos_magias: ficha.jp.feiticos_magias
	});

	Ajustes.create({
		nome_personagem: ficha.basicStats.nome_personagem.value,
		ajuste_xp: ficha.adjusts.ajuste_xp,
		ajuste_forca: ficha.adjusts.ajuste_forca,
		ajuste_inteligencia: ficha.adjusts.ajuste_inteligencia,
		ajuste_destreza: ficha.adjusts.ajuste_destreza,
		ajuste_carisma: ficha.adjusts.ajuste_carisma,
		ajuste_constituicao: ficha.adjusts.ajuste_constituicao,
		ajuste_sabedoria: ficha.adjusts.ajuste_sabedoria
	});
};
