var word = {
	path : null,
	document : null,
	menu: null,
	barre : null,
	ribbon : null,
	menu_isOpen : false,
	menu_isEnable : true,
	pagine : '3',
	parole : '215',
	nameDocument : 'Document1',
	share : '1',
	subMenuApri : '1',
	subMenuSalva : '1',
	subMenuCondividi : '1',
	subMenuEsporta : '1',
	tipoFileSalva : '1',
	nameFile :  'Relazione ambientale',
	nameFile1 :  'ProductBenefit',
	nameFile2 : 'Agenda',
	init : function(path) {
		try {
			var	test;
			this.path = path;
			this.document = this.path.down('1').down('documento');
			this.barre = this.path.down('1').down('movie_barre');
			this.initCaselle();
			this.initRibbon(this);
			this.initMenu();
			this.txtTitolo = this.document.down('1').down('titolo');
			this.document.down('1').down('titolo').setOpacity(0);
			this.document.down('1').down('titolo').setFontSize(13);
			this.document.down('1').down('titolo').setTextRendering('auto');
			this.document.down('1').down('titolo').setFontColor('rgb(255,255,255)');
			this.document.down('1').down('titolo').setText(this.nameDocument + '.docx - Word');
		} catch (e) {		
			Utils.printException(e,'init Word2010');
		}
	},

/*
	 * Init della ribbon
	 */
    initRibbon: function (instance) {
		try {
			this.ribbon = instance.path.down('1').down('ribbon');
	
			var tmpRibbon = this.ribbon.down('1').down('movie_tabs');
	
			tmpRibbon.down('home').down('font').setOpacity(0);
			tmpRibbon.down('home').down('size').setOpacity(0);
			tmpRibbon.down('pageLayout').down('pageLayout_sx').setOpacity(0);
			tmpRibbon.down('pageLayout').down('pageLayout_dx').setOpacity(0);
			tmpRibbon.down('pageLayout').down('pageLayout_after').setOpacity(0);
			tmpRibbon.down('pageLayout').down('pageLayout_before').setOpacity(0);

	
	/*
			handler.register('alt-h','custom', "!isUnder($('headerRibbon').path.down('toolbars').down('home'))", function(){$('currentFocus', 'home'); $('headerRibbon').apriTab($('headerRibbon').path.down('toolbars').down('home'));});
			handler.register('alt-n','custom', "!isUnder($('headerRibbon').path.down('toolbars').down('insert'))", function(){$('currentFocus', 'insert'); $('headerRibbon').apriTab($('headerRibbon').path.down('toolbars').down('insert'));});
			handler.register('alt-p','custom', "!isUnder($('headerRibbon').path.down('toolbars').down('pageLayout'))", function(){$('currentFocus', 'pageLayout'); $('headerRibbon').apriTab($('headerRibbon').path.down('toolbars').down('pageLayout'));});
			handler.register('alt-s','custom', "!isUnder($('headerRibbon').path.down('toolbars').down('reference'))", function(){$('currentFocus', 'reference'); $('headerRibbon').apriTab($('headerRibbon').path.down('toolbars').down('reference'));});
			handler.register('alt-m','custom', "!isUnder($('headerRibbon').path.down('toolbars').down('mails'))", function(){$('currentFocus', 'mails'); $('headerRibbon').apriTab($('headerRibbon').path.down('toolbars').down('mails'));});
			handler.register('alt-r','custom', "!isUnder($('headerRibbon').path.down('toolbars').down('review'))", function(){$('currentFocus', 'review'); $('headerRibbon').apriTab($('headerRibbon').path.down('toolbars').down('review'));});
			handler.register('alt-w','custom', "!isUnder($('headerRibbon').path.down('toolbars').down('view'))", function(){$('currentFocus', 'view'); $('headerRibbon').apriTab($('headerRibbon').path.down('toolbars').down('view'));});
	
			handler.register('alt-j>p','custom', "!isUnder(application.ribbon.down('1').down('movie_other').down('immagine').down('contenitore').down('imageSet'))", function() {$('currentFocus', 'immagineFormat'); $('headerRibbon').apriOtherTab($('headerRibbon').path.down('movie_other').down('immagine').down('contenitore').down('imageSet'));});
	
			handler.register('alt-j>t','custom', "!isUnder(application.ribbon.down('1').down('movie_other').down('tabella').down('contenitore').down('tableDesign'))", function(){$('currentFocus', 'tableDesign'); $('headerRibbon').apriOtherTab($('headerRibbon').path.down('movie_other').down('tabella').down('contenitore').down('tableDesign'));});
			handler.register('alt-j>l','custom', "!isUnder(application.ribbon.down('1').down('movie_other').down('tabella').down('contenitore').down('tableLayout'))", function(){$('currentFocus', 'tableLayout'); $('headerRibbon').apriOtherTab($('headerRibbon').path.down('movie_other').down('tabella').down('contenitore').down('tableLayout'));});
	*/
	
	
			handler.register('alt', 'custom', "true", function() { $('currentFocus', null); instance.disattivaCaselle(); instance.closeDropdown(); instance.closePopups();	});
	
	//		handler.register('shift-f10','custom',"!isUnder(application.barre.down('1').down('titolo').down('icona')) && !application.menu_isOpen", function(){instance.openPopupShiftf10()} );
	
			/* chiusura scheletro */
	//		handler.register('ctrl-w','actAs', "!isUnder(application.barre.down('1').down('titolo').down('icona'));",  this.barre.down('1').down('titolo').down('x'));
	//		handler.register('ctrl-f4','actAs', "!isUnder(application.barre.down('1').down('titolo').down('icona'));", this.barre.down('1').down('titolo').down('x'));
	
	//		handler.register('c','actAs', "!isUnder( $('dxContestuale').get(\'path\').down('1').down('dxContestuale').down('6'))", $('dxContestuale').get("path").down('1').down('dxContestuale').down('6'));
		} catch (e) {
			Utils.printException(e,'initRibbon');
		}
    },

	initCaselle : function() {
		try {
			var tmpTextbox = this.barre.down('1').down('pagine');
			tmpTextbox.setOpacity(0);
			tmpTextbox.setFontFamily('Arial'); 
			tmpTextbox.setFontSize(11);
			tmpTextbox.setTextRendering("auto");	
			tmpTextbox.setFontColor('rgb(68, 68, 130)');
			tmpTextbox.setText('1 of ' + this.pagine);
	
			tmpTextbox = this.barre.down('1').down('parole');
			tmpTextbox.setOpacity(0);
			tmpTextbox.setFontFamily('Arial'); 
			tmpTextbox.setFontSize(11);
			tmpTextbox.setTextRendering("auto");	
			tmpTextbox.setFontColor('rgb(68, 68, 130)');
			tmpTextbox.setText(''+this.parole);

	
			tmpTextbox = this.barre.down('1').down('zoom');
			tmpTextbox.setOpacity(0);
			tmpTextbox.setFontFamily('Arial'); 
			tmpTextbox.setFontSize(11);
			tmpTextbox.setTextRendering("auto");	
			tmpTextbox.setFontColor('rgb(81, 80, 80)');
			tmpTextbox.setText('93%');
		} catch (e) {
			Utils.printException(e,'initCaselle');
		}
	},

	disattivaCaselle : function(){
		try {
			if ($('currentTextbox') !== null) {
				$('currentTextbox').deactivate();
				$('currentTextbox', null);
			}
		} catch (e) {
			Utils.printException(e,'disattivaCaselle');
		}
	},

	openMenu : function(){
		try {
			var tmpMenu,
				submenu;
			if(this.menu_isEnable){
				this.subMenuApri = '1';
				this.subMenuSalva = '1';
				this.subMenuCondividi = '1';
				this.subMenuEsporta = '1';
				this.tipoFileSalva = '1';

				//this.ribbon.down('1').down('movieToolbars').down('1').down('toolbars').setAllToFrame('normal');
				//this.ribbon.down('1').down('movieToolbars').down('2').down('toolbars').setAllToFrame('normal');
				$('headerRibbon').settaOther(this.ribbon.down('1'));
				tmpMenu = this.menu.down('1').down('menu');
	
				tmpMenu.setAllToFrame('normal');
				tmpMenu.down('1').goTo('click');
				
				this.menu_isOpen = true;
				this.menu.goTo('1');
				submenu = this.menu.down('1').down('submenu')
				submenu.goTo('1');

				if(this.menu.down('1').down('submenu').down('8').down('anteprima').down('2').down('2') !== undefined) {
					this.menu.down('1').down('submenu').down('8').down('anteprima').down('2').down('2').setAllToFrame('normal');
					this.menu.down('1').down('submenu').down('8').down('anteprima').down('2').down('2').down(this.tipoFileSalva).goTo('click');
				}
				//Inserito per office 365
				this.clickSectionMenu(this.menu.down('1').down('menu').down('12'));

			}
		} catch (e) {
			Utils.printException(e,'openMenu');
		}
	},

	initMenu : function() {
		try {
			var test,
				operation,
				self = this;
			if(this.menu_isEnable){
	
			//	handler.register('esc', 'custom', "!isUnder(root.down('1').down('scheletri').down('1').down('word').down('1').down('menu').down('1').down('menu').down('menu'))", function() { $('currentFocus', null); if(application.menu_isEnable && !isUnder(application.menu.down('1').down('menu').down('menu'))){ $('headerRibbon').chiudiMenu();} });
	
				this.menu = this.path.down('1').down('menu');
				this.menu.down('1').down('submenu').down('6').down('preview').setFontSize(15);
				this.menu.down('1').down('submenu').down('6').down('preview').setTextRendering("auto");
				var tmpPath = this.menu.down('1').down('submenu').down('1')

				this.menu.down('1').down('infoDocument').setOpacity(0);
				this.menu.down('1').down('infoDocument').setTextRendering('auto');
				this.menu.down('1').down('infoDocument').setFontColor('rgb(59,59,59)');
				this.menu.down('1').down('infoDocument').setText(this.nameDocument + '.docx - Word');


				tmpPath.down('nameDocument').setOpacity(0);
				tmpPath.down('nameDocument').setFontSize(20);
				tmpPath.down('nameDocument').setTextRendering("auto");
				tmpPath.down('nameDocument').setFontColor('rgb(43,87,154)');
				tmpPath.down('nameDocument').setText('' + this.nameDocument);


				tmpPath.down('pagine').setFontColor('rgb(0,0,0)');
				tmpPath.down('parole').setFontColor('rgb(0,0,0)');
				tmpPath.down('pagine').setText(this.pagine);
				tmpPath.down('parole').setText(this.parole);
				tmpPath.down('pagine').setOpacity(0);
				tmpPath.down('parole').setOpacity(0);
				tmpPath.down('parole').setTextRendering("auto");	
				tmpPath.down('parole').setTextRendering("auto");	
			
				tmpPath = this.menu.down('1').down('submenu').down('7')

				tmpPath.down('nameDocument').setOpacity(0);
				tmpPath.down('nameDocument').setFontSize(20);
				tmpPath.down('nameDocument').setTextRendering("auto");
				tmpPath.down('nameDocument').setFontColor('rgb(43,87,154)');
				tmpPath.down('nameDocument').setText('' + this.nameDocument);


				operation = function() {
					$('currentFocus', 'menu');
					self.openMenu();
				};
	//			handler.register('alt-f', 'custom', "!isUnder(application.barre.down('1').down('titolo').down('icona')); ", operation);
	
				/* handler.register('alt-s', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('salva')); ", application.menu.down('1').down('menu').down('salva')); 
				handler.register('alt-a', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('salvaconnome')); ", application.menu.down('1').down('menu').down('salvaconnome')); 
				handler.register('alt-o', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('apri')); ", application.menu.down('1').down('menu').down('apri')); 
				handler.register('alt-c', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('chiudi')); ", application.menu.down('1').down('menu').down('chiudi')); 
				handler.register('alt-i', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('1')); ", application.menu.down('1').down('menu').down('1')); 
				handler.register('alt-r', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('2')); ", application.menu.down('1').down('menu').down('2')); 
				handler.register('alt-n', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('3')); ", application.menu.down('1').down('menu').down('3')); 
				handler.register('alt-p', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('4')); ", application.menu.down('1').down('menu').down('4')); 
				handler.register('alt-d', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('5')); ", application.menu.down('1').down('menu').down('5')); 
				handler.register('alt-h', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('6')); ", application.menu.down('1').down('menu').down('6')); */
				/*handler.register('alt-t', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('options')); ", application.menu.down('1').down('menu').down('options')); 
				handler.register('alt-x', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('exit')); ", application.menu.down('1').down('menu').down('exit')); */
	
	
			}	
		} catch (e) {
			Utils.printException(e,'initMenu');
		}
	},
	/*
	 *  Istanzio i popup
	 */
	initPopups : function(path){
		try {
			var i = 0,
				tmpName,
				numPopups = path.down('1').getObjectCount();
			$('popups', []);
			for (i; i < numPopups; i++) {
				tmpName = path.down('1').getObjectByNumber(i).getName();
				$(tmpName, new jSim.Popup(path.down('1').down(tmpName)));
				$('popups').push($(tmpName));
			}
			this.addCodeToPopups();
		}   catch (e) {
			Utils.printException(e,'initPopups');
		}
	},

	closePopups : function() {
		try {
			var numPopups = $('popups').length,
				i = 0;
			for (i; i < numPopups; i += 1) {
				$('popups')[i].close();
			}
		}   catch (e) {
			Utils.printException(e,'closePopups');
		}
	},


	getDoc : function(){
		try {
			return this.document.getCurrentFrame().getName();
		}   catch (e) {
			Utils.printException(e,'getDoc');
		}
	},

	getCurrentPage : function() {
		try {
			return this.barre.down('1').down('pagine').getText().split('of')[0];
		}  catch (e) {
			Utils.printException(e,'getCurrentPage');
		}
	},

	openShare: function(submenu){
		try {
			this.share = submenu;
			this.menu.down('1').down('submenu').down('5').down('anteprima').goTo(submenu);
		}   catch (e) {
			Utils.printException(e,'openShare');
		}
	},
	
	close : function() {
		try {
			api.addAction('chiudi word');
			api.confirm();
		}   catch (e) {
			Utils.printException(e,'close');
		}
	},

	openPopupShiftf10 : function(){
		try {
			var objSelected = this.ribbon.down('1').down('movie_other').getCurrentFrame().getName(),
				containerObjPath = this.document.down('1').down('scroll').down('1').down('content')
	
			switch(objSelected){
				case 'immagine' :
					api.addAction('openPopupShiftf10: aprire popup');
	//				$('dxImage').open(200, 100);
				break;
				case 'tabella' : 
					api.addAction('openPopupShiftf10: aprire popup');
	//				$('dxTabella').open(200, 100);
				break;
				default : 
					$('dxVuoto').open(200, 100);
				break;
			}
		} catch (e) {
			Utils.printException(e,'openPopupShiftf10');
		}
	},


	/*
	 * chiude le tendine all'alt
	 */
	closeDropdown  : function(){
		try {
			var num = $('pathTendine').down('1').getObjectCount();
			for (var i=0; i < num; i += 1){
				$('pathTendine').down('1').getObjectByNumber(i).goTo('0');
			}
		}   catch (e) {
			Utils.printException(e,'closeDropdown');
		}
	},

	clickSectionMenu : function (btn) {
		try {
			var nameBtn = btn.getName();
			

			//verifico se premo su salva o su chiudi o su opzioni, quindi uscita
			switch(nameBtn) {
				case '4':
					api.addAction('salva');
					api.confirm();
					return;
				case '9':
					api.addAction('chiudi');
					api.confirm();
					return;
				case '11':
					api.addAction('opzioni');
					api.confirm();
					return;
			}

			//verifico se c è la sezione , altrimenti nn faccio niente. mi permette di eliminare più sezioni del menu senza creare errori svg
			if(this.menu.down('1').down('submenu').down(nameBtn) === undefined) {
				return;
			}

			this.menu.down('1').down('menu').setAllToFrame('normal');
			btn.goTo('click');
			this.menu.down('1').down('submenu').goTo(nameBtn);


			switch(nameBtn) {
				case '3':
					this.menu.down('1').down('submenu').down('3').down('3').setAllToFrame('normal');
					this.menu.down('1').down('submenu').down('3').down('3').down(this.subMenuApri).goTo('click');
					this.menu.down('1').down('submenu').down('3').down('anteprima').goTo(this.subMenuApri);
					break;
				case '5':
					this.menu.down('1').down('submenu').down('5').down('5').setAllToFrame('normal');
					this.menu.down('1').down('submenu').down('5').down('5').down(this.subMenuSalva).goTo('click');
					this.menu.down('1').down('submenu').down('5').down('anteprima').goTo(this.subMenuSalva);
					break;
				case '7':
					this.menu.down('1').down('submenu').down('7').down('7').setAllToFrame('normal');
					this.menu.down('1').down('submenu').down('7').down('7').down(this.subMenuCondividi).goTo('click');
					this.menu.down('1').down('submenu').down('7').down('anteprima').goTo(this.subMenuCondividi);
					break;
				case '8':
					this.menu.down('1').down('submenu').down('8').down('8').setAllToFrame('normal');
					this.menu.down('1').down('submenu').down('8').down('8').down(this.subMenuEsporta).goTo('click');
					this.menu.down('1').down('submenu').down('8').down('anteprima').goTo(this.subMenuEsporta);
					break;
			}

			if(nameBtn === '12') {
				this.menu.down('1').down('btnHome').setPosition(0,0);
			} else {
				this.menu.down('1').down('btnHome').setPosition(-1000,-1000);
			}

		}   catch (e) {
			Utils.printException(e,'clickSectionMenu');
		}
	},

	clickSubSectionMenu : function (btn) {
		try {
			var nameBtn = btn.getName(), nameCont = btn.up().getName();

			//verifico se c è la sottosezione , altrimenti nn faccio niente. mi permette di eliminare più sottosezioni del menu senza creare errori svg
			if(btn.up().up().down('anteprima') === undefined) {
				return;
			}			
		
			btn.up().setAllToFrame('normal');
			btn.goTo('click');
			btn.up().up().down('anteprima').goTo(nameBtn);
			
			
	
			switch(nameCont) {
				case '3':
					this.subMenuApri = nameBtn;
					break;
				case '5':
					this.subMenuSalva = nameBtn;
					break;
				case '7':
					this.subMenuCondividi = nameBtn;
					break;
				case '8':
					this.subMenuEsporta = nameBtn;
					break;
			}

		}   catch (e) {
			Utils.printException(e,'clickSubSectionMenu');
		}
	},

	clickTypeFile : function (btn) {
		try {
			var nameBtn = btn.getName();
	
			btn.up().setAllToFrame('normal');
			btn.goTo('click');
			this.tipoFileSalva = nameBtn;

		}   catch (e) {
			Utils.printException(e,'clickTypeFile');
		}
	},

	clickAvantiTab : function () {
		try {
			if($('headerRibbon').otherTabOpened) {
				$('headerRibbon').path.down('movie_other').goTo($('headerRibbon').objSelected);
				$('headerRibbon').path.down('movieToolbars').goTo('2');

				switch($('ribbonVisibile')) {
					case 'home':
					case 'insert':
					case 'design':
					case 'pageLayout':
					case 'reference':
					case 'mails':
					case 'review':
					case 'view':
						$('headerRibbon').apriTab($('headerRibbon').path.down('movieToolbars').down('2').down('toolbars').down($('ribbonVisibile')));
						break;
					default:
						$('headerRibbon').apriOtherTab(word.ribbon.down('1').down('movie_other').down($('headerRibbon').objSelected).down('contenitore').down($('ribbonVisibile')));
						break;
				}

			}
		}   catch (e) {
			Utils.printException(e,'clickAvantiTab');
		}
	},

	clickIndietroTab : function () {
		try {
            $('headerRibbon').path.down('movie_other').goTo('0');
			$('headerRibbon').path.down('movieToolbars').goTo('1');

			switch($('ribbonVisibile')) {
				case 'home':
				case 'insert':
				case 'design':
				case 'pageLayout':
				case 'reference':
				case 'mails':
				case 'review':
				case 'view':
					$('headerRibbon').apriTab($('headerRibbon').path.down('movieToolbars').down('1').down('toolbars').down($('ribbonVisibile')));
					break;
			}

		}   catch (e) {
			Utils.printException(e,'clickIndietroTab');
		}
	},

	/********************* GESTIONE DOCUMENTI WORD **********/

   ripristina: function (doc) {
		try {
			var docToOpen = doc;

			if(typeof docToOpen !== "string"){
				docToOpen = docToOpen.getName();
			}

			this.docActive = docToOpen;			
			this.barre.down('1').down('pagine').setFontColor('rgb(0,0,0)');
			this.barre.down('1').down('parole').setFontColor('rgb(0,0,0)');
			switch(docToOpen) {
				case'1':
					this.doc1_isVisible = true;
					this.txtTitolo.setText(this.nameFile1 + '.docx - Word');
					this.barre.down('1').down('pagine').setText('1 of 4');
					this.barre.down('1').down('parole').setText('382');
				//	textbox1.setVisible(true);
				//	word.document.down('1').down('doc').down('1').down('selection').goTo('1');

					break;
				case'2':
					this.doc2_isVisible = true;
					this.txtTitolo.setText(this.nameFile2 + '.docx - Word');
					this.barre.down('1').down('pagine').setText('1 of 1');
					this.barre.down('1').down('parole').setText('141');
				//textbox1.setVisible(false);

					break;
			}

			this.path.goTo('1');
			this.document.down('1').down('doc').goTo(docToOpen);

				if(this.docActive === '1') {
					$('headerRibbon').apriTab($('headerRibbon').path.down('movieToolbars').down('1').down('toolbars').down($('ribbonVisibileDoc1')));
				} else {
					$('headerRibbon').apriTab($('headerRibbon').path.down('movieToolbars').down('1').down('toolbars').down($('ribbonVisibileDoc2')));
				}

			sim.setRibbonButton();
		} catch(e) {
			Utils.printException(e,'ripristina');
		}
    },

    riduci: function (doc) {
		try {
			var docToResize;

			if(arguments.length > 0) {
				docToResize = doc;
			} else {
				docToResize = this.docActive;
			}
			
			if(typeof docToResize !== "string"){
				docToResize = docToResize.getName();
			}

			switch(docToResize) {
				case'1':
					this.doc1_isVisible = false;
					if(this.doc2_isVisible) {
						this.ripristina('2');
					}
					break;
				case'2':
					this.doc2_isVisible = false;
					if(this.doc1_isVisible) {
						this.ripristina('1');
					}
					break;
			}

			if(!this.doc1_isVisible && !this.doc2_isVisible) {
				this.docActive = '';
				application.viewDesktop();
			}

		} catch(e) {
			Utils.printException(e,'riduci');
		}
    },

	open: function () {
        this.path.goTo('1');
    },
	
	close : function() {
		try {
			api.addAction('chiudi word');
			api.confirm();
			return;
			if(this.docActive === '2') {
				sim.setFinalEffect();
			} else {
				api.addAction('chiudi word');
				api.confirm();
			}
		}   catch (e) {
			Utils.printException(e,'close');
		}
	}


}


























