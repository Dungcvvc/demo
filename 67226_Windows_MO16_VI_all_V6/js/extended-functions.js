/**
 *
 * ##### initExtendedTextbox() NON DEVE MAI ESSERE TOLTA. #####
 * Al suo interno verrà popolato l'array del builder che conterrà le TextBox da 'estendere'
 *
 * E' possibile assegnare nuove proprietà ed effettuare l'override di metodi per ogni oggetto TextBox
 *
 * Tra le Proprietà delle TextBox è necessario inserire SEMPRE SOURCE_TEXTBOX: null in cui avremo il rifermento all'oggetto TextBox 
 *
 * Per quanto riguarda la conferma al momento del keypress sul tasto ENTER, bisogna specificare, per ogni singola Textbox, quale funzione richiamare
 * Esempio: ENTER_CONFIRM: 'enterConfirmFunction();'
 *
 * Se si volessero gestire, in una singola TextBox, il CTRL_C, il CTRL_V e il CTRL_A si potrebbe aggiungere alla lista delle proprietà o la funzione custom che si vuole eseguire nel determinato evento
 * oppure, se si vuole semplicemente prevenire l'evento di default, settare la proprietà a false;
 *
 * ESEMPIO 1: 
 * txtList.push({ID:'txt_40255', SOURCE_TEXTBOX: null, ENTER_DISABLED: true, NEW_HEIGHT: '19px', OUTLINE: 'none', MAX_CHAR: 15, CTRL_C: false});
 * questo per prevenire il comportamento di default (ovvero la copia del testo che non sarà più possibile effettuare)
 
 * ESEMPIO 2: 
 * txtList.push({ID:'txt_40255', SOURCE_TEXTBOX: null, ENTER_DISABLED: true, NEW_HEIGHT: '19px', OUTLINE: 'none', MAX_CHAR: 15, CTRL_C: 'myFunction();'});
 * questo per eseguire myFunction() al posto dell'evento di default
 *
 */
function initExtendedTextbox(){
	
	let txtList = new Array();
	let array = [''];
	//
	//txtList.push({ID:'txt_6567', SOURCE_TEXTBOX: null, ENTER_DISABLED: true, NEW_HEIGHT: '17px', OUTLINE: 'none', MAX_CHAR: 50, FONT_SIZE: '12px', BACKGROUND_COLOR : 'white', OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', OPACITY : '1', REMOVE_ATTRIBUTE : array, ENTER_CONFIRM: 'KeyboardProxy.prototype.enterEvent();'});
	//



	return txtList;
};
/**
 *
 */

/**
 * 
 * Per ogni metodo di cui si vuole fare l'override bisognerà vedere il paramentro che viene passato e passarlo allo steso modo nel nuovo metodo 
 *
 * in questo caso xEvent DEVE essere passato come parametro 
 * e successivamente bisogna 'catturare' il target dell'evento scatenato nel modo che segue:
 *
 * let currentTarget = xEvent.sourceEevent.currentTarget;
 * 
 *
 *	ExtendedTextBox.prototype.onClick = function (xEvent){
 *		let currentTarget = xEvent.sourceEevent.currentTarget;
 *		switch (currentTarget.id){
 *			case 'txt_40255':
 *			case 'txt_40256':
 *			case 'txt_40257':
 *				xEvent.sourceEevent.preventDefault();
 *				let btn = xEvent.target.up().down('schermo').down(xEvent.target.getName());
 *				sezioneExcel.clickCella(btn);
 *				break;
 *			default:
 *				TextBox.executeAction('click', MouseAction.LEFTBUTTON);
 *		}
 *	};
 *
 *
 * E' possibile aggiungere alla seguente lista tutti i path relativi a caselle di testo statiche, presenti in ogni domanda (per esempio word avrà tutte quelle relative al font);
 * Oltre al PATH, possiamo passargli anche delle proprietà che saranno immutate per la textbox statica in questione (ad esempio per il titolo delle domande word, excel o ppt modifichiamo il font-size)
 *
 */
 function initStaticExtendedTextbox(){
	let staticTxtList = new Array();//scheletro cartella
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('cartella').down('1').down('barre').down('1').down('barraStato').down('1').down('barra')"});
//scheletro IE
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('barre').down('1').down('indirizzo').down('1').down('indirizzo')", OVERFLOW: 'hidden', NEW_WIDTH: '205px', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('barre').down('1').down('indirizzo').down('1').down('tab_titolo')", OVERFLOW: 'hidden', NEW_WIDTH: '155px', WHITE_SPACE: 'nowrap'});
//scheletro Cartella 
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('cartella').down('1').down('movie_barre').down('1').down('titolo').down('1').down('txtTitolo')", MARGIN: '1px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('cartella').down('1').down('movie_barre').down('1').down('stato').down('1').down('txt1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('cartella').down('1').down('movie_barre').down('1').down('stato').down('1').down('txt2')"});
//scheletro Gmail
	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_dx').down('1').down('a')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_dx').down('1').down('oggetto')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_dx').down('1').down('area')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('ricerca')"});
//start Scheletro Word
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('documento').down('1').down('titolo')", TEXT_COLOR : 'rgb(245,245,245)'});
	//****popup
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTesto').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTesto').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxVuoto').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxVuoto').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	//****menu file
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('menu').down('1').down('submenu').down('1').down('user')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('menu').down('1').down('submenu').down('1').down('pagine')", BACKGROUND_COLOR : 'transparent',MARGIN: '1px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('menu').down('1').down('submenu').down('1').down('parole')", BACKGROUND_COLOR : 'transparent',MARGIN: '1px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('menu').down('1').down('submenu').down('1').down('infoDocument')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('menu').down('1').down('submenu').down('4').down('preview')"});
	//****barre
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('movie_barre').down('1').down('pagine')", OVERFLOW: 'hidden', NEW_WIDTH: '60px', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('movie_barre').down('1').down('parole')", OVERFLOW: 'hidden', NEW_WIDTH: '81px', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('movie_barre').down('1').down('zoom')"});
	//****ribbon
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('home').down('font')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('home').down('size')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('pageLayout').down('pageLayout_sx')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('pageLayout').down('pageLayout_dx')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('pageLayout').down('pageLayout_after')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('pageLayout').down('pageLayout_before')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_immagine_imageSet').down('img_height')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_immagine_imageSet').down('img_width')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_tabella_tableLayout').down('table_height')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('word').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_tabella_tableLayout').down('table_width')"});
//end Scheletro Word

//start Scheletro Excel
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('document').down('1').down('titolo')", TEXT_COLOR : 'rgb(245,245,245)'});
	//****popup
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTesto').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTesto').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxImg').down('1').down('altezza')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxImg').down('1').down('larghezza')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGrafico').down('1').down('carattere')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGrafico').down('1').down('dimensione')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGrafico').down('1').down('testo')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGraficoArea').down('1').down('dimensione')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGraficoArea').down('1').down('carattere')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGraficoArea').down('1').down('testo')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxSerie').down('1').down('testo')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxSerie1').down('1').down('testo')", BACKGROUND_COLOR : 'white', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxCella').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxCella').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxRiga').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxRiga').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxColonna').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxColonna').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	
	//****menu file
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('menu').down('1').down('submenu').down('1').down('nameDocument')",BACKGROUND_COLOR : 'transparent',TEXT_COLOR: 'rgb(33,115,70)',OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '20px',NEW_HEIGHT: '25px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('menu').down('1').down('submenu').down('7').down('nameDocument')",BACKGROUND_COLOR : 'transparent',TEXT_COLOR: 'rgb(33,115,70)',OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '20px',NEW_HEIGHT: '25px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('menu').down('1').down('submenu').down('1').down('user')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('menu').down('1').down('submenu').down('1').down('infoDocument')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('menu').down('1').down('submenu').down('6').down('preview')",NEW_HEIGHT: '40px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('menu').down('1').down('submenu').down('5').down('anteprima').down('3').down('nomeFile')",BACKGROUND_COLOR : 'white'});
	//****barre
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('movie_barre').down('1').down('formula')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('movie_barre').down('1').down('namebox')", BACKGROUND_COLOR : 'white',NEW_WIDTH : '70px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('movie_barre').down('1').down('sheetNavigation').down('1').down('1')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('movie_barre').down('1').down('sheetNavigation').down('1').down('2')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('movie_barre').down('1').down('sheetNavigation').down('1').down('3')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '13px'});
	//****ribbon
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('ribbon').down('1').down('movie_tabs').down('home').down('font')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('ribbon').down('1').down('movie_tabs').down('home').down('size')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('ribbon').down('1').down('movie_tabs').down('home').down('format')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_immagine_immagineFormat').down('img_height')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_immagine_immagineFormat').down('img_width')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_grafico_graficoLayout').down('selection')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('excel').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_grafico_graficoFormat').down('selection')"});
	
	//end Scheletro Excel

//start Scheletro Access
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('title')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('5')"});
	//****menu file
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('menu').down('1').down('submenu').down('info').down('title')", NEW_HEIGHT: '30px', OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '15px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('menu').down('1').down('submenu').down('new').down('newFile')", BACKGROUND_COLOR : 'white'});
	//****ribbon
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_tableView_modifyFields').down('valueFiled')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_tableView_modifyFields').down('value2Filed')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_formDesign_formFormat').down('field')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_formDesign_formFormat').down('font_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_formDesign_formFormat').down('size')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_formDesign_formFormat').down('value')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_reportDesign_reportFormat').down('field')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_reportDesign_reportFormat').down('font_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_reportDesign_reportFormat').down('size')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('access').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_reportDesign_reportFormat').down('value')"});
//end Scheletro Access
	
	
//start Scheletro PPT
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('document').down('1').down('titolo')", TEXT_COLOR : 'rgb(245,245,245)' });
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('document').down('1').down('slide').down('2').down('txt2')"});
	//****popup
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxBordoTesto').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxBordoTesto').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTesto').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTesto').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxForme').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxForme').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxImg').down('1').down('altezza')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxImg').down('1').down('larghezza')", BACKGROUND_COLOR : 'white'});	
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGrafico').down('1').down('testo')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGrafico').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxGrafico').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxOrganigramma').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxOrganigramma').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTabella').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTabella').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTabellaRigaColonna').down('1').down('carattere')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxTabellaRigaColonna').down('1').down('dimensione')", BACKGROUND_COLOR : 'white'});
	//****menu file
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('menu').down('1').down('submenu').down('1').down('title')", NEW_HEIGHT: '30px', OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '15px', BACKGROUND_COLOR : 'white'});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('menu').down('1').down('submenu').down('1').down('slides')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('menu').down('1').down('submenu').down('5').down('anteprima').down('3').down('nomeFile')", BACKGROUND_COLOR : 'white',MARGIN: '1px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('menu').down('1').down('submenu').down('5').down('anteprima').down('3').down('nomeFile')"});
	//****barre	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('movie_barre').down('1').down('movie_stato').down('1').down('slide')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '10px',NEW_WIDTH : '105px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('movie_barre').down('1').down('movie_stato').down('1').down('theme')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '11px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('movie_barre').down('1').down('movie_stato').down('1').down('zoom')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('movie_barre').down('1').down('movie_stato').down('1').down('language')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', FONT_SIZE: '11px'});
	//****ribbon
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('home').down('carattere')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('home').down('dimensione')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_immagine_immagineFormat').down('img_height')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_immagine_immagineFormat').down('img_width')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_grafico_graficoFormat').down('selection')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_grafico_graficoFormat').down('chart_height')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_grafico_graficoFormat').down('chart_width')", BACKGROUND_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_grafico_graficoLayout').down('chartElement')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_grafico_graficoFormat').down('chartElement')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_tabella_tabellaLayout').down('table_height')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('powerpoint').down('1').down('ribbon').down('1').down('movie_tabs').down('opt_tabella_tabellaLayout').down('table_width')"});
//end Scheletro PPT

//start Scheletro onlineCollaboration

	//****appNames
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('0')", TEXT_VALUE :' Messages'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('1')",  TEXT_VALUE :' Contactos'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('2')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('3')",  TEXT_VALUE :'  Reloj'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('4')",  TEXT_VALUE :'  Mapas'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('5')", TEXT_VALUE :'  Tiempo'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('6')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('7')", TEXT_VALUE :'  Voz IP'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('8')", NEW_WIDTH: '75px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('9')", TEXT_VALUE :'  Fotos'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('10')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('11')", NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('12')", TEXT_VALUE :' Telefono'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('13')", TEXT_VALUE :'  Correo'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('14')", TEXT_VALUE :'  Musica'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('touchscreen').down('1').down('app_names').down('1').down('15')", TEXT_VALUE :'  Camera'});

	//****appConteiner
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('title')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('header_left')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('header_right')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('home')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('footer_right')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('footer_left')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});

	//****appImpostazioni
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_1_0')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_1_1')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_1_2')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_1_3')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_1_4')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_1_5')", OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_2_0')", NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_2_1')", NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_2_2')", NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_2_3')", NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_2_4')", NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('10').down('txt').down('1').down('field_2_5')", NEW_HEIGHT: '30px'});
	
	//****app18	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('18').down('field_1')", OUTLINE: 'none',NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('18').down('field_0')", OUTLINE: 'none', OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', OPACITY : '1',NEW_WIDTH: '280px',OVERFLOW: 'hidden',  NEW_POSITION : 'translate(335, 208)'});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('18').down('search')", OUTLINE: 'none', OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', OPACITY : '1', OVERFLOW: 'hidden',DISABLED: false, ENTER_CONFIRM: 'KeyboardProxy.prototype.enterEvent();'});	
	
	//****app17		
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_1_0')",NEW_HEIGHT: '55px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_1_1')",NEW_HEIGHT: '55px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_1_2')",NEW_HEIGHT: '55px'});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_1_3')",NEW_HEIGHT: '55px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_1_4')",NEW_HEIGHT: '55px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_2_0')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_2_1')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_2_2')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_2_3')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_2_4')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_3_0')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_3_1')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_3_2')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_3_3')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('17').down('txt').down('1').down('field_3_4')"});	

	//****app8		
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_1_0')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_1_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_1_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_1_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_1_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_2_0')", NEW_POSITION : 'translate(395, 191)',NEW_WIDTH: '80px'});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_2_1')", NEW_POSITION : 'translate(395, 255)',NEW_WIDTH: '80px'});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_2_2')", NEW_POSITION : 'translate(395, 319)',NEW_WIDTH: '80px'});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_2_3')", NEW_POSITION : 'translate(395, 383)',NEW_WIDTH: '80px'});		
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_2_4')", NEW_POSITION : 'translate(395, 447)',NEW_WIDTH: '80px'});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_3_0')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_3_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_3_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_3_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_3_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_4_0')",NEW_WIDTH: '140px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_4_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_4_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_4_3')",NEW_WIDTH: '140px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('8').down('txt').down('1').down('field_4_4')"});
		
	//****app4	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('4').down('field_0')", NEW_POSITION : 'translate(240, 189)',NEW_WIDTH: '270px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('4').down('field_1')",NEW_HEIGHT: '30px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mobile').down('1').down('appContainer').down('1').down('apps').down('4').down('search')", DISABLED: false, NEW_HEIGHT: '19px', OUTLINE: 'none', MAX_CHAR: 50, BACKGROUND_COLOR : 'white', OVERFLOW: 'hidden', WHITE_SPACE: 'nowrap', OPACITY : '1', ENTER_CONFIRM: 'KeyboardProxy.prototype.enterEvent();'});
		
	
	
	//start Scheletro PRJ2016
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('project').down('1').down('documento').down('1').down('titolo')", TEXT_COLOR : 'white', FONT_SIZE: '10px'});	

	//****popup
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxRiga').down('1').down('carattere')"});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxRiga').down('1').down('dimensione')"});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxCella').down('1').down('carattere')"});
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxCella').down('1').down('dimensione')"});
	
	//****menu file
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('project').down('1').down('menu').down('1').down('infoDocument')"});	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('project').down('1').down('menu').down('1').down('submenu').down('1').down('dataInizio')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('project').down('1').down('menu').down('1').down('submenu').down('1').down('dataFine')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('project').down('1').down('menu').down('1').down('submenu').down('1').down('prgDa')", WHITE_SPACE: 'nowrap', NEW_WIDTH: '55px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('project').down('1').down('menu').down('1').down('submenu').down('6').down('preview')"});
	
	//end Scheletro PRJ2016
	
//end Scheletro onlineCollaboration
//  Scheltro Chrome
	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('chrome').down('1').down('barre').down('1').down('tab').down('1').down('tab_titolo')",MARGIN:'1px',WHITE_SPACE: 'nowrap',OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('chrome').down('1').down('barre').down('1').down('indirizzo').down('1').down('indirizzo')", NEW_WIDTH: '400px'});
	
//  Scheltro Chrome Mail
	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('barre').down('1').down('tab').down('1').down('tab_titolo')",MARGIN:'1px',WHITE_SPACE: 'nowrap',OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('barre').down('1').down('indirizzo').down('1').down('indirizzo')", NEW_WIDTH: '400px'});
	
//	Scheletro Gmail
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('data_1')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('data_2')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('data_3')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('data_4')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('data_5')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('data_6')",FONT_SIZE: '13px'});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('testo_1')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('testo_2')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('testo_3')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('testo_4')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('testo_5')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('testo_6')",FONT_SIZE: '13px'});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('oggetto_1')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('oggetto_2')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('oggetto_3')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('oggetto_4')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('oggetto_5')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('oggetto_6')",FONT_SIZE: '13px'});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('contatto_1')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('contatto_2')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('contatto_3')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('contatto_4')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('contatto_5')",FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('1').down('contatto_6')",FONT_SIZE: '13px'});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('data_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('data_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('data_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('data_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('data_5')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('data_6')"});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('testo_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('testo_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('testo_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('testo_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('testo_5')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('testo_6')"});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('oggetto_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('oggetto_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('oggetto_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('oggetto_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('oggetto_5')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('oggetto_6')"});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('contatto_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('contatto_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('contatto_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('contatto_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('contatto_5')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_obj').down('2').down('contatto_6')"});

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_dx').down('2').down('num_mail')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('explorer').down('1').down('gmail').down('1').down('movie_dx').down('8').down('num_mail')"});

//	Scheletro Outolook 2016	GENERALE
	//menu
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('menu').down('1').down('infoDocument')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('menu').down('1').down('submenu').down('1').down('email')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('menu').down('1').down('submenu').down('4').down('preview')",FONT_SIZE: '14px', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('menu').down('1').down('submenu').down('5').down('email')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('menu').down('1').down('submenu').down('5').down('email_1')"});
	//barre
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('movie_barre').down('1').down('email')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('movie_barre').down('1').down('numberEmail')", MARGIN: '1px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('movie_barre').down('1').down('read')", WHITE_SPACE: 'nowrap'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('movie_barre').down('1').down('unread')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('movie_barre').down('1').down('stato')"});	
	//sezione mail
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('titolo')", TEXT_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('search')", MARGIN: '1px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('current')", MARGIN: '1px'});
	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('contatto_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('oggetto_1')", WHITE_SPACE: 'nowrap', TEXT_COLOR:'rgb(0,98,150)',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('testo_1')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('data_1')", WHITE_SPACE: 'nowrap', TEXT_COLOR:'rgb(0,98,150)'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('contatto_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('oggetto_2')", WHITE_SPACE: 'nowrap', TEXT_COLOR:'rgb(0,98,150)',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('testo_2')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('data_2')", WHITE_SPACE: 'nowrap', TEXT_COLOR:'rgb(0,98,150)'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('contatto_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('oggetto_3')", WHITE_SPACE: 'nowrap',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('testo_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('data_3')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('contatto_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('oggetto_4')", WHITE_SPACE: 'nowrap', FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('testo_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('data_4')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('contatto_5')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('oggetto_5')", WHITE_SPACE: 'nowrap',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('testo_5')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('outlook').down('1').down('document').down('1').down('center').down('1').down('mail').down('1').down('data_5')"});	
	
//	Scheletro Outolook 2016	WRITE	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('menu').down('1').down('infoDocument')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('menu').down('1').down('submenu').down('1').down('oggetto')",FONT_SIZE: '16px', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('menu').down('1').down('submenu').down('4').down('preview')",FONT_SIZE: '14px', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('menu').down('1').down('submenu').down('6').down('email')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('menu').down('1').down('submenu').down('6').down('email_1')"});
	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('ribbon').down('1').down('movie_tabs').down('message').down('carattere')", BACKGROUND_COLOR : 'white',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('ribbon').down('1').down('movie_tabs').down('message').down('dimensione')", BACKGROUND_COLOR : 'white',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('ribbon').down('1').down('movie_tabs').down('formatText').down('carattere')", BACKGROUND_COLOR : 'white',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('ribbon').down('1').down('movie_tabs').down('formatText').down('dimensione')", BACKGROUND_COLOR : 'white',FONT_SIZE: '13px'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('document').down('1').down('to')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('document').down('1').down('cc')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('document').down('1').down('bcc')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('document').down('1').down('titolo')", TEXT_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('document').down('1').down('subject')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('write').down('1').down('document').down('1').down('testo')"});		

//	Scheletro Outolook 2016	READ

	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('menu').down('1').down('infoDocument')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('menu').down('1').down('submenu').down('1').down('oggetto')",FONT_SIZE: '16px', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('menu').down('1').down('submenu').down('4').down('preview')",FONT_SIZE: '14px', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('menu').down('1').down('submenu').down('6').down('email')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('menu').down('1').down('submenu').down('6').down('email_1')"});
	
	staticTxtList.push({PATH : "root.down('1').down('popups').down('1').down('dxObjectMail').down('1').down('email')", WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden', BACKGROUND_COLOR : 'white', TEXT_COLOR : 'black', NEW_HEIGHT: '30px',FONT_SIZE: '12px'});		
	
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('document').down('1').down('titolo')", TEXT_COLOR : 'white'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('document').down('1').down('contatto')",FONT_SIZE: '13px', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('document').down('1').down('email')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('document').down('1').down('oggetto')",FONT_SIZE: '13px', WHITE_SPACE: 'nowrap', OVERFLOW: 'hidden'});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('document').down('1').down('testo')"});
	staticTxtList.push({PATH : "root.down('1').down('scheletri').down('1').down('mail').down('1').down('document').down('1').down('data')"});	

	return staticTxtList;
};



