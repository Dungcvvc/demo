

/*--------------------------------------------GESTIONE FINESTRA SALVA--------------------------------------------*/

var salva_pathSalva ;
var salva_pathTendine;
var winSave_opened = false;
/* salva_software   variabile che ci permette di personalizzare la finestra a seconda del software che la apre 
		valori ammessi  --> word
						--> excel
						--> access
						--> powerpoint
*/
var salva_software;

/*  salva_enableTendineIndirizzi  variabile che ci permette di decidere se aprire o meno le tendine della barra indirizzi */
var salva_enableTendineIndirizzi;

/*  onlySave  variabile che ci inibisce tutte le operazioni a meno del salvataggio nella finestra senza navigare e selezionare cartelle o file all'interno */
var salva_onlySave;

/*  initFolder  variabile che ci dice da quale cartella vogliamo far aprire la finestra inizialmente i valori possibili sono i nomi dei frame del movie_cartelle */
var salva_initFolder;

/*salva_tipoFile ci dice quale tipo è stato settato per eventuali controlli su riaperture tendine ed uscite*/
var salva_tipoFile=1;
var salva_tipoFileInit=1;

/*la variabile salva_enableSetTipo ci permette di decidere o meno se aprire la tendina tipo file*/

var salva_enableSetTipo = true;

/* salva_typeWindow ci permette di aprire la finestra in modalità salva o apri  
		valori ammessi  --> save
						--> open
*/
var salva_typeWindow;

var salva_nomeFile;
var salva_tipoFileText;

var salva_strTitleOpen ;
var salva_strTitleSave ;
var salva_strNameFileInit ;
var salva_behavior = 'saveAs'; // definisce il comportamento comwe save o saveAs
var salva_strUscita;

var salva_modify;
function salva_setta(path){
			salva_software = 'word';
			salva_initFolder = 'root';
			setVariable('salva_itemSalva','null');
			setVariable('salva_cartellaSalva', salva_initFolder);
			salva_pathSalva = path;
			salva_pathTendine = salva_pathSalva.down('1').down('tendine');
			salva_enableTendineIndirizzi = true;
			salva_strUscita = salva_pathSalva.down('0').down('strUscita').getText();
			salva_strNameFileInit = salva_pathSalva.down('0').down('nomeFile').getText();
			salva_strTitleOpen = salva_pathSalva.down('0').down('titleOpen').getText();
			salva_strTitleSave = salva_pathSalva.down('0').down('titleSave').getText(); 

			salva_typeWindow = 'save';
			salva_nomeFile = salva_pathSalva.down('1').down('type_window').down('save').down('nomeFile');

			salva_nomeFile.addAction("mousedown","salva_back(salva_pathSalva.down('1').down('movie_cartelle').down('root').down('back').down('b'));", MouseAction.RIGHTBUTTON);
			salva_nomeFile.addAction("mousedown","salva_back(salva_pathSalva.down('1').down('movie_cartelle').down('root').down('back').down('b'));", MouseAction.LEFTBUTTON);
			salva_nomeFile.setDeactivationOnOuterClick(true);
			salva_nomeFile.setSelectionColor("rgb(51,153,255)");
			salva_nomeFile.setSelectAllOnFirstClick(true);
			salva_nomeFile.setTextRendering("auto");
			salva_nomeFile_open = salva_pathSalva.down('1').down('type_window').down('open').down('nomeFile');

			salva_nomeFile_open.addAction("mousedown","salva_back(salva_pathSalva.down('1').down('movie_cartelle').down('root').down('back').down('b'));", MouseAction.RIGHTBUTTON);
			salva_nomeFile_open.addAction("mousedown","salva_back(salva_pathSalva.down('1').down('movie_cartelle').down('root').down('back').down('b'));", MouseAction.LEFTBUTTON);
			salva_nomeFile_open.setDeactivationOnOuterClick(true);
			salva_nomeFile_open.setSelectionColor("rgb(51,153,255)");
			salva_nomeFile_open.setSelectAllOnFirstClick(true);
			salva_nomeFile_open.setTextRendering("auto");
			if(salva_typeWindow == 'save'){
				salva_tipoFileText = salva_pathSalva.down('1').down('type_window').down('save').down('tipoFile');
				salva_tipoFileText.setOpacity(0);
				salva_tipoFileText.setFontFamily('Arial');
				salva_tipoFileText.setTextRendering("auto");
			}
			salva_pathSalva.down('1').down('movie_cartelle').down('root').down('cartella1').setTextRendering("auto");
			salva_pathSalva.down('1').down('movie_cartelle').down('root').down('cartella2').setTextRendering("auto");	
			salva_pathSalva.down('1').down('movie_cartelle').down('root').down('cartella1').setOpacity(0);
			salva_pathSalva.down('1').down('movie_cartelle').down('root').down('cartella1').setFontFamily('Arial');			
			salva_pathSalva.down('1').down('movie_cartelle').down('root').down('cartella2').setOpacity(0);	
			salva_pathSalva.down('1').down('movie_cartelle').down('root').down('cartella2').setFontFamily('Arial');		
			salva_pathSalva.down('1').down('icon').down('1').down('titleWin').setOpacity(0);
			salva_pathSalva.down('1').down('icon').down('1').down('titleWin').setFontFamily('Arial');
			salva_pathSalva.down('1').down('icon').down('1').down('titleWin').setFontSize(12);
			
			salva_onlySave = false;
		

			handler.register('invio','custom',"!isUnder(salva_pathSalva.down('1').down('type_window').down(salva_typeWindow).down(salva_typeWindow).down('save')) || !isUnder(salva_pathSalva.down('1').down('movie_apri').down(salva_typeWindow).down('apri').down('apri'))",
				function(){
					salva_uscita('salva',salva_pathSalva);
				});

			/*handler.register('alt-s','custom',"!isUnder(salva_pathSalva.down('1').down('type_window').down(salva_typeWindow).down(salva_typeWindow).down('save'))",
				function(){
					salva_uscita('salva',salva_pathSalva);
				});

			handler.register('alt-o','custom',"!isUnder(salva_pathSalva.down('1').down('movie_apri').down(salva_typeWindow).down('apri').down('apri'))",
				function(){
					salva_uscita('salva',salva_pathSalva);
				});

			handler.register('shift-f10','custom',"!isUnder(salva_pathSalva.down('1').down('movie_cartelle').down('root').down('folder').down('cartella1'))",
				function(){
					salva_shiftf10Folder();
				});

			handler.register('alt-n','custom',"!isUnder(salva_pathSalva.down('1').down('saveAs').down('x'))",
				function(){
					salva_selectNameFile();
				});*/

			//handler.register('l','actAs',"!isUnder($('pathPopup').down('1').down('dxFolderSave').down('1').down('dxFolderSave').down('l'))", $('pathPopup').down('1').down('dxFolderSave').down('1').down('dxFolderSave').down('l'));
			//handler.register('o','actAs',"!isUnder($('pathPopup').down('1').down('dxFolderSave').down('1').down('dxFolderSave').down('o'))", $('pathPopup').down('1').down('dxFolderSave').down('1').down('dxFolderSave').down('o'));

			//handler.register('alt_freccia_dx','actAs',"!isUnder(salva_pathSalva.down('1').down('saveAs').down('avanti'))", salva_pathSalva.down('1').down('saveAs').down('avanti'));
			//handler.register('alt_freccia_sx','actAs',"!isUnder(salva_pathSalva.down('1').down('saveAs').down('indietro'))", salva_pathSalva.down('1').down('saveAs').down('indietro'));
			//handler.register('alt_freccia_su','actAs',"!isUnder(salva_pathSalva.down('1').down('saveAs').down('indietro'))", salva_pathSalva.down('1').down('saveAs').down('indietro'));
			//handler.register('backspace','actAs',"!isUnder(salva_pathSalva.down('1').down('saveAs').down('indietro')) && !salva_pathSalva.down('1').down('type_window').down(salva_typeWindow).down('nomeFile').isActive()", salva_pathSalva.down('1').down('saveAs').down('indietro'));


			handler.register('f12', 'custom', "!isUnder(word.barre.down('1').down('titolo').down('save'))  && !winSave_opened", function() {
					 salva_apri();
			} );
			handler.register('shift-f12', 'custom', "!isUnder(word.barre.down('1').down('titolo').down('save'))  && !winSave_opened", function() {
					 //salva_apri();
					//sim.apriMenuSalva();
			} );
			handler.register('alt-shift-f2', 'custom', "!isUnder(word.barre.down('1').down('titolo').down('save'))  && !winSave_opened", function() {
					 //salva_apri();
					//sim.apriMenuSalva();
			} );
			handler.register('alt-1', 'custom', "!isUnder(word.barre.down('1').down('titolo').down('save'))  && !winSave_opened", function() {
					 //salva_apri();
			} );
			handler.register('ctrl-b', 'custom', "!isUnder(word.barre.down('1').down('titolo').down('save'))  && !winSave_opened", function() {
					 //salva_apri();
					//sim.apriMenuSalva();
			} );
/*
			handler.register('ctrl-shift-s', 'custom', "!isUnder(excel_doc.down('1').down('sfondo').down('menu')) && !winSave_opened", function() {
					 salva_apri();
			} );

			handler.register('alt-a', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('menu'))", application.menu.down('1').down('menu').down('salvaconnome'));
			handler.register('a', 'actAs', "currentFocus == 'menu' && !isUnder(application.menu.down('1').down('menu').down('menu'))", application.menu.down('1').down('menu').down('salvaconnome'));

			handler.register('alt-s', 'actAs', "!isUnder(application.menu.down('1').down('menu').down('menu'))", application.menu.down('1').down('menu').down('salva'));
			handler.register('s', 'actAs', "currentFocus == 'menu' && !isUnder(application.menu.down('1').down('menu').down('menu'))", application.menu.down('1').down('menu').down('salva'));


			handler.register('alt-d', 'custom', "!isUnder(application.menu.down('1').down('menu').down('menu'))", 
				function(){
					var btn = application.menu.down('1').down('menu').down('5');
					currentFocus = 'menu_salva';
					if(btn.getCurrentFrame()!= 'click' ){
						btn.up().setAllToFrame('normal');
						btn.goTo('click');
						btn.up().up().down('submenu').goTo(btn.getName());
						openShare(share);
					}
				}
			);
			handler.register('d', 'custom', "currentFocus == 'menu' && !isUnder(application.menu.down('1').down('menu').down('menu'))", 
				function(){
					var btn = application.menu.down('1').down('menu').down('5');
					currentFocus = 'menu_salva';
					if(btn.getCurrentFrame()!= 'click' ){
						btn.up().setAllToFrame('normal');
						btn.goTo('click');
						btn.up().up().down('submenu').goTo(btn.getName());
						openShare(share);
					}
				}
			);
			*/
			//handler.register('c', 'actAs', "currentFocus == 'menu_salva'", application.menu.down('1').down('submenu').down('5').down('5').down('fileType'));
}


/*-------------------------------FINE GESTIONE FINESTRA SALVA--------------------------------------------*/































