var sim = {
	stepNumber : 2,
	valueTipo: null,
	init : function () {
		this.valueTipo = '1';
		//this.initSteps(this.stepNumber);
	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	altreOpzioniSava : function () {
		try{
			/*var txtValue = word.menu.down('1').down('submenu').down('5').down('anteprima').down('3').down('nomeFile').getText(),
				txtLength = txtValue.length;

			if(txtValue.substr(txtLength-5, 5) === '.docx') {
				txtValue = txtValue.substr(0, txtLength-5);
			} else if(txtValue.substr(txtLength-4, 4) === '.doc') {
				txtValue = txtValue.substr(0, txtLength-4)
			} 
	
			txtValue = txtValue + '.docx';*/
			salva_apri();
		} catch (e) {
			Utils.printException(e, 'selectFormato')
		}
	},

	checkInsert: function () {
		try {
			return true;

			var valueIns = this.txtDoc.getText().toLowerCase().replace(/ /g, '').length; 

			return valueIns >= 8 && valueIns <= 12;
		} catch (e) {
			Utils.printException(e, 'checkInsert')
		}
	},


	setFinalEffect: function () {
		try {
			$('headerRibbon').chiudiMenu();
			//word.document.down('1').down('titolo').setText('Relazione ambientale.docx - Word');

			uscita('1');
		} catch (e) {
			Utils.printException(e, 'setFinalEffect')
		}
	}

}






















