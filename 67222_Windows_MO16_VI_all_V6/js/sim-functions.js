var sim = {
	stepNumber : 2,
	step1 : false,
	txtStep1 : null,
    txtActivate : false,
	flagStep1 : false,
	init : function () {
		//this.initSteps(this.stepNumber);

		this.txtStep1 = word.document.down('1').down('textBox');

		this.txtIntTable = $('pathTendine').down('1').down('tabellaIns').down('1').down('intestazione');
	

		//this.txtStep1.lock();
		
	
		this.txtIntTable.setOpacity(0);
		this.txtIntTable.setTextRendering('auto');
		this.txtIntTable.setFontSize(13);
		this.txtIntTable.setFontWeight('bold');
		this.txtIntTable.setFontColor('rgb(106,106,106)');
		//this.txtIntTable.addAction('click',,MouseAction.RIGHTBUTTON);
/*
		handler.register(['backspace'], 'custom', "!isUnder(application.barre.down('1').down('titolo').down('x'));",  function () { 
			sim.eliminaObjTable('2');
		});

		handler.register(['canc'], 'custom', "!isUnder(application.barre.down('1').down('titolo').down('x'));",  function () { 
			api.addAction('erroreCanc');
			api.confirm();
		});*/

	/*	handler.register(['invio'], 'custom', "!isUnder(application.barre.down('1').down('titolo').down('x'));", function () { 
			sim.invio();
		});*/
	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	dragTable : function (bottone) {
		try{
			var coord = bottone.getName().split('_'),
				x = Number(coord[1]),
				y = Number(coord[0]),
				i, j, k, h;
			bottone.up().up().down('subLevel').goTo('0');
			bottone.up().up().down('1').setAllToFrame('normal');
	
			for (i = 1; i <= x; i += 1) {
				for (j = 1; j <= y; j += 1) {
					bottone.up().down(j + '_' + i).goTo('mouseover');
				}
				for (k = y + 1; k <= 8; k += 1) {
					bottone.up().down(k + '_' + i).goTo('normal');
				}
			}
	
			for (h = 1; h <= 8; h += 1) {
				for (k = x + 1; k <= 10; k += 1) {
					bottone.up().down(h + '_' + k).goTo('normal');
				}
			}
	
			this.txtIntTable.setText(x + 'x' + y + ' Table');

		} catch (e) {
			Utils.printException(e,'sim.resetDrag');
		}	
	},

	resetDrag : function(){
		try{
			this.txtIntTable.setText('Insert Table');
			$('pathTendine').down('1').down('tabellaIns').down('1').down('celle').setAllToFrame('normal');
		} catch (e) {
			Utils.printException(e,'sim.resetDrag');
		}	
	},

	endDragTable : function (bottone) {
		try{
			if(bottone.getName() == '4_4' && this.txtActivate){
				sim.setFinalEffect();
			}else{
				api.addAction('no');api.confirm();
			}
		} catch (e) {
			Utils.printException(e,'sim.resetDrag');
		}	

	},

	setFinalEffect : function (){
		word.closeDropdown();
		$('headerRibbon').viewTabOther(word.document.down('1').down('sfondo_1').down('tabella'));
		$('headerRibbon').apriOtherTab(word.ribbon.down('1').down('movie_other').down('tabella').down('contenitore').down('tableDesign'));
		uscita('1');
	}

}

























