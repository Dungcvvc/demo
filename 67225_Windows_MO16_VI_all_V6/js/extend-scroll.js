var paginaScrollPane;
var paginaScrollBar;
var arrayYPage = [];

function extendScroll_setta() {
    var altezzaPagina = 1056;
	var backgroundHeight = 632-Number(word.document.down('1').down('scroll').down('1').down('content').down('areaTesto').getHeight());

    paginaScrollPane = createHalfScrollPane(word.path.down('1').down('movie_barre').down('1').down('scrollV').down('scrollV'), 
											'VERTICAL_DIRECTION', 
											word.document.down('1').down('scroll').down('1'), 
											backgroundHeight, 216, 216, 
											word.path.down('1').down('movie_barre').down('1').down('scrollV').down('su'), 
											word.path.down('1').down('movie_barre').down('1').down('scrollV').down('giu'), 
											word.path.down('1').down('movie_barre').down('1').down('scrollV').down('sfondoV'));

    paginaScrollBar = paginaScrollPane.getScrollBar();

    Scroll_setYPage(altezzaPagina);

	handler.register('ctrl-page_down', 'custom',"!isUnder(word.barre.down('1').down('titolo').down('icona'));", function(){ Scroll_nextPage();});
	handler.register('ctrl-page_up', 'custom', "!isUnder(word.barre.down('1').down('titolo').down('icona'));", function(){ Scroll_prevPage();});

	handler.register('ctrl-home', 'custom',"!isUnder(word.barre.down('1').down('titolo').down('icona'));", function(){ Scroll_toPage(paginaScrollBar, paginaScrollPane, 1);;});
	handler.register('ctrl-end', 'custom', "!isUnder(word.barre.down('1').down('titolo').down('icona'));", function(){ Scroll_toPage(paginaScrollBar, paginaScrollPane, Number(word.pagine));});
}


function getNumPage(scrollBar, scrollPane) {

    var meter = scrollBar.meter;
    var pos_corrente = meter.cur;
    var paginaCorrente = Scroll_checkIntervalPage(pos_corrente);
    return paginaCorrente;
}

function setNumPage(str) {
	word.barre.down('1').down('pagine').setText(str + ' of' + word.pagine);
}

function Scroll_nextPage() {
    var pag_corr = getNumPage(paginaScrollBar, paginaScrollPane);
    if (pag_corr < parseInt(word.pagine)) {
        Scroll_toPage(paginaScrollBar, paginaScrollPane, pag_corr + 1);
    }
}

function Scroll_prevPage() {
    var pag_corr = getNumPage(paginaScrollBar, paginaScrollPane);
    if (pag_corr > 1) {
        Scroll_toPage(paginaScrollBar, paginaScrollPane, pag_corr - 1);
    }

}

function Scroll_toPage(scrollBar, scrollPane, page) {
    Scroll_OnPixel(scrollBar, scrollPane, Scroll_getYPage(page - 1));
    setNumPage(page);
}

function Scroll_checkIntervalPage(y) {
    var esito = false,
		numPage;
    for (var i = 0; i < arrayYPage.length - 1; i++) {
        if (y >= arrayYPage[i] && y < arrayYPage[i + 1]) {
            esito = true;
            numPage = i + 1;
            return numPage;
        }
    }

    if (!esito && y > 0) {
        numPage = arrayYPage.length;
        return numPage;
    } else {
        numPage = 1;
        return numPage;
    }
}

function Scroll_setYPage(delta) {
    for (var i = 0; i < parseInt(word.pagine); i++) {
        if (i == 0) {
            arrayYPage[i] = 0;
        } else {
            arrayYPage[i] = arrayYPage[i - 1] + delta;
        }
    }
}

function Scroll_getYPage(page) {
    return arrayYPage[page];
} /*---scroll ad un y stabilita da delta-----*/

function Scroll_OnPixel(scrollBar, scrollPane, delta) {
    var meter = scrollBar.meter;
    scrollBar.meter.setCur(delta);
    if (meter.cur > meter.max) scrollBar.meter.setCur(meter.max);
    scrollBar.updateView();
    scrollPane.scrollable.updateView();
    setTextAreaScroll(scrollBar);
}



function setTextAreaScroll(scrollBar) {
    try {

        var value = scrollBar.meter.cur,
            j = 0,
            length = aContTextArea.length;
        for (j; j < length; j += 1) {
            aContTextArea[j].setVerticalScrollPosition(value);
        }

    } catch (e) {
			Utils.printException(e,'setTextAreaScroll');
    }
}
















































