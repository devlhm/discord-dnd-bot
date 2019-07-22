const { InfoBasicas, Ajustes, Atributos, JP } = require('../../dbObjects');

module.exports = async (client, message, char, updating, settingLevel) => {
	const basicInfo = await InfoBasicas.findOne({
		where: { nome_personagem: char }
	});

	if (!basicInfo) {
		message.channel.send('Personagem não encontrado!');
	}

	const adjusts = await Ajustes.findOne({
		where: { nome_personagem: char }
	});

	const attributes = await Atributos.findOne({
		where: { nome_personagem: char }
	});

	const jp = await JP.findOne({
		where: { nome_personagem: char }
	});

	const SheetClass = require('../../sheetClass');
	const ficha = new SheetClass();

	ficha.basicStats.nome_personagem.value = basicInfo.nome_personagem;
	ficha.basicStats.aparencia.value = basicInfo.aparencia;
	ficha.basicStats.alinhamento.value = basicInfo.alinhamento;
	ficha.basicStats.historia.value = basicInfo.historia;
	ficha.otherStats.nome_jogador = basicInfo.nome_jogador;
	ficha.otherStats.imagem = basicInfo.imagem;
	ficha.otherStats.classe = basicInfo.classe;
	ficha.otherStats.vida = basicInfo.vida;
	ficha.otherStats.nivel = basicInfo.nivel;
	ficha.otherStats.xp = basicInfo.xp;
	ficha.otherStats.ca = basicInfo.ca;

	const attributeNames = Object.keys(ficha.attributes);
	attributeNames.forEach(attribute => {
		ficha.attributes[attribute] = attributes[attribute];
	});

	const jpTypes = Object.keys(ficha.jp);
	jpTypes.forEach(type => {
		ficha.jp[type] = jp[type];
	});

	const adjustTypes = Object.keys(ficha.adjusts);
	adjustTypes.forEach(type => {
		ficha.adjusts[type] = adjusts[type];
	});

	console.log('ficha :', ficha);

	if (updating) {
		const calculateHealth = require('../deleteSheetMethods/createSheetMethods/calculateHealth');
		calculateHealth(ficha, message, client, updating);
	} else if (settingLevel) {
		const setJp = require('../deleteSheetMethods/createSheetMethods/setJp');
		setJp(client, ficha, message, true);
	} else {
		const displaySheet = require('../deleteSheetMethods/createSheetMethods/displaySheet');
		displaySheet(ficha, message);
	}
};
