$('currentFocus', null);                         //tiene traccia del focus
$('currentTextbox', null);                       //tiene traccia della textbox correntemente attiva
$('popups', null);                               //contiene i popup presenti nella sim, viene utilizzata nella closePopups

$('pathEffettoFinale', root.down('1').down('effettoFinale'));
$('pathPopup', root.down('1').down('popups'));
$('pathFinestre', root.down('1').down('finestre'));
$('pathScheletri', root.down('1').down('scheletri'));
$('pathTendine', root.down('1').down('tendine'));

var objArray = [];

scorriAlbero(root);

//setInterval('disattiva_caps()',500);

handler = new ShortcutHandler('handler');
handler.l10n(charToKor);
handler.extend(gestioneCtrlAlt);

word.initPopups($('pathPopup'));
word.init($('pathScheletri').down('1').down('word'));

var timerID = null;

//aggiunta per l'automazione delle ribbon: personalizzare il percorso in base al sw
$('container', new jSim.RibbonContainer(word.ribbon.down('1').down('movie_tabs')));
$('headerRibbon', new jSim.RibbonHeader(word.ribbon.down('1')));
//$('headerRibbon', new jSim.RibbonHeader(word.ribbon.down('1').down('movieToolbars').down('2')));



//extendScroll_setta();

sim.init();



















































