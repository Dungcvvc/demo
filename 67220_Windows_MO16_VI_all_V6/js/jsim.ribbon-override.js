jSim.RibbonHeader.extend({
    initTab: function (btn, object) {
        try {
            var btnName = $(object);
            btn.setAction('over', "$('" + btnName + "').tabMouseover(" + pathObj(btn) + ")");
            btn.setAction('out', "$('" + btnName + "').tabMouseout(" + pathObj(btn) + ")");
            btn.setAction('click', "setTimeout(\"$('" + btnName + "').tabMouseclick(" + pathObj(btn) + ")\",400)");
            btn.setAction('rclick', "$('dxToolbars').open()");
            //btn.setAction('tripleclick', "uscita('1');");

			var name =  btnName.replace("_", "");
            //btn.setAction('doubleclick',"if($('ribbonVisibile') === '" + name + "'){sim.checkUscita();}");
        } catch (e) {
			Utils.printException(e,'initTab RibbonHeader');
        }
    }
});

jSim.Ribbon.extend({
	initCode: function (btnCont) {
        var i, buttonName, buttonPath;
        try {
            for (i = 0; i < btnCont.getObjectCount(); i += 1) {
                if (btnCont.getName().split('_')[0] !== 'schermi' && btnCont.getName().split('_')[0] !== 'spin') {
                    buttonName = $(this);
                    buttonPath = btnCont.getObjectByNumber(i);
                    buttonPath.setAction('rclick', "$('dxRibbon').open();");
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
			if(btn.getName().substr(0, 3) == 'up_' || btn.getName().substr(0, 5) == 'down_' ){
				btn.goTo('mouseover');
				btn.up().down("tnd_" +  btn.getName().split("_")[1]).goTo('mouseover1');
			}else if (btn.getName().substr(0, 4) !== 'tnd_' && btn.getName().substr(0, 4) !== 'cmb_') {
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

	openDropDownSelectionFromRibbon: function (pathDropDown, nameDropDown) {
			switch(nameDropDown){
				case'cambiaFinestraView':
					$('currentFocus', null);
					if(word.docActive === '1') {
						pathDropDown.down('1').down(nameDropDown).down('1').getObjectByNumber(0).setAllToFrame('normal');
						pathDropDown.down('1').down(nameDropDown).goTo('1');
					} else {
						pathDropDown.down('1').down(nameDropDown).down('2').getObjectByNumber(0).setAllToFrame('normal');
						pathDropDown.down('1').down(nameDropDown).goTo('2');
					}
					return;
				break;
			}
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
    }
});


jSim.RibbonHeader.extend({
    apriTab: function (tab) {
        try {
			if(tab){
				 var ribbonVisibile = tab.getName();
	
				$('ribbonVisibile', ribbonVisibile);
	
				if(word.docActive === '1') {
					$('ribbonVisibileDoc1', ribbonVisibile);
				} else if(word.docActive === '2') {
					$('ribbonVisibileDoc2', ribbonVisibile);
				}
	
				//istanzia un nuovo oggetto Ribbon associato al tab
				if ($(ribbonVisibile) === undefined) {
					$(ribbonVisibile, new jSim.Ribbon(tab.up().up().up().up().down('movie_tabs').down(ribbonVisibile)));
					$(ribbonVisibile).init();
				}
				//---------------------------------------------------//
	
	
				
	
				if (application.menu_isOpen) {
					this.chiudiMenu();
				}
				this.settaOther(tab.up().up().up().up());
				tab.up().setAllToFrame('normal');
				tab.goTo('click');
				tab.up().up().up().up().down('movie_tabs').goTo(tab.getName());
				this.azzeraTab();

			}

        } catch (e) {
			Utils.printException(e,'apriTab');
        }
    },

    switchDeseleziona: function () {
        try {
            switch (this.path.down('movie_tabs').getCurrentFrame().getName().substr(0, 4)) {
            case 'opt_':
                this.apriTab(this.path.down('movieToolbars').down('1').down('toolbars').down('home'));
                break;
			default :
				if(word.docActive === '1') {
					this.apriTab(this.path.down('movieToolbars').down('1').down('toolbars').down($('ribbonVisibileDoc1')));
				} else if(word.docActive === '2') {
					this.apriTab(this.path.down('movieToolbars').down('1').down('toolbars').down($('ribbonVisibileDoc2')));
				}


            }


        } catch (e) {
			Utils.printException(e,'switchDeseleziona');
        }
    }

})

























