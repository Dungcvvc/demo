var sim = {
	stepNumber : 2,

	init : function () {
		//this.initSteps(this.stepNumber);

		//word.document.down('1').down('txt').lock();
		word.document.down('1').down('txt').activate();


		handler.register('invio','custom', "!isUnder($('pathFinestre').down('1').down('mailFields').down('1').down('1').down('insert'))", function(){sim.insertObjMailing();});

	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},


	insertObj: function (btn) {
		try {
			var nameObj = btn.getName();

			if(nameObj === '3') {
				this.setFinalEffect();
			} else {
				api.addAction('objErrato');
				api.confirm();
			}

		} catch (e) {
			Utils.printException(e, 'insertObj')
		}
	},

	apriObjMailing: function () {
		try {
			$('pathFinestre').down('1').down('mailFields').goTo('1');
			this.clickObjMailing($('pathFinestre').down('1').down('mailFields').down('1').down('fields').down('1'));
		} catch (e) {
			Utils.printException(e, 'apriObjMailing')
		}
	},

	chiudiObjMailing: function () {
		try {
			$('pathFinestre').down('1').down('mailFields').goTo('0');
		} catch (e) {
			Utils.printException(e, 'chiudiObjMailing')
		}
	},

	clickObjMailing: function (btn) {
		try {
			btn.up().setAllToFrame('normal');
			btn.goTo('click');
		} catch (e) {
			Utils.printException(e, 'chiudiObjMailing')
		}
	},

	doppioclickObjMailing: function (btn) {
		try {
			this.clickObjMailing(btn);
			this.insertObjMailing();
		} catch (e) {
			Utils.printException(e, 'insertObjMailing')
		}
	},

	insertObjMailing: function () {
		try {
			var objSel = findState($('pathFinestre').down('1').down('mailFields').down('1').down('fields'),'click'); 

			if(objSel[0].getName() === '3') {
				this.setFinalEffect();
			} else {
				api.addAction('objErrato');
				api.confirm();
			}

		} catch (e) {
			Utils.printException(e, 'insertObjMailing')
		}
	},

	setFinalEffect: function () {
		try {
			word.closeDropdown();
			this.chiudiObjMailing();
			uscita('1');

		} catch (e) {
			Utils.printException(e, 'setFinalEffect')
		}
	}





}






















