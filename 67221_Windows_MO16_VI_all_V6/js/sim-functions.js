var sim = {
	stepNumber : 2,

	init : function () {
		//this.initSteps(this.stepNumber);

		handler.register('ctrl-b','custom',"!isUnder(word.barre.down('1').down('titolo').down('icona')) ",function () {sim.applyBold();});
		handler.register(['ctrl-d','ctrl-shift-f','ctrl-shift-p'],'custom',"!isUnder(word.barre.down('1').down('titolo').down('icona')) ",function () {sim.apriCarattere();});
	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	apriCarattere: function () {
		try {
              word.closeDropdown();
			$('font').open();
		} catch (e) {
			Utils.printException(e, 'apriCarattere')
		}
	},


	applyBold : function () {
		this.setFinalEffect();
	},
	
	setFinalEffect : function () {
		uscita('1');
	}
}






















