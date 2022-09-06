var sim = {
	stepNumber : 2,
	textbox : null,
	activeTextbox : false,
	init : function () {
		//this.initSteps(this.stepNumber);
		this.textbox = word.document.down('1').down('txt');
		this.textbox.setTextRendering("auto");
	
		this.textbox.setFontSize(25);
		this.textbox.setFontWeight('bold');
		//this.textbox.lock();
		//handler.register('ctrl-alt-r','custom', "!isUnder(application.barre.down('1').down('titolo').down('x'))", function(){sim.addSymbol();});

		handler.register('ctrl-alt-c','custom',"!isUnder(word.barre.down('1').down('titolo').down('x'))", function(){sim.addSymbol();});
	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	activateTextbox : function () {
		this.textbox.activate();
		this.activationTextbox();
	},

	activationTextbox: function () {
		this.activeTextbox = true;
	},

	addSymbol : function () {
		if (this.textbox.isActive() || this.activeTextbox || document.activeElement == document.getElementById('txt_3906').childNodes[0]) {
			word.closeDropdown();
			this.textbox.setText(''+String.fromCharCode(169));
			this.textbox.deactivate();
			uscita('1');
		}
		else {
			api.addAction ('notActive');
			api.confirm();
		} 
	},

	addSymbolShortcut : function () {
		if (this.textbox.isActive() || document.activeElement == document.getElementById('txt_3906').childNodes[0]) {
			word.closeDropdown();
			this.textbox.setText(''+String.fromCharCode(169));
			this.textbox.deactivate();
			uscita('1');
		}
		else {
			api.addAction ('notActive');
			api.confirm();
		} 
	}


}














