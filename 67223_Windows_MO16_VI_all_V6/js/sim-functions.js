var sim = {
	stepNumber : 2,
	textForImageActivate : false,
	txtTarget : null,
	init : function () {
		//this.initSteps(this.stepNumber);
		
		this.txtTarget = word.document.down('1').down('textForImage');
		//this.txtTarget.lock();

	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	attivaTextBoxForImg: function () {
		try {
			this.textForImageActivate = true;
			this.txtTarget.activate();
		} catch (e) {
			Utils.printException(e, 'attivaTextBoxForImg')
		}
	},

	inserisciImmagine: function () {
		try {
			salva_apri();
		} catch (e) {
			Utils.printException(e, 'inserisciImmagine')
		}
	}




}






















