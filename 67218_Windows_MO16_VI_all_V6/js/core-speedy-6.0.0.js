/**
 * <<<core-speedy-4.0.0.js>>>
 * author: Stoev Andrey, andi.stoevgmail.com
 * build time: Mon Jul 11 16:33:39 CEST 2011
 */


/**
 * speedy
 */
core.speedy={
    PROJECT_DEPENDENCIES:"core-lib-4.0.0.js"
};/**
 * public
 */
var evt,e = null;
var GLOBAL_FINAL_VALUE = null;
var QCO_S = null;
var API_DB = null;
const MIN_ATTEMPTS = 1;
const MAX_ATTEMPTS = 2;

/**
 * <p>La classe <b>EventManager</b> gestisce gli eventi di mouse generati della aree sensibili. Questi eventi sono prima elaborati deli oggetti che li ricevono. E poi, una volta identificato
 * levento viene richiesto il send all'evento manager. Lo scopo di questo giro (invece di spedire direttamente senza passare dall'EventManager) e' quello di elboare
 * il alcuni enveti in modo centrale (click, doppio click ) e di costruirre l'xEvent che e' un evento nuovo che contiene un eventType simile a quello dell'evento originale
 * il target e l'evento originale.</p>
 * <p>Flusso eventi:<br/>
 *	1) Oggetto SVG che riceve l'evento.<br/>
 *	2) Metodo onEvent dell'oggetto sensibile. Argomento: evento SVG<br/>
 *	3) StateChange del target dell'evento. Argomenti: evento SVG e oggetto sorgente evento<br/>
 *	4) FireChange per propagare eventualmente l'evento a sotto oggetti (logica di business puo' essere implementata a questo livello per decidere
 * quale sotto oggetto e' il destinatario dell'evento. Argomenti: evento SVG e oggetto sorgente evento<br/>
 *	5) Metodo send su EventManager. Argomenti: evento SVG (anche fake) e oggetto destinazione evento<br/>
 *	6) Metodo handlEvent su target evento. Argomenti: eventoX e target<br/>
 *
 *	(SVGEvent) -> onEvent(event) -> stateChanged(event,source) -> fireChange(event,source)
 *	-> [stateChanged(event,source)]* | [stateChanged(event)]*->
 *	-> send(event,target) -> handleEvent(xEvent);
 *	</p><p>
 * 	Dove: 	<b>xEvent</b>: e' un oggetto composto da un eventType personalizzato. N.B. Il passaggio di event a xEvent avviene nella send.<br/>
 *			<b>event</b>: evento originale DOM SVG<br/>
 *			<b>source</b>: oggetto che genera l'evento, viene notificato per primo dal sistema ad eventi, e divent subito source per tutti gli altri oggetti.<br/>
 *			<b>target</b>: oggetto destinazione dell'evento. N.B. Il passaggio fra source a target avviene nelle stateChange.<br/>
 *   </p>
 *
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * private
 */
function EventManager(){

    /**
     * private
     */
    this.CLICKDELAY = 400; // delay before 1st and double click

    /**
     * private
     */
    this.clickDelay=this.CLICKDELAY;

    /**
     * private
     */
    this.lastClick={mx:0, my:0, tStamp:0, tStampOld:0};

    /**
     * private
     */
    this.mouseoutevt={type:'mouseout'};

    /**
     * private
     */
    this.mouseoverevt={type:'mouseover'};
};

/**
 * private
 */
EventManager.prototype.addEventListener=function(target,object,eventName,handlerName,b) {
    object[eventName] = function(e){object[handlerName](e);};
    target.addEventListener(eventName,object[eventName],b);
};

/**
 * private
 */
EventManager.prototype.removeEventListener=function(target,object,eventName) {
    target.removeEventListener(eventName, object[eventName],false);
};

/**
 * private
 */
EventManager.prototype.handleMouseClick=function(target,event){
    var times=1;
    var tStamp=(new Date()).getTime();
    var lc=this.lastClick;
    // last click

    if((lc.mx!=event.clientX)||(lc.my!=event.clientY)) {lc.tStamp=lc.tStampOld=0;};

    lc.mx=event.clientX; lc.my=event.clientY;
    // conditions
    var dif=tStamp-lc.tStamp;
    // double click
    if(dif>25 && dif<this.clickDelay){
        dif=lc.tStamp-lc.tStampOld;
        if(dif<this.clickDelay) times=3; else times=2;
        // save the 1st click
        lc.tStampOld=lc.tStamp;
    }
    // save last click
    lc.tStamp=tStamp;
    var xEvent;
    // fire Click
    if(times==1) xEvent={type:"Click",target:target,sourceEevent:event};
    else if(times==2) xEvent={type:"DoubleClick",target:target,sourceEevent:event};
    else if(times==3) xEvent={type:"TripleClick",target:target,sourceEevent:event};

    target.handleEvent(xEvent);
};

/**
 * private
 */
EventManager.prototype.send=function(event,target){
    console.log("EventManager:send. type:" + event.type + ", button: " + event.button);



    switch (event.type) {

        case "mouseout": target.handleEvent({type:"MouseOut",target:target,sourceEevent:event}); break;
        case "mousemove": target.handleEvent({type:"MouseMove",target:target,sourceEevent:event});break;
        case "mouseover": target.handleEvent({type:"MouseOver",target:target,sourceEevent:event});break;
        case "mousedown": {
            if (event.button==1) return;
            else if(event.button==0) target.handleEvent({type:"MouseDown",target:target,sourceEevent:event});
            else if (event.button==2) target.handleEvent({type:"RightDown",target:target,sourceEevent:event});
            break;
        }
        case "mouseup": {
            if (event.button==1) return;
            else if(event.button==0) target.handleEvent({type:"MouseUp",target:target,sourceEevent:event});
            else if (event.button==2) target.handleEvent({type:"RightUp",target:target,sourceEevent:event});
            break;
        }
        case "click": {
            if (event.button==1) return;
            else if(event.button==0) this.handleMouseClick(target,event);
            else if (event.button==2) return;
            break;
        }
        case "contextmenu": {
            if (event.button==1) return;
            else if(event.button==0) return;
            else if (event.button==2) target.handleEvent({type:"RightClick",target:target,sourceEevent:event});
            break;
        }
    }
};

/**
 * private
 */
EventManager.prototype.addMouseUpEventListener = function(listener) {
    this.addEventListener(document.rootElement,listener,"mouseup","actionPerformed",false);
};

/**
 * private
 */
EventManager.prototype.removeMouseUpEventListener = function(listener) {
    this.removeEventListener(document.rootElement,listener,"mouseup");
};

/**
 * private
 */
EventManager.prototype.addMouseMoveEventListener = function(listener) {
    this.addEventListener(document.rootElement,listener,"mousemove","actionPerformed",false);
};

/**
 * private
 */
EventManager.prototype.removeMouseMoveEventListener = function(listener) {
    this.removeEventListener(document.rootElement,listener,"mousemove");
};

/**
 * private
 */
EventManager.prototype.addKeyDownEventListener = function(listener) {
    this.addEventListener(document.rootElement,listener,"keydown","onKeyDown",false);
};

/**
 * private
 */
EventManager.prototype.removeKeyDownEventListener = function(listener) {
    this.removeEventListener(document.rootElement,listener,"keydown");
};

/**
 * private
 */
EventManager.prototype.addKeyUpEventListener = function(listener) {
    this.addEventListener(document.rootElement,listener,"keyup","onKeyUp",false);
};

/**
 * private
 */
EventManager.prototype.removeKeyUpEventListener = function(listener) {
    this.removeEventListener(document.rootElement,listener,"keyup");
};


/**
 * private
 */
EventManager.prototype.addTextInputEventListener = function(listener) {
    this.addEventListener(document.rootElement,listener,"textInput","onTextInput",false);
};

/**
 * private
 */
EventManager.prototype.removeTextInputEventListener = function(listener) {
    this.removeEventListener(document.rootElement,listener,"textInput");
};/**
 * private
 */
ClipPath.type = "ClipPath";

/**
 * constructor
 * author Stoev Andrey
 * private
 */
function ClipPath(){
    /**
     * private
     */
    this.gid=global.getNewGId();

    /**
     * private
     */
    this.rects=[]; // button_no -> orect_idx

    /**
     * private
     */
    this.rectsPool=[]; // free orect if are there

    /**
     * private
     */
    this.rectCount = 0;

    // add clip-path SVG element
    /**
     * private
     */
    this.ocp=global.document.createElementNS(global.svgns,"clipPath");
    this.ocp.setAttribute("id","cp"+this.gid);
    global.mdfs.appendChild(this.ocp);
};

/**
 * private
 */
ClipPath.prototype.createNewRect=function(){
    var orect=global.document.createElementNS(global.svgns,"rect");
    orect.setAttribute("width","0");
    orect.setAttribute("height","0");
    this.ocp.appendChild(orect);
    this.rectCount++;
    return new ClipRect(orect);
};

/**
 * private
 */
ClipPath.prototype.setMaskRect=function(no, r){
    var rect = this.rects[no];
    if (rect!=null) rect.setRect(r);
    else {
        if(this.rectsPool.length==0) rect=this.createNewRect();
        else rect=this.rectsPool.pop();
        this.rects[no] = rect;
        rect.setRect(r);
    }
};

/**
 * private
 */
ClipPath.prototype.clearMaskRect=function(no){
    var rect = this.rects[no];
    if (rect!=null) {
        this.rectsPool.push(rect);
        rect.setRect(null);
        this.rects[no] = null;
    }
};

/**
 * private
 */
ClipPath.prototype.isEmpty=function(){
    return(this.rectsPool.length==this.rectCount);
};/**
 * Tipo della classe
 * private
 */
ClipRect.type = "ClipRect";

/**
 * constructor
 * author Stoev Andrey
 * private
 */
function ClipRect(element){
    /**
     * private
     */
    this.gid=global.getNewGId();

    /**
     * private
     */
    this.element=element;

    /**
     * private
     */
    this.visible=true;

    /**
     * private
     */
    this.x=0;

    /**
     * private
     */
    this.y=0;

    /**
     * private
     */
    this.w=0;

    /**
     * private
     */
    this.h=0;
};

/**
 * private
 */
ClipRect.prototype.setRect=function(r){
    if(r!=null){
        if(r.x!=this.x) this.element.setAttribute("x", this.x=r.x);
        if(r.y!=this.y) this.element.setAttribute("y", this.y=r.y);
        if(r.w!=this.w) this.element.setAttribute("width", this.w=r.w);
        if(r.h!=this.h) this.element.setAttribute("height", this.h=r.h);
    }
    else{
        if(this.w!=0) this.element.setAttribute("width", this.w=0);
    }
};

/**
 * private
 */
ClipRect.prototype.setVisible=function(b){
    if(b!=this.visible){
        this.visible=b;
        this.element.setAttribute("visibility", (b?"visible":"hidden"));
    }
};/**
 * private
 */
RectProxy.type = "RectProxy";

/**
 * <p>La classe <b>RectProxy</b> funziona come proxy verso un oggetto SVG.<br>
 * L'esigenza di avere un proxy e' dettata dal fatto di poter evitare azioni non necessarie
 * sul DOM deli oggetti SVG. In questo modo è possibile aumentare le peorfromance in fase di rendering
 * in quanto solo le modifche che passano la varifica/filtro del proxy vengono propagate all'oggetto SVG
 * corrispondente reale.
 * In particolare il <b>RectProxy</b> implementa le aree di sensibilita' dei pulsanti Se i pulanti non hanno sovrapposizioni
 * e sono vicini possono essere regguppati dal compilatore e una quantita' ridotta di aree sensibili viene usata. Se invece un pulsante si
 * sovrappone con altri viene applicata la FullSensibleDisintegration che relizza per i pulsanti interessati una spcifica area
 * sensibile.
 *
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * param c oggetto avente i dati x,y,w,h
 * param holder oggetto padre al quale sono passati gli eventi raccolti del rect
 * private
 */
function RectProxy(r,holder){

    /**
     * Oggetto padre che possiede questo RectProxy, tipicamente una Panel
     * private
     */
    this.holder = holder;

    /**
     * Elemento SVG per il qule viene eseguita l'attivita' di proxying
     * private
     */
    this.element = global.document.createElementNS(global.svgns, "rect");

    this.element.setAttribute("visibility","hidden");
    //this.element.setAttribute("style","fill:red;stroke:red;stroke-width:1;fill-opacity:0.1;stroke-opacity:1");	// DEBUG

    this.setRect(r);

    global.eventManager.addEventListener(this.element,this,"click","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mouseup","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mousedown","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mouseover","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mouseout","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mousemove","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"contextmenu","onEvent",false);


    this.holder.element.appendChild(this.element);
    /**
     * Sensibilita' agli eventi dell'oggetto SVG.
     * private
     */
    this.sensible = false;

    /**
     * Lista dei numeri di pulsanti che sono coperti da questo area sensibile
     * private
     */
    this.list=[];
};

RectProxy.prototype.onEvent=function(event) {
    this.holder.stateChanged(event,this);
};

/**
 *	Imposta le dimennsioni del Rect.
 *	#private
 *   param r (Object) oggetto avente i dati x,y,w,h
 */
RectProxy.prototype.setRect=function(r){
    if(r!=null){
        this.element.setAttribute("x", r.x);
        this.element.setAttribute("y", r.y);
        this.element.setAttribute("width", r.w);
        this.element.setAttribute("height", r.h);
    } else{
        this.element.setAttribute("width", 0);
    }
};

/**
 *	Esegue una traslazione del Rect. Le coordinate originali non vengono modificate
 *	private
 *   param x (int) Distanza x di traslazione
 *   param y (int) Distanza y di traslazione
 */
RectProxy.prototype.translate=function(x, y){
    this.element.setAttribute("transform", "translate(" + x + "," + y + ")");
};

/**
 *	Esegue poszionamento del Rect. Le coordinate originali vengono modificate
 *	private
 *   param x (int) valore x di traslazione
 *   param y (int) valore y di traslazione
 */
RectProxy.prototype.translate=function(x, y){
    this.element.setAttribute("transform", "translate(" + x + "," + y + ")");
};

/**
 *	Abilita / disabilita la sensibilita' agli eventi del Rect
 *	#private
 *   param b true per abilitare, false per disabilitare
 */
RectProxy.prototype.setSensible=function(b){
    if(b!=this.sensible){
        this.sensible=b;
        this.element.setAttribute("pointer-events", (b?"all":"visible"));

        //this.element.setAttribute("visibility",(b?"visible":"hidden"));// DEBUG
    }
};/**
 * private
 */
ImageProxy.type = "ImageProxy";

/**
 * <p>La classe <b>ImageProxy</b> funziona come proxy verso un oggetto SVG.<br>
 * L'esigenza di avere un proxy è dettata dal fatto di poter evitare azioni non necessarie
 * sul DOM deli oggetti SVG. In questo modo è possibile aumentare le peorfromance in fase di rendering
 * in quanto solo le modifche che passano la varifica/filtro del proxy vengono propagate all'oggetto SVG
 * corrispondente reale.
 * In particolare <b>ImageProxy</b> funge da proxy per una immagine SVG sul quale viene eseguito il clipping
 * per l'attivazione delle zone di visibilita' dei diversi ButtonFrame dei Button.
 *
 * constructor
 * author Stoev Andrey
 * param data il data package passato dal costruttore.<br>
 * private
 */

function ImageProxy(c, img, holder){

    /**
     * Oggetto padre che possiede questo RectProxy, tipicamente una Panel
     * private
     */
    this.holder = holder;

    /**
     * Elemento SVG per il qule viene eseguita l'attivita' di proxying
     * private
     */
    this.element = img;

    /**
     * Sensibilita' agli eventi dell'oggetto SVG.
     * private
     */
    this.sensible = false;

    /**
     * Visibilita'dell'oggetto SVG.
     * private
     */
    this.visible = false;

    /**
     * Coordinata x del proxy, corrisponde alla coordinata x dell'Image
     * private
     */
    this.x=0;

    /**
     * Coordinata y del proxy, corrisponde alla coordinata y dell'Image
     * private
     */
    this.y=0;

    /**
     * Larghezza w del proxy, corrisponde alla width dell'Image
     * private
     */
    this.w=0;

    /**
     * Altezza w del proxy, corrisponde alla height dell'Image
     * private
     */
    this.h=0;

    /**
     * private
     */
    this.masked = false;

    /**
     * private
     */
    this.element.setAttribute("visibility","hidden");
    this.element.setAttribute("pointer-events", "none");



    this.setRect(c);
};

/**
 * private
 */
ImageProxy.prototype.clone=function() {
    var ip = new ImageProxy({x:this.x,y:this.y,w:this.w,h:this.h},this.element.cloneNode(false),this.holder);
    ip.setVisible(this.visible);
    ip.setSensible(this.sensible);
    return ip;
};

/**
 * private
 */
ImageProxy.prototype.setRect=function(r){
    if(r!=null){
        if(r.x!=this.x) this.element.setAttribute("x", this.x=r.x);
        if(r.y!=this.y) this.element.setAttribute("y", this.y=r.y);
        if(r.w!=this.w) this.element.setAttribute("width", this.w=r.w);
        if(r.h!=this.h) this.element.setAttribute("height", this.h=r.h);
    }
    else{
        if(this.w!=0) this.element.setAttribute("width", this.w=0);
    }
};

/**
 * private
 */
ImageProxy.prototype.translate=function(x, y){
    this.element.setAttribute("transform", "translate(" + x + "," + y + ")");
};

/**
 * private
 */
ImageProxy.prototype._setPosition=function(x, y){
    if(r.x!=this.x) this.element.setAttribute("x", this.x=r.x);
    if(r.y!=this.y) this.element.setAttribute("y", this.y=r.y);
};

/**
 * private
 */
ImageProxy.prototype.translate=function(x, y){
    this.element.setAttribute("transform", "translate(" + x + "," + y + ")");
};

/**
 * private
 */
ImageProxy.prototype.setVisible=function(b){
    if(b!=this.visible){
        this.element.setAttribute("visibility", (b?"visible":"hidden"));
        this.visible=b;
    }
};

/**
 * private
 */
ImageProxy.prototype.setSensible=function(b){
    if(b!=this.sensible){
        this.sensible=b;
        this.element.setAttribute("pointer-events", (b?"visible":"none"));
    }
};

/**
 * private
 */
ImageProxy.prototype.removeClipPath=function(){
    this.element.setAttribute("clip-path","none");
    this.element.setAttribute("clip-path","url(#cp_xcp)");
};

/**
 * private
 */
ImageProxy.prototype.setClipPath=function(cpId){
    this.element.setAttribute("clip-path","none");
    this.element.setAttribute("clip-path","url(#cp" + cpId + ")");
};/**
 * TODO: utilizzare una doppia via di riferimento basata su hashtables
 *
 * constructor
 * author Biscaro Fabio
 * author Foccoli Matteo
 * author Bruna Stefano
 * private
 */
function Variable(name, value){

    /**
     * private
     */
    this.name=name;

    /**
     * private
     */
    this.value=value;

    /**
     * private
     */
    this.list=[];
};

/**
 * private
 */
Variable.prototype.fireChange=function() {
    for (var i=0; i<this.list.length; i++)
        this.list[i].onVariableChanged(this.name);
};

/**
 * private
 */
Variable.prototype.setValue=function(value){
    if (this.value!=value) {
        this.value=value;
        this.fireChange();
    }
};

/**
 * private
 */
Variable.prototype.getValue=function(){return this.value;};

/**
 * private
 */
Variable.prototype.getName=function(){return this.name;};

/**
 * private
 */
Variable.prototype.addListener=function(listener){
    this.list.push(listener);
};

/**
 * private
 */
Variable.prototype.removeListener=function(listener){
    for (var i=0; i < this.list.length; i++) {
        if (this.list[i]==listener) this.list.splice(i,1);
    }
};/**
 * constructor
 * author Biscaro Fabio
 * author Foccoli Matteo
 * author Stoev Andrey
 * private
 */
function VariablesVector() {

    /**
     * private
     */
    this.variables=[];
};

/**
 * private
 */
VariablesVector.prototype.getChildIdxByName=function(name) {
    for(var i=0; i<this.variables.length; i++)
        if(this.variables[i].name==name) return(i);

    return -1;
};

/**
 * private
 */
VariablesVector.prototype.addVariable=function(name,value) {
    var idx=this.getChildIdxByName(name);
    if (idx==-1){
        var newVar=new Variable(name, value);
        this.variables.push(newVar);
    }
};

/**
 * private
 */
VariablesVector.prototype.addVariableListener=function(name,listener) {
    var idx=this.getChildIdxByName(name);
    if(idx!=-1) this.variables[idx].addListener(listener);
};

/**
 * private
 */
VariablesVector.prototype.getVariableValue=function(name) {
    var idx=this.getChildIdxByName(name);
    if(idx!=-1) {return(this.variables[idx].getValue());}
    return(null);
};

/**
 * private
 */
VariablesVector.prototype.setVariableValue=function(name,value) {
    var idx=this.getChildIdxByName(name);
    if(idx!=-1) {this.variables[idx].setValue(value);}
};

/**
 * public
 * deprecated
 */
VariablesVector.prototype.setVariable=VariablesVector.prototype.setVariableValue;

/**
 * private
 */
VariablesVector.prototype.printVar = function() {
    var ss="--- begin global variables ---\n";
    for (var i = 0; i < this.variables.length; i++) {
        ss+="  "+this.variables[i].name+"="+this.variables[i].getValue();
        if(this.variables[i].getValue()=='') ss+="<EMPTY STRING>";
        ss+="\n";
    }
    ss+="--- end global variables ---";
    alert(ss);
};/**
 * constructor
 * author Stoev Andrey
 * private
 */
function Global(){

    /**
     * private
     */
    this.document=document;

    /**
     * private
     */
    this.mdfs = this.document.getElementById("mdfs");

    /**
     * private
     */
    this.txs = this.document.getElementById("txs");

    /**
     * private
     */
    this.htmlns = "http://www.w3.org/1999/xhtml";

    /**
     * private
     */
    this.svgns = "http://www.w3.org/2000/svg";

    /**
     * private
     */
    this.xmlns = "http://www.w3.org/XML/1998/namespace";

    /**
     * private
     */
    this.xlinkns = "http://www.w3.org/1999/xlink";

    /**
     * private
     */
    this.gids = 0;

    /**
     * private
     */
    this.eventManager = new EventManager();

    /**
     * private
     */
    this.variables = new VariablesVector();

    /**
     * private
     */
    this.simArea = {x:1,y:77,w:800,h:600};



};


/**
 * private
 */
Global.prototype.getNewGId=function(){
    var gid=++this.gids;
    return "_"+gid;
};

/**
 * private
 */
Global.prototype.addVariable=function(name,value) {
    this.variables.addVariable(name, value);
};

/**
 * private
 */
Global.prototype.setVariableValue=function(name,value){
    this.variables.setVariableValue(name,value);
};

/**
 * private
 */
Global.prototype.setVariable=Global.prototype.setVariableValue;

/**
 * private
 */
Global.prototype.getVariableValue=function(name) {
    return this.variables.getVariableValue(name);
};

/**
 * private
 */
Global.prototype.getValue=Global.prototype.getVariableValue;

/**
 * private
 */
Global.prototype.addVariableListener=function(name,listener) {
    this.variables.addVariableListener(name, listener);
};

/**
 * private
 */
Global.prototype.printVar=function() {
    this.variables.printVar();
};

/**
 * private
 */
Global.prototype.getGIds=function(){return(this.gids);};

/**
 * public
 */
global=new Global();


/**
 * constructor
 * author Stoev Andrey
 * private
 */
function Functions(){};

/**
 * private
 */
function url(path){
    if(path.indexOf("/root")==0) path=path.substring(1,path.length);
    if(path.lastIndexOf("/")==path.length-1) path=path.substring(0,path.length-1);
    var arr=path.split("/");
    arr[0]="root";
    var obj=root;
    for(var i=1; i<arr.length; i++){
        obj=obj.down(arr[i]);
    }
    return(obj);
};

/**
 * Registra una nuova variabile avente nome <code>name</code> con valore iniziale valore <code>value</code>
 * param {String} name Nome della variabile
 * param {String} value Valore della variabile..
 * public
 */
function addVariable(name, value) {
    global.addVariable(name, value);
};

/**
 * Imposta il valore di una variabile avente nome <code>name</code> al valore <code>value</code>
 * <b>N.B.</b> Impostare e/o aggiungere variabili con la funzione globale e' come aggiungerle ad una <code>Movie</code>.
 * Tutti i metodi di aggiunta e impostazione si rifanno alla stessa collezione di variabili globale
 * param {String} name Nome della variabile
 * param {String} value Valore della variabile.
 * public
 */
function setVariableValue(name, value) {
    global.setVariableValue(name, value);
};

/**
 * Vedi metodo <code>setVariableValue(name)</code>
 * public
 * param {String} name Nome della variabile
 * param {String} value Valore della variabile.
 * deprecated Usare <code>setVariableValue(name)</code>
 */
function setVariable(name, value) {
    global.setVariableValue(name, value);
};

/**
 * Vedi metodo <code>getVariableValue(name)</code>
 * public
 * param {String} name Nome della variabile.
 * type Object
 * return Valore della variabile
 * deprecated Usare <code>getVariableValue(name)</code>
 */
function getValue(name) {
    return global.getVariableValue(name);
};

/**
 * Ritorna il valore di una variabile avente nome <code>name</code>
 * param {String} name Nome della variabile.
 * type Object
 * return Valore della variabile
 * public
 */
function getVariableValue(name) {
    return global.getVariableValue(name);
};

/**
 * Aggiunge un oggetto alla lista di oggetti che vengono notificati del cambiamento
 * di una variabile avente nome <code>name</code>.
 * Il listener deve implementare il metodo <code>onVariableChanged(name)</code> per poter essere avvisato
 * dei cambiamento del valore della variabile
 * <b>N.B.</b> Impostare e/o aggiungere variabili con la funzione globale e' come aggiungerle ad una <code>Movie</code>.
 * Tutti i metodi di aggiunta e impostazione si rifanno alla stessa collezione di variabili globale
 * param {String} name Nome della variabile
 * param {Object} listener Oggetto avvisato tramite metodo <code>onVariableChanged(name)</code>
 * public
 */
function addVariableListener(name,listener) {
    global.addVariableListener(name, listener);
}

/**
 * private
 */
function printVar(){
    global.printVar();
};

/**
 * private
 */
function setTitle(title) {
	if (title!=null) {
    	var node = parseXML(title, global.document);
    	var titleDiv = global.document.getElementById("head-title");
    	title = formatTitle(title);
		titleDiv.innerHTML = title;
	}
};

/**
 * private
 */
function formatTitle(title) {
	var rTitle = title;
	if (title.includes("CDATA")) {
    	rTitle = title.replace("<![CDATA[","");
    	rTitle = rTitle.replace(/[\n\r]/g, '').trim();
	}
	return rTitle;
}

/**
 * Elimina gli spazi all'inzio e in fondo alla stringa passata
 * param {String} stringa su cui eseeguire il trim
 * return stringa risultato dell'operazione di trim
 * type String
 * public
 */
function trim(stringa) {
    var s = new String(stringa);
    return s.replace(/^\s+|\s+$/g,'');
};

/**
 * Verifica se la lunghezza della stringa passata e' compresa tra due valori
 * param {int} min Valore minimo
 * param {int} max Valore massimo
 * return <code>true</code> se la lunhezza della string e' compresa fra min e max, <code>false</false> altrementi.
 * type boolean
 * public
 */
function checkTextLength(text, min, max) {
    var s = new String(text);
    return((s.length >= min) && (s.length <= max));
};


/**
 * public
 * deprecated
 */
function createHalfScrollPane(cursor, direction,scrollItem, scrollMin, scrollMax, scrollStart,backwardButton, forwardButton, skipBarButton) {

    var h=null, v=null;
    var sb={min:scrollMin, max:scrollMax, start:scrollStart, elements:{cursor:cursor, prevButton:backwardButton, nextButton:forwardButton, skipBar:skipBarButton}};

    if(direction==ScrollBar.HOR_DIRECTION) h=sb; else v=sb;

    var builder=new ScrollPaneBuilder(scrollItem,h,v);
    builder.apply();
    return builder.getScrollPane();
};

/**
 * public
 * deprecated
 */
function createScrollPane(scrollItem,scrollMinX, scrollMaxX, scrollMinY, scrollMaxY, scrollStartX, scrollStartY,
                          cursorH, backwardButtonH, forwardButtonH, skipBarButtonH,
                          cursorV, backwardButtonV, forwardButtonV, skipBarButtonV) {

    var builder=new ScrollPaneBuilder(scrollItem,
        {min:scrollMinX, max:scrollMaxX, start:scrollStartX, elements:{cursor:cursorH, prevButton:backwardButtonH, nextButton:forwardButtonH, skipBar:skipBarButtonH}},
        {min:scrollMinY, max:scrollMaxY, start:scrollStartY, elements:{cursor:cursorV, prevButton:backwardButtonV, nextButton:forwardButtonV, skipBar:skipBarButtonV}});
    builder.apply();
    return builder.getScrollPane();
};

/**
 * public
 */
function buildScrollPane(scrollItem,h,v) {
    new ScrollPaneBuilder(scrollItem,h,v).apply();
};/**
 * private
 */
XObject.type = "XObject";

/**
 * <p>La classe <b>XObject</b> e' una classe contenente strutture dai e metodi comuni<br>
 *
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * param data il data package passato dal costruttore.<br>
 */
function XObject(){

    /**
     * private
     */
    this.gid=null;

    /**
     * private
     */
    this.parent=null; // parent

    /**
     * private
     */
    this.visible=false;

    /**
     * private
     */
    this.builded=false;	// TODO perchè il builded è una proprietà anche di oggetti che non hanno nessuna logica di build ?

    /**
     * private
     */
    this.number=-1;
};

/**
 * private
 */
XObject.prototype.baseClass=function(data){
    this.data=data;
    // generic vector & hashtable
    this.objectsV=[];
    this.objectsH=[];
};

/**
 * private
 */
XObject.prototype.init = function(){
    this.fireInit();
};

/**
 * private
 */
XObject.prototype.fireInit = function(){
    for(var i=0; i < this.objectsV.length; i++) {
        this.objectsV[i].init();
    }
};

/**
 * private
 */
XObject.prototype.finish = function(){
    for(var i=0; i < this.objectsV.length; i++) {
        this.objectsV[i].finish();
    }
};

/**
 * private
 */
XObject.prototype.getObjectByGId = function(gid) {
    for (var i=0; i < this.objectsV.length; i++) {
        if (this.objectsV[i].gid == gid) return this.objectsV[i];
    }
    //alert("[WARN] XObject.prototype.getObjectByGId: The requested object doesn't exist: id: " + gid);
    return null;
};

/**
 * Restituisce l'oggetto figlio utilizzando l'identificatore per indetificarlo
 * param {String} id L'identificatore dell'oggetto figlio
 * return Oggetto figlio
 * type Object
 * public
 */
XObject.prototype.getObjectById = function(id) {
    for (var i=0; i < this.objectsV.length; i++) {
        // getId ritorna il gid tranne per gli oggetti, che avendo un prorpio id la getId ritornano quello
        if (this.objectsV[i].getId() == id) return this.objectsV[i];
    }
    //alert("[WARN] XObject.prototype.getObjectById: The requested object doesn't exist: id: " + id);
    return null;
};

/**
 * Restituisce l'oggetto figlio utilizzando il nome per indetificarlo
 * param {String} name Il nome dell'oggetto figlio
 * return Oggetto figlio
 * type Object
 * public
 */
XObject.prototype.getObjectByName = function(name) {
    return this.objectsH[name];
};

/**
 * Restituisce il numero di oggetti figli presenti
 * return {int} Numero di oggetto figli presenti
 * type int
 * public
 */
XObject.prototype.getObjectCount = function() {
    return this.objectsV.length;
};

/**
 * Restituisce l'oggetto figlio utilizzando il suo posizionamento per identificarlo
 * param {string} number Posizionamento. Se un oggetto e' stato aggiunto per primo avra' come numero 1, se secondo 2, etc.
 * return Oggetto figlio
 * type Object
 * public
 */
XObject.prototype.getObjectByNumber = function(number) {
    if (number >= this.objectsV.length) {/*alert("[WARN] XObject.prototype.getObjectByNumber: The requested object doesn't exist: number: " + number);*/}
    else return this.objectsV[number];
};

/**
 * private
 */
XObject.prototype.fireChange=function(event){};

/**
 * private
 */
XObject.prototype.fireChange=function(event,source){};

/**
 * private
 */
XObject.prototype.stateChanged=function(event){evt = e = event; this.fireChange(event);};

/**
 * private
 */
XObject.prototype.stateChanged=function(event,source){evt = e = event; this.fireChange(event,source);};

/**
 * Ritorna se l'oggetto e' correntemente visibile. True se visibile, false se non visibile
 * return Visiblita'
 * type boolean
 * public
 */
XObject.prototype.isVisible=function(){return this.visible;};

/**
 * Imposta la visibilita' dell'oggetto e di tutti i suoi figli.
 * param {boolean} b Visiblita'. true per renderlo visibile, false per renderlo non visibile
 * public
 */
XObject.prototype.setVisible=function(b){
    //alert("[DEBUG] XObject.prototype.setVisible: name: " + this.data.n);
    if (this.visible!=b) {
        for(var i=0; i<this.objectsV.length; i++) this.objectsV[i].setVisible(b);
        this.visible=b;
    }
};

/**
 * Esegue in realta' una translate del <code>Frame</code>
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 * public
 * deprecated
 */
XObject.prototype.setPosition=function(x,y){for(var i=0; i < this.objectsV.length; i++) this.objectsV[i].translate(x, y);};

/**
 * Esegue una tralsazione del <code>Frame</code> di x e y
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 * public
 */
XObject.prototype.translate=function(x,y){for(var i=0; i < this.objectsV.length; i++) this.objectsV[i].translate(x, y);};


/**
 * Restituisce l'oggetto padre
 * return Oggetto padre
 * type Object
 * public
 */
XObject.prototype.up = function() {return this.parent;};

/**
 * Restituisce l'oggetto padre
 * return Oggetto padre
 * type Object
 * public
 */
XObject.prototype.getParent=function(){return this.parent;};

/**
 * Restituisce il nome dell'oggetto
 * return Nome dell'oggetto
 * type String
 * public
 */
XObject.prototype.getName=function(){return this.data.n;};

/**
 * Restituisce l'oggetto figlio utilizzando il nome per indetificarlo
 * param {String} name Il nome dell'oggetto figlio
 * return Oggetto figlio
 * type Object
 * public
 */
XObject.prototype.down = function(name) {return this.objectsH[name];};


/**
 * private
 */
XObject.prototype.getGId = function(){return this.gid;};

/**
 * Ritorna l'identificatore dell'oggetto.
 * return Identificatore dell'oggetto.
 * type String
 * public
 */
XObject.prototype.getId = function(){
    // Se il data pack ne specifica uno quello viene usato. Nel caso invece non venga specificato alcuno id
    // viene ritornato il gid. L'overriding delgi oggetti specifici va, eventualmente, ad implementare questa logica.
    return this.gid;
};

/**
 * private
 */
//XObject.prototype.getURI = function(){return this.type+this.gid;}

/**
 * private
 */
XObject.prototype.addObject=function(ob, ov, oh, v){
    var z=ov.length;
    ov[z] = ob;
    oh[ob.data.n] = ob;
    if(v!=null) v[v.length] = ob;

    ob.parent=this;
    ob.number = z;
    ob.gid = global.getNewGId();
    return ob;
};

/**
 * private
 */
XObject.prototype.updateCoord=function(sob,dob){
    if (dob==undefined) dob={};
    if (sob==undefined) return;

    if (dob.x==undefined) dob.x=sob.x;
    if (dob.y==undefined) dob.y=sob.y;
    if (dob.w==undefined) dob.w=sob.w;
    if (dob.h==undefined) dob.h=sob.h;
};

/**
 * private
 */
XObject.prototype.getUrl=function() {
    if (this.parent!=null) return this.parent.getUrl() + "/" + this.getName();
    else return this.getName();
};

/**
 * private
 */
XObject.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[XObject]");
    for (var j=0; j < this.getObjectCount(); j++) {
        this.getObjectByNumber(j).printUrls();
    }
};/**
 * private
 */
ButtonFrame.type = "ButtonFrame";

/**
 * constructor
 * author Stoev Andrey
 * param {Object} data il data package passato dal costruttore.<br>
 * private
 */
function ButtonFrame(data){
    this.baseClass(data);
    this.name=null;
    this.va = {x:data.x,y:data.y,w:data.w,h:data.h};
};

ButtonFrame.prototype=new XObject();

/**
 * private
 */
ButtonFrame.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[ButtonFrame]");
};

/**
 * private
 */
Button.type = "Button";

/**
 * <p>La classe <b>Button</b> consente di eseguire azioni su un'area particolare dello schermo.
 * Il Button e' contenuto in un Panel ed e' dotato di una area sensibile a di azioni.
 * Sotto oggetti di Button sono i ButtonFrame.</br>
 * La classe non puo' essere istanziata direttamente. E'possibile ottenere un'istanza di questa classe navigando nella struttura ad albero
 * della simulazione.
 *
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * param {Object} data il data package passato dal costruttore.<br>
 */
function Button(data){
    this.baseClass(data);

    /**
     * private
     */
    this.detached=false;

    /**
     * private
     */
    this.frCreated=false;

    /**
     * private
     */
    this.currentFrame = null;

    /**
     * private
     */
    this.vars=[];

    /**
     * private
     */
    this.element=null;

    /**
     * private
     */
    this.sa=null;

    this.initVariables();
};

Button.prototype=new XObject();

/**
 * private
 */
Button.prototype.init = function(){
    // waste mem to improve perf
    this.data.ex1 = this.data.x;
    this.data.ey1 = this.data.y;
    this.data.ex2 = this.data.x + this.data.w;
    this.data.ey2 = this.data.y + this.data.h;

    this.createFr();
    this.fireInit();
};

/**
 * Restituisce la coordinata x dell'area sensibile del <code>Button</code>
 * return coordinata x dell'area sensibile del <code>Button</code>
 * type int
 * public
 */
Button.prototype.getX=function() {
    return this.data.x;
};

/**
 * Restituisce la coordinata y dell'area sensibile del <code>Button</code>
 * return coordinata y dell'area sensibile del <code>Button</code>
 * type int
 * public
 */
Button.prototype.getY=function() {
    return this.data.y;
};

/**
 * Restituisce la larghezza w dell'area sensibile del <code>Button</code>
 * return larghezza w dell'area sensibile del <code>Button</code>
 * type int
 * public
 */
Button.prototype.getWidth=function() {
    return this.data.w;
};

/**
 * Restituisce la altezza h dell'area sensibile del <code>Button</code>
 * return altezza h dell'area sensibile del <code>Button</code>
 * type int
 * public
 */
Button.prototype.getHeight=function() {
    return this.data.h;
};

/**
 * Restituisce la coordinata x della traslazione corrente del <code>Button</code>
 * return coordinata x della traslazione corrente del <code>Button</code>
 * type int
 * public
 */
Button.prototype.getXTranslation = function() {
    return (this.data.ex1-this.data.x);
};

/**
 * Restituisce la coordinata y della traslazione del <code>Button</code>
 * return coordinata y della traslazione corrente del <code>Button</code>
 * type int
 * public
 */
Button.prototype.getYTranslation = function() {
    return (this.data.ey1-this.data.y);
};

/**
 * Restituisce la coordinata x della posizione effettiva corrente del <code>Button</code> anche in caso di precedente <code>translate(x,y)</code> o <code>setPosition(x,y)</code>
 * return coordinata x della traslazione corrente del <code>Button</code>
 * type int
 * public
 */
Button.prototype.getTX = function() {
    return this.data.ex1;
};

/**
 * Restituisce la coordinata y della traslazione effettiva corrente del <code>Button</code> anche in caso di precedente <code>translate(x,y)</code> o <code>setPosition(x,y)</code>
 * return coordinata y della traslazione corrente del bottone
 * type int
 * public
 */
Button.prototype.getTY = function() {
    return this.data.ey1;
};

/**
 * private
 */
Button.prototype.detach=function() {
    this.element=global.document.createElementNS(global.svgns,"g");

    var bf, nip,oip = null;
    for (var i=0; i < this.objectsV.length; i++) {
        bf = this.objectsV[i];
        oip = this.parent.frPrxsV[bf.ti];
        if (oip!=null) {
            nip = this.parent.frPrxsV[bf.ti].clone();
            this.parent.frPrxsV.push(nip);
            this.parent.masksV.push(new ClipPath());
            this.element.appendChild(nip.element);
        } else {
            this.parent.frPrxsV.push(null);
            this.parent.masksV.push(null);
        }
        bf.ti = (this.parent.frPrxsV.length-1);
    }

    this.parent.element.appendChild(this.element);
    if (this.currentFrame!=null) this.setFrame(this.currentFrame);
    this.detached=true;
};

/**
 * Permette di registrare la chiamata della funzione passata come argomento <code>listener</code> la verificarsi
 * di un evento di mouse
 * param {String} eventType Tipo di evento: <br/>
 * <ul>
 * 	<li><code>mouseout</code> : Uscita dall'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousemove</code> : Movimento nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseover</code> : Entrata nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousedown</code> : Pressione di un tasto nell'aree sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseup</code> : Rilascio di un tasto nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>click</code> : Pressione e rilascio nell'area sensibile del <code>Button</code> del mouse.</li>
 * </ul>
 * listener {Object} listener Reference ad una funzione avente parametro event
 * public
 */
Button.prototype.addEventListener = function(eventType, listener) {
    this.parent.explodeSa();
    // attacco levento direttamente alla SA privata del Button siccome è stata esplosa
    this.sa.element.addEventListener(eventType,listener,false);
};

/**
 * Permette di de-registrare la chiamata della funzione passata come argomento <code>listener</code> la verificarsi
 * di un evento di mouse
 * param {String} eventType Tipo di evento: <br/>
 * <ul>
 * 	<li><code>mouseout</code> : Uscita dall'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousemove</code> : Movimento nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseover</code> : Entrata nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousedown</code> : Pressione di un tasto nell'aree sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseup</code> : Rilascio di un tasto nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>click</code> : Pressione e rilascio nell'area sensibile del <code>Button</code> del mouse.</li>
 * </ul>
 * listener {Object} listener Reference ad una funzione avente parametro event
 * public
 */
Button.prototype.removeEventListener = function(eventType, listener) {
    this.parent.explodeSa();
    // stacco l'evento direttamente alla SA privata del Button siccome è stata esplosa
    this.sa.element.removeEventListener(eventType,listener,false);
};

/**
 * private
 */
Button.prototype.setFrame=function(frame){
    var oimg,omask;

    // current frame work
    if (this.currentFrame!=null) {
        oimg=this.parent.frPrxsV[this.currentFrame.ti];
        if (oimg!=null) {
            omask=this.parent.masksV[this.currentFrame.ti];

            omask.clearMaskRect(this.number);
            oimg.setClipPath(omask.gid);
        }
    }
    // ---

    // new frame work
    this.currentFrame = frame;
    this.masked = true;
    oimg=this.parent.frPrxsV[this.currentFrame.ti];
    if(oimg!=null) {
        omask=this.parent.masksV[this.currentFrame.ti];

        omask.setMaskRect(this.number, frame.va);
        oimg.setClipPath(omask.gid);

        oimg.setVisible(this.visible);
    }
    // ---
};

/**
 * Esegue riposizionamento del <code>Button</code> alle coordinate x,y
 * Le coordinate x,y ritornate dei metodi <code>getX()</code> e <code>getY()</code> vegono modificate
 * <br/> <b>TIPS</b>: <br/>
 * <ul>
 * <li>Evitare <code>setPosition(x,y)</code>, <code>_setPosition(x,y)</code> e <code>translate(x,y)</code> su <code>Button</code> appartenenti a <code>Panel</code> contenenti molti pulsanti. <br/></li>
 * <li>Per ottenere maggiori performances, se si ha la necessita' di muovere un <code>Button</code>, invece di eseguire un metodo di movimento
 * direttamente sul <code>Button</code>, usare un <code>Panel</code> avente un solo <code>Button</code> al suo interno e chiamare
 * un metodo di movimento sul <code>Panel</code></li>
 * </ul>
 * public
 * param {int} x valore x di posizionamento
 * param {int} y valore y di posizionamento
 */
Button.prototype._setPosition=function(x,y){
    this.parent.explodeSa();
    this.parent.explodeFr();
    this.positionECoord(x,y);

    if (this.data.x!=x) {
        this.data.x=x;
        this.element.setAttrbute("x",x);
    }

    if (this.data.y!=y) {
        this.data.y=y;
        this.element.setAttrbute("y",y);
    }
    this.sa.setPosition(x,y);
};

/**
 * Esegue una traslazione del <code>Button</code> di x,y
 * Le coordinate originali di posizionamento x,y del <code>Button</code> <b>NON</b> vengono modificate
 * Per sapere la poszione visiva dell'oggetto a valle di una <code>translate(x,y)</code> usare i metodi <code>getTX()</code> e <code>getTY()</code>.
 * <br/> <b>TIPS</b>: <br/>
 * <ul>
 * <li>Evitare <code>setPosition(x,y)</code>, <code>_setPosition(x,y)</code> e <code>translate(x,y)</code> su <code>Button</code> appartenenti a <code>Panel</code> contenenti molti pulsanti. <br/></li>
 * <li>Per ottenere maggiori performances, se si ha la necessita' di muovere un <code>Button</code>, invece di eseguire un metodo di movimento
 * direttamente sul <code>Button</code>, usare un <code>Panel</code> avente un solo <code>Button</code> al suo interno e chiamare
 * un metodo di movimento sul <code>Panel</code></li>
 * </ul>
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 */
Button.prototype.translate=function(tx,ty){
    this.parent.explodeSa();
    this.parent.explodeFr();

    with (this.data) {
        ex1 = this.parent.ltx + x + parseInt(tx);
        ey1 = this.parent.lty + y + parseInt(ty);
        ex2 = ex1+w;
        ey2 = ey1+h;
    }

    this.element.setAttribute("transform", "translate(" + tx + "," + ty + ")");
    this.sa.translate(tx,ty);
};

/**
 * Esegue in realta' una translate del <code>Button</code>
 * Usare <code>translate(x,y)</code> in caso di necessita' di tralsazione o una <code>_setPosition(x,y)</code> in caso si volgia riposizionare
 * il <code>Button</code>. Si ricorda che le coordinate x,y in caso di <code>translate(x,y)</code> non vengono modificate,
 * mentre in caso di <code>_setPosition(x,y)</code> le coordinate x,y sono modificate. Per ottenere la posizione visuale di un <code>Button</code> sullo schermo
 * usare <code>getTX()</code> e <code>getTY()</code>, per ottenere la posizone reale usare <code>getX()</code> e <code>getY()</code>. In caso non sia stata fatta una precedente <code>translate(x,y)</code>
 * o <code>setPosition(x,y)</code>, i metodi <code>getX()</code> e <code>getTX()</code> e i metodi <code>getY()</code> e <code>getTY()</code> ritornerano gli stessi valori <br/>
 * <br/> <b>TIPS</b>: <br/>
 * <ul>
 * <li>Evitare <code>setPosition(x,y)</code>, <code>_setPosition(x,y)</code> e <code>translate(x,y)</code> su <code>Button</code> appartenenti a <code>Panel</code> contenenti molti pulsanti. <br/></li>
 * <li>Per ottenere maggiori performances, se si ha la necessita' di muovere un <code>Button</code>, invece di eseguire un metodo di movimento
 * direttamente sul <code>Button</code>, usare un <code>Panel</code> avente un solo <code>Button</code> al suo interno e chiamare
 * un metodo di movimento sul <code>Panel</code></li>
 * </ul>
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 * deprecated
 */
Button.prototype.setPosition=function(x,y){
    this.translate(x,y);
};

/**
 * private
 */
Button.prototype.positionECoord=function(tx,ty){
    with (this.data) {
        ex1+=parseInt(tx);
        ey1+=parseInt(ty);
        ex2+=parseInt(tx);
        ey2+=parseInt(ty);
    }
};


/**
 * private
 */
Button.prototype.translateECoord=function(tx,ty){
    with (this.data) {
        ex1 = x + parseInt(tx);
        ey1 = y + parseInt(ty);
        ex2 = ex1+w;
        ey2 = ey1+h;
    }
};

/**
 * private
 */
Button.prototype.isIn=function(xc,yc){
    with(this.data) {
        return (((xc>=ex1)&&(xc<=ex2))&&((yc>=ey1)&&(yc<=ey2)));
    }
};

/**
 * Imposta la visibilita' della <code>Button</code>
 * param {boolean} b Visiblita'. <code>true</code> per renderlo visibile, <code>false</code> per renderlo non visibile
 * public
 */
Button.prototype.setVisible=function(b){
    if (this.visbile!=b) {
        if (b) {
            if (this.data.d!=undefined) this.setFrame(this.currentFrame); // MODIFIED 18/10/2005
        }
        this.visible = b;
    }
};

/**
 * Ritorna la visibilita' del <code>Button</code>
 * return <code>true</code> se visibile, <code>false</code> altrimenti
 * type boolean
 * public
 */
Button.prototype.isVisible=function(){
    return(this.visible);
};

/**
 * private
 */
Button.prototype.addButtonFrame = function(data){
    var buttonFrame=new ButtonFrame(data);
    var number = this.objectsV.length;

    this.objectsV[number]=buttonFrame;

    var frameName = this.parent.data.f[buttonFrame.data.i+1].n;

    this.objectsH[frameName]=buttonFrame;

    buttonFrame.parent = this;
    buttonFrame.name = buttonFrame.data.n = frameName;	//becuase we have only the index
    buttonFrame.number = number;
    buttonFrame.gid = global.getNewGId();

    if (buttonFrame.data.ti==undefined) buttonFrame.data.ti = buttonFrame.data.i; // MODIFIED 18/10/2005
    buttonFrame.ti = buttonFrame.data.ti;
    return buttonFrame;
};

/**
 * private
 */
Button.prototype.initVariables=function(){
    var vs=this.data.v;
    if(vs==undefined) return;
    for (var i=0; i < vs.length; i=i+2) {
        //global.addVariable(vs[i],vs[i+1]); // varibles are already created by panel.
        global.addVariableListener(vs[i], this);
        this.vars[vs[i]] = vs[i+1];
    }
};

/**
 * private
 */
Button.prototype.createFr=function(){
    if (this.data.f!=undefined) {
        var dbf = this.data.f[0];
        var bf = null;
        for (var i=1; i < this.data.f.length; i++) {
            bf = this.data.f[i];
            this.updateCoord(dbf,bf);
            this.addButtonFrame(bf);
        }
        if (this.data.d!=undefined) this.currentFrame = this.objectsV[this.data.d];
    }
    this.frCreated = true;
};

/**
 * private
 */
Button.prototype.doAction=function(action,eventType){
    if(action==undefined || action=="") return;
    try {eval(action);} catch (e) {alert("[EXCEPTION] "+e+ ", action: " + action);}
};

/**
 * private
 */
Button.prototype.stateChanged=function(event){
    if(!this.frCreated) this.createFr();
    // siccome il button e' il bersagli finale passo il controllo all'event manager
    global.eventManager.send(event,this);
};

/**
 * private
 */
Button.prototype.handleEvent=function(xEvent){
    this["on"+xEvent.type]();
};

/**
 * private
 */
Button.prototype.onMouseOver=function(){ this.doAction(this.data.a.over ,"onMouseOver");};

/**
 * private
 */
Button.prototype.onMouseOut=function(){	this.doAction(this.data.a.out ,"onMouseOut");};

/**
 * private
 */
Button.prototype.onClick=function(){ this.doAction(this.data.a.click,"onClick");};

/**
 * private
 */
Button.prototype.onMouseDown=function(){ this.doAction(this.data.a.down,"onMouseDown");};

/**
 * private
 */
Button.prototype.onMouseUp=function(){ this.doAction(this.data.a.up,"onMouseUp");};

/**
 * private
 */
Button.prototype.onMouseMove=function(){ this.doAction(this.data.a.move,"onMouseMove");};

/**
 * private
 */
Button.prototype.onDoubleClick=function(){
    if (this.data.a.doubleclick==undefined) this.onClick();
    this.doAction(this.data.a.doubleclick,"onDoubleClick");
};

/**
 * private
 */
Button.prototype.onTripleClick=function(){
    if (this.data.a.tripleclick==undefined) this.onDoubleClick();
    else {this.doAction(this.data.a.tripleclick,"onTripleClick");};
};

/**
 * private
 */
Button.prototype.onRightClick=function(){ this.doAction(this.data.a.rclick,"onRightClick");};

/**
 * private
 */
Button.prototype.onRightDown=function(){ this.doAction(this.data.a.rdown,"onRightDown");};

/**
 * private
 */
Button.prototype.onRightUp=function(){ this.doAction(this.data.a.rup,"onRightUp");};

/**
 * private
 */
Button.prototype.onVariableChanged=function(name){this.doAction(this.vars[name],"onVariableChanged('"+name+"')");};

/**
 * Permette di aggiungere dei comandi javascript da eseguire in caso di eventi provenienti da mouse
 * E' possibile specificare anche il numero del pulsante come ulteriore discriminante.
 * param {String} eventType Tipo di evento: <br/>
 * <ul>
 * 	<li><code>mouseout</code> : Uscita dall'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousemove</code> : Movimento nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseover</code> : Entrata nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousedown</code> : Pressione di un tasto nell'aree sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseup</code> : Rilascio di un tasto nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>click</code> : Pressione e rilascio nell'area sensibile del <code>Button</code> del mouse.</li>
 * </ul>
 * param {String} command Comando ECMAScript da eseguire. La stringa deve essere sintatticamente valida e deve essere seguita dal carettere
 * di terminazione ';'.
 * param {int} eventButton numero del bottone del mouse che s' stato premuto <br/>
 * <ul>
 *	<li><code>0</code> : 0 tasto sinistro del mouse</li>
 *	<li><code>1</code> : 1 tasto centrale del mouse (NON gestito per adesso)</li>
 *	<li><code>2</code> : 2 tasto destro del mouse</li>
 * </ul>
 * public
 */
Button.prototype.addAction = function(eventType, command, eventButton) {
    switch (eventType) {
        case "mouseout":  this.data.a.out+=command; break;
        case "mousemove": this.data.a.move+=command; break;
        case "mouseover": this.data.a.over+=command; break;
        case "mousedown": {
            if (eventButton==1) return;
            else if(eventButton==0) this.data.a.down+=command;
            else if (eventButton==2) this.data.a.rdown+=command;
            else if (eventButton==null) {this.data.a.down+=command;this.data.a.rdown+=command;}
            break;
        }
        case "mouseup": {
            if (eventButton==1) return;
            else if(eventButton==0) this.data.a.up+=command;
            else if (eventButton==2) this.data.a.rup+=command;
            else if (eventButton==null) {this.data.a.up+=command;this.data.a.rup+=command;}
            break;
        }
        case "click": {
            if (eventButton==1) return;
            else if(eventButton==0) this.data.a.click+=command;
            else if (eventButton==2) this.data.a.rclick+=command;
            else if (eventButton==null) {this.data.a.click+=command;this.data.a.rclick+=command;}
            break;
        }
        default : {
            // undocumented feature
            var v = this.vars[eventType];
            if (v==undefined) this.vars[eventType]=command;
            else {this.vars[eventType]+=command;};
        }
    }
};

/**
 * Permette di aggiungere dei comandi javascript da eseguire in caso di eventi provenienti da mouse
 * param {String} eventType Tipo di evento: <br/>
 * <ul>
 * 	<li><code>mouseout</code> : Uscita dall'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousemove</code> : Movimento nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseover</code> : Entrata nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mousedown</code> : Pressione di un tasto nell'aree sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>mouseup</code> : Rilascio di un tasto nell'area sensibile del <code>Button</code> del mouse.</li>
 * 	<li><code>click</code> : Pressione e rilascio nell'area sensibile del <code>Button</code> del mouse.</li>
 * </ul>
 * param {String} command Comando ECMAScript da eseguire. La stringa deve essere sintatticamente valida e deve essere seguita dal carettere
 * di terminazione ';'.
 * public
 */
Button.prototype.addAction = function(eventType, command) {
    this.addAction(eventType, command, null);
};

/**
 * Ritorna il nome del <code>ButtonFrame</code> corrente.
 * return Nome del <code>ButtonFrame</code> corrente
 * public
 * type String
 */
Button.prototype.getCurrentFrameName=function(){
    if(!this.frCreated) this.createFr();
    if (this.currentFrame!=null) return this.currentFrame.name;
    else return null;
};

/**
 * Ritorna il nome del <code>ButtonFrame</code> corrente. DEPRECATED: Usare <code>getCurrentFrameName()</code><br>
 * public
 * deprecated Usare <code>getCurrentFrameName()</code>
 * return Nome del <code>ButtonFrame</code> corrente
 * type String
 */
Button.prototype.getCurrentFrame=Button.prototype.getCurrentFrameName;


/**
 * Visualizza il frame avente nome specificato.
 * Se il frame indicato e' gia' il frame corrente nessuna ulteriore azione viene intrapresa.
 * param {String} name Nome del frame da visualizzare
 * public
 */
Button.prototype.goToFrameByName=function(name){
    if ((this.currentFrame!=null) && (this.currentFrame.name==name)) {
        ///*<<<*/alert("[DEBUG] Button.prototype.goToFrameByName: Already on the current frame " + name);/*>>>*/
        return;
    }
    if(!this.frCreated) this.createFr();
    var bf = this.objectsH[name];
    if (bf!=undefined) this.setFrame(bf);
    else {
        ///*<<<*/alert("[WARN] Button.prototype.goToFrameByName: The requested frame doesn't exist: name: " + name + ", Going to first...");/*>>>*/
        if (this.objectsV.length>0) this.setFrame(this.objectsV[0]);
    }
};

/**
 * Visualizza il frame avente nome specificato.
 * Se il frame indicato e' gia' il frame corrente nessuna ulteriore azione viene intrapresa.
 * param {String} name Nome del frame da visualizzare
 * public
 */
Button.prototype.goTo=Button.prototype.goToFrameByName;

/**
 * Imposta il cursore sul Button
 * param {String} cursorId Identificatore dell'oggetto SVG corrsipondente
 * public
 */
Button.prototype.setCursor=function(cursorId) {
    this.parent.explodeSa();
    this.sa.element.style.cursor = "url(#"+cursorId+")";
};

/**
 * Rimuove il cursore corrente dal <code>Button</code>
 * public
 */
Button.prototype.removeCursor=function() {
    this.sa.element.setAttribute("cursor","auto");
};

/**
 * private
 */
Button.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[Button]");
    for (var j=0; j < this.getObjectCount(); j++) {
        this.getObjectByNumber(j).printUrls();
    }
};/**
 * private
 */
Panel.type = "Panel";

/**
 * <p>La classe <b>Panel</b> e' una classe contenente dei Button.<br>
 * Questa classe sostituisce la ButtonContainer della V1 ma ne garantisce le stesse funzionalita' e comportamento.
 * La classe non puo' essere istanziata direttamente. E'possibile ottenere un'istanza di questa classe navigando nella struttura ad albero
 * della simulazione.
 *
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * param {Object} data il data package passato dal costruttore.<br>
 */
function Panel(data){
    this.baseClass(data);

    /**
     * private
     */
    this.masksV=[];

    /**
     * proxy frame image vector & hashtable
     * private
     */
    this.frPrxsV=[];

    /**
     * proxy sa rects
     * private
     */
    this.saPrxsV=[];

    /**
     * proxy background image
     * private
     */
    this.bgPrx=null;

    /**
     * private
     */
    this.bgCreated=false;

    /**
     * private
     */
    this.btCreated=false;

    /**
     * private
     */
    this.saCreated=false;

    /**
     * private
     */
    this.frCreated=false;

    /**
     * private
     */
    this.element = global.document.getElementById(this.data.g);


    /**
     * private
     */
    this.lastTarget = null;

    /**
     * private
     */
    this.explodedSa = false;

    /**
     * private
     */
    this.explodedFr = false;

    /**
     * private
     */
    this.ltx = 0;

    /**
     * private
     */
    this.lty = 0;
};

Panel.prototype=new XObject();

/**
 * private
 */
Panel.prototype.explodeFr=function(){
    if (this.explodedFr) return;
    var fr;
    for (var i=0; i < this.frPrxsV.length; i++) {fr = this.frPrxsV[i];if(fr!=null) fr.setVisible(false);}
    for (var i=this.objectsV.length-1; i >= 0; i--) this.objectsV[i].detach();
    this.explodedFr = true;
};

/**
 * private
 */
Panel.prototype.explodeSa=function(){
    if (this.explodedSa) return;
    // faccio lo stesso il lavoro per sicurezza
    //if (this.saPrxsV.length < this.objectsV.length) {
    // elimina tutte le SA vecchie
    var sa;
    for (var i=0; i < this.saPrxsV.length; i++) {
        sa = this.saPrxsV[i];
        this.element.removeChild(sa.element);
    }

    this.saPrxsV = [];
    this.data.s = [];

    // per ogni button ne crea una
    var b = null;
    var rp = null;
    for (var i=this.objectsV.length-1; i >= 0; i--) {
        b = this.objectsV[i];
        rp = new RectProxy({x:b.data.x,y:b.data.y,w:b.data.w,h:b.data.h},this);
        rp.list[0] = b.number;
        this.saPrxsV[this.saPrxsV.length] = rp;
        this.data.s.push({x:b.data.x,ex1:b.data.x,y:b.data.y,ey1:b.data.y,w:b.data.w,ex2:(b.data.x+b.data.w),h:b.data.h,ey2:(b.data.y+b.data.h),b:[b.number]});
        rp.setSensible(this.visible);
        b.sa = rp;
    }
    //}
    this.explodedSa = true;
};


/**
 * private
 */
Panel.prototype.getSaByButton=function(button){
    var sa,list;
    for(var i=0; i<this.saPrxsV.length; i++){
        sa = this.saPrxsV[i];
        list = sa.list;
        for(var j=0; j<list.length; j++){
            if(list[j]==button.number) return sa;
        }
    }
    return null;
};

/**
 * private
 */
Panel.prototype.createSa=function(){
    var rp = null;
    var s = null;
    for (var i=0; i<this.data.s.length; i++) {
        s = this.data.s[i];
        rp = new RectProxy({x:s.x,y:s.y,w:s.w,h:s.h},this);
        if(this.data.s[i].b!=undefined) {
            rp.list=this.data.s[i].b;
        }
        this.saPrxsV[this.saPrxsV.length] = rp;
    }
    this.saCreated=true;
};

/**
 * private
 */
Panel.prototype.findTargetButtonFromAll=function(event,source) {
    var bob = null;
    for (var i=0; i<this.objectsV.length; i++) {
        bob = this.objectsV[i];
        if (bob.isIn(event.clientX,event.clientY)) {
            return bob;
        }
    }
    //alert("[ASSERT FAIL] Can't find the Button.");
    console.log("[ASSERT FAIL] Can't find the Button.");
};

/**
 * private
 */
Panel.prototype.findTargetButtonFromList=function(event,source) {

    //console.log("Event: x: " + event.clientX + ", y: " + event.clientY);

    var bob = null;
    for (var i=0; i<source.list.length; i++) {
        bob = this.objectsV[source.list[i]];
        if (bob.isIn(event.clientX,event.clientY)) {
            return bob;
        }
    }
    return this.findTargetButtonFromAll(event,source);
};

/**
 * private
 */
Panel.prototype.fireChange=function(event,source){
    // Event pre-processing
    // necessario per poter avere lo stesso identico comportamento di V1
    //alert("EVT: " + event.type);
    switch (event.type) {
        case "mouseover" : {
            this.lastTarget = this.findTargetButtonFromList(event,source);
            this.lastTarget.stateChanged(event);
            break;
        }
        case "mousemove" : {
            var bob = this.findTargetButtonFromList(event,source);
            if (bob != this.lastTarget) {
                // cambio di button
                this.lastTarget.stateChanged(global.eventManager.mouseoutevt);
                bob.stateChanged(global.eventManager.mouseoverevt);
                this.lastTarget = bob;
            }
            this.lastTarget.stateChanged(event);
            break;
        }
        default : this.lastTarget.stateChanged(event);
    }
};

/**
 * private
 */
Panel.prototype.finish=function(){};

/**
 * private
 */
Panel.prototype.init = function(){

    // per essere coerenti con il Buttob forse è il caso di spostarlo nel costruttore
    this.initVariables();
};

/**
 * private
 */
Panel.prototype.build = function(){
    ///*<<<*/alert("[DEBUG] Panel.prototype.build: Building panel...");/*>>>*/
    if(!this.bgCreated) this.createBg();
    if(!this.btCreated) this.createBt();
    if(!this.saCreated) this.createSa();
    if(!this.frCreated) this.createFr();
    this.builded=true;
};

/**
 * private
 */
Panel.prototype.addButton = function(data){
    return this.addObject(new Button(data), this.objectsV, this.objectsH, null);
};

/**
 * Imposta la visibilita' del Panel e di tutti i suoi figli.
 * param {boolean} b Visiblita'. true per renderlo visibile, false per renderlo non visibile
 * public
 */
Panel.prototype.setVisible=function(b){
    //alert("[DEBUG] Panel.prototype.setVisible: name: " + this.data.n);
    if (this.visbile!=b) {
        if(!this.builded) this.build(); //istanvces & init

        // bt visibility
        for(var i=0; i < this.objectsV.length; i++) {
            this.objectsV[i].setVisible(b);
        }

        // bg vis
        if(this.bgPrx!=null) this.bgPrx.setVisible(b);

        // frames vis
        for(var i=0; i < this.frPrxsV.length; i++) {
            if(this.frPrxsV[i]!=null) {
                this.frPrxsV[i].setVisible(b&(!this.masksV[i].isEmpty()));
            }
        }

        // sa sensibility
        for(var i=0; i < this.saPrxsV.length; i++) {
            this.saPrxsV[i].setSensible(b);
        }
        this.visible=b;
    }
};

/**
 * private
 */
Panel.prototype.initVariables=function(){
    //alert("Panel.prototype.initVariables" + this.data.n);

    // qui dichiaro la variabile.
    // poi nel button aggiungerò la action e aggiungero' il listener

    var bdata = null;
    var j;
    for (var i=1; i < this.data.b.length; i++) {
        bdata = this.data.b[i];
        if (bdata.v!=undefined) {
            var vars=bdata.v;
            for (j=0; j < vars.length; j=j+2) global.addVariable(vars[j],"");
        }
    }
};

/**
 * private
 */
Panel.prototype.createBg=function(){
    if(this.data.o!=undefined) {
        this.bgPrx = new ImageProxy({x:this.data.x,y:this.data.y,w:this.data.w,h:this.data.h},global.document.getElementById(this.data.o),this);
        // solo le imaggini di bg possono predere eventi
        this.bgPrx.setSensible(true);
    }
    this.bgCreated=true;
};

/**
 * private
 */
Panel.prototype.createBt=function(){
    if (this.data.b!=undefined) {
        var dbt = this.data.b[0];	// default button
        var bt;
        for (var i=1; i < this.data.b.length; i++) {
            bt = this.data.b[i];
            this.updateCoord(dbt,bt);
            this.updateActions(dbt,bt);
            this.addButton(bt);
        }
    }
    this.fireInit();
    this.btCreated=true;
};

/**
 * Restituisce il numero di bottoni figli presenti
 * return {int} Numero di bottoni figli presenti
 * type int
 * public
 */
Panel.prototype.getObjectCount = function() {
    if (this.builded) return this.objectsV.length;
    else return (this.data.b.length-1);
};

/**
 * Restituisce bottone utilizzando il nome per indetificarlo
 * param {String} name Il nome del bottone
 * return bottone
 * type Object
 * public
 */
Panel.prototype.getObjectByName = function(name) {
    if(!this.builded) this.build();
    return this.objectsH[name];
};

/**
 * Restituisce l'oggetto figlio utilizzando l'identificatore per indetificarlo
 * param {String} id L'identificatore dell'oggetto figlio
 * return Oggetto figlio
 * type Object
 * public
 */
Panel.prototype.getObjectById = function(id) {
    if(!this.builded) this.build();
    for (var i=0; i < this.objectsV.length; i++) {
        if (this.objectsV[i].getId() == id) return this.objectsV[i];
    }
    return null;
};

/**
 * private
 */
Panel.prototype.getObjectByGId = function(gid) {
    if(!this.builded) this.build();
    for (var i=0; i < this.objectsV.length; i++) {
        if (this.objectsV[i].gid == gid) return this.objectsV[i];
    }
    return null;
};

/**
 * Restituisce l'oggetto figlio utilizzando il suo posizionamento per identificarlo
 * param {string} number Posizionamento. Se un oggetto e' stato aggiunto per primo avra' come numero 1, se secondo 2, etc.
 * return Oggetto figlio
 * type Object
 * public
 */
Panel.prototype.getObjectByNumber = function(number) {
    if(!this.builded) this.build();
    if (number >= this.objectsV.length) {/*alert("[WARN] XObject.prototype.getObjectByNumber: The requested object doesn't exist: number: " + number);*/}
    else return this.objectsV[number];
};

/**
 * private
 */
Panel.prototype.createFr=function(){
    if (this.data.f!=undefined) {
        var dfr = this.data.f[0];	// default frame
        var fr,frp,cp = null;
        for (var i=1; i < this.data.f.length; i++) {
            fr = this.data.f[i];
            frp = cp = null;
            if (fr.o!=undefined) {
                // image
                this.updateCoord(dfr,fr);
                frp = new ImageProxy({x:fr.x,y:fr.y,w:fr.w,h:fr.h}, global.document.getElementById(fr.o), this);
                //frp.setVisible(false);
                cp = new ClipPath();
            }
            this.frPrxsV[i-1] = frp;
            this.masksV[i-1] = cp;
        }
    }
    this.frCreated=true;
};

/**
 * private
 */
Panel.prototype.updateActions=function(sob,dob){
    // source & destination objects
    if (dob.a==undefined) dob.a={};
    if (sob.a==undefined) return;

    if ((dob.a.over==undefined) && (sob.a.over!=undefined)) dob.a.over=sob.a.over;
    if ((dob.a.out==undefined) && (sob.a.out!=undefined)) dob.a.out=sob.a.out;
    if ((dob.a.click==undefined) && (sob.a.click!=undefined)) dob.a.click=sob.a.click;
    if ((dob.a.doubleclick==undefined) && (sob.a.doubleclick!=undefined)) dob.a.doubleclick=sob.a.doubleclick;
    if ((dob.a.down==undefined) && (sob.a.down!=undefined)) dob.a.down=sob.a.down;
    if ((dob.a.up==undefined) && (sob.a.up!=undefined)) dob.a.up=sob.a.up;
    if ((dob.a.move==undefined) && (sob.a.move!=undefined)) dob.a.move=sob.a.move;
    if ((dob.a.rclick==undefined) && (sob.a.rclick!=undefined)) dob.a.rclick=sob.a.rclick;
    if ((dob.a.rdown==undefined) && (sob.a.rdown!=undefined)) dob.a.rdown=sob.a.rdown;
    if ((dob.a.rup==undefined) && (sob.a.rup!=undefined)) dob.a.rup=sob.a.rup;
    if ((dob.a.tripleclick==undefined) && (sob.a.tripleclick!=undefined)) dob.a.tripleclick=sob.a.tripleclick;
    // TODO add ohters if any
};

/**
 * Imposta per tutti i Button appartenenti a questo Panel il ButtonFrame indicato dal parametro passato
 * param {String} name Il nome del ButtonFrame da selezionare per ogni figlio.
 * <br/><b>TIPS</b>:<br/>
 * E' consigliabile chiamare questo metodo su Panel aventi Button in cui esistono dei ButtonFrame con il nome indicato
 * param {String} name Nome del ButtonFrame che deve essere impostato per ogni Button appartenente al Panel
 * public
 */
Panel.prototype.setAllToFrame = function(name){
    // The user needs the structure
    if(!this.builded) this.build();
    for (var i=0; i<this.objectsV.length; i++) this.objectsV[i].goToFrameByName(name);
};

/**
 * Restituisce l'oggetto figlio utilizzando il nome per indetificarlo
 * param {String} name Il nome dell'oggetto figlio
 * return Oggetto figlio
 * type Object
 * public
 */
Panel.prototype.down = function(name) {
    // The user needs a button. We have to load the entire panel.
    if(!this.builded) this.build();
    return this.objectsH[name];
};

/**
 * Esegue in realta' una <code>translate(x,y)</code> del <code>Panel</code>
 * Usare <code>translate(x,y)</code> in caso di necessita' di tralsazione o una <code>_setPosition(x,y)</code> in caso si voglia riposizionare il Panel.
 * <br/> Si ricorda che le coordinate x,y in caso di tralsazione <b>NON</b> vengono modificate,
 * mentre in caso di <code>_setPosition(x,y)</code> le coordinate x,y sono modificate. Per ottenere la posizione visuale di un Panel sullo schermo
 * usare <code>getTX()</code> e <code>getTY()</code>, per ottenere la posizone reale usare <code>getX()</code> e <code>getY()</code>. In caso non sia stata fatta una precedente <code>translate()</code>
 * o <code>setPosition(x,y)</code>, i metodi <code>getX()</code> e <code>getTX()</code> e i metodi <code>getY()</code> e <code>getTY()</code> ritornerano gli stessi valori
 * <br/> <b>TIPS</b>: <br/>
 * <ul>
 * <li>Evitare <code>setPosition(x,y)</code>, <code>_setPosition(x,y)</code> e <code>translate(x,y)</code> su <code>Button</code> appartenenti a <code>Panel</code> contenenti molti pulsanti. <br/></li>
 * <li>Per ottenere maggiori performances, se si ha la necessita' di muovere un <code>Button</code>, invece di eseguire un metodo di movimento
 * direttamente sul <code>Button</code>, usare un <code>Panel</code> avente un solo <code>Button</code> al suo interno e chiamare
 * un metodo di movimento sul <code>Panel</code></li>
 * </ul>
 * public
 * deprecated Usare <code>translate(x,y)</code>
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 */
Panel.prototype.setPosition = function(x, y){
    this.translate(x,y);
};

/**
 * Esegue una traslazione di tutti i <code>Button</code> del <code>Panel</code> di x,y e dell'immagine di sfondo se presente.
 * <br/> Si ricorda che le coordinate x,y in caso di tralsazione <b>NON</b> vengono modificate,
 * mentre in caso di <code>_setPosition(x,y)</code> le coordinate x,y sono modificate. Per ottenere la posizione visuale di un <code>Panel</code> sullo schermo
 * usare <code>getTX()</code> e <code>getTY()</code>, per ottenere la posizone reale usare <code>getX()</code> e <code>getY()</code>. In caso non sia stata fatta una precedente <code>translate()</code>
 * o <code>setPosition(x,y)</code>, i metodi <code>getX()</code> e <code>getTX()</code> e i metodi <code>getY()</code> e <code>getTY()</code> ritornerano gli stessi valori
 * <br/> <b>TIPS</b>: <br/>
 * <ul>
 * <li>Evitare <code>setPosition(x,y)</code>, <code>_setPosition(x,y)</code> e <code>translate(x,y)</code> su <code>Button</code> appartenenti a <code>Panel</code> contenenti molti pulsanti. <br/></li>
 * <li>Per ottenere maggiori performances, se si ha la necessita' di muovere un <code>Button</code>, invece di eseguire un metodo di movimento
 * direttamente sul <code>Button</code>, usare un <code>Panel</code> avente un solo <code>Button</code> al suo interno e chiamare
 * un metodo di movimento sul <code>Panel</code></li>
 * </ul>
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 */
Panel.prototype.translate = function(x, y){
    if(!this.builded) this.build();
    this.element.setAttribute("transform", "translate(" + x + "," + y + ")");

    for(var i=0; i < this.objectsV.length; i++) this.objectsV[i].translateECoord(x, y);

    this.ltx = x;
    this.lty = y;
};

/**
 * Restituisce la coordinata x dell'immagine di background.
 * Se il background non esiste ritorna null
 * <br/> <b>N.B.</b> Tale coordinata non viene modificata da una translate
 * return coordinata x dell'immagine di background
 * type int
 * public
 */
Panel.prototype.getX=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.bgPrx.x;
        else return this.data.x;
    } else return null;
};

/**
 * Restituisce la coordinata y dell'immagine di background.
 * Se il background non esiste ritorna null
 * <br/> <b>N.B.</b> Tale coordinata non viene modificata da una translate
 * return coordinata y dell'immagine di background
 * type int
 * public
 */
Panel.prototype.getY=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.bgPrx.y;
        else return this.data.y;
    } else return null;
};

/**
 * Restituisce la larghezza w dell'immagine di background.
 * Se il background non esiste ritorna null
 * return larghezza w dell'immagine di background
 * type int
 * public
 */
Panel.prototype.getWidth=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.bgPrx.w;
        else return this.data.w;
    } else return null;
};

/**
 * Restituisce l'altezza h dell'immagine di background.
 * Se il background non esiste ritorna null
 * return altezza h dell'immagine di background
 * public
 * type int
 */
Panel.prototype.getHeight=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.bgPrx.h;
        else return this.data.h;
    } else return null;
};

/**
 * Appende al <code>Panel</code> un oggetto SVG. L'oggetto aggiunto andra' a sovrapporsi a tutti gli oggetti presenti nel <code>Panel</code>
 * public
 * param {Object} element Elemento SVG da aggiungere
 */
Panel.prototype.appendSVGElement=function(element) {
    if(!this.builded) this.build();
    this.element.appendChild(element);
};

/**
 * Rimuove dal <code>Panel</code> un oggetto SVG presente
 * public
 * param {Object} element Elemento SVG da rimuovere
 */
Panel.prototype.removeSVGElement=function(element) {
    this.element.removeChild(element);
};

/**
 * private
 */
Panel.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[Panel]");
    for (var j=0; j < this.getObjectCount(); j++) {
        this.getObjectByNumber(j).printUrls();
    }
};/**
 * private
 */
Image.type = "Image";

/**
 * La classe <code>Image</code> modellizza una generica immagine SVG. Sostituisce la classe <code>SVGObject</code> della versione V1 delle API.
 * La classe non puo' essere istanziata direttamente. E'possibile ottenere un'istanza di questa classe navigando nella struttura ad albero
 * della simulazione.
 * L'oggetto può essere figlio di un <code>Frame</code>
 * constructor
 * author Stoev Andrey
 * author Bruna Stefano
 * param {Object} data il data package passato dal costruttore.<br>
 * public
 */
function Image(data){
    this.baseClass(data);

    /**
     * private
     */
    this.imgPrx = null;

    /**
     * private
     */
    this.bgCreated = false;
};

Image.prototype=new XObject();

/**
 * private
 */
Image.prototype.init=function(){};

/**
 * private
 */
Image.prototype.stateChanged=function(){};

/**
 * private
 */
Image.prototype.build=function(){
    if (!this.bgCreated) this.createBg();
    this.builded=true;
};

/**
 * private
 */
Image.prototype.createBg=function(){
    with(this.data){
        var element = global.document.getElementById(o);
        element.style.zIndex = this.iZIndex;
        this.imgPrx = new ImageProxy({x:x, y:y, w:w, h:h}, element, this);
        this.imgPrx.setSensible(true);
        this.imgPrx.setVisible(false);
    }
    this.bgCreated=true;
};

/**
 * Esegue una tralsazione della <code>Image</code> di x e y
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 * public
 */
Image.prototype.translate=function(x,y){
    if(!this.builded) this.build();
    this.imgPrx.translate(x,y);
};

/**
 * Esegue in realta' una translate della <code>Image</code>
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 * public
 * deprecated
 */
Image.prototype.setPosition=Image.prototype.translate;

/**
 * Esegue riposizionamento della <code>Image</code> alle coordinate x,y
 * public
 * param {int} x coordinata x di posizionamento
 * param {int} y coordinata y di posizionamento
 */
Image.prototype._setPosition=function(x,y){
    if(!this.builded) this.build();
    this.imgPrx._setPosition(x,y);
};

/**
 * Imposta la visibilita' della <code>Image</code>
 * param {boolean} b Visiblita'. true per renderla visibile, false per renderla non visibile
 * public
 */
Image.prototype.setVisible=function(b){
    if (this.visible!=b) {
        if(!this.builded) this.build();
        this.imgPrx.setVisible(b);
        this.visible=b;
    }
};

/**
 * Restituisce la coordinata x dell'immagine
 * <br/> <b>N.B.</b> Tale coordinata non viene modificata da una translate
 * return coordinata x dell'immagine
 * type int
 * public
 */
Image.prototype.getX=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.imgPrx.x;
        else return this.data.x;
    } else return null;
};

/**
 * Restituisce la coordinata y dell'immagine di background.
 * <br/> <b>N.B.</b> Tale coordinata non viene modificata da una translate
 * return coordinata y dell'immagine
 * type int
 * public
 */
Image.prototype.getY=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.imgPrx.y;
        else return this.data.y;
    } else return null;
};

/**
 * Restituisce la larghezza w dell'immagine
 * return larghezza w dell'immagine
 * type int
 * public
 */
Image.prototype.getWidth=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.imgPrx.w;
        else return this.data.w;
    } else return null;
};

/**
 * Restituisce l'altezza h dell'immagine
 * return altezza h dell'immagine
 * public
 * type int
 */
Image.prototype.getHeight=function() {
    if (this.data.o!=undefined) {
        if (this.bgCreated) return this.imgPrx.h;
        else return this.data.h;
    } else return null;
};


/**
 * private
 * Eisiste per poter supportare il fatto che il compilatore transforma una Panel in una Image nel caso
 * il Panel non abbia bottoni. Tuttavia nel codice custom viene visto dallo sviluppatore come Panel e quindi deve avere gli stessi metodi
 */
Image.prototype.setAllToFrame = function(name){};

/**
 * private
 */
Image.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[Image]");
};/**
 * private
 */
Label.type = "Label";

/**
 * <p>La classe <b>Label</b> permette di avere un testo svg in una determinata posizione dello schermo.
 * La classe non puo' essere istanziata direttamente. E'possibile ottenere un'istanza di questa classe navigando nella struttura ad albero
 * della simulazione.
 * </p>
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * param data il data package passato dal costruttore.<br>
 */
// La classe e' incompleta in quanto mancano i alcuni metodi per poter customizzare il testo.
function Label(data){
    this.baseClass(data);

    /**
     * Oggetto SVG corrsipondente al gruppo che contiene il testo
     * Il binding con il main SVG object viene fatto sempre nel costruttore
     * private
     */
    this.element=global.document.getElementById(this.data.g);

    /**
     * Oggetto SVG corrsipondente all'elemento SVG text
     * private
     */
    this.textElement=null;

}
Label.prototype=new XObject();

/**
 *	Inizializza la Label.
 *	Non avendo figli l'oggetto non propaga il segnale di init
 *	private
 */
Label.prototype.init=function(){
    this.element.setAttribute("visibility","hidden");
};

/**
 *	Creazione crea il testo
 *	private
 */
Label.prototype.createTxt=function() {
    this.textElement=global.document.createElementNS(global.svgns,"text");
    this.textElement.setAttribute("x",this.data.x);
    this.textElement.setAttribute("y",this.data.y);
    this.textElement.setAttribute("w",this.data.w);
    this.textElement.setAttribute("h",this.data.h);
    this.textElement.setAttribute("style","font-size:14;font-family:Liberation Sans;");
    this.element.appendChild(this.textElement);

    if (this.data.t!=undefined) {
        var data  = global.document.createTextNode(this.data.t);
        this.textElement.appendChild(data);
    }
};

/**
 *	Esegue la build dell'oggetto come implementazione dei meccanismi di LazyLoading
 *	private
 */
Label.prototype.build=function(){
    this.createTxt();
    this.builded=true;
};

/**
 *	Notifica all'oggetto un evento. La Label non gestisce alcun evento
 *	private
 */
Label.prototype.stateChanged=function(){};

/**
 * Imposta la visibilita' della <code>Label</code>
 * param {boolean} b Visiblita'. true per renderla visibile, false per renderla non visibile
 * public
 */
Label.prototype.setVisible = function(b) {
    if (this.visible!=b) {
        if(!this.builded) this.build();
        this.element.setAttribute("visibility", (b)?("visible"):("hidden"));
        this.visible=b;
    }
};

/**
 * Esegue una tralsazione della <code>Label</code> di x e y
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 * public
 */
Label.prototype.translate = function(x, y) {
    if(!this.builded) this.build();
    this.element.translate(x,y);
};

/**
 * Esegue in realta' una translate della <code>Label</code>
 * param {int} x valore x di traslazione
 * param {int} y valore y di traslazione
 * public
 * deprecated
 */
Label.prototype.setPosition = Label.prototype.translate;

/**
 * Esegue riposizionamento della <code>Label</code> alle coordinate x,y
 * public
 * param {int} x coordinata x di posizionamento
 * param {int} y coordinata y di posizionamento
 */
Label.prototype._setPosition=function(x,y){
    if(!this.builded) this.build();
    if(x!=this.x) this.textElement.setAttribute("x",this.data.x=x);
    if(y!=this.x) this.textElement.setAttribute("y",this.data.y=y);
};

/**
 * Imposta il testo della <code>Label</code>
 * public
 * param {String} text Testo da impostare
 */
Label.prototype.setText=function(text) {
    alert("[WARN] Label.prototype.setText: Not yet implemented");
};

/**
 * Imposta il tipo di font del testo visualizzato al centro del <code>Label</code>
 * param {String} Famiglia del font
 * public
 */
Label.prototype.setFontFamily = function(fontFamily){
    alert("[WARN] Label.prototype.setFontFamily: Not yet implemented");
};

/**
 * Imposta la dimensione del testo visualizzato al centro del <code>Label</code>
 * param {int} Dimensione del testo
 * public
 */
Label.prototype.setFontSize = function(size){
    alert("[WARN] Label.prototype.setFontSize: Not yet implemented");
};

/**
 * Imposta la dimensione del testo visualizzato al centro del <code>Label</code><br/>
 * param {String} Colore del test nel formato RGB 'rgb(R,G,B)'
 * public
 */
Label.prototype.setFontColor = function(color){
    alert("[WARN] Label.prototype.setFontColor: Not yet implemented");
};

/**
 * private
 */
Label.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[Label]");
};/**
 * constructor
 * author Biscaro Fabio
 * private
 */
function GlassRectangle(parent, parentText) {

    /**
     * private
     */
    this.x = 0;

    /**
     * private
     */
    this.y = 0;

    /**
     * private
     */
    this.y2 = 0;


    /**
     * private
     */
    this.w = 0;

    /**
     * private
     */
    this.h = 0;

    /**
     * private
     */
        //this.color = "rgb(62, 124, 226)";	//azzurro acqua
    this.color = "rgb(0, 0, 0)";		//nero
    //this.color = "rgb(49, 106, 197)";	//blu explorer

    /**
     * private
     */
    this.visible = false;

    /**
     * private
     */
    this.rect = global.document.createElementNS(global.svgns, "rect");
    this.rect.setAttribute("width", this.w);
    this.rect.setAttribute("height", this.h);
    //this.rect.setAttribute("x", this.x);
    //this.rect.setAttribute("y", this.y);
    this.rect.setAttribute("fill", this.color);
    this.rect.setAttribute("visibility", "hidden");


    /**
     * private
     */
    this.text = global.document.createElementNS(global.svgns, "text");
    this.text.setAttribute("width", this.w);
    this.text.setAttribute("height", this.h);
    //this.text.setAttribute("x", this.x);
    //this.text.setAttribute("y", this.y);
    this.text.setAttribute("fill", "rgb(255, 255, 255)");
    this.text.setAttribute("visibility", "hidden");


    /**
     * private
     */
    this.parent = parent;
    this.parentText = parentText;
    this.parent.appendChild(this.rect);
    this.parentText.appendChild(this.text);

    //this.id=(this.rect+"").substring((this.rect+"").length-8,(this.rect+"").length);
};

/**
 * private
 */
GlassRectangle.prototype.setVisibility = function(b) {
    if (b != this.visible) {
        this.visible = b;
        this.rect.setAttribute("visibility", (b?"visible":"hidden"));
        this.text.setAttribute("visibility", (b?"visible":"hidden"));
    }
};

/**
 * private
 */
GlassRectangle.prototype.setWidth = function(w) {
    if (w > 0) {
        if (w != this.w) {
            this.w = w;
            this.rect.setAttribute("width", this.w);
            this.text.setAttribute("width", this.w);
        }
        this.setVisibility(true);
    }
    else {this.setVisibility(false);};
};

/**
 * private
 */
GlassRectangle.prototype.setHeight = function(h) {
    //alert(this._id+" GlassRectangle::setHeight="+valore);
    if (h != this.h) {
        this.h = h;
        this.rect.setAttribute("height", this.h);
        this.text.setAttribute("height", this.h);
    }
};

/**
 * private
 */
GlassRectangle.prototype.setX = function(x) {
    //alert(this._id+" GlassRectangle::setX="+valore);
    if (x != this.x) {
        this.x = x;
        this.rect.setAttribute("x", this.x);
        this.text.setAttribute("x", this.x);
    }
};

/**
 * private
 */
GlassRectangle.prototype.getX = function() {
    return this.rect.getAttribute("x");
};

/**
 * private
 */
GlassRectangle.prototype.setY = function(y) {
    //alert(this._id+" GlassRectangle::setY="+valore);
    if (y != this.y) {
        this.y = y;
        this.rect.setAttribute("y", this.y);
    }
};

/**
 * private
 */
GlassRectangle.prototype.setSelY = function(sy) {
    if (sy != this.y2) {
        this.y2 = sy;
        this.text.setAttributeNS(null, "y", this.y2);
    }
};

/**
 * private
 */
GlassRectangle.prototype.getSelY = function() {
    return this.text.getAttribute("y");
};

/**
 * private
 */
GlassRectangle.prototype.setRectangleColor = function(c) {
    this.color = c;
    this.rect.setAttribute("fill", this.color);
};

/**
 * private
 */
GlassRectangle.prototype.setSelText = function(text) {
    // creo un nuovo nodo di testo
    var data  = global.document.createTextNode("");
    // aggiorno la gerarchia degli oggetti
    this.text.appendChild(data);
    temp = this.text.getFirstChild();
    temp.data = text;
};

/**
 * private
 */
GlassRectangle.prototype.setAttribute = function(name,value) {
    this.text.setAttribute(name, value);
};

/**
 * Imposta lo stile del testo
 */
GlassRectangle.prototype.setSelTextStyle = function(style) {
    this.text.setAttribute('style', style);
};

/**
 *
 * Indica se il gRect � visibile o meno.
 * return True se � visibile, false in caso contrario
 * type boolean
 */
GlassRectangle.prototype.getVisibility=function(){
    return this.visible;
};

/**
 * private
 */
GlassRectangle.prototype.setFontColor=function(color){
    this.text.setAttribute("fill", color);
};/**
 * public
 */
MouseAction.RIGHTBUTTON = 2;

/**
 * public
 */
MouseAction.LEFTBUTTON = 0;

/**
 * public
 */
MouseAction.CENTERBUTTON = 1;

/**
 * constructor
 * author Biscaro Fabio
 * private
 */
function MouseAction(eventType, command, eventButton) {

    /**
     * private
     */
    this.eventType = eventType;

    /**
     * private
     */
    this.command = command;

    /**
     * private
     */
    this.eventButton = eventButton;
};

/**
 * private
 */
MouseAction.prototype.getCommand = function() {
    return this.command;
};

/**
 * private
 */
MouseAction.prototype.getEventType = function() {
    return this.eventType;
};

/**
 * private
 */
MouseAction.prototype.getEventButton = function() {
    return this.eventButton;
};/**
 * private
 */
TextBox.type="TextBox";
/**
 * constructor
 * author Bruna Stefano
 */
function TextBox(data) {
    this.baseClass(data);

    /**
     * private
     */
    this.id=this.data.g;

    /**
     * private
     */
    this.maxLength = this.data.chars;

    /**
     * private
     */
    this.maxRows = this.data.rows;

    /**
     * private
     */
    this.rowCount = 1;

    /**
     * private
     */
    this.fontSize = 12;

    /**
     * private
     */
    this.lineSpacing = 0;

    // Questo bel +2 ha obbligato a mettere in tutte le sim un -2. Bella roba. SB
    // Non posso tolgierlo perche' senno si dovrebbero correggere tutte le sim con il -2
    /**
     * private
     */
    this.textSpacing = this.fontSize + this.lineSpacing + 2;

    /**
     * private
     */
    this.fontFamily = "Liberation Sans";

    /**
     * private
     */
    this.textRendering = "optimizeLegibility";

    /**
     * private
     */
    this.fontColor = "rgb(0,0,0)";

    /**
     * private
     */
    this.customStyleVisible = "";

    /**
     * private
     */
    this.customStyleHidden = "";

    /**
     * private
     */
    this.boundVariable = null;

    /**
     * private
     */
    this.caret = null;

    /**
     * private
     */
    this.n_caretSize = 14;

    /**
     * private
     */
    this.cursorPosition = 0;

    /**
     * private
     */
    this.startSelection = -1;

    /**
     * private
     */
    this.endSelection = -1;

    /**
     * private
     */
    this.startHalf = false;

    /**
     * private
     */
    this.endHalf = false;

    /**
     * private
     */
    this.clickDelay = global.eventManager.CLICKDELAY;

    /**
     * private
     */
    this.isSelecting = false;

    /**
     * private
     */
    this.actions=[];

    /**
     * private
     */
    //this.isClickEventAdded = false;

    /**
     * private
     */
    //this.doubleClickEnabled = false;

    /**
     * private
     */
    this.locked = false;

    /**
     * private
     */
    this.selectable = true;

    /**
     * private
     */
    this.deactivateOnOuterClick = false;

    /**
     * private
     */
    this.hashTable=[];

    /**
     * private
     */
    this.element = global.document.getElementById(this.data.g);

    /**
     * private
     */
    this.ta = null;

    /**
     * private
     */
    this.fo = null;


    /**
     * private
     */
    this.bgElement = null;

    /**
     * private
     */
    this.visibleTextElement = null;

    /**
     * private
     */
    this.hiddenTextElement = null;

    /**
     * private
     */
    this.selectionGroupElement = null;

    /**
     * private
     */
    this.gRects=[];

    /**
     * private
     */
    this.tSpans=[];

    /**
     * private
     */
    this.tRows=[];

    /**
     * private
     */
    this.render = false;

    /**
     * private
     */
    this.clicksNumber = 0;

    /**
     * private
     */
    this.selectAllOnFirstClick = false;

    /**
     * private
     */
    this.selectAllOnFirstRightClick = false;

    /**
     * private
     */
    this.nonDeactivationElements = new Array();

    /**
     * private
     */
    this.lastClickInSelectedText = false;

    /**
     * private
     */
    this.rGroups = new Array(this.maxRows);

    /**
     * private
     */
    this.downSelectioon = -1;

    /**
     * private
     */
    this.home=false;

    /**
     * private
     */
    this.end=false;

    /**
     * private
     */
    this.ctrlCharsStep = [".", ":", ",", ";", "|", "\\", "!", "\"", "&", "$", "%", "&", "/", "(", ")", "=", "?", "'", "^", "*", "", "#", "-", "_", "+", "[", "]", "{", "}", "<", ">"];

    /**
     * private
     */
    this.xTranslation = 0;

    /**
     * private
     */
    this.yTranslation = 0;

    /**
     * private
     */
    this.fontStyle = "normal";

    /**
     * private
     */
    this.fontWeight = "normal";

    /**
     * private
     */
    this.letterSpacing = 0;

    /**
     * private
     */
    this.textDecoration = "";

    /**
     * private
     */
    this.allowEnter = true;

}

TextBox.prototype=new XObject();

/**
 * private
 */
TextBox.prototype.init=function(){


    this.ta = global.document.createElementNS(global.htmlns,"textarea");

    this.element.appendChild(this.ta);

    // ta
    this.ta.style.width = this.data.w;
    //this.ta.style.height = this.data.h;

    // ta cursor
    this.ta.style.cursor = "text";

    // ta visibility
    this.ta.style.display = "none";
    this.ta.parentNode.setAttribute("visibility","hidden");
    //this.element.setAttribute("visibility","hidden");


    // svg element
    this.element.setAttribute("width",this.data.w+1);
    this.element.setAttribute("height",this.data.h+1);

    this.ta.value = this.data.t.replace(/\n/g, String.fromCharCode(0));

    this.setPosition(this.data.x-1, this.data.y-1);

    this.ta.style.margin = "0px";
    this.ta.style.border = "0px";
    this.ta.style.padding = "1px";
    this.ta.style.resize = "none";
    this.ta.style.backgroundColor = "transparent";

    // defaults
    //this.ta.style.fontFamily = "Liberation Sans";
    this.ta.style.fontStyle = "normal";
    this.ta.style.fontWeight = "normal";


    global.eventManager.addEventListener(this.element,this,"click","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mousemove","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mouseup","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mousedown","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mouseover","onEvent",false);
    global.eventManager.addEventListener(this.element,this,"mouseout","onEvent",false);

};

/**
 * private
 */
TextBox.prototype.actionPerformed=function(event){
    console.log("TextBox.actionPerformed");

    // devo controllare che non sia lui stesso il target dell'evento
    if (event.getTarget().getAttribute("id")!=this.id) {
        try {
            for (var i = 0; i<this.nonDeactivationElements.length; i++) {
                var element = this.nonDeactivationElements[i];
                if (event.getTarget().getAttribute("x")==element.getTX() && event.getTarget().getAttribute("y")==element.getTY())
                    return;
            }
        } catch (e) {api.addAction('WARNING: uno degli elementi passati alla addNonDeactivationElement non esiste!');}
        var tmpIsSelecting = this.isSelecting;
        this.onMouseUp();
        if (this.deactivateOnOuterClick && tmpIsSelecting==false) {
            this.resetSelection();
            // SELF DISACTIVATION
            this.deactivate();
        }
    }


};

/**
 * private
 */
TextBox.prototype.finish=function(){
    // nothing to do
};

/*********************************************************/
/* ***********************     STILE     *****************/
/*********************************************************/


/**
 * Permette di impostare uno style CSS sulla <code>TextBox</code>
 * param {String} customStyle Stile CSS da impostare.
 * deprecated
 */
TextBox.prototype.setCustomStyle=function(customStyle){
    console.log("TextBox:setCustomStyle. customStyle: " + customStyle);

    var entries = customStyle.split(";");

    for (var entry in entries) {
        var style = entry.split(":");
        var property = style[0];
        var value = style[1];
        this.ta.style[property] = value;
    }
};

/**
 * Imposta lo style del font
 * param {string} style Lo style, puo' essere <code>normal</code> o <code>italic</code>
 * public
 */
TextBox.prototype.setFontStyle = function(style) {
    this.style = String(style);
    this.style = this.style.toLowerCase();
    if (this.style!="normal" && this.style!="italic") return;
    this.ta.style.fontStyle = this.style;
};

/**
 * Imposta il weight del font, permettendo di visualizzare il testo in grassetto
 * param {string} weight Puo' essere <code>normal</code> o <code>bold</code>
 * public
 */
TextBox.prototype.setFontWeight = function(weight) {
    this.weight = String(weight);
    this.weight =  this.weight.toLowerCase();
    if ( this.weight!="normal" &&  this.weight!="bold") return;
    this.ta.style.fontWeight =  this.weight;
};

/**
 * Imposta il la spaziatura tra le lettere
 * param {int} spacing La spaziatura, in pixel, tra le lettere
 * public
 */
TextBox.prototype.setLetterSpacing = function(spacing) {
    spacing = parseInt(spacing);
    this.ta.style.letterSpacing = spacing;
};

/**
 * Imposta la decorazione del testo
 * param {string} decoration Puo' essere <code>underline</code>, <code>overline</code> o <code>line-through</code>
 * public
 */
TextBox.prototype.setTextDecoration = function(decoration) {
    this.decoration = String(decoration);
    this.decoration = this.decoration.toLowerCase();
    this.ta.style.textDecoration = this.decoration;
};

TextBox.prototype.renderFontFamily = function() {
    console.log("TextBox:renderFontFamilty: WARN: compatibilty method that do nothing because rendering is executed when font family is changed. Change your code and avoid calling this method.")
};

/**
 * Imposta l'opacita' dello sfondo della casella di testo
 * param {int} opacity Opacita' dello sfondo della casella di testo
 * public
 */
TextBox.prototype.setOpacity = function(opacity) {
    this.opacity = parseInt(opacity);
    //console.log("TextBox:setOpacity: opacity:" + this.opacity + " id: " + this.data.g + ", text: " + this.getText());
    //console.trace();
    //this.element.setAttribute("opacity",parseInt(opacity));
    this.ta.style.opacity = this.opacity;
};

/**
 * Imposta la dimensione del font
 * public
 * param {int} fontSize La dimensione del font
 */
TextBox.prototype.setFontSize = function(fontSize) {
    this.fontSize = parseInt(fontSize);
    this.ta.style.fontSize = this.fontSize;
};

/**
 * Imposta la dimensione del font
 * public
 * param {int} fontSize La dimensione del font
 */
TextBox.prototype.setCustomStyles = function() {
    console.log("TextBox:setCustomStyle");
};

/**
 * Imposta la famiglia del font.
 * public
 * param {String} fontFamily La famiglia di font da impostare.<br>
 * ES: ('Liberation Sans', 'Courier New', 'Verdana').
 */

TextBox.prototype.setFontFamily = function(fontFamily) {
    this.fontFamily = fontFamily;
    this.ta.style.fontFamily = this.fontFamily;
};

/**
 * Imposta il colore del font.
 * public
 * param {String} fontColor Il colore del carattere in formato RGB.<br>
 * ES: 'rgb(2,3,4)'.
 */
TextBox.prototype.setFontColor = function(fontColor) {
    this.fontColor = fontColor;
    this.ta.style.color = this.fontColor;
};

/**
 * Imposta l'attributo text rendering dei caratteri (default='optimizeLegibility').
 * public
 * param {String} textRendering La modalita' con cui deve avvenire il rendering dei caratteri.
 */
TextBox.prototype.setTextRendering = function(textRendering) {
    this.textRendering = textRendering;
    this.ta.style.textRendering = this.textRendering;
};

/**
 * Imposta lo spazio tra due righe consecutive (interlinea).
 * public
 * param {int} lineSpacing lo spazio in pixel tra le due righe.<br>
 * Questo parametro puo' essere >, <, = 0.<br>
 * Se e' 0 si ha una spaziatura naturale tra le righe;<br>
 * Se e' < 0 le righe si accavallano;<br>
 * Se e' > 0 le righe si allontano tra loro.<br>
 * <b>N.B.</b> La casella di testo gestisce automaticamente la spaziatura tra le righe in base al font scelto; lineSpacing serve solamente
 * per correggerla in modo da avere linee piu' distanti o piu' ravvicinate.
 */
TextBox.prototype.setLineSpacing = function(lineSpacing) {
    this.lineSpacing = parseInt(lineSpacing);
    this.lineHeight = (this.fontSize + Math.ceil(this.fontSize / 6) ) + this.lineSpacing + 2;
    //console.log("TextBox:setLineSpacing: lineHeight: " + this.lineHeight);
    this.ta.style["line-height"] = this.lineHeight + "px";
};

/**
 * Restituisce il valore dello spazio tra due righe consecutive (per default e' 0).
 * public
 * return il valore dell'interlinea.
 * type int
 */
TextBox.prototype.getLineSpacing = function() {
    this.lineSpacing;
};

/**
 * Resetta il cursore sulla casella di testo.
 * public
 */
TextBox.prototype.resetCursor = function() {
    this.ta.style.cursor = "auto";
};

/**
 * Imposta il cursore sulla casella di testo
 * param {String} cursorId Identificatore dell'oggetto SVG corrsipondente
 * public
 */
TextBox.prototype.setCursor = function(cursorId) {
    console.log("TextBox:setCursor cursorsId: " + cursorId);
    this.ta.style.cursor ="url(#"+cursorId+")";
};

/**
 *	Muove il cursore ad una determinata posizione globale.
 *	param {int} position La nuova posizione assoluta del cursore all'interno del testo. La posizione iniziale e' 0.
 */
TextBox.prototype.moveCursorToPosition = function(position) {
    position = parseInt(position);
    if (position>this.getNumberOfChars()) position=this.getNumberOfChars();
    this.ta.setSelectionRange(position,position);
};

/**
 *	Restituisce la posizione globale del cursore.
 *	return La posizione assoluta del cursore.
 *	type int
 */
TextBox.prototype.getCursorPosition = function() {
    return this.ta.selectionStart;
};

/**
 *	Restituisce il testo presente nella <code>TextBox</code>
 *	return Il testo della textbox.
 *	type String
 */
TextBox.prototype.getText = function() {
    var text = this.deCode(this.ta.value);
    console.log("TextBox:getText: " + text);
    return text;
};

/**
 *	Imposta il testo della <code>TextBox</code>
 *	param {String}  text Il testo della textbox.
 */
TextBox.prototype.setText = function(text) {
    console.log("TextBox:setText: " + text);
    text = new String(text);
    this.ta.value = text.replace(/\n/g, String.fromCharCode(0));
};

/**
 *	private
 */
TextBox.prototype.setRawText = TextBox.prototype.setText;

/**
 *	Restituisce il numero di caratteri del testo contenuto nella <code>TextBox</code> (per compatibilita').
 *	deprecated
 *	return Il numero di caratteri.
 *	type int
 */

TextBox.prototype.length = function() {
    return this.getNumberOfChars();
};

/**
 *	Restituisce il numero di caratteri del testo contenuto nella <code>TextBox</code>.
 *	return Il numero di caratteri.
 *	type int
 */
TextBox.prototype.getNumberOfChars = function() {
    return this.ta.textLength;
};

/**
 *	Cancella il contenuto della <code>TextBox</code>. e riporta il puntatore alla posizione 0.
 */
TextBox.prototype.clear = function() {
    this.ta.innerText = "";
};


/**
 *	Aggiunge una stringa di testo a partire dalla posizione in cui si trova il cursore.
 *	param {String} text La stringa di testo da aggiungere.
 */
TextBox.prototype.appendText = function(text) {
    text = new String(text);
    text = text.replace(/\n/g, String.fromCharCode(0));
    this.ta.innerText = this.ta.innerText + text;
};

/**
 *	Aggiunge una stringa di testo a partire dalla posizione in cui si trova il cursore. DEPRECATED: Usare <code>appendText(text)</code>.
 *	param {String} text La stringa di testo da aggiungere.
 *	deprecated Usare <code>appendText(text)</code>.
 */
TextBox.prototype.add_char = TextBox.prototype.appendText;

/**
 *	Aggiunge una stringa di testo nella riga e alla posizione nella riga indicati.
 *	Se il testo da inserire fa eccedere la linea oltre il limite massimo, cerca di andare a capo;
 *	in ogni caso comunque il numero massimo di caratteri della casella di testo e' definito mediante <code>setMaxLenght(lenght)</code>,
 *	mentre il numero massimo di righe e' definito da <code>setMaxRows(rows)</code>.
 *	param {String} text Il testo da inserire;
 *	param {int} row Il numero della riga (il conteggio delle righe parte da 0);
 *	param {int} relPos La posizione all'interno della riga.
 *	unsupported
 */
TextBox.prototype.addTextToPosition = function(text, row, relPos) {
    console.log("TODO: addTextToPosition");

};

/**
 *	Aggiunge una stringa di testo nella riga e alla posizione nella riga indicati. DEPRECATED: Usare <code>addTextToPosition(text, row, relPos)</code>.
 *	deprecated
 */
TextBox.prototype.addCharToPosition = TextBox.prototype.addTextToPosition;

/**
 *	Rimuove un certo numero di caratteri a partire dalla posizione indicata.
 *	param {int} startPosition La posizione assoluta del carattere da rimuovere;
 *	param {int} length Il numero di caratteri da rimuovere.
 */
TextBox.prototype.deleteText = function(startPosition, length) {
    console.log("TODO: addTextToPosition");
};

/**
 *	Rimuove un certo numero di caratteri a partire dalla posizione indicata. DEPRECATED: Usare <code>deleteText(startPosition, length)</code>.
 *	deprecated
 */
TextBox.prototype.delete_char = TextBox.prototype.deleteText;

/**
 *	Restituisce il numero di righe non vuote esistenti.
 *	return Il numero di righe.
 *	type int
 */
TextBox.prototype.getRowCount = function() {
    return this.ta.rows;
};

/**
 *	Restituisce il numero di righe non vuote esistenti. DEPRECATED: Usare <code>getRowCount()</code>.
 */
TextBox.prototype.getNumberOfRows = TextBox.prototype.getRowCount;

/**
 *	Ritorna la riga in cui si trova un dato carattere data la sua posizione assoluta nella casella.
 *	param {int} globalPos La posizione assoluta del carattere.
 *	return Il numero di riga in cui si trova il carattere (il conteggio delle righe parte da 0).
 *	type int
 *	unsupported
 */
TextBox.prototype.getRowFromCharPosition = function(globalPos) {
    return 0;
};

/**
 *	Ritorna il testo della n-esima riga.
 *	param rowNumber (integer) Il numero della riga.
 *	return (integer) Il testo della riga specificata.
 *	unsupported
 */
TextBox.prototype.getTextAtRow = function(rowNumber) {
    return null;
};

/**
 *	Ritorna il testo della n-esima riga. DEPRECATED: Usare <code>getTextAtRow(rowNumber)</code>.
 */
TextBox.prototype.getDataAtRow = TextBox.prototype.getTextAtRow;

/**
 *	Ritorna il numero di caratteri dell'n-esima riga.
 *	param {int} rowNumber Il numero della riga.
 *	return Il numero di caratteri della riga specificata.
 *	type int
 *	unsupported
 */
TextBox.prototype.getRowLength = function(rowNumber) {
    return 0;
};

/**
 *	Calcola la posizione relativa nella riga, nota la posizione assoluta.
 *	param {int} globalPos La posizione assoluta del carattere.
 *	return La posizione relativa nella riga.
 *	type int
 *	unsupported
 */
TextBox.prototype.getPositionInRow = function(globalPos) {
    return 0;
};

/**
 *	Calcola la posizione assoluta, nota la riga e la posizione relativa.
 *	param {int} row La riga in cui si trova il carattere (il conteggio parte da 0).
 *	param {int} relPos La posizione relativa nella riga.
 *	return La posizione assoluta.
 *	unsupported
 *	type int
 */
TextBox.prototype.getGlobalPosition = function(row, relPos) {
    return 0;
};

/**
 *	Ritorna una sottostringa della n-esima riga partendo dal carattere 0.
 *	param {int} rowNumber Numero della riga
 *	param {int} length Lunghezza della stringa da ritornare
 *	return Stringa ritornata
 *	type String
 *	unsupported
 */
TextBox.prototype.getRowSubString = function(rowNumber, length) {
    return null;
};

/**
 *	Ritorna una sottostringa di tutto il testo.
 * 	param {int} start La posizione assoluta del primo carattere (compreso) della sottostringa.
 *	param {int} end La posizione assoluta dell'ultimo carattere (compreso) della sottostringa.
 *	return Stringa ritornata
 *	type String
 */
TextBox.prototype.getSubString = function(start, end) {
    start = parseInt(start);
    end = parseInt(end);
    return this.getText().substring(start,end);
};

/**
 *	private
 */
TextBox.prototype.getTextLength = TextBox.prototype.getHashedTextLength;

/**
 *	private
 */
TextBox.prototype.getXposition = function(absolutePos) {
    var testo;
    var Xpos;
    var a;
    var rPos;

    rPos = this.getPositionInRow(absolutePos);
    a = absolutePos - rPos;
    testo = this.getSubString(a, absolutePos);
    Xpos = this.getTextLength(testo);
    return Xpos;
};

/**
 *	Imposta il colore dello sfondo del testo selezionato<br>
 *	param colore il colore RGB della selezione in formato RGB. ES 'rgb(10, 100, 58)'.
 */
TextBox.prototype.setSelectionColor = function(color) {
    console.log("TextBox:setSelectionColor: " + color + ", elementId: " + this.data.g);

    var selector = '#' + this.data.g + '>textarea::selection';
    var value = 'background:' + color;

    //global.document.styleSheets[0].addRule(selector,value);
};

/**
 *	Imposta il colore del testo selezionato<br>
 *	param colore il colore RGB del testo.
 */
TextBox.prototype.setSelectedFontColor = function(color){
    console.log("TextBox:setSelectionColor: " + color + ", elementId: " + this.data.g);

    var selector = '#' + this.data.g + '>textarea::selection';
    var value = 'color:' + color;

    //global.document.styleSheets[0].addRule(selector,value);
};

/**
 *	Deseleziona il testo selezionato
 */
TextBox.prototype.resetSelection = function() {
    console.log("TODO ????");
};

/**
 *	Cancella il testo selezionato nella textbox.
 */
TextBox.prototype.eraseSelection = function() {
    console.log("TODO");
};

/**
 *	Seleziona un certo numero di caratteri nel testo della textbox a partire dal carattere specificato.
 *	param {int} start La posizione assoluta del carattere iniziale (compreso) della selezione.
 *	param {int} length Il numero di caratteri da selezionare.
 */
TextBox.prototype.selectSubString = function(start, length) {
    console.log("TODO");
};

/**
 *	Seleziona n righe a partire da quella indicata.
 *	param {int} row La riga che deve essere selezionata (il conteggio delle righe parte da 0).
 *	param {int} num Ll numero di righe che devono essere selezionate (row compresa).
 */
TextBox.prototype.selectRows = function(row, num) {
    console.log("TODO ????");
};

/**
 *	Seleziona tutto il testo della casella.
 */
TextBox.prototype.selectAll = function() {
    console.log("TODO");
};

/**
 *	Restituisce il testo selezionato.
 *	return Il testo selezionato. Se non c'e' testo selezionato restituisce <code>null.</code>
 *	type String
 */
TextBox.prototype.getSelectedText = function() {
    return this.getText().substring(this.ta.selectionStart,this.ta.selectionEnd);
};

/**
 *	Restituisce il fatto che ci sia del testo selezionato oppure no.
 *	return <code>true</code> se nella casella c'e' del testo sezionato, <code>false</code> altrimenti.
 *	type boolean
 */
TextBox.prototype.hasSelectedText = function() {
    var ss = this.ta.selectionStart;
    var se = this.ta.selectionEnd;

    return (ss < se);
};


/**
 *	private
 */
TextBox.prototype.setVariable = function(name) {
    this.boundVariable = name;
};

/**
 *	restituisce l'id univoco della <code>TextBox</code>.
 *	return l'id.
 *	type String
 */
TextBox.prototype.getId = function() {
    return this.data.g;
};

/**
 *	Consente di impostare la visibilita' della casella di testo.
 *	param {boolean} b Visibilita', <code>true</code> per rendere visibile, <code>false</code> per rendere non visible
 */
TextBox.prototype.setVisible = function(b) {
    console.log("TextBox:setVisible: visible: " + b );
    //console.trace();
    //this.element.setAttribute("visibility", (b)?("visible"):("hidden"));
    this.ta.parentNode.setAttribute("visibility", (b)?("visible"):("hidden"));
    this.ta.style.display = (b)?("block"):("none");
    if (b) this.setOpacity(1);

};

/**
 *   Resetta l'array di caratteri che devono essere considerati (oltre allo spazio) come fine parola nella selezione con shift+ctrl+frecce
 *	deprecated
 *	unsupported
 */
TextBox.prototype.resetCtrlCharsArray = function() {};

/**
 *   Setta l'array di caratteri che devono essere considerati (oltre allo spazio) come fine parola nella selezione con shift+ctrl+frecce
 *   param {array} a L'array da impostare.
 *   deprecated
 *	unsupported
 */
TextBox.prototype.setCtrlCharsArray = function(a) {};

/**
 *	Aggiunge un carattere all'array di caratteri che devono essere considerati (oltre allo spazio) come fine parola nella selezione con shift+ctrl+frecce
 *   param {char} c Il carattere da aggiungere.
 *	deprecated
 *	unsupported
 */
TextBox.prototype.addCharInCtrlCharsArray = function(c) {};

/**
 * 	Attiva la textbox (fa apparire il cursore in fondo al testo presente nella casella).
 *	<b>N.B.</b> Per poter attivare la casella e' necessario che prima sia stata resa visibile.
 */
TextBox.prototype.activate = function() {
    this.ta.focus();
};

/**
 * 	Disattiva la textbox (disattiva il cursore).
 */
TextBox.prototype.deactivate = function() {
    this.ta.blur();
};

/**
 *	private
 */
TextBox.prototype.start = function() {
    this.ta.focus();
};

/**
 *	E' responsabilita' della text box disattivare il caret
 *	Mentre e' responsabilita' della keyboard togliere il caret alla text box
 *	perche' e' lei ad attivare / disattivare le textbox
 * 	private
 */
TextBox.prototype.stop = function() {
    this.ta.blur();
};

/**
 *	Restituisce true o false a seconda che la textbox sia attiva o meno<br>
 *	<b>N.B.</b> se la casella ha il cursore e' attiva.
 *	return Se la casella e' attiva. <code>true</code> se attiva, <code>false</code> se non e' attiva.
 *	type boolean
 */
TextBox.prototype.isActive = function() {
    return (this.caret!=null);
};

/**
 *	Ritorna lo stato della visibilita' dell'oggetto.
 *	return stato della visibilita' dell'oggetto <code>true</code> se visibile, <code>false</code> se non visibile
 *	type boolean
 */
TextBox.prototype.isVisible = function() {
    return "visible" == this.element.getAttribute("visibility");
};

/**
 * 	Esegue una traslazione della <code>TextBox</code>. <b>N.B.</b> Le coordinate x,y non vengono modificate dalla tralsazione
 *	param {int} x La coordinata x dell'oggetto.
 *	param {int} y La coordinata y dell'oggetto.
 */
TextBox.prototype.translate=function(x,y){
    this.xTranslation = x;
    this.yTranslation = y;
    x = this.data.x+x;
    y = this.data.y+y;
    this.element.setAttribute("transform", "translate("+x+", "+y+")");
};

/**
 * 	Imposta la posizione della textbox.
 *	param {int} x La coordinata x dell'oggetto.
 *	param {int} y La coordinata y dell'oggetto.
 */
TextBox.prototype.setPosition = function(x, y) {
    this.data.x = x;
    this.data.y = y;
    this.xTranslation = 0;
    this.yTranslation = 0;
    this.element.setAttribute("transform", "translate("+x+", "+y+")");
};

/**
 *	private
 */
TextBox.prototype.enCode = function(text) {
    var modifiedText = new String(text);
    var pattern = /\s/g;
    return modifiedText.replace(pattern, String.fromCharCode(160));
};

/**
 *	private
 */
TextBox.prototype.deCode = function(text) {
    var modifiedText = new String(text);
    var pattern = /\xA0/g;
    return modifiedText.replace(pattern, String.fromCharCode(32));
};

/**
 *	Funzione per bloccare le modifiche alla casella di testo
 */
TextBox.prototype.lock = function() {
    this.ta.readOnly = true;
};

/**
 *	Funzione per sbloccare le modifiche alla casella di testo
 */
TextBox.prototype.unlock = function() {
    this.ta.readOnly = false;
};

/**
 *	Funzione per attivare o disattivare l'utilizzo della selezione
 *	param {boolean} b <code>true</code> se la selezione deve essere attivata, <code>false</code> altrimenti.
 */
TextBox.prototype.setAllowSelection = function(b) {
    this.ta.style.webkitUserSelect = b ? "text" : "none";
};

/**
 *	Funzione per attivare o disattivare l'utilizzo del tasto invio per creare una nuova riga
 *	param {boolean} b <code>true</code> se il tasto invio deve essere attivato, <code>false</code> altrimenti.
 *	deprecated
 *	unsupported
 */
TextBox.prototype.setAllowEnter = function(b) {
    console.log("WARNING Unsupported method: TextBox.setAllowEnter");
};

/**
 *	Funzione per ricavare il valore della proprieta' che specifica se l'utilizzo della selezione e' attivo oppure no
 *	return se l'utilizzo della selezione e' attivo oppure no.
 *	type boolean
 */
TextBox.prototype.getAllowSelection = function() {
    if (this.ta.style.webkitUserSelect == "none")  return false;
    else return true;
};

/**
 *	Imposta la proprieta' di deattivazione automatica della casella di testo<br>
 *	Se impostata a false cliccando fuori dalla casella di testo la casella non si disattiva lasciando correttamente cursore e selezione<br>
 *	Se impostata a true cliccando fuori dalla casella di testo la casella si disattiva eliminando cursore e selezione
 *	param {boolean} b puo' essere <code>true</code> o <code>false</code>
 */
TextBox.prototype.setDeactivationOnOuterClick = function(b) {
    this.deactivateOnOuterClick = b;
};

/**
 *       Aggiunge un elemento alla lista di quelli sui quali, cliccando, pur avendo usato setDeactivationOnOuterClick(true),
 *       non viene disattivata la casella<br>
 *       param {object} l'elemento da aggiungere
 */
TextBox.prototype.addNonDeactivationElement = function(element) {
    this.nonDeactivationElements.push(element);
};

/**
 *       Imposta la proprieta' per selezionare tutta la casella di testo al primo click (sinistro)<br>
 *       Se impostata a true, il primo click dentro la casella seleziona tutto il contenuto della casella e al mousedown non inizia la selezione<br>
 *       Se impostata a false (valore di default), il primo click dentro la casella non attiva tutto il contenuto ed al mousedown comincia la selezione
 *       param {boolean} b puo' essere <code>true</code> o <code>false</code>
 */
TextBox.prototype.setSelectAllOnFirstClick = function(b) {
    this.selectAllOnFirstClick = b;
};

/**
 *       Imposta la proprieta' per selezionare tutta la casella di testo al primo click destro<br>
 *       Se impostata a true, il primo click destro dentro la casella seleziona tutto il contenuto della casella<br>
 *       Se impostata a false (valore di default), il primo click destro dentro la casella non attiva tutto il contenuto
 *       param {boolean} b puo' essere <code>true</code> o <code>false</code>
 */
TextBox.prototype.setSelectAllOnFirstRightClick = function(b) {
    this.selectAllOnFirstRightClick = b;
};

/**
 *	Aggiungo un'azione allla pressione di un tasto del mouse.
 *	param eventType ('click', 'doubleclick', 'tripleclick', 'mousedown', 'mousemove', 'mouseover', 'mouseup') L'evento su cui deve essere eseguita l'azione.
 *	param {String} command Il comando da eseguire (ES: 'alert('ciao');').
 *	param {int} eventButton (MouseAction.LEFTBUTTON, MouseAction.RIGHTBUTTON, MouseAction.CENTERBUTTON) Bottone del mouse a cui l'azione corrisponde.<br>
 *	Se non passato viene aggiunta una action senza distinzione di pulsante<br>
 */
TextBox.prototype.addAction = function(eventType, command, eventButton) {
    console.log("TextBox:addAction");

    //if (eventType == 'doubleclick') this.doubleClickEnabled = true;
    if (eventButton!=undefined) this.actions.push( new MouseAction(eventType, command, eventButton));
    else {this.actions.push( new MouseAction(eventType, command));};
};

/**
 *	private
 */
TextBox.prototype.executeAction = function(eventType, eventButton) {
    var tmpStartSelection, tmpEndSelection, length;
    for (var i=0; i < this.actions.length; i++) {
        var action = this.actions[i];
        if (action.getEventType() == eventType) {
            if (eventType=='mousedown') {
                tmpStartSelection=this.startSelection;
                tmpEndSelection=this.endSelection;
            }
            if (eventButton!=undefined) {
                if (action.getEventButton()==eventButton) eval(action.getCommand());
            } else eval(action.getCommand());
            if (eventType=='mousedown') {
                length=this.getText().length;
                if (tmpStartSelection>length)
                    tmpStartSelection=length;
                if (tmpEndSelection>length)
                    tmpEndSelection=length;
                this.startSelection=tmpStartSelection;
                this.endSelection=tmpEndSelection;
            }
        }
    }
};

/**
 *	private
 */
TextBox.prototype.fireChange=function(event){
    global.eventManager.send(event,this);
};

/**
 *	private
 */
TextBox.prototype.onEvent=function(event) {
    this.stateChanged(event,this);
};

/**
 *	private
 */
TextBox.prototype.handleEvent = function(xEvent) {
    // qui arrivano sia eventi di mouse che eventi di tastiera
    // questo e' il primo punto di incrocio
    // sono sempre e cmq xEvent
    this["on"+xEvent.type](xEvent);
};

/**
 *	private
 */
TextBox.prototype.onKeyPress = function(xEvent) {
    // TODO ???
};

/**
 *	private
 */
TextBox.prototype.onClick = function(xEvent) {
    ///*<<<*/alert("[DEBUG] TextBox.prototype.onClick:");/*>>>*/
    this.executeAction('click', MouseAction.LEFTBUTTON);
};

/**
 *	private
 */
TextBox.prototype.onDoubleClick = function(xEvent) {
    ///*<<<*/alert("[DEBUG] TextBox.prototype.onDoubleClick:");/*>>>*/
    // TODO ???

    this.executeAction('doubleclick');
};

/**
 *	private
 */
TextBox.prototype.onTripleClick = function(event) {

    // TODO ???

    this.executeAction('tripleclick');
};

/**
 *	private
 */
TextBox.prototype.onRightClick = function(event) {
    ///*<<<*/alert("[DEBUG] TextBox.prototype.onRightClick:");/*>>>*/
    this.executeAction('click', MouseAction.RIGHTBUTTON);
};

/**
 *	private
 */
TextBox.prototype.onRightDown = function(event) {

    // TODO ????

    this.executeAction('mousedown', MouseAction.RIGHTBUTTON);
};

/**
 *	private
 */
TextBox.prototype.onMouseDown = function(event) {
    // TODO ???

    this.executeAction('mousedown', MouseAction.LEFTBUTTON);
};

/**
 *       private
 */
TextBox.prototype.onRightUp = function(event) {
    this.executeAction('mouseup',MouseAction.RIGHTBUTTON);
};

/**
 *	private
 */
TextBox.prototype.onMouseUp = function(event) {
    this.executeAction('mouseup',MouseAction.LEFTBUTTON);
};

/**
 *	private
 */
TextBox.prototype.onMouseMove = function(event) {
    this.executeAction('mousemove');
};


/**
 *	private
 */
TextBox.prototype.onMouseOver = function() {
    this.executeAction('mouseover');
};

/**
 *	private
 */
TextBox.prototype.onMouseOut = function() {
    this.executeAction('mouseout');
};

/**
 *       private
 */
TextBox.prototype.handleLastClick = function() {
    // TODO ????
};

/**
 *       Indica se l'ultimo click e' stato effettuato su un testo selezionato o meno
 *	return <code>true</code> se il click e' stato effettuato su un testo selezionato, <code>false</code> in caso contrario
 *	type boolean
 */
TextBox.prototype.wasLastClickInSelectedText = function() {
    return this.lastClickInSelectedText;
};

/**
 * private
 */
TextBox.prototype.printUrls=function() {
    console.log(this.getUrl()+ "-[TextBox]");
};/**
 * private
 */
Frame.type = "Frame";

/**
 * <p>La classe <b>Frame</b> modellizza il fotogramma. Al suo interno possono essere presenti Movie, Panel, Image, TextBox etc <br/>
 * La classe non puo' essere istanziata direttamente. E'possibile ottenere un'istanza di questa classe navigando nella struttura ad albero
 * della simulazione.
 *
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * param data il data package passato dal costruttore.
 */
function Frame(data){
    this.baseClass(data);

    /**
     * private
     */
    this.panelsV=[];

    /**
     * private
     */
    this.moviesV=[];

    /**
     * private
     */
    this.textBoxesV=[];
};

Frame.prototype=new XObject();

/**
 * private
 */
Frame.prototype.addMovie=function(data){
    return this.addObject(new Movie(data), this.objectsV, this.objectsH, this.moviesV);
};

/**
 * private
 */
Frame.prototype.addPanel=function(data){
    return this.addObject(new Panel(data), this.objectsV, this.objectsH, this.panelsV);
};

/**
 * private
 */
Frame.prototype.addImage=function(data){
    return this.addObject(new Image(data), this.objectsV, this.objectsH, null);
};

/**
 * private
 */
Frame.prototype.addLabel=function(data){
    return this.addObject(new Label(data), this.objectsV, this.objectsH, null);
};

/**
 * private
 */
Frame.prototype.addTextBox=function(data, url){
 	let textBox = new TextBox(data);
    let textBoxCreation = this.addObject(textBox, this.objectsV, this.objectsH, this.textBoxesV);
 	let EXTENDED_TEXTBOX_BUILDER = GET_EXTENDED_TEXTBOX_BUILDER();
 	EXTENDED_TEXTBOX_BUILDER.associateTextBox(textBox);
 	return textBoxCreation;
};

/**
 * private
 */
Frame.prototype.addPlugin = function (object) {
    return this.addObject(object, this.objectsV, this.objectsH, null);
};

/**
 * Riavvolge tutte le Movie contenute nel Frame
 * public
 */
Frame.prototype.rewind=function(){
    for(var i=0; i<this.moviesV.length; i++) this.moviesV[i].rewind();
};

/**
 * private
 */
Frame.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[Frame]");
    for (var j=0; j < this.getObjectCount(); j++) {
        this.getObjectByNumber(j).printUrls();
    }
};/**
 * private
 */
Movie.type = "Movie";

/**
 * <p>La classe <b>Movie</b> modellizza il filmato e permette di inserirvi Frame
 * La classe non puo' essere istanziata direttamente. E'possibile ottenere un'istanza di questa classe navigando nella struttura ad albero
 * della simulazione.
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * param data il data package passato dal costruttore.
 */
function Movie(data){
    this.baseClass(data);

    /**
     * Posizione del frame di default
     * private
     */
    this.initFrameNumber = 0;

    /**
     * private
     */
    this.currentFrame = null;
};

Movie.prototype=new XObject();

/**
 * private
 */
Movie.prototype.init = function(){
    // init the current frame var using the initFrameNumber.
    this.currentFrame = this.objectsV[this.initFrameNumber];
    // fire init to all child objects
    this.fireInit();
};

/**
 * private
 */
Movie.prototype.addFrame = function(data){
    return this.addObject(new Frame(data), this.objectsV, this.objectsH, null);
};

/**
 * Restituisce il primo Frame contenuto nel Movie
 * public
 * return Frame
 * type Object
 */
Movie.prototype.getFirstFrame = function() {return this.objectsV[0];};

/**
 * Restituisce l'ultimo Frame contenuto nel Movie
 * return Frame
 * type Object
 * public
 */
Movie.prototype.getLastFrame = function() {return this.objectsV[this.objectsV.length-1];};

/**
 * Restituisce un Frame figlio utilizzando il nome per indetificarlo
 * param {String} id L'id dell'oggetto figlio
 * return Frame
 * type Object
 * public
 */
Movie.prototype.getFrameById = function(id) {
    return this.getObjectById(id);
};

/**
 * Restituisce un Frame utilizzando il suo posizionamento per identificarlo
 * param {int} number Posizionamento. Se un Frame e' stato aggiunto per primo avra' come numero 1, se secondo 2, etc.
 * return Frame
 * type Object
 * public
 */
Movie.prototype.getFrameByNumber = function(number) {
    return this.getObjectByNumber(number);
};

/**
 * Restituisce il numero di Frame figli presenti
 * return numero di Frame figli presenti
 * type int
 * public
 */
Movie.prototype.getFrameCount = function() {return this.objectsV.length;};

/**
 * Restituisce un Frame figlio utilizzando il nome per indetificarlo
 * param {String} name Il nome del Frame figlio
 * return Frame
 * type Object
 * public
 */
Movie.prototype.getFrameByName = function(name) {
    return this.getObjectByName(name);
};

/**
 * Restituisce il Frame corrente. Il frame corrente du una Movie e' quello visibile
 * N.B.: In linea di principio in una Movie dovrebbe essere presente solo un Frame visibile alla volta.
 * Se un altro frame viene reso visbile, tramite ad esempio una setVisible direttamente sull'oggetto, il sistema NON rende invisibile quello
 * precedetemente visibile per la necessita' di allinearsi con il comportamento delle API V1.
 * return Frame
 * type Object
 * public
 */
Movie.prototype.getCurrentFrame = function() {return this.currentFrame;};

/**
 * Restituisce il Frame contenuto nel Movie successivo a quello corrente.
 * return Frame
 * type Object
 * public
 */
Movie.prototype.nextFrame = function() {
    var frameNo=this.currentFrame.number;
    frameNo++;
    if (frameNo==this.objectsV.length) frameNo = 0;
    this.goToFrameByNumber(frameNo);
};

/**
 * Restituisce il Frame contenuto nel Movie precedente a quello corrente
 * return Frame
 * type Object
 * public
 */
Movie.prototype.previousFrame = function() {
    var frameNo=this.currentFrame.number;
    frameNo--;
    if (frameNo<0) frameNo=this.objectsV.length-1;
    this.goToFrameByNumber(frameNo);
};

/**
 * Imposta il Frame di visualizzato inzialmente quando la Movie.
 * param {String} frameName Nome del Frame
 * public
 */
Movie.prototype.setInitFrame = function(frameName) {
    var frame = this.objectsH[frameName];
    if (frame!=undefined) this.initFrameNumber=frame.number;
    ///*<<<*/else alert("[WARN] Movie.prototype.setInitFrame: the requested frame doesn't exist: name: " + frameName);/*>>>*/
};

/**
 * private
 */
Movie.prototype.setCurrentFrame= function(frame) {
    // NB nella V1 setta anche a not visible tutti gli altri frames
    this.currentFrame.rewind();
    this.currentFrame.setVisible(false);
    this.currentFrame = frame;
    this.currentFrame.setVisible(true);
};

/**
 * Imposta come corrente il Frame con il nome specificato. Se il frame specificato non eiste va al <code>Frame</code> in prima posizione
 * param {String} name Nome del frame
 * public
 */
Movie.prototype.goToFrameByName = function(name) {
    if (this.currentFrame.data.n!=name) {
        var frame = this.objectsH[name];
        if (frame!=undefined) this.setCurrentFrame(frame);
        else {
            ///*<<<*/ alert("[WARN] Movie.prototype.goToFrameByName: the requested frame doesn't exist: name: " + name + ", going to first.");/*>>>*/
            this.goToFrameByNumber(0);
        }
    }
};

/**
 * Imposta come corrente il Frame con il nome specificato.
 * param {String} name Nome del frame
 * public
 */
Movie.prototype.goTo=Movie.prototype.goToFrameByName;

/**
 * private
 */
Movie.prototype.goToFrameByNumber = function(number) {
    if (this.currentFrame.number!=number) {
        if (number < this.objectsV.length) this.setCurrentFrame(this.objectsV[number]);
        ///*<<<*/else alert("[WARN] Movie.prototype.goToFrameByNumber: the requested frame doesn't exist: number: " + number);/*>>>*/
    }
};

/**
 * Imposta come corrente il Frame con l'id specificato.
 * param {String} name Nome del frame
 * public
 */
Movie.prototype.goToFrameById = function(id) {
    // per il Frame id=gid
    if (this.currentFrame.gid!=id) {
        var frame = null;
        for (var i=0; i < this.objectsV.length; i++) {
            frame = this.objectsV[i];
            if (frame.gid==id) {
                this.setCurrentFrame(frame);
                return;
            }
        }
        ///*<<<*/alert("[WARN] Movie.prototype.goToFrameById: the requested frame doesn't exist: gid: " + id);/*>>>*/
    }
};

/**
 * private
 */
Movie.prototype.rewind = function() {
    for (var i = 0; i < this.objectsV.length; i++) {
        this.objectsV[i].setVisible(false);
        this.objectsV[i].rewind();
    }
    this.currentFrame = this.objectsV[this.initFrameNumber];
};

/**
 * Imposta la visibilita' dal Movie e di tutti i suoi figli.
 * param {boolean} b Visiblita'. true per renderlo visibile, false per renderlo non visibile
 * public
 */
Movie.prototype.setVisible = function(b) {
    ///*<<<*/alert("[DEBUG] Movie.prototype.setVisible: name: " + this.data.n);/*>>>*/
    if (this.visbile!=b) {
        this.currentFrame.setVisible(b);
        this.visible=b;
    }
};

/**
 * Registra una nuova variabile avente nome <code>name</code> con valore iniziale valore <code>value</code>
 * param {String} name Nome della variabile
 * param {String} value Valore della variabile..
 * public
 */
Movie.prototype.addVariable=function(name,value) {
    global.addVariable(name, value);
};

/**
 * Imposta il valore di una variabile avente nome <code>name</code> al valore <code>value</code>
 * <b>N.B.</b> Impostare e/o aggiungere variabili ad una <code>Movie</code> e' come utilizzare la function <code>setVariableValue(name,value)</code>.
 * Tutti i metodi di aggiunta e impostazione si rifanno alla stessa collezione di variabili globale
 * param {String} name Nome della variabile
 * param {String} value Valore della variabile..
 * public
 */
Movie.prototype.setVariableValue=function(name,value){
    global.setVariableValue(name,value);
};

/**
 * Vedi metodo <code>setVariableValue(name)</code>
 * public
 * param {String} name Nome della variabile
 * param {String} value Valore della variabile.
 * deprecated Usare <code>setVariableValue(name)</code>
 */
Movie.prototype.setVariable=Movie.prototype.setVariableValue;

/**
 * Ritorna il valore di una variabile avente nome <code>name</code>
 * param {String} name Nome della variabile.
 * type Object
 * return Valore della variabile
 * public
 */
Movie.prototype.getVariableValue=function(name) {
    return global.getVariableValue(name);
};

/**
 * Vedi metodo <code>getVariableValue(name)</code>
 * public
 * param {String} name Nome della variabile.
 * type Object
 * return Valore della variabile
 * deprecated Usare <code>getVariableValue(name)</code>
 */
Movie.prototype.getValue=Movie.prototype.getVariableValue;


/**
 * Aggiunge un oggetto alla lista di oggetti che vengono notificati del cambiamento
 * di una variabile avente nome <code>name</code>.
 * Il listener deve implementare il metodo <code>onVariableChanged(name)</code> per poter essere avvisato
 * dei cambiamento del valore della variabile
 * <b>N.B.</b> Impostare e/o aggiungere variabili ad una <code>Movie</code> e' come utilizzare la function <code>addVariableListener(name,listener)</code>..
 * Tutti i metodi di aggiunta e impostazione si rifanno alla stessa collezione di variabili globale
 * param {String} name Nome della variabile
 * param {Object} listener Oggetto avvisato tramite metodo <code>onVariableChanged(name)</code>
 * public
 */
Movie.prototype.addVariableListener=function(name,listener) {
    this.variables.addVariableListener(name, listener);
};

/**
 * private
 */
Movie.prototype.printUrls=function() {
    alert(this.getUrl()+ "-[Movie]");
    for (var j=0; j < this.getObjectCount(); j++) {
        this.getObjectByNumber(j).printUrls();
    }
};/**
 * private
 */
Scrollable.type = "Scrollable";

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollMeter} hMeter registro orizzontale hMeter della posizione
 * param {ScrollMeter} vMeter registro verticale vMeter della posizione
 * param {SVG} element oggetto da scrollare element
 * private
 */
function Scrollable(hMeter, vMeter, element){
    /**
     * private
     */
    this.hMeter=hMeter;

    /**
     * private
     */
    this.vMeter=vMeter;

    /**
     * private
     */
    this.element=element;
};

/**
 * private
 */
Scrollable.prototype.updateView=function(){
    if (this.hMeter==null)
        this.element.translate(0, -this.vMeter.cur);
    else if (this.vMeter==null)
        this.element.translate(-this.vMeter.cur, 0);
    else
    {this.element.translate(-this.hMeter.cur, -this.vMeter.cur);};
};/**
 * private
 */
ScrollPaneThread.type = "ScrollPaneThread";

/**
 * private
 */
ScrollPaneThread.scrollPaneThread = null;

/**
 * public
 */
ScrollPaneThread.getInstance = function() {
    if (ScrollPaneThread.scrollPaneThread == null)
        ScrollPaneThread.scrollPaneThread = new ScrollPaneThread();
    return ScrollPaneThread.scrollPaneThread;
};

// --------------------------------------------------------------------

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollPaneHandler} handler
 * private
 */
function ScrollPaneThread(handler){
    /**
     * private
     */
    this.handler=handler;

    /**
     * private
     */
    this.timeoutId=null;

    /**
     * private
     */
    this.intervalId=null;

    /**
     * private
     */
    this.method="";

    /**
     * private
     */
    this.type=-1;

    /**
     * private
     */
    this.started=false;

};

ScrollPaneThread.prototype.setHandler = function(handler) {
    this.handler=handler;
};

/**
 * Descr
 * private
 */
ScrollPaneThread.prototype.thread=function() {
    if(!this.started) return;

    // auto scroll
    this.handler[this.method](this.type);
};

/**
 * Descr
 * private
 */
ScrollPaneThread.prototype.launchThread=function() {
    this.thread();
    this.intervalId=setInterval( function(){ScrollPaneThread.getInstance().thread(); }, ScrollPane.AUTOSCROLL_NEXT_DELAY);
};

/**
 * Descr
 * private
 * param {String} method puo' essere "onNextStep", "onPrevStep", "onNextPage", "onPrevPage"
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneThread.prototype.start=function(method, type) {
    if(this.method==method && this.type==type) return;

    //alert("start("+method+","+type+")");

    this.stop();

    this.method=method;
    this.type=type;
    this.started=true;

    this.timeoutId=setTimeout( function(){ScrollPaneThread.getInstance().launchThread(); }, ScrollPane.AUTOSCROLL_FIRST_DELAY);
};

/**
 * private
 */
ScrollPaneThread.prototype.stop=function() {
    if(!this.started) return;

    if(this.timeoutId!=null) {
        clearTimeout(this.timeoutId);
        this.timeoutId=null;
    }

    if(this.intervalId!=null) {
        clearInterval(this.intervalId);
        this.intervalId=null;
    }

    this.method="";
    this.type=-1;
    this.started=false;
};/**
 * private
 */
ScrollBar.type = "ScrollBar";

/**
 * private
 */
ScrollBar.HOR_DIRECTION = 0;

/**
 * private
 */
ScrollBar.VER_DIRECTION = 1;

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollMeter} meter register meter della posizione
 * param {ScrollBarElements} elements register elements degli oggetti SVG
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 * private
 */
function ScrollBar(meter, elements, type){
    /**
     * private
     */
    this.meter=meter;

    /**
     * private
     */
    this.elements=elements;

    /**
     * private
     */
    this.type=type;

    /**
     * private
     */
    this.resizeCoef=1;

    /**
     * private
     */
    this.cursorStartPoint={x:this.elements.cursor.getX(), y:this.elements.cursor.getY()};
};

/**
 * private
 */
ScrollBar.prototype.setResizeCoef=function(resizeCoef){
    this.resizeCoef=resizeCoef;
};

/**
 * private
 */
ScrollBar.prototype.getCursorPosition=function(){
    var pos;

    if(this.type==ScrollBar.HOR_DIRECTION) {pos=this.cursorStartPoint.x+Math.round(this.meter.cur*this.resizeCoef);}
    else {pos=this.cursorStartPoint.y+Math.round(this.meter.cur*this.resizeCoef);}

    return pos;
};

/**
 * private
 */
ScrollBar.prototype.updateView=function(type){
    if(this.type==ScrollBar.HOR_DIRECTION) {this.elements.cursor.translate(Math.round(this.meter.cur*this.resizeCoef), 0);}
    else {this.elements.cursor.translate(0, Math.round(this.meter.cur*this.resizeCoef));}
};/**
 * private
 */
ScrollBarBuilder.type = "ScrollBarBuilder";

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollBar} scrollBar
 * param {ScrollPaneHandler} handler

 * private
 */
function ScrollBarBuilder(scrollBar, handler, type){
    /**
     * private
     */
    this.scrollBar=scrollBar;

    /**
     * private
     */
    this.handler=handler;

    /**
     * private
     */
    this.type=type;

    /**
     * private
     */
    this.listener=new ScrollBarListener(this.scrollBar, this.handler, type);
};

/**
 * private
 */
ScrollBarBuilder.prototype.getMaxScroll=function(){
    // define maxScroll=pixels of movement for cursor
    var bPos1, bPos2;
    var skipBarStart;
    var skipBarEnd;
    var skipBarSize;
    var scrollMax;

    if(this.type==ScrollBar.HOR_DIRECTION){
        // skipBarStart
        bPos1=this.scrollBar.elements.prevButton.getX()+this.scrollBar.elements.prevButton.getWidth();
        bPos2=0;
        if(this.scrollBar.elements.secNextButton!=null){
            bPos2=this.scrollBar.elements.secNextButton.getX()+this.scrollBar.elements.secNextButton.getWidth();
        }

        skipBarStart=Math.max(bPos1, bPos2);

        // skipBarEnd
        bPos1=this.scrollBar.elements.nextButton.getX();
        bPos2=10000;
        if(this.scrollBar.elements.secPrevButton!=null){
            bPos2=this.scrollBar.elements.secPrevButton.getX();
        }

        skipBarEnd=Math.min(bPos1, bPos2);

        // skipBarSize
        skipBarSize=skipBarEnd-skipBarStart;
        scrollMax=skipBarSize-this.scrollBar.elements.cursor.getWidth();
    }
    else{
        // skipBarStart
        bPos1=this.scrollBar.elements.prevButton.getY()+this.scrollBar.elements.prevButton.getHeight();
        bPos2=0;
        if(this.scrollBar.elements.secNextButton!=null){
            bPos2=this.scrollBar.elements.secNextButton.getY()+this.scrollBar.elements.secNextButton.getHeight();
        }
        skipBarStart=Math.max(bPos1, bPos2);

        // skipBarEnd
        bPos1=this.scrollBar.elements.nextButton.getY();
        bPos2=10000;
        if(this.scrollBar.elements.secPrevButton!=null){
            bPos2=this.scrollBar.elements.secPrevButton.getY();
        }
        skipBarEnd=Math.min(bPos1, bPos2);

        // skipBarSize
        skipBarSize=skipBarEnd-skipBarStart;
        scrollMax=skipBarSize-this.scrollBar.elements.cursor.getHeight();
    }

    return scrollMax;
};

/**
 * private
 */
ScrollBarBuilder.prototype.apply=function() {
    // define the diff. between pix of movement for cursor and pix of movement of scrollable image
    var resizeCoef=this.getMaxScroll()/this.scrollBar.meter.max;

    this.scrollBar.setResizeCoef(resizeCoef);

    var ref=this.scrollBar.elements.cursor;
    var page=(this.type==ScrollBar.HOR_DIRECTION)?ref.getWidth():ref.getHeight();
    page=Math.round(page/resizeCoef);
    this.scrollBar.meter.setPage(page);

    this.scrollBar.updateView();

    // attach events
    global.eventManager.addEventListener(this.scrollBar.elements.cursor, this.listener, "mousedown", "onCursorMouseDown", false);

    global.eventManager.addEventListener(this.scrollBar.elements.prevButton, this.listener, "mousedown", "onPrevButtonPress", false);
    global.eventManager.addEventListener(this.scrollBar.elements.prevButton, this.listener, "mouseup", "onPrevButtonRelease", false);
    global.eventManager.addEventListener(this.scrollBar.elements.prevButton, this.listener, "mouseout", "onPrevButtonRelease", false);

    if(this.scrollBar.elements.secPrevButton!=null){
        global.eventManager.addEventListener(this.scrollBar.elements.secPrevButton, this.listener, "mousedown", "onPrevButtonPress", false);
        global.eventManager.addEventListener(this.scrollBar.elements.secPrevButton, this.listener, "mouseup", "onPrevButtonRelease", false);
        global.eventManager.addEventListener(this.scrollBar.elements.secPrevButton, this.listener, "mouseout", "onPrevButtonRelease", false);
    }

    global.eventManager.addEventListener(this.scrollBar.elements.nextButton, this.listener, "mousedown", "onNextButtonPress", false);
    global.eventManager.addEventListener(this.scrollBar.elements.nextButton, this.listener, "mouseup", "onNextButtonRelease", false);
    global.eventManager.addEventListener(this.scrollBar.elements.nextButton, this.listener, "mouseout", "onNextButtonRelease", false);

    if(this.scrollBar.elements.secNextButton!=null){
        global.eventManager.addEventListener(this.scrollBar.elements.secNextButton, this.listener, "mousedown", "onNextButtonPress", false);
        global.eventManager.addEventListener(this.scrollBar.elements.secNextButton, this.listener, "mouseup", "onNextButtonRelease", false);
        global.eventManager.addEventListener(this.scrollBar.elements.secNextButton, this.listener, "mouseout", "onNextButtonRelease", false);
    }

    global.eventManager.addEventListener(this.scrollBar.elements.skipBar, this.listener, "mousedown", "onSkipBarPress", false);
    global.eventManager.addEventListener(this.scrollBar.elements.skipBar, this.listener, "mouseup", "onSkipBarRelease", false);
    global.eventManager.addEventListener(this.scrollBar.elements.skipBar, this.listener, "mouseout", "onSkipBarRelease", false);
};/**
 * private
 */
ScrollBarListener.type = "ScrollBarListener";

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollPaneHandler} handler
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 * private
 */
function ScrollBarListener(scrollBar, handler, type){
    /**
     * private
     */
    this.scrollBar=scrollBar;

    /**
     * private
     */
    this.handler=handler;

    /**
     * private
     */
    this.type=type;

};

/**
 * private
 */
ScrollBarListener.prototype.onScreenMouseUp=function(e) {
    global.eventManager.removeMouseUpEventListener(this);
    global.eventManager.removeMouseMoveEventListener(this);
    this.handler.onCursorStopDrag();
};

/**
 * private
 */
ScrollBarListener.prototype.onScreenMouseMove=function(e) {
    if (evt.button!=0) {
        this.onScreenMouseUp();
        return;
    }
    var pos=(this.type==ScrollBar.HOR_DIRECTION)?e.clientX:e.clientY;
    this.handler.onCursorDrag(pos, this.type);
};

/**
 * private
 */
ScrollBarListener.prototype.actionPerformed=function(e) {
    if(e.type=="mousemove" && e.button==0) { this.onScreenMouseMove(e); return; }
    this.onScreenMouseUp(e);
};

/**
 * private
 */
ScrollBarListener.prototype.onCursorMouseDown=function(e) {
    var pos=(this.type==ScrollBar.HOR_DIRECTION)?e.clientX:e.clientY;
    this.handler.onCursorStartDrag(pos, this.type);

    global.eventManager.addMouseUpEventListener(this);
    global.eventManager.addMouseMoveEventListener(this);
};

/**
 * private
 */
ScrollBarListener.prototype.onPrevButtonPress=function(e) {
    this.handler.onPrevStep(this.type);
};

/**
 * private
 */
ScrollBarListener.prototype.onPrevButtonRelease=function(e) {
    this.handler.onStopAutoScroll();
};

/**
 * private
 */
ScrollBarListener.prototype.onNextButtonPress=function(e) {
    this.handler.onNextStep(this.type);
};

/**
 * private
 */
ScrollBarListener.prototype.onNextButtonRelease=function(e) {
    this.handler.onStopAutoScroll();
};

/**
 * private
 */
ScrollBarListener.prototype.onSkipBarPress=function(e) {
    // find isPrevPage or isNextPage
    var isPrevPage;
    if(this.type==ScrollBar.HOR_DIRECTION) {isPrevPage=e.clientX<this.scrollBar.getCursorPosition();}
    else {isPrevPage=e.clientY<this.scrollBar.getCursorPosition();}

    // start thread
    if(isPrevPage) {this.handler.onPrevPage(this.type);}
    else {this.handler.onNextPage(this.type);}
};

/**
 * private
 */
ScrollBarListener.prototype.onSkipBarRelease=function(e) {
    this.handler.onStopAutoScroll();
};/**
 * private
 */
ScrollMeter.type = "ScrollMeter";

/**
 * constructor
 * author Stoev Andrey
 * param {int} cur valore cur della posizione
 * param {int} max valore max della scala
 * private
 */
function ScrollMeter(max, cur){
    /**
     * private
     */
    this.min=0;

    /**
     * private
     */
    this.max=max;

    /**
     * private
     */
    this.cur=cur;

    /**
     * private
     */
    this.step=max/ScrollPane.SCROLL_STEPS;

    /**
     * private
     */
    this.page=0;
};

/**
 * private
 */
ScrollMeter.prototype.setPage=function(page){
    this.page=page;
};

/**
 * private
 */
ScrollMeter.prototype.setCur=function(cur){
    cur = parseInt(cur);
    if(cur>this.max) this.cur=this.max;
    else if(cur<this.min) this.cur=this.min;
    else {this.cur=cur;}
};/**
 * private
 */
ScrollPaneBuilder.type = "ScrollPaneBuilder";

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollBar} hScrollBar scrollbar orizzontale hScrollBar
 * param {ScrollBar} vScrollBar scrollbar verticale vScrollBar
 * param {Scrollable} scrollable object scrollable
 * private
 */
function ScrollPaneBuilder(scrollItem, h, v){
    var hsm, hsb, vsm, vsb;
    hsm=hsb=vsm=vsb=null;

    if(h!=null){
        hsm=new ScrollMeter(h.max-h.min, h.max-h.start);
        hsb=new ScrollBar(hsm, h.elements, ScrollBar.HOR_DIRECTION);
    }

    if(v!=null){
        vsm=new ScrollMeter(v.max-v.min, v.max-v.start);
        vsb=new ScrollBar(vsm, v.elements, ScrollBar.VER_DIRECTION);
    }

    /**
     * private
     */
    this.hScrollBar=hsb;

    /**
     * private
     */
    this.vScrollBar=vsb;

    /**
     * private
     */
    this.scrollable=new Scrollable(hsm, vsm, scrollItem);

    /**
     * private
     */
    this.pane=null;
};

/**
 * private
 */
ScrollPaneBuilder.prototype.apply=function() {
    this.pane=new ScrollPane(this.hScrollBar, this.vScrollBar, this.scrollable);
    var handler=new ScrollPaneHandler(this.pane);

    var builder;

    if(this.hScrollBar!=null){
        builder=new ScrollBarBuilder(this.hScrollBar, handler, ScrollBar.HOR_DIRECTION);
        builder.apply();
    }

    if(this.vScrollBar!=null){
        builder=new ScrollBarBuilder(this.vScrollBar, handler, ScrollBar.VER_DIRECTION);
        builder.apply();
    }

    this.scrollable.updateView();

};

/**
 * private
 */
ScrollPaneBuilder.prototype.getScrollPane=function() {
    return this.pane;
};/**
 * private
 */
ScrollPaneHandler.type = "ScrollPaneHandler";

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollPane} pane
 * private
 */
function ScrollPaneHandler(pane){
    /**
     * private
     */
    this.pane=pane;


    /**
     * private
     */
    this.drag={startPos:0, startCur:0, lastPos:0};
};

/**
 * private
 * param {int} pos puo' essere X or Y
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneHandler.prototype.onCursorDrag=function(pos, type) {
    // update
    if(pos!=this.drag.lastPos){
        this.drag.lastPos=pos;

        // model
        var scrollBar=this.pane.getScrollBar(type);
        var posOfs=pos-this.drag.startPos;
        var posOfs=Math.round(posOfs/scrollBar.resizeCoef);
        scrollBar.meter.setCur(this.drag.startCur+posOfs);

        // view
        scrollBar.updateView();
        this.pane.scrollable.updateView();
    }
};

/**
 * private
 * param {int} pos puo' essere X or Y
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneHandler.prototype.onCursorStartDrag=function(pos, type) {
    var scrollBar=this.pane.getScrollBar(type);
    this.drag.startPos=this.drag.lastPos=pos;
    this.drag.startCur=scrollBar.meter.cur;
};

/**
 * private
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneHandler.prototype.onCursorStopDrag=function(type) {
    var scrollBar=this.pane.getScrollBar(type);
    scrollBar.startDragPos=scrollBar.lastDragPost=0;
};

/**
 * private
 */
ScrollPaneHandler.prototype.onStopAutoScroll=function() {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().stop();
};

/**
 * private
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneHandler.prototype.onNextStep=function(type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onNextStep", type);

    var scrollBar=this.pane.getScrollBar(type);
    var meter=scrollBar.meter;

    scrollBar.meter.setCur(meter.cur+meter.step);
    if(meter.cur>meter.max) scrollBar.meter.setCur(meter.max);

    scrollBar.updateView();
    this.pane.scrollable.updateView();
};

/**
 * private
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneHandler.prototype.onPrevStep=function(type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onPrevStep", type);

    var scrollBar=this.pane.getScrollBar(type);
    var meter=scrollBar.meter;

    scrollBar.meter.setCur(meter.cur-meter.step);
    if(meter.cur<meter.min) scrollBar.meter.setCur(meter.min);

    scrollBar.updateView();
    this.pane.scrollable.updateView();
};

/**
 * private
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneHandler.prototype.onNextPage=function(type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onNextPage", type);

    var scrollBar=this.pane.getScrollBar(type);
    var meter=scrollBar.meter;

    scrollBar.meter.setCur(meter.cur+meter.page);
    if(meter.cur>meter.max) scrollBar.meter.setCur(meter.max);

    scrollBar.updateView();
    this.pane.scrollable.updateView();
};

/**
 * private
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPaneHandler.prototype.onPrevPage=function(type) {
    ScrollPaneThread.getInstance().setHandler(this);
    ScrollPaneThread.getInstance().start("onPrevPage", type);

    var scrollBar=this.pane.getScrollBar(type);
    var meter=scrollBar.meter;

    scrollBar.meter.setCur(meter.cur-meter.page);
    if(meter.cur<meter.min) scrollBar.meter.setCur(meter.min);

    scrollBar.updateView();
    this.pane.scrollable.updateView();
};/**
 * private
 */
ScrollPane.type = "ScrollPane";

/**
 * private
 */
ScrollPane.AUTOSCROLL_FIRST_DELAY = 250;

/**
 * private
 */
ScrollPane.AUTOSCROLL_NEXT_DELAY = 100;

/**
 * private
 */
ScrollPane.SCROLL_STEPS = 20;

/**
 * constructor
 * author Stoev Andrey
 * param {ScrollBar} hScrollBar scrollbar orizzontale hScrollBar
 * param {ScrollBar} vScrollBar scrollbar verticale vScrollBar
 * param {Scrollable} scrollable object scrollable
 * private
 */
function ScrollPane(hScrollBar, vScrollBar, scrollable){
    /**
     * private
     */
    this.hScrollBar=hScrollBar;

    /**
     * private
     */
    this.vScrollBar=vScrollBar;

    /**
     * private
     */
    this.scrollable=scrollable;

    /**
     * private
     */
    this.element=null;
};

/**
 * private
 * param {int} type puo' essere ScrollBar.HOR_DIRECTION or ScrollBar.VER_DIRECTION
 */
ScrollPane.prototype.getScrollBar=function(type){
    if(type==ScrollBar.HOR_DIRECTION) return this.hScrollBar;
    return this.vScrollBar;
};/**
 * constructor
 * author Bruna Stefano
 * private
 */
function Environment(titleId,cpId,bgId) {

    // get SVGtext from applet and add
    this.titleElement = global.document.getElementById(titleId);

    // get SVGbg from applet and add
    this.bgElement = global.document.getElementById(bgId);

    // get SVGcp from applet and add
    this.cpElement = global.document.getElementById(cpId);
    this.cpSVG = null;

    this.cpBuilded = false;
};

/**
 * private
 */
Environment.prototype.loadPreviewTitle = function(data) {
    if(data.success) {
        this.titleElement.appendChild(parseXML(data.content,global.document));
    } else {
        this.titleElement.appendChild(parseXML("<text x='2' y='23'>No title</text>",global.document));
    }
};

/**
 * private
 */
Environment.prototype.init = function() {

    // title
    //var titleSVG = '<g xmlns='http://www.w3.org/2000/svg'><text x="2" id="row_title_0" style="font-family:Arial;font-size:22;" class="titoloDom" y="23"><![CDATA[Scarica il documento "Lista" come Microsoft Word nella cartella  ]]></text><text x="2" id="row_title_1" style="font-family:Arial;font-size:22;" class="titoloDom" y="46"><![CDATA["C:\ECDL\Ufficio". ]]></text><text x="2" visibility="hidden" id="source_row_title_0" y="23"><![CDATA[Scarica il documento "Lista" come Microsoft Word nella cartella  ]]></text><text x="2" visibility="hidden" id="source_row_title_1" y="23"><![CDATA["C:\ECDL\Ufficio". ]]></text><rect height="76" width="800" x="1" y="0" opacity="0"/></g>';
    /*
     if (titleSVG!=null && titleSVG!="") this.titleElement.appendChild(parseXML(titleSVG,global.document));
     else {
     // provo a prendere il titolo da un file esterno di supporto
     var th = this;
     getURL("titlePreview.xml", function(data){th["loadPreviewTitle"](data);});
     }
     // ---
     */

    // bg
    /*
     var bgSVG = RTGetValue('/qco/svgbg');
     if (bgSVG!=null && bgSVG!="") this.bgElement.appendChild(parseXML(bgSVG,global.document));
     else {this.bgElement.appendChild(parseXML("<image xmlns='http://www.w3.org/2000/svg' x='0' y='0' width='802' height='76' xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='img/bg.png'/>",global.document));};
     // ---
     */

    // cp
    /*
     var cpSVG = RTGetValue('/qco/svgcp');
     if (cpSVG==null || cpSVG=="") this.cpSVG = "<g xmlns='http://www.w3.org/2000/svg'><rect x='1' y='78' width='800' height='600' opacity='0.5' style='fill:rgb(40,100,154);'/><text x='308' y='377' font-family='Liberation Sans' font-size='20' font-weight='bold'>Risposta confermata</text></g>";
     */
};

/**
 * private
 */
Environment.prototype.buildCP = function() {
    this.cpElement.appendChild(parseXML(this.cpSVG,global.document));
    this.cpElement.setAttribute("visibility","hidden");
    this.cpBuilded = true;
};

/**
 * private
 */
Environment.prototype.setConfirmPanelVisible = function(b) {
    if (!this.cpBuilded && b) this.buildCP();
    this.cpElement.setAttribute("visibility", (b?"visible":"hidden"));
};/**
 * private
 */
Caret.type = "Caret";

/**
 * Refresh rate del caret. Tempo espresso in millisecondi
 * public
 */
Caret.refreshRate = 500;

/**
 * constructor
 * author Biscaro Fabio
 * private
 */
function Caret() {

    var mdfs = global.document.getElementById("mdfs");

    /**
     * private
     */
    this.element = global.document.createElementNS(global.svgns,"g");
    this.element.setAttribute("id","caret");
    this.element.setAttribute("visibility","hidden");
    mdfs.appendChild(this.element);

    // line
    var osvg=global.document.createElementNS(global.svgns,"line");
    osvg.setAttribute("x1", 0);
    osvg.setAttribute("y1", 0);
    osvg.setAttribute("x2", 0);
    osvg.setAttribute("y2", 14);
    osvg.setAttribute("style", "stroke:black");
    this.element.appendChild(osvg);

    /**
     * private
     */
    this.visible = false;

    /**
     * private
     */
    this.blinking = false;

    /**
     * private
     */
    this.verticalSize = 14; // La larghezza di default del cursore
};

/**
 * private
 */
Caret.prototype.setFocus = function(focus) {
    this.focus = focus;
    this.focus.element.appendChild(this.line);
};

/**
 * private
 */
Caret.prototype.setHeight = function(height) {
    for (var i=0; i<this.element.childNodes.length; i++) {
        var s = new String(this.element.childNodes.item(i));
        if (s.search("LineElement") > 0) {
            this.element.childNodes.item(i).setAttribute("y2",height);
        }
    }
};

/**
 * private
 */
Caret.prototype.redraw = function() {
    this.setVisible(!this.visible);
};

/**
 * private
 */
Caret.prototype.activate = function() {
    if (!this.blinking) {
        this.blinking = true;
        // la funzione chiamata dal setInterval non entra nel contesto dell'oggetto
        // devo usare la variabile globale caret definita nell'SVG
        var th = this;
        this.iid = setInterval(function() {th["redraw"]();},Caret.refreshRate);
    }
};

/**
 * private
 */
Caret.prototype.deactivate = function() {
    if (this.blinking) {
        this.blinking = false;
        this.setVisible(false);
        clearInterval(this.iid);
    }
};

/**
 * private
 */
Caret.prototype.isActive = function() {
    return this.blinking;
};

/**
 * private
 */
Caret.prototype.setVisible = function(b) {
    this.element.setAttribute("visibility", (b?"visible":"hidden"));
    this.visible=b;
};

/**
 * private
 */
Caret.prototype.setPosition = function(x,y) {
    this.translate(x,y);
};

/**
 * private
 */
Caret.prototype.translate = function(x,y) {
    this.element.setAttribute("transform","translate(" + x + "," + y + ")");
};

Caret.prototype.setStyle = function(style) {
    var x1=0;
    var x2=0;
    if (style=="italic") {
        x1=6;
        x2=-1;
    }
    for (var i=0; i<this.element.childNodes.length; i++) {
        var s = new String(this.element.childNodes.item(i));
        if (s.search("LineElement") > 0) {
            this.element.childNodes.item(i).setAttribute("x1",x1);
            this.element.childNodes.item(i).setAttribute("x2",x2);
        }
    }
};/**
 * constructor
 * author Bruna Stefano
 * author Stoev Andrey
 * private
 */
function Keyboard(caret) {

    /**
     * Puntatore ad una inputbox per volta
     * private
     */
    this.textBox = null;

    /**
     * Altri vari listener
     * private
     */
    this.listeners=[];

    /**
     * cursore
     * private
     */
    this.caret = caret;
};

/*
 * private
 */
Keyboard.prototype.getCaret = function() {
    return this.caret;
};

/*
 * private
 */
Keyboard.prototype.notifyKey= function(xEvent) {
    this.send(xEvent);
};

/*
 * private
 */
Keyboard.prototype.send = function(xEvent) {
    if (this.textBox != null) this.textBox.handleEvent(xEvent);
    for (i=0; i<this.listeners.length; i++) this.listeners[i].handleEvent(xEvent);
};

/*
 * private
 */
Keyboard.prototype.notifyMouse = function(event) {
    // L'inputbox puo' essere interessato
    if (this.textBox != null) {
        this.textBox.handleEvent(event);
    }
};

/*
 * private
 */
Keyboard.prototype.activateTextBox = function(textBox) {


    ///*<<<*/alert("[DEBUG] Keyboard.prototype.activateTextBox:");/*>>>*/
    //if (this.textBox != null) this.deactivateTextBox();

	document.getElementById(textBox.id).childNodes[0].focus();

    // Attivo la text box
    //this.textBox = textBox;
    //this.textBox.setCaret(this.caret);
    //this.caret = null;
    //this.textBox.start();
};

/*
 * private
 */
Keyboard.prototype.deactivateTextBox = function() {


    ///*<<<*/alert("[DEBUG] Keyboard.prototype.deactivateTextBox:");/*>>>*/

    /*<<<*/
    //if (this.textBox==null) {
    //alert("[ASSERT FAIL] Keyboard.prototype.deactivateTextBox: this.textBox should not be null");
    //return;
    //}
    /*>>>*/

    //this.textBox.stop();
    //this.caret = this.textBox.getCaret();
    //this.textBox.removeCaret();
    //this.textBox = null;
};

/*
 * private
 */
Keyboard.prototype.getInputBox=function() {
    return this.getTextBox();
};

/*
 * private
 */
Keyboard.prototype.getTextBox = function() {
    return this.textBox;
};

/*
 * private
 */
Keyboard.prototype.addListener = function(object) {
    this.listeners.push(object);
};

/*
 * private
 */
Keyboard.prototype.removeListener = function(object) {
    var i = 0;
    var found = false;
    var result;
    while (!found && i < this.content.length) {
        if (this.listeners[i] == object) {
            this.listeners.splice(i,1);
            found = true;
        }
        i++;
    }
};/**
 * core.speedy.RtapiBuffer
 * author Stoev Andrey, andi.stoevgmail.com
 */
core.speedy.RtapiBuffer=function(){
    this._bufferSegmentArr = [];

    this.getClassName = function(){ return "core.speedy.RtapiBuffer";};
};

/**
 * private
 */
core.speedy.RtapiBuffer.prototype.getBufferSegment=function(stepId){
    if(this._bufferSegmentArr[stepId]==null){
        this._bufferSegmentArr[stepId] = [];
    };

    var bufferSegment = this._bufferSegmentArr[stepId];
    return bufferSegment;
};

core.speedy.RtapiBuffer.prototype.addStepAction=function(stepId, stepAction) {
    var bufferSegment = this.getBufferSegment(stepId);
    bufferSegment.push(stepAction);
};

core.speedy.RtapiBuffer.prototype.removeStep=function(stepId) {
    this._bufferSegmentArr[stepId] = null;
};

core.speedy.RtapiBuffer.prototype.clear=function() {
    this._bufferSegmentArr = null;
    this._bufferSegmentArr = [];
};

core.speedy.RtapiBuffer.prototype.getStepIdList=function() {
    var stepIdList = [];

    for(var idx=0; idx<this._bufferSegmentArr.length; idx++){
        if(this._bufferSegmentArr[idx]!=null){
            stepIdList.push(idx);
        };
    };

    return stepIdList;
};

core.speedy.RtapiBuffer.prototype.getStepActionList=function(stepId) {
    var bufferSegment = this.getBufferSegment(stepId);
    return bufferSegment;
};/**
 * Interfaccia di comunicazione fra player e domanda e viceversa.
 * constructor
 * param {String} qcoType Tipo della domanda ['simulation'|'nonperformances']
 * author Bruna Stefano
 */
function RtApi(qcoType){

    /**
     * private
     */
    this.s_status = null;

    /**
     * private
     */
    this.s_type = qcoType;

    /**
     * private
     */
    this.i_answerNum = 0;

    /**
     * private
     */
    this.s_oldAttemptN = 0;

    /**
     * private
     */
    this.s_oldTrialN = 0;

    /**
     * private
     */
    this.s_newAttemptN = 0;

    /**
     * private
     */
    this.s_newTrialN = 0;

    /**
     * private
     */
    this.b_oldValid = false;

    /**
     * private
     */
    this.b_newValid = false;

    /**
     * private
     */
    this.i_sTime = null;

    /**
     * private
     */
    this.o_confirmHandlerArray = new Array();

    /**
     * private
     */
    this.n_confirmHandlerCount = 0;

    /**
     * private
     */
    this.o_keyHandlerArray = new Array();

    /**
     * private
     */
    this.n_keyHandlerCount = 0;

    /**
     * private
     */
    this._inputFilter = new core.util.InputFilter();

    /**
     * private
     */
    this._rtapiBuffer = new core.speedy.RtapiBuffer();
};

/**
 * Aggiunge un actionValue nello stec gestito nel Buffer con chiave stepId
 */
RtApi.prototype.addStepActionInBuffer = function(stepId, actionValue) {
    this._rtapiBuffer.addStepAction(this._inputFilter.toInteger(stepId), this._inputFilter.toString(actionValue));
};

/**
 * Rimuove l'intero stack per la chiave stepId al interno del buffer
 */
RtApi.prototype.removeStepFromBuffer = function(stepId) {
    this._rtapiBuffer.removeStep(this._inputFilter.toInteger(stepId));
};

/**
 * Ritorna il titolo SVG contenuto nel qco.xml in modo che possa essere inserito dinamicamente nel DOM del documento
 * SVG corrente
 * return Titolo SVG della domanda
 * public
 * deprecated Dell'inserimento del titolo della domanda se ne occupa adesso la classe Environment.js.
 * tpye String
 */
RtApi.prototype.getTitle = function(){
	return RTGetValue('/qco/svgtitle');
};

/**
 * private
 */
RtApi.prototype.init = function(){
    this.i_sTime = new Date();
    // RTInitialize();
    RTGetValue('/qco/status');
    RTGetValue('/qco/numanswer');
	setTitle(this.getTitle());
    if (this.s_status == 'completed') {
        RTSetValue('/qco/status','attempted');
        this.s_status = 'attempted';
		var ac = RTGetValue('/qco/attempts/count');//var ac = 1; 
        if (parseInt(ac) > 0 ){
            this.s_newAttemptN = parseInt(ac) + parseInt(1);
            this.s_newTrialN = 1;
            this.s_oldAttemptN = ac;  
			RTGetValue('/qco/attempts/attempt[id="' + this.s_oldAttemptN + '"]/trials/count');//this.s_oldTrialN = 1; 
            this.b_oldValid = true;
            this.b_newValid = false;
            if (this.s_type == 'simulation') this.initActions();
            else {this.initAnswers();};
        }
        else alert("RTApi:init:Error 1");
    }
    else {
		var ac = RTGetValue('/qco/attempts/count');//var ac = 1; 
        if (parseInt(ac) > 0 ){
			RTGetValue('/qco/attempts/attempt[id="' + ac + '"]/trials/count');//var tc = 1; 
            this.s_newAttemptN = ac;
            this.s_newTrialN = parseInt(tc) + parseInt(1);
            this.s_oldAttemptN = ac;
            this.s_oldTrialN = tc;
            this.b_oldValid = true;
            this.b_newValid = false;
        }
        else {
            this.s_newAttemptN = 1;
            this.s_newTrialN = 1;
            this.s_oldAttemptN = 0;
            this.s_oldTrialN = 0;
            this.b_oldValid = false;
            this.b_newValid = false;
        }
    }
    if (this.s_status == 'not attempted'){
        RTSetValue('/qco/status','browsed');
        this.s_status = 'browsed';
    }
};

/**
 * private
 */
RtApi.prototype.initActions = function() {
    RTSetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]',"");
    this.b_newValid = true;
};

/**
 * private
 */
RtApi.prototype.initAnswers = function(){
    if (this.b_oldValid){
        this.copyAnswers(this.s_oldAttemptN,this.s_oldTrialN,this.s_newAttemptN,this.s_newTrialN);
    }
    else {
        this.resetAnswers(this.s_newAttemptN,this.s_newTrialN);
    }
    this.b_newValid = true;
};

/**
 * private
 */
RtApi.prototype.copyAnswers = function(oldAttemptN,oldTrialN,newAttemptN,newTrialN){
    var i = 0;
    var value = null;
    var time = null;
    for (i=1; i <= this.i_answerNum; i++) {
        value = RTGetValue('/qco/attempts/attempt[id="' + oldAttemptN + '"]/trials/trial[id="' + oldTrialN + '"]/answers/answer[id="' + i + '"]');
        RTSetValue('/qco/attempts/attempt[id="' + newAttemptN + '"]/trials/trial[id="' + newTrialN + '"]/answers/answer[id="' + i + '"]',value);
    }
};

/**
 * Aggiunge, in caso di simulazione, una azione da meomrizzare nel qco.xml (in tale file vengono memorizzate le azioni dell'utente per poi poterle valutare)
 * <b>N.B.</b> Evitare di agguingere azioni che contengono gia' in se il risultato di una valutazione avvenuta in codice custom della domanda.
 * La valutazione delle correttezza della domanda NON deve avvenire all'interno della domanda (per motivi di sicurezza) ma DEVE avvenire tramite
 * il confronto fra le lista di azioni registrate tramite <code>addAction(action)</code> e i dati contenuti nel rqco.xml
 * Action come "OK_risposta_esatta" indicano la presenza di logica che ha gia' eseguito una valutazione nella domanda. Tali tipologie di
 * action sono VIETATE. (ASSOLUTAMENTE)
 * E' comunque accettabile un certo grado di preprocessazione dell'input utente in modo da poter produrre delle action
 * facilemente confrontabili e/o in modo da ridurre in cardinalita' il numero di punti di uscita. Tali, definiamole action preprocessate, non devono pero'
 * rivelare la semantica riguardante la correttezza o meno della domanda.
 * param {String} action Azione da aggiungere alla lista di operazioni eseguite dall'utente
 * public
 */
RtApi.prototype.addAction = function(action){
	this.s_status = RTGetValue('/qco/status');
    this.s_status = 'browsed';
    if (this.s_status =='browsed'){
        RTSetValue('/qco/status','attempted');
        this.s_status = 'attempted';
    }
    var an = RTGetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]/actions/count');
    an = parseInt(an) + parseInt(1);
    RTSetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]/actions/action[id="' + an + '"]',action);
};

/**
 * Invia ai servizi java il percorso con stepAction impostando stepId
 */
RtApi.prototype.addStepAction = function(stepId, stepAction) {
    var an = RTGetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]/steps/step[id="' + stepId + '"]/actions/count');
    an = parseInt(an) + parseInt(1);
    RTSetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]/steps/step[id="' + stepId + '"]/actions/action[id="' + an + '"]',stepAction);
};

/**
 * private
 */
/**
 * Se il buffer è vuoto non fa niente. Se contiene delle StepAction invia ogni stepAction
 */
RtApi.prototype.sendAndClearRtapiBuffer = function() {
    var stepIdList = this._rtapiBuffer.getStepIdList();
    for(var j=0; j<stepIdList.length; j++){
        var stepId=stepIdList[j];
        var stepActionList = this._rtapiBuffer.getStepActionList(stepId);
        for(var k=0; k<stepActionList.length; k++){
            var stepAction = stepActionList[k];
            this.addStepAction(stepId, stepAction);
        };
    };

    this._rtapiBuffer.clear();
};

/**
 * private
 */
RtApi.prototype.resetAnswers = function(attemptN,trialN){
    var i = 0;
    var value = null;
    for (i=1; i <= this.i_answerNum; i++)
    {
        RTSetValue('/qco/attempts/attempt[id="' + attemptN + '"]/trials/trial[id="' + trialN + '"]/answers/answer[id="' + i + '"]','false');
    }
};

/**
 * Ritorna, in caso di domanda nonperformance, la risposta all'item (con item si intende la singola opzione) con <code>answerId</code>.
 * return valore della risposta per l'item indicato
 * param {String} answerId Id dell'item della nonperformance
 * type String
 * public
 */
RtApi.prototype.getAnswer = function(answerId){
    if (this.b_newValid) {
		return RTGetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]/answers/answer[id="' + answerId + '"]');//return ""; 
    }
    else {
        if (this.b_oldValid) {
            return RTGetValue('/qco/attempts/attempt[id="' + this.s_oldAttemptN + '"]/trials/trial[id="' + this.s_oldTrialN + '"]/answers/answer[id="' + answerId + '"]');//return  ""; 
        }
        else {
            this.initAnswers();
            return RTGetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]/answers/answer[id="' + answerId + '"]');//return ""; 
        }
    }
};

/**
 * Ritorna il numero di item della nonperformance (con item si intende la singola opzione).
 * return numero di item della nonperformance
 * type int
 * public
 */
RtApi.prototype.getAnswerNumber = function(){
    return this.i_answerNum;
};

/**
 * Aggiunge, in caso di domanda nonperformance, la risposta <code>value</code> all'item (con item si intende la singola opzione). con id <code>answerId</code>.
 * param {int} identificatore dell'item
 * param {String} valore della risposta per l'item indicato
 * public
 */
RtApi.prototype.setAnswer = function(answerId,value){
    if (this.s_status == 'browsed'){
        RTSetValue('/qco/status','attempted');
        this.s_status = 'attempted';
    }
    if (!this.b_newValid) {
        this.initAnswers();
    }
    RTSetValue('/qco/attempts/attempt[id="' + this.s_newAttemptN + '"]/trials/trial[id="' + this.s_newTrialN + '"]/answers/answer[id="' + answerId + '"]',value);
};

/**
 * Ritorna se la domanda e' stata precedentemente confermata
 * return <code>true</code> se e' stata precedemente confermata, <code>false</code> altrementi.
 * type boolean
 * public
 */
RtApi.prototype.isConfirmed = function(){
    if (this.s_status =='confirmed') return true;
    else return false;
};

/**
 * Comunica al player che la domanda ha finito ogni operazione di lettura/scrittura sul qco.xml
 * Il metodo garantisce che tutte le operazioni di lettura e scritture precedemente eseguite saranno resi persistenti.
 * private
 */
RtApi.prototype.unload = function(){
    if (!this.isConfirmed()) {
        var et = parseInt(RTGetValue('/qco/time'));
        var et = 1000;
        var t = (new Date().getTime()- this.i_sTime);
        et = parseInt(et) + parseInt(t);
        RTSetValue('/qco/time',et.toString());
    }
    RTCommit();
    RTFinish();
};

/**
 * private
 */
RtApi.prototype.skip = function() {
    RTSetValue('/qco/status','skipped');
    this.s_status = 'skipped';
    this.unload();
};

/**
 * Comunica al player che e' stato raggiunto un punto di uscita e che la domanda cede il controllo del processo al player. Il punto di uscita
 * e' semanticamente equivalente alla pressione di un tasto conferma virtuale
 * Il metodo garantisce che tutte le operazioni di lettura e scritture precedentemente eseguite saranno rese persistenti.
 * public
 */
RtApi.prototype.confirm = function(){
    this.sendAndClearRtapiBuffer();

    this.raiseConfirmEvent();
    if (this.s_type == 'nonperformance') {
        if (!this.b_newValid) {
            this.initAnswers();
        }
    }
    RTSetValue('/qco/status','completed');
    this.s_status = 'completed';
    this.unload();
};

/**
 * private
 */
RtApi.prototype.key = function(vk,mod,ccode) {
    this.raiseKeyEvent(vk,mod,ccode);
};

/**
 * Permette di registrare un handler (una funzione con argomento event) che sara' chiamata all'verificarsi dell'evento di conferma.
 * Si ricorda che tale evento puo' essere lanciato sia del player (pressione del tasto di conferma) che dalla domanda stessa.
 * public
 * param {Object} handler Puntatore a funzione
 */
RtApi.prototype.addConfirmEventHandler = function(handler) {
    var o_listener = new Object();
    o_listener.o_handle = handler;
    this.o_confirmHandlerArray[this.n_confirmHandlerCount] = o_listener;
    this.n_confirmHandlerCount ++;
};

/**
 * Permette di registrare un handler (una funzione) che sara' chiamata all'verificarsi di un evento di tastiera.
 * public
 * param {Object} handler Puntatore a funzione
 */
RtApi.prototype.addKeyEventHandler = function(handler) {
    var o_listener = new Object();
    o_listener.o_handle = handler;
    this.o_keyHandlerArray[this.n_keyHandlerCount] = o_listener;
    this.n_keyHandlerCount ++;
};

/**
 * private
 */
RtApi.prototype.raiseConfirmEvent = function() {
    var evt = new Object();
    evt.s_des = 'Confirm event';
    evt.s_id = 'confirm';
    evt.o_sender = this;
    for (var i =0 ; i< this.o_confirmHandlerArray.length;i++)
    {
        var obj = this.o_confirmHandlerArray[i];
        if (null != obj)
        {
            obj.o_handle(evt);
        }
    }
};

/**
 * private
 */
RtApi.prototype.raiseKeyEvent = function(vk, mod, ccode) {
    var evt = new KeyEvent(vk, mod, ccode);
    for (var i =0 ; i< this.o_keyHandlerArray.length;i++)
    {
        var obj = this.o_keyHandlerArray[i];
        if (null != obj)
        {
            obj.o_handle(evt);
        }
    }
};


/**
 * RtNativeApi
 */
function getXML() {
	var txt = `<?xml version="1.0" encoding="UTF-8"?>
	<qco xmlns:xlink="http://www.w3.org/1999/xlink">
	<svgtitle>
	<g xmlns='http://www.w3.org/2000/svg'>
	<text x="2" id="row_title_0" style="font-family:Arial;font-size:22;" class="titoloDom" y="23"><![CDATA[<![CDATA[Phóng to (zoom) tài liệu lên "80%".  ]]>]]></text>
	<rect height="76" width="800" x="1" y="0" opacity="0"/>
	</g>
	</svgtitle>
	<text><![CDATA[Apri la presentazione "So...]]></text>
	<attempts count="0"/>
	<status>not attempted</status>
	<time>0</time>
	<id>0</id>
	<log>false</log>
	<type>simulation</type>
	<subtype>multians</subtype>
	<confirmbutton>false</confirmbutton>
	<idtipologia/>
	<idversione/>
	<nomeitem/>
	<serie/>
	<dis/>
	<ss/>
	<ln/>
	<qn/>
	<parent/>
	<idmodulo/>
	<syllabusReleaseCode/>
	<ideucip/>
	<iddb/>
	</qco>`;
	return txt;
	  }
	  
	  function parseXML() {
		var retval;
		if (window.DOMParser)
		{
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(GLOBAL_XML, "text/xml");
			retval = xmlDoc;
			}
		else // Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(GLOBAL_XML);
			retval = xmlDoc;
		}
		return retval;
	  }
	  
	var GLOBAL_XML = getXML();
	var GLOBAL_XML_DOC = parseXML();

	var findAPITries = 0;

	function getAPIObject(win, api_type) {
		if(api_type == 'SCORM_API') {
			return win.API;
		} else if(api_type == 'DB_API') {
			return win.API_DB;
		}
	}

	function findAPI(win, api_type) {
		var THE_API = getAPIObject(win, api_type);
	    while (THE_API == null && win.parent != null && win.parent != win) {
	        findAPITries++;
	        if (findAPITries > 7) {
	            alert("Error finding API -- too deeply nested.");
	            return null;
	        }
	        win = win.parent;
			THE_API = getAPIObject(win, api_type);
	    }
	    return THE_API;
	}

	function getAPI(api_type) {
	    var theAPI = findAPI(window, api_type);
	    if (theAPI == null && window.opener != null && typeof window.opener != "undefined") {
	        theAPI = findAPI(window.opener, api_type)
	    }
	    if (theAPI == null) {
	        alert("Unable to find an API adapter")
	    }
	    return theAPI
	}

	function RTInitialize() {
	    SCORM_API_1_2 = getAPI("SCORM_API");
		API_DB = getAPI("DB_API");	
		QCO_S = API_DB.createQcoInstance(67218, 0, MAX_ATTEMPTS, FINAL_VALUE);
	    var inited = SCORM_API_1_2.LMSInitialize();
	    if (inited) {
	        SCORM_API_1_2.LMSSetValue("cmi.core.score.raw", 0);
	        SCORM_API_1_2.LMSCommit();
	        console.log("LMS INITALIZED")
	    }
	    console.log("RTInitalize")
	}
	  
	  function RTCommit() {
		console.log("RTCommit");
	  }
	  
	  function RTFinish() {
		console.log("RTFinish");
		console.log(GLOBAL_XML_DOC);
		FireEvent();
	  }
	  
	  function RTSetValue(key, value) {
		console.log("RTSetValue " + key + " : " + value);
		GLOBAL_FINAL_VALUE += "|" + value;
		var retval = "";
		if (window.DOMParser)
		{
	    parser = new DOMParser();
	    xmlDoc = GLOBAL_XML_DOC;
		var result = xmlDoc.evaluate(key, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if(result != null) {
			if(result.singleNodeValue != null) {
				result.singleNodeValue.childNodes[0].textContent = value;
			}
		}
		console.log(retval);
		}
		else // Internet Explorer
		{
	    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	    xmlDoc.async = false;
	    xmlDoc.loadXML(GLOBAL_XML);
		}
	  }
	  
	  function RTGetValue(value){
		console.log("RTGetValue");
		var retval = "";
		if (window.DOMParser)
		{
	    parser = new DOMParser();
	    xmlDoc = GLOBAL_XML_DOC;
		var result = xmlDoc.evaluate(value, xmlDoc, null, XPathResult.STRING_TYPE, null);
		if(result != null) {
			retval = result.stringValue;
		}
		console.log(retval);
		}
		else // Internet Explorer
		{
	    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	    xmlDoc.async = false;
	    xmlDoc.loadXML(GLOBAL_XML);
		}
		return retval;
	  } 

	  function FireEvent() {
		
		var body = document.getElementsByTagName("BODY")[0];
		var fakebutton = document.getElementById("fakebutton");
		var event; // The custom event that will be created

	  if (document.createEvent) {
	    event = document.createEvent("HTMLEvents");
		event.data = GLOBAL_FINAL_VALUE;
	    event.initEvent("click", true, true);
	  } else {
	    event = document.createEventObject();
	    event.eventType = "click";
		event.data = GLOBAL_FINAL_VALUE;
	  }

	  event.eventName = "click";

	  if (document.createEvent) {
		  $d('#fakebutton').trigger("click", event);
	  } else {
	    fakebutton.fireEvent("on" + event.eventType, event);
	  }
	};
	  
/**
 * L'input da testiera viene "trasmesso" dal player alla domanda. Il <code>KeyEvent</code> e' la classe che realizza l'evento di tastiera.
 * Le isitanze di questa classe possono essere ottenute dall'argomento (evt) ottenuto registrando una funzione al metodo
 * <code>addKeyEventHandler(handler)</code>
 * constructor
 * param {String} keyCode KeyCode del stato premuto
 * param {String} modifier Modifier del stato premuto
 * param {String} charCode CharCode del stato premuto
 * author Stefano Bruna
 * public
 */
function KeyEvent(keyCode, modifier, charCode){

    /**
     * private
     */
    this.modifier = modifier;

    /**
     * private
     */
    this.charCode = charCode;

    /**
     * private
     */
    this.keyCode = keyCode;

    /**
     * private
     */
    this.type='KeyPress';
};

/**
 * Ritorna il CharCod del tasto premuto
 * return CharCod del tasto premuto
 * type String
 * public
 */
KeyEvent.prototype.getCharCode = function() {
    return this.charCode;
};

/**
 * Ritorna il KeyCode del tasto premuto
 * return KeyCode del tasto premuto
 * type String
 * public
 */
KeyEvent.prototype.getKeyCode = function() {
    return this.keyCode;
};

/**
 * Ritorna se il tasto CTRL era premuto al momento dell'arrivo dell'evento
 * return se il tasto CTRL era premuto
 * type boolean
 * public
 */
KeyEvent.prototype.getCtrlKey = function() {
    return this.modifier & 2;
};

/**
 * Ritorna se il tasto ALT era premuto al momento dell'arrivo dell'evento
 * return se il tasto ALT era premuto
 * type boolean
 * public
 */
KeyEvent.prototype.getAltKey = function() {
    return this.modifier & 8;
};

/**
 * Ritorna se il tasto SHIFT era premuto al momento dell'arrivo dell'evento
 * return se il tasto SHIFT era premuto
 * type boolean
 * public
 */
KeyEvent.prototype.getShiftKey = function() {
    return this.modifier & 1;
};

/**
 * Ritorna il MetaKey del tasto premuto
 * return MetaKey del tasto premuto
 * type String
 * public
 */
KeyEvent.prototype.getMetaKey = function() {
    return false;
};