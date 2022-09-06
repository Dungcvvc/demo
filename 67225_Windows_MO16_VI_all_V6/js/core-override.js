/*
 * Override dei metodi del core di Genesi
 */

// Aggiunge il reset del current focus
Button.prototype.onClick = function () {
	$('currentFocus', null);
    this.doAction(this.data.a.click, "onClick");
};

// Aggiunge il reset del current focus
Button.prototype.onRightClick = function () {
	$('currentFocus', null);
    this.doAction(this.data.a.rclick, "onRightClick");
};

// Aggiunge il reset del current focus
TextBox.prototype.setDeactivationOnOuterClick = function (b) {
	$('currentFocus', null);
    this.deactivateOnOuterClick = b;
};

// Aggiunge il reset del current focus
Button.prototype.onMouseDown=function(){handler.resetMultiShortcutData();this.doAction(this.data.a.down,"onMouseDown");};

// Modifica al metodo di stampa delle eccezioni per evitare alert
Button.prototype.doAction=function(action,eventType){if(action==undefined||action=="")return; try{eval(action);}catch(e){api.addAction("[EXCEPTION] "+e); api.addAction("action: "+action);}};

//Tiene traccia delle caselle attivate
TextBox.prototype.activate = function () {
	$('currentTextbox', this);
    //if (this.visible)
    this.data.k.activateTextBox(this)
};

//Reset della variabile che tiene traccia delle caselle attivate
TextBox.prototype.deactivate = function () {
	$('currentTextbox', null);
    this.clicksNumber = 0;
    if (this.caret != null) this.data.k.deactivateTextBox()
};

/*---patch per aggiornare il numero di pagina sulla casella-----*/

ScrollPaneHandler.prototype.onNextStep = function (type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onNextStep", type);
    var scrollBar = this.pane.getScrollBar(type);
    var meter = scrollBar.meter;
    scrollBar.meter.setCur(meter.cur + meter.step);
    if (meter.cur > meter.max) scrollBar.meter.setCur(meter.max);
    scrollBar.updateView();
    this.pane.scrollable.updateView();
	/*extend*/
	setTextAreaScroll(scrollBar);
	setNumPage(Scroll_checkIntervalPage(meter.cur + meter.step));
};

ScrollPaneHandler.prototype.onPrevStep = function (type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onPrevStep", type);
    var scrollBar = this.pane.getScrollBar(type);
    var meter = scrollBar.meter;
    scrollBar.meter.setCur(meter.cur - meter.step);
    if (meter.cur < meter.min) scrollBar.meter.setCur(meter.min);
    scrollBar.updateView();
    this.pane.scrollable.updateView();
	/*extend*/
	setTextAreaScroll(scrollBar);
	setNumPage(Scroll_checkIntervalPage(meter.cur - meter.step));
};

ScrollPaneHandler.prototype.onNextPage = function (type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onNextPage", type);
    var scrollBar = this.pane.getScrollBar(type);
    var meter = scrollBar.meter;
    scrollBar.meter.setCur(meter.cur + meter.page);
    if (meter.cur > meter.max) scrollBar.meter.setCur(meter.max);
    scrollBar.updateView();
    this.pane.scrollable.updateView();
	/*extend*/
	setTextAreaScroll(scrollBar);
	setNumPage(Scroll_checkIntervalPage(meter.cur + meter.page));
};
ScrollPaneHandler.prototype.onPrevPage = function (type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onPrevPage", type);
    var scrollBar = this.pane.getScrollBar(type);
    var meter = scrollBar.meter;
    scrollBar.meter.setCur(meter.cur - meter.page);
    if (meter.cur < meter.min) scrollBar.meter.setCur(meter.min);
    scrollBar.updateView();
    this.pane.scrollable.updateView();
	/*extend*/
	setTextAreaScroll(scrollBar);
	setNumPage(Scroll_checkIntervalPage(meter.cur - meter.page));
};

ScrollPaneHandler.prototype.onCursorDrag = function (pos, type) {
    if (pos != this.drag.lastPos) {
        this.drag.lastPos = pos;
        var scrollBar = this.pane.getScrollBar(type);
        var posOfs = pos - this.drag.startPos;
        var posOfs = Math.round(posOfs / scrollBar.resizeCoef);
        scrollBar.meter.setCur(this.drag.startCur + posOfs);
        scrollBar.updateView();
        this.pane.scrollable.updateView();
		setTextAreaScroll(scrollBar);
		setNumPage(Scroll_checkIntervalPage(this.drag.startCur + posOfs));
    }
};

















































