var sim = {
	stepNumber : 2,

	init : function () {
		//this.initSteps(this.stepNumber);
		word.barre.down('1').down('zoom').setText('100%');
	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	downZoom: function () {
		try {
			if(word.barre.down('1').down('zoom').getText() == '100%'){
				word.barre.down('1').down('zoom').setText('90%');
				this.impostaSfondo('90');
			}else if(word.barre.down('1').down('zoom').getText() == '90%'){
				word.barre.down('1').down('zoom').setText('80%');
				this.impostaSfondo('80');
				this.setFinalEffect();
			}
		}  catch(e) {
			Utils.printException(e,'setFinalEffect');
		}
    },

	upZoom: function () {
		try {
			if(word.barre.down('1').down('zoom').getText() == '100%'){
				api.addAction("Errore");
				api.confirm();
			}else if(word.barre.down('1').down('zoom').getText() == '90%'){
				word.barre.down('1').down('zoom').setText('100%');
				this.impostaSfondo('100');
			}else if(word.barre.down('1').down('zoom').getText() == '80%'){
				word.barre.down('1').down('zoom').setText('90%');
				this.impostaSfondo('90');
			}
			
		}  catch(e) {
			Utils.printException(e,'setFinalEffect');
		}
    },

	impostaSfondo : function (state) {
		switch(state){
			case '100':
				word.document.down('1').down('sfondo_1').setPosition(0,0);
				word.barre.down('1').down('stato').down('sfondo').goTo('normal');
				this.firstStepZoom = false;
			//	word.document.down('1').down('sfondo_2').setPosition(0,0);
				break;
			case '90':
				word.document.down('1').down('sfondo_1').setPosition(-1000,-1000);
				word.document.down('1').down('sfondo_2').setPosition(0,0);
				word.barre.down('1').down('stato').down('sfondo').goTo('1');
				this.firstStepZoom = true;
				break;
			case '80':
				word.document.down('1').down('sfondo_1').setPosition(-1000,-1000);
				word.document.down('1').down('sfondo_2').setPosition(-1000,-1000);
				word.barre.down('1').down('stato').down('sfondo').goTo('2');
				break;
		}
		//word.document.down('1').down('sfondo_1').setPosition(-1000,-1000);
		//word.document.down('1').down('sfondo_2').setPosition(-1000,-1000);
	},


	setFinalEffect : function () {
		word.barre.down('1').down('zoom').setText('80%');
		this.impostaSfondo('80');
		uscita('1');
	}
}























