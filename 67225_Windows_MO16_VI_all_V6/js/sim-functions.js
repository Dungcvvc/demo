var sim = {
	stepNumber : 2,
	txtActivated : false,
	init : function () {
		//this.initSteps(this.stepNumber);

		//word.document.down('1').down('txt').lock();
		handler.register(['ctrl-invio'],'custom', "!isUnder(word.barre.down('1').down('titolo').down('x'))", function(){
			sim.interruzionePagina();
		});

	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	attivaCasella: function () {
		try {
			word.document.down('1').down('txt').activate();
			this.txtActivated = true;
		} catch (e) {
			Utils.printException(e, 'attivaCasella')
		}
	},

	interruzionePagina: function () {
		try {
			if(this.txtActivated) {
				this.setFinalEffect();
			} else {
				api.addAction('casellaDisattiva');
				api.confirm();
			}

		} catch (e) {
			Utils.printException(e, 'interruzionePagina')
		}
	},

	setFinalEffect: function () {
		try {
			$('dxVuoto').close();
			word.closeDropdown();
			uscita('1');
		} catch (e) {
			Utils.printException(e, 'setFinalEffect')
		}
	}


}
























