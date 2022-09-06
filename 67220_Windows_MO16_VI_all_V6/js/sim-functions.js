var sim = {
	stepNumber : 2,
	isCopy : false,
	stepInvio : true,
	init : function () {
		//this.initSteps(this.stepNumber);
		application.navigateIsEnable = false;

		this.txtTarget2 = word.document.down('1').down('doc').down('2').down('target2');
		this.txtTarget2.setSelectionColor('rgb(198, 198, 198)');
		this.txtTarget2.setTextRendering("auto");
		this.txtTarget2.setSelectedFontColor("rgb(0,0,0)");
		this.txtTarget2.setFontWeight('bold');
		//this.txtTarget2.lock();
		this.txtTarget2.setFontSize(16);
		this.txtTarget2.setTextRendering("auto");

		handler.register('ctrl-f6','custom',"!isUnder(word.barre.down('1').down('titolo').down('icona'))", function(){sim.switchDocument()} );
		//handler.register('ctrl-v','custom',"!isUnder(word.barre.down('1').down('titolo').down('icona'))", function(){sim.pasteWithoutClick()} );

		handler.register(['ctrl-ins','ctrl-c'],'custom', "!isUnder(word.barre.down('1').down('titolo').down('icona'))", function(){
			sim.copy();
		});

		handler.register(['shift-ins','ctrl-v'],'custom', "!isUnder(word.barre.down('1').down('titolo').down('icona'))", function(){
			sim.paste();
		});

		handler.register(['invio'],'custom', "sim.txtTarget1.isActive()", function(){
			sim.applicaInvio();
		});
		this.startSettings();
	},

	initSteps : function (num) {
		var i = 1;
		for (i; i <= num; i += 1) {
			api.addStepActionInBuffer(i,'INIT');
		}
	},

	startSettings: function () {
		try {
			word.open();
			word.ripristina('1');
			word.doc2_isVisible = true;
			//word.menu.goTo('2');
			root.down('1').down('scheletri').down('1').down('win').down('1').down('movie_barre').down('1').down('btnApplicazione').down('1').down('schermo').setPosition(-1000,-1000);
			//application.movieBtnBarraApp.down('1').down('schermo').setPosition(-1000,-1000);
		}  catch(e) {
			Utils.printException(e,'startSettings');
		}
    },


	switchDocument : function(){
		try{ 
			if(word.docActive === '1'){
			  application.openApp('2');
			}else{
			  application.openApp('1');
			}
		} catch (e) {		
			Utils.printException(e,'setFinalEffect');
		}
	},


	pasteWithoutClick : function(){
		try{ 
			if(word.docActive === '2'){
			sim.attivaCasellaTarget();
			sim.paste(true);
				}
				
		} catch (e) {		
			Utils.printException(e,'pasteCtrlV');
		}
	},

	setRibbonButton : function(typePaste){
		try{
			if(word.docActive === '1') {
				word.ribbon.down('1').down('movie_tabs').down('home').down('1Dis').setPosition(-1000,-1000);
			} else {
				word.ribbon.down('1').down('movie_tabs').down('home').down('1Dis').setPosition(0,0);
			}
		} catch (e) {		
			Utils.printException(e,'setRibbonButton');
		}
	},

	checkHasSelection : function(){
		try{
			return textbox1.hasSelection();
		} catch (e) {		
			Utils.printException(e,'checkHasSelection');
		}
	},

	copy : function(){
		try{
		//	if(checkSelectedText(textbox1.getSelectedText())){
			if(word.document.down('1').down('doc').down('1').isVisible()){
				api.addAction('copy');
				this.isCopy = true;
			} else {
				api.addAction('selezioneErrata');
				api.confirm();
			}
		} catch (e) {		
			Utils.printException(e,'cut');
		}
	},

	paste : function(typePaste){
		try{
			if(word.docActive === '2'){
				if(this.isCopy){
					this.setFinalEffect();
				}else{
					api.addAction('err');
					api.confirm();
				}
			}else{
				if(this.isCut){
					api.addAction('err');
					api.confirm();					
				}
			}
		} catch (e) {		
			Utils.printException(e,'paste');
		}
	},

	setFinalEffect : function(){
		try{
			word.closeDropdown();
			word.barre.down('1').down('parole').setText('162');
			//this.casella2.setText('Anno Scolastico 2015-2016');
			//this.casella2.setPosition(290, 480+78);
			uscita('1');
		} catch (e) {		
			Utils.printException(e,'setFinalEffect');
		}
	},


	attivaCasellaTarget : function(){
		try{
			//checkTheSelectedText();
			//textBox_deactivate();
			if(!this.stepInvio) {
				this.txtTarget1.activate();
			} else {
				this.txtTarget2.activate();
			}
		} catch (e) {		
			Utils.printException(e,'attivaCasellaTarget');
		}
	},

	disattivaCasellaTarget : function(){
		try{
			
		} catch (e) {		
			Utils.printException(e,'disattivaCasellaTarget');
		}
	}
}


























