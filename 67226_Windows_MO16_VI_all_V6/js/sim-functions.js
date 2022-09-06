var sim = {
	stepNumber : 2,

	init : function () {
		//this.initSteps(this.stepNumber);

		handler.register('f7','custom', "!isUnder(word.barre.down('1').down('titolo').down('icona'))", function(){sim.openSpellcheck();});
	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	openSpellcheck: function () {
		try {
			$('pathFinestre').down('1').down('spellcheck').goTo('1');
		} catch (e) {
			Utils.printException(e, 'openSpellcheck')
		}
	},

	closeSpellcheck: function () {
		try {
			$('pathFinestre').down('1').down('spellcheck').goTo('0');
		} catch (e) {
			Utils.printException(e, 'closeSpellcheck')
		}
	},

	addWord: function () {
		try {
			this.setFinalEffect();
		} catch (e) {
			Utils.printException(e, 'addWord')
		}
	},

	setFinalEffect: function () {
		try {
			sim.closeSpellcheck();
			$('dxErrore').close();
			uscita('1');
		} catch (e) {
			Utils.printException(e, 'setFinalEffect')
		}
	}

}























