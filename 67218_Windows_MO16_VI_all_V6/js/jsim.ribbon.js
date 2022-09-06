

$('ribbonVisibile', 'home');

/*
 * Crea un oggetto di tipo RibbonContainer
 *
 */
jSim.createNameSpace("RibbonContainer", function (path) {
    this.init(path);
});
jSim.RibbonContainer.extend({
/*
	 * Inizializza la ribbon settando il codice opportuno sui vari bottoni
	 */
    init: function (path) {
        var numRibbon = path.getObjectCount(),
            i = 0,
            tmp, frame, btnName, name,
			ribbonVisibile = $('ribbonVisibile');

        $(ribbonVisibile, new jSim.Ribbon(path.down(ribbonVisibile)));
        $(ribbonVisibile).init();

        for (i = 0; i < numRibbon; i += 1) {
            name = path.getObjectByNumber(i).getName();
            if (name.substr(0, 4) !== 'opt_') {
                $(name + '_', new jSim.RibbonHeader(path.up()));

				//modificato per office 2013 - doppia ribbon
                $(name + '_').initTab(path.up().down('movieToolbars').down('1').down('toolbars').down(name), $(name + '_'));
                $(name + '_').initTab(path.up().down('movieToolbars').down('2').down('toolbars').down(name), $(name + '_'));

            } else {
                tmp = name.split('_');
                frame = tmp[1];
                btnName = tmp[2];
                $(btnName + '_', new jSim.RibbonHeader(path.up()));
                $(btnName + '_').initOtherTab(path.up().down('movie_other').down(frame).down('contenitore').down(btnName), $(btnName + '_'));
            }
        }
    }
});
/****************************************************************************************************************
 * Crea un oggetto di tipo Ribbon Header
 * @param il path del movie che contiene la ribbon
 */
jSim.createNameSpace("RibbonHeader", function (pathTabs) {
    this.path = pathTabs;
    this.isInitialized = false;
	this.otherTabOpened = false;
	this.objSelected = "";
});
jSim.RibbonHeader.extend({
    initTab: function (btn, object) {
        try {
            var btnName = $(object);
            btn.setAction('over', "$('" + btnName + "').tabMouseover(" + pathObj(btn) + ")");
            btn.setAction('out', "$('" + btnName + "').tabMouseout(" + pathObj(btn) + ")");
            btn.setAction('click', "$('" + btnName + "').tabMouseclick(" + pathObj(btn) + ")");
        } catch (e) {
			Utils.printException(e,'initTab RibbonHeader');
        }
    },
    initOtherTab: function (btn, object) {
        try {
            var btnName = $(object);
            btn.setAction('over', "$('" + btnName + "').tabMouseover(" + pathObj(btn) + ")");
            btn.setAction('out', "$('" + btnName + "').tabMouseout(" + pathObj(btn) + ")");
            btn.setAction('click', "$('" + btnName + "').tabMouseclickOther(" + pathObj(btn) + ")");
        } catch (e) {
			Utils.printException(e,'initOtherTab RibbonHeader');
        }
    },

/*
	 * Gestione dei tabs associati alle ribbon
	 */
    azzeraTab: function () {
        try {
            var tabCorrente = this.path.down('movie_tabs').getCurrentFrame(),
                numSezioni = tabCorrente.getObjectCount(),
                i,
				tmpObject;
            for (i = 0; i < numSezioni; i += 1) {
                try {
					tmpObject = tabCorrente.getObjectByNumber(i);
					if(tmpObject.setAllToFrame !== undefined) {
						tmpObject.setAllToFrame('normal');
					}
                } catch (e) {
					Utils.printException(e,'azzeraTab');
				}
            }
        } catch (e) {
			Utils.printException(e,'azzeraTabHeader');
        }
    },
    apriTab: function (tab) {
        try {

            var ribbonVisibile = tab.getName();

			$('ribbonVisibile', ribbonVisibile);
            //istanzia un nuovo oggetto Ribbon associato al tab
            if ($(ribbonVisibile) === undefined) {
                $(ribbonVisibile, new jSim.Ribbon(tab.up().up().up().up().down('movie_tabs').down(ribbonVisibile)));
                $(ribbonVisibile).init();
            }
            //---------------------------------------------------//
            if (word.menu_isOpen) {
				this.chiudiMenu();
            }
            this.settaOther(tab.up().up().up().up());
            tab.up().setAllToFrame('normal');
            tab.goTo('click');
            tab.up().up().up().up().down('movie_tabs').goTo(tab.getName());
            this.azzeraTab();
        } catch (e) {
			Utils.printException(e,'apriTab');
        }
    },
    settaOther: function (mov) {
        var numOther = mov.down('movie_other').getObjectCount(),
            i;
        if (numOther > 0) {
            for (i = 1; i < numOther; i += 1) {
                mov.down('movie_other').down(mov.down('movie_other').getObjectByNumber(i).getName()).down('contenitore').setAllToFrame('normal');
            }
        }
    },
    apriOtherTab: function (tab) {
        try {

            var frameName = tab.getName().replace(/\_/g, ''),
                frame = tab.up().up().getName(),
                ribbonNam,
				ribbonVisibile = frameName;

			$('ribbonVisibile', ribbonVisibile);

            if (this.path.down('movie_other').down(frame).getType() === "frame") { //se non esiste il frame corrispondente
                ribbonName = 'opt_' + frame + '_' + frameName;
                if (word.menu_isOpen) {
                    this.chiudiMenu();
                }
                tab.up().setAllToFrame('normal');
                tab.goTo('click');
                tab.up().up().up().up().down('movieToolbars').down('1').down('toolbars').setAllToFrame('normal');
                tab.up().up().up().up().down('movieToolbars').down('2').down('toolbars').setAllToFrame('normal');
                //istanzia un nuovo oggetto Ribbon associato al tab
                if ($(ribbonVisibile) === undefined) {
                    $(ribbonVisibile, new jSim.Ribbon(tab.up().up().up().up().down('movie_tabs').down(ribbonName)));
                    $(ribbonVisibile).init();
                }
                //-------------------------------------------------//
                tab.up().up().up().up().down('movie_tabs').goTo(ribbonName);				

            }
        } catch (e) {
			Utils.printException(e,'apriOtherTab');
        }
    },
    deseleziona: function (button) {
        try {
            button.up().setAllToFrame('normal');
            this.switchDeseleziona();
            this.path.down('movie_other').goTo('0');
			this.path.down('movieToolbars').goTo('1');
			this.otherTabOpened = false;
			this.objSelected = '';
        } catch (e) {
			Utils.printException(e,'deseleziona');
        }
    },
    switchDeseleziona: function () {
        try {
            switch (this.path.down('movie_tabs').getCurrentFrame().getName().substr(0, 4)) {
            case 'opt_':
                this.apriTab(this.path.down('movieToolbars').down('1').down('toolbars').down('home'));
                break;
			default :
				this.apriTab(this.path.down('movieToolbars').down('1').down('toolbars').down($('ribbonVisibile')));
            }


        } catch (e) {
			Utils.printException(e,'switchDeseleziona');
        }
    },
    tabMouseout: function (btn) {
        try {
            if (btn.getCurrentFrame() !== 'click') {
                btn.goTo('normal');
            }
        } catch (e) {
			Utils.printException(e,'tabMouseout');
        }
    },
    tabMouseover: function (btn) {
        try {
            if (btn.getCurrentFrame() !== 'click') {
                btn.goTo('mouseover');
            }
        } catch (e) {
			Utils.printException(e,'tabMouseover');
        }
    },
    tabMouseclick: function (btn) {
        try {
            this.apriTab(btn);
        } catch (e) {
			Utils.printException(e,'tabMouseclick');
        }
    },
    tabMouseclickOther: function (btn) {
        try {
            this.apriOtherTab(btn);
        } catch (e) {
			Utils.printException(e,'tabMouseclickOther');
        }
    },
    viewTabOther: function (btn) {
        try {

            var frame;
            if (btn.getName().indexOf("_") !== -1) {
                frame = btn.getName().split('_')[0];
            } else {
                frame = btn.getName();
            }

			if(this.objSelected === frame) {
				return;
			}

            if (this.path.down('movie_other').getCurrentFrame().getName() !== btn.getName()) {
				this.deseleziona(btn);
				this.path.down('movie_other').goTo(frame);
                btn.up().setAllToFrame('normal');
                btn.goTo('click');
            }
	
			this.objSelected = frame;
			this.otherTabOpened = true;
			word.clickAvantiTab();


        } catch (e) {
			Utils.printException(e,'viewTabOther');
        }
    },
    chiudiMenu: function () {
        try {
            word.menu_isOpen = false;
            share = '1';
            this.path.up().up().down('menu').goTo('0');
            this.settaRibbonVisibile();
        } catch (e) {
			Utils.printException(e,'chiudiMenu');
        }
    },
    settaRibbonVisibile: function () {
        var frameVisibile = this.path.down('movie_tabs').getCurrentFrame().getName(),
            split = frameVisibile.split('_'),
            pre = split[0],
            frame = split[1],
            btnName = split[2];
        if (pre === 'opt') {
            this.apriOtherTab(this.path.down('movie_other').down(frame).down('contenitore').down(btnName));
        } else {
            this.apriTab(this.path.down('movieToolbars').down('1').down('toolbars').down(frameVisibile));
        }
    }
});
/********************************************************************************************************************************************
 * Crea un oggetto di tipo Ribbon
 * @param il path del movie che contiene la ribbon
 */
jSim.createNameSpace("Ribbon", function (pathRibbon) {
    this.path = pathRibbon; //percorso del movie che contiene la ribbon all'interno dell'albero di genesi
    this.name = this.path.getName(); // nome della ribbon
    this.isInitialized = false;
});
jSim.Ribbon.extend({
/*
	 * Inizializza la ribbon settando il codice opportuno sui vari bottoni
	 */
    init: function () {
        this.addCodeFrame(this.path);
        this.specializedInit();
    },
/*
	 * Cicla sui movie e trova i frame
	 * @param: Object path - Path del movie
	 */
    addCodeMovie: function (path) {
        var i;
        for (i = 0; i < path.getObjectCount(); i += 1) {
            this.addCodeFrame(path.getObjectByNumber(i));
        }
    },
/*
	 * Cicla sui frame e trova i contenitori e movie
	 * @param path  -path del frame
	 */
    addCodeFrame: function (path) {
        var i, contenitore;
        for (i = 0; i < path.getObjectCount(); i += 1) {
            if (typeof path.getObjectByNumber(i).addFrame === "undefined") { //buttoncontainer
                contenitore = path.getObjectByNumber(i);
                this.initCode(contenitore);
            }
        }
    },
/*
	 * Assegnazione delle azioni su ogni bottone
	 * @param Object path - Path del contenitore di bottoni
	 */
    initCode: function (btnCont) {
        var i, buttonName, buttonPath;
        try {
            for (i = 0; i < btnCont.getObjectCount(); i += 1) {
                if (btnCont.getName() !== 'schermi') {
                    buttonName = $(this);
                    buttonPath = btnCont.getObjectByNumber(i);
                    buttonPath.setAction('over', "$('" + buttonName + "').mouseover(" + pathObj(buttonPath) + ")");
                    buttonPath.setAction('out', "$('" + buttonName + "').mouseout(" + pathObj(buttonPath) + ")");
                    buttonPath.setAction('click', "$('" + buttonName + "').mouseclick(" + pathObj(buttonPath) + ")");
                    buttonPath.setAction('down', "$('" + buttonName + "').mousedown(" + pathObj(buttonPath) + ")");
                    buttonPath.setAction('up', "$('" + buttonName + "').mouseup(" + pathObj(buttonPath) + ")"); /*  sovrascrivo le seguenti azioni se è l ultimo bottone (sfondo sezione) e se il contenitore ha piu oggetti (nel caso contrario abbiamo una tendina)  */
                    if (i === btnCont.getObjectCount() - 1 && btnCont.getObjectCount() !== 1) {
                        buttonPath.setAction('click', "");
                        buttonPath.setAction('down', "");
                        buttonPath.setAction('up', "");
                    }
                }
            }
        } catch (e) {
			Utils.printException(e,'initCode ribbon');
        }
    },
    mouseover: function (btn) {
        try {
            this.azzeraTab();
            btn.up().getObjectByNumber(btn.up().getObjectCount() - 1).goTo('mouseover');
            if (btn.getName().substr(0, 4) !== 'tnd_' && btn.getName().substr(0, 4) !== 'cmb_') {
                btn.goTo('mouseover');
            } else {
                btn.up().down(btn.getName().substr(4, btn.getName().length - 4)).goTo('mouseover1');
            }
        } catch (e) {
            try {
                btn.goTo('mouseover');
            } catch (ex) {
				Utils.printException(ex,'mouseover');
            }
        }
    },
    mouseout: function (btn) {
        try {
            if (btn.getName().substr(0, 4) !== 'tnd_' && btn.getName().substr(0, 4) !== 'cmb_') {
                btn.goTo('normal');
            } else {
                btn.up().down(btn.getName().substr(4, btn.getName().length - 4)).goTo('normal');
            }
        } catch (e) {
            try {
                btn.goTo('normal');
            } catch (ex) {
				Utils.printException(ex,'mouseout');
            }
        }
    },
    mousedown: function (btn) {
        try {
            if (btn.getName().substr(0, 4) !== 'tnd_' && btn.getName().substr(0, 4) !== 'cmb_') {
                btn.goTo('mousedown');
            } else {
                btn.up().down(btn.getName().substr(4, btn.getName().length - 4)).goTo('mousedown1');
            }
        } catch (e) {
            try {
                btn.goTo('mousedown');
            } catch (ex) {
				Utils.printException(ex,'mousedown');
            }
        }
    },
    mouseup: function (btn) {
        try {
            if (btn.getName().substr(0, 4) !== 'tnd_' && btn.getName().substr(0, 4) !== 'cmb_') {
                btn.goTo('mouseover');
            } else {
                btn.up().down(btn.getName().substr(4, btn.getName().length - 4)).goTo('mouseover1');
            }
        } catch (e) {
            try {
                btn.goTo('mouseover');
            } catch (ex) {
				Utils.printException(ex,'mouseup');
            }
        }
    },
    mouseclick: function (btn) {
        try {
            if (btn.getName().substr(0, 4) !== 'tnd_' && btn.getName().substr(0, 4) !== 'cmb_' && btn.getName().substr(0, 6) !== 'combo_' && btn.getName().substr(0, 4) !== 'sel_') {
                api.addAction(btn.getId());
                api.confirm();
            } else {
                if (btn.getName().substr(0, 4) !== 'sel_') {
                    this.apriTendina(btn.getName());
                } else {
                    api.addAction(btn.getId());
                }
            }
        } catch (e) {
			Utils.printException(e,'mouseclick');
        }
    },
    azzeraTab: function () {
        try {
            var tabCorrente = this.path,
                numSezioni = tabCorrente.getObjectCount(),
                i;
            for (i = 0; i < numSezioni; i += 1) {
                try {
                    tabCorrente.getObjectByNumber(i).setAllToFrame('normal');
                } catch (e) {}
            }
        } catch (ex) {
			Utils.printException(ex,'azzeraTab');
        }
    },
    apriTendina: function (buttonName) {
        try {
//            $('pathTendine') = root.down('1').down('tendine');
            var splitName = buttonName.split('_'),
                nomeTendina = splitName[1];
            if ((typeof $('pathTendine').down('1').down(nomeTendina)) === "function") {
                //api.addAction('Eccezione: il nome del bottone coincide con una funzione javascript: ' + buttonName);
                api.addAction('noTendina');
            } else {
                if (typeof $('pathTendine').down('1').down(nomeTendina) !== "undefined") {
                    this.openDropDownSelectionFromRibbon($('pathTendine'), nomeTendina);
                }
            }
        } catch (e) {
			Utils.printException(e,'apriTendina');
        }
    },
/*
	* funzione che gestisce l'apertura delle tendine da Ribbon 
	*/
    openDropDownSelectionFromRibbon: function (pathDropDown, nameDropDown) {
/*
			switch(nameDropDown){
				case'':
				break;
			}
		*/
        $('currentFocus', null);
        if (pathDropDown.down('1').down(nameDropDown).down('1').getObjectByNumber(0).getType() === 'movie') {
            pathDropDown.down('1').down(nameDropDown).down('1').getObjectByNumber(1).setAllToFrame('normal');
            pathDropDown.down('1').down(nameDropDown).goTo('1');
        } else {
            pathDropDown.down('1').down(nameDropDown).down('1').getObjectByNumber(0).setAllToFrame('normal');
            pathDropDown.down('1').down(nameDropDown).goTo('1');
        }
    },
    specializedInit: function () {
        // inserire qui il codice per l'assegnazione di azioni personalizzate ai bottoni
        customAction();
    }
});














