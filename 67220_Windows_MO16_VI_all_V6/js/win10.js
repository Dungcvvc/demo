var application = {
    path: null,
    document: null,
    menu: null,
    barre: null,
    pathObjDesk: null,
    movieStart: null,
    start_isOpen: false,
    start_isEnable: true,
	navigateIsEnable : true,
	movieOverApp : null,
	movieDxApp : null,
    init: function (applicationPath) {
		try {

			this.path = applicationPath;
			this.barre = this.path.down('1').down('movie_barre');
			this.document = this.path.down('1').down('document');
			this.pathObjDesk = this.document.down('1').down('objDesk');
			this.movieStart = $('pathTendine').down('1').down('start');
			this.movieOverApp = $('pathTendine').down('1').down('overAppBarra');
			this.movieDxApp = $('pathTendine').down('1').down('dxAppBarra');
			this.winSetTextbox();

			handler.register('invio', 'custom', "!isUnder(application.pathObjDesk.down('cestino')) && application.checkSelectedObject()", function () { application.openObjDesk(application.getCurrentSelectedObject()); });
			
		}  catch(e) {
			Utils.printException(e,'applicationInit');
		}
    },


	winSetTextbox : function () {
		try {

			/*this.pathStatusBar.down('1').down('slide').setOpacity(0);
			this.pathStatusBar.down('1').down('slide').setFontFamily('Arial'); 
			this.pathStatusBar.down('1').down('slide').setFontColor('rgb(255, 255, 255)');
			this.pathStatusBar.down('1').down('slide').setFontSize(11);
			this.pathStatusBar.down('1').down('slide').setTextRendering("auto");	
			this.pathStatusBar.down('1').down('slide').setText('DIAPOSITIVA ' + this.selectedSlide + ' DI ' + this.totalSlide);*/
		

		}  catch(e) {
			Utils.printException(e,'pptSetTextbox');
		}
	   
	},


	/*
	 *  Istanzio i popup
	 */
    initPopups: function (path) {
        var i = 0,
            tmpName, numPopups = path.down('1').getObjectCount();
        $('popups', []);
        for (i; i < numPopups; i += 1) {
            tmpName = path.down('1').getObjectByNumber(i).getName();
            $(tmpName, new jSim.Popup(path.down('1').down(tmpName)));
            $('popups').push($(tmpName));
        }
        this.addCodeToPopups();
    },

	openPopupShiftf10: function () {
		if (this.checkSelectedObject()) { /*  oggetto selezionato */
			this.openPopupObject();
		} else if ($('currentTextbox') !== null) { /*  Casella attiva - specializzarsi i casi a seconda del nome della textbox e delle sue coordinate */
			if ($('currentTextbox').getName() === 'txt1') {
				$('dxTesto').open(215, 335);
			} else if ($('currentTextbox').getName() === 'txt2') {
				$('dxTesto').open(565, 495);
			}
		} else { /*  nessun oggetto selezionato, apre popup vuoto */
			$('dxDesktop').open(150, 230);

		}
	
	},

    closePopups: function () {
        var numPopups = $('popups').length,
            i = 0;
        for (i; i < numPopups; i += 1) {
            $('popups')[i].close();
        }
    },
    deactivateTextbox: function () {
        if ($('currentTextbox') !== null) {
            $('currentTextbox').deactivate();
            $('currentTextbox', null);
        }
    },

	/*
	 * chiude le tendine
	 */
    closeDropdown: function () {
        var num = $('pathTendine').down('1').getObjectCount();
        for (var i = 0; i < num; i += 1) {
            $('pathTendine').down('1').getObjectByNumber(i).goTo('0');
        }
    },

    close: function () {
        api.addAction('chiudi Win');
        api.confirm();
    },


	openPopupObject: function () {
		if (this.checkSelectedObject()) { /*  oggetto selezionato */
			var typeDx = this.whichDxToOpen();
			var objSelected = this.getCurrentSelectedObject();

			if(typeDx !== undefined) {
				$(typeDx).open(objSelected.getX(), objSelected.getY());
			}
		} 	
	},

	clickSxVuoto: function () {
		try {
			this.pathObjDesk.setAllToFrame('normal');
		} catch(e) {
			Utils.printException(e,'clickSxVuoto');
		}
    },

    clickDxVuoto: function () {
		try {
			this.clickSxVuoto();
			$('dxDesktop').open();
			
		} catch(e) {
			Utils.printException(e,'clickDxVuoto');
		}
    },

	clickSxObjDesk : function (btn) {
		try {
			var nameBtn = btn.getName();
	
			btn.up().setAllToFrame('normal');
			btn.goTo('click');

		}   catch (e) {
			Utils.printException(e,'clickSxObjDesk');
		}
	},

	clickDxObjDesk : function (btn) {
		try {
			var typeDx;

			this.clickSxObjDesk(btn);
			typeDx = this.whichDxToOpen();

			$(typeDx).open();
		}   catch (e) {
			Utils.printException(e,'clickDxObjDesk');
		}
	},

	doppioClickObjDesk : function (btn) {
		try {
			this.clickSxObjDesk(btn);
			this.openObjDesk(btn);

		}   catch (e) {
			Utils.printException(e,'doppioClickObjDesk');
		}
	},

	openObjDesk : function (btn) {
		try {
			var nameBtn = btn;

			if(typeof nameBtn !=="string") {
				nameBtn = btn.getName();
			}

			switch(nameBtn) {
				case 'cestino':
					api.addAction('openCestino');
					api.confirm();
					break;
				case 'risorse':
					api.addAction('openRisorse');
					api.confirm();
					break;
				case 'rete':
					api.addAction('openRete');
					api.confirm();
					break;
				default:
					api.addAction('openObjDesk');
					api.confirm();
					break;
			}

		}   catch (e) {
			Utils.printException(e,'openObjDesk');
		}
	},



    getCurrentSelectedObject: function () {
		try {
			return findState(this.pathObjDesk, 'click')[0];
		} catch(e) {
			Utils.printException(e,'getCurrentSelectedObject');
		}
    },

    checkSelectedObject: function () {
		try {
			var numObject = findState(this.pathObjDesk,'click').length; 
			if (numObject > 0) {
				return true;
			} else {
				return false;
			}
		} catch(e) {
			Utils.printException(e,'checkSelectedObject');
		}
    },

    typeObjectSelected: function () {
		try {
			if(this.checkSelectedObject() && this.getCurrentSelectedObject() !== undefined) {
				return this.getCurrentSelectedObject().getName();
			}
			return null;
		} catch(e) {
			Utils.printException(e,'typeObjectSelected');
		}
    },


    whichDxToOpen: function () {
		try {
			var typeObj = this.typeObjectSelected();
			switch (typeObj) {
				case 'cestino':
						return 'dxCestino';
					break;
				case 'risorse':
						return 'dxComputer';
					break;
				case 'rete':
						return 'dxRete';
					break;
				case 'objPpt':
						return 'dxObjPpt';
					break;
				case 'objWord':
						return 'dxObjWord';
					break;
				case 'objAccess':
						return 'dxObjAccess';
					break;
				case 'objExcell':
						return 'dxObjExcel';
					break;
			}
			
		} catch(e) {
			Utils.printException(e,'whichDxToOpen');
		}
    },



	openStart : function () {
		try {
			
			if(!this.start_isEnable) {
				return;
			}
			this.clickSxVuoto();
			this.start_isOpen = true;
			this.movieStart.goTo('1');


		}   catch (e) {
			Utils.printException(e,'openStart');
		}
	},
	openDxStart : function () {
		try {
			$('dxStart').open();

		}   catch (e) {
			Utils.printException(e,'openDxStart');
		}
	},
	closeStart : function () {
		try {
			
			this.start_isOpen = false;
			this.movieStart.goTo('0');

		}   catch (e) {
			Utils.printException(e,'closeStart');
		}
	},

	clickSubSection : function (btn) {
		try {
			var nameBtn = btn;

			if(typeof nameBtn !=="string") {
				nameBtn = btn.getName();
			}

			this.subcategory_isOpen = true;
			this.movieStart.down('1').down('submenu').goTo(nameBtn);

		}   catch (e) {
			Utils.printException(e,'clickSubSection');
		}
	},

	closeSubSection : function (btn) {
		try {
			this.movieStart.down('1').down('submenu').goTo('0');

		}   catch (e) {
			Utils.printException(e,'closeSubSection');
		}
	},

	clickAppStart : function (btn) {
		try {
			
			var nameBtn = btn,splitname;
	
			if(typeof nameBtn !=="string") {
				nameBtn = btn.getName();
			}
			splitname = nameBtn.split('_')[0];

			if(splitname === 'dis') {
				return;
			}

			switch(nameBtn) {
				case '':

					break;
				default:
					api.addAction('openAppStart');
					api.confirm();
					break;
			}

		}   catch (e) {
			Utils.printException(e,'clickAppStart');
		}
	},

	/******************** GESTIONE DOCUMENTI WORD *************/

	openApp : function (app,control) {
		try {

			var appToOpen = app, indexApp;

			if(typeof appToOpen !== "string") {
				appToOpen = app.getName().split('_')[0];
			}
			if(control){
				api.addAction("__" + app);
				if(appToOpen == '1'){
					word.open();
					word.ripristina('2');
				}else{
					word.open();
					word.ripristina('1');
				}
			}else{
				word.open();
				word.ripristina(appToOpen);
			}
		}   catch (e) {
			Utils.printException(e,'openApp');
		}
	},


	overBtnBarra : function (btn) {
		try {
			var nameBtn = btn, indexApp;

			if (typeof nameBtn !== "string") {
				nameBtn = btn.getName().split('_')[0];
			}

			if(this.movieOverApp.down(nameBtn) !== undefined) {
				this.movieOverApp.goTo(nameBtn);
			}

		}   catch (e) {
			Utils.printException(e,'overBtnBarra');
		}
	},

	outBtnBarra : function () {
		try {
			this.movieOverApp.goTo('0');

		}   catch (e) {
			Utils.printException(e,'overBtnBarra');
		}
	},

	dxBtnBarra : function (btn) {
		try {
			var nameBtn = btn, indexApp;

			if (typeof nameBtn !== "string") {
				nameBtn = btn.getName().split('_')[0];
			}

			if(this.movieDxApp.down(nameBtn) !== undefined) {
				this.outBtnBarra();
				this.movieDxApp.goTo(nameBtn);
			}

		}   catch (e) {
			Utils.printException(e,'dxBtnBarra');
		}
	},


	clickDxAnteprima : function (btn) {
		try {
			var nameBtn = btn, indexApp;

			if (typeof nameBtn !== "string") {
				nameBtn = btn.getName().split('_')[0];
			}

			this.dxAnteprima = nameBtn;

			switch(nameBtn) {
				case '1':
					if(word.doc2_isVisible) {
						word.ripristina(nameBtn);
						if(word.docActive === nameBtn) {
							$('dxContestuale').open();
						} else {
							$('dxContestualeRipristina').open();
						}
					} else if(word.doc1_isVisible){
						$('dxContestuale').open();
					} else {
						$('dxContestualeRipristina').open();
					}
					break;

				case '2':
					if(word.doc1_isVisible) {
						word.ripristina(nameBtn);
						if(word.docActive === nameBtn) {
							$('dxContestuale').open();
						} else {
							$('dxContestualeRipristina').open();
						}
					} else if(word.doc2_isVisible)  {
						$('dxContestuale').open();
					} else {
						$('dxContestualeRipristina').open();
					}
					break;

			}

		}   catch (e) {
			Utils.printException(e,'clickDxAnteprima');
		}
	},

	viewDesktop : function (btn) {
		try {
			word.path.goTo('0');

		}   catch (e) {
			Utils.printException(e,'viewDesktop');
		}
	}





}

























