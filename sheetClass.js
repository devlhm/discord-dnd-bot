module.exports = class {
	constructor () {
		this.fieldIndex = -1;

		this.basicStats = {
			nome_personagem: {
				desc: 'insira o nome do seu personagem',
				value: undefined
			},
			aparencia: {
				desc:
                    'escreva uma descrição da aparência do seu personagem ' +
                    '\n(envie "null" se quer que seja deixada em branco)',
				value: undefined
			},
			alinhamento: {
				desc:
                    'escolha o alinhamento do seu personagem (Ordeiro, Neutro, Caótico)',
				value: undefined
			},
			historia: {
				desc:
					'resuma a história do seu personagem' +
					'\n(envie "null" se quer que seja deixado em branco)',
				value: undefined
			}
		};

		this.otherStats = {
			nome_jogador: undefined,
			classe: undefined,
			atributo_principal: undefined,
			imagem: undefined,
			ca: 0,
			vida: 0,
			xp: 0,
			nivel: 1
		};

		this.adjusts = {
			ajuste_xp: {},
			ajuste_forca: {},
			ajuste_inteligencia: {},
			ajuste_sabedoria: {},
			ajuste_destreza: {},
			ajuste_constituicao: {},
			ajuste_carisma: {}
		};

		this.attributes = {
			forca: undefined,
			inteligencia: undefined,
			carisma: undefined,
			sabedoria: undefined,
			constituicao: undefined,
			destreza: undefined
		};

		this.jp = {
			veneno_raio: undefined,
			varinha: undefined,
			imobilizacao: undefined,
			sopro_de_dragao: undefined,
			feiticos_magias: undefined
		};
	}
};
