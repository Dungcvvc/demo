/* 
REPLACE

toglie gli spazi
casella.getText().replace(/ /g, ''); 

toglie il carattere 'a' 
casella.getText().replace(/\a/g, ''); 

toglie tutto dopo il punto esempio  file.zip >> file
casella.getText().replace(/(.*)\.(.*)/,"$1")

$1 il match della prima parte
$2 il match della seconda parte

esempio completo di ricerca su google (ES.Bricolaje)
testo = testo.replace(/(\+?)(\"?)(\'?)(bricolaje)(\'?)(\"?)/,'bricolaje');
*/
/*----------------checkClosed------------------*/

function checkClosed_Generale() {
 var condition = true;
 condition = condition && $('pathEffettoFinale').down('0').isVisible();

 condition = condition && checkClosedPopup();
// condition = condition && checkClosedWindows();
 condition = condition && checkClosedMenu();
 //altre condizioni;
 return condition;
}

// verifica che tutti i popups siano chiusi
function checkClosedPopup() { return checkState($('pathPopup').down('1'), '0'); }

// verifica che tutte le finestre siano chiuse
function checkClosedWindows() { return checkState($('pathFinestre').down('1'), '0'); }

// verifica che i menu siano chiusi
function checkClosedMenu() {if(!Menu_Generale_Opened)return true; 
                            else return false;
}


/*--------------fine checkClosed------------------*/

/*codice compresso isUnder*/

function scorriAlbero(nodo){try{switch(nodo.getType()){case'panel':case'image':case'textbox':objArray.push(nodo);break;default:for(var i=0;i<nodo.getObjectCount();i++){var tipoObj=nodo.getObjectByNumber(i).getType();switch(tipoObj){case'frame':var nodoTmp=nodo.getObjectByNumber(i);for(var j=0;j<nodoTmp.getObjectCount();j++)scorriAlbero(nodoTmp.getObjectByNumber(j));break}}}}catch(e){api.addAction(''+e)}}function isUnder(obj,type){if(!obj.isVisible())return true;var toFind=null;switch(obj.getType()){case'button':toFind=obj.getParent();break;case'textbox':case'image':toFind=obj;break}if(toFind!=null);{for(var i=0;i<objArray.length;i++){if(objArray[i].isVisible()){if(objArray[i]!=toFind){if(findBack(objArray[i],obj,type))return true}else return false}}}return false}function findBack(obj,objTest,type){var btnContObjTest=objTest.up();if(type=="menu"){var xBtnContObjTest=btnContObjTest.getX();var yBtnContObjTest=btnContObjTest.getY();var wBtnContObjTest=btnContObjTest.getWidth();var hBtnContObjTest=btnContObjTest.getHeight();var xObj=obj.getX();var yObj=obj.getY();var wObj=obj.getWidth();var hObj=obj.getHeight();if(((xObj+wObj>=xBtnContObjTest)&&(xBtnContObjTest+wBtnContObjTest>=xObj))&&((yObj+hObj>=yBtnContObjTest)&&(yBtnContObjTest+hBtnContObjTest>=yObj))&&(wObj!=null&&hObj!=null)){return true}}else{var xObjTest=objTest.getX();var yObjTest=objTest.getY();var wObjTest=objTest.getWidth();var hObjTest=objTest.getHeight();if(obj.getType()!='textbox'){var xObj=obj.getX();var yObj=obj.getY();var wObj=obj.getWidth();var hObj=obj.getHeight();if(((xObj+wObj>=xObjTest)&&(xObjTest+wObjTest>=xObj))&&((yObj+hObj>=yObjTest)&&(yObjTest+hObjTest>=yObj))){return true}}for(var i=0;i<obj.getObjectCount();i++){var xObj=obj.getObjectByNumber(i).getX();var yObj=obj.getObjectByNumber(i).getY();var wObj=obj.getObjectByNumber(i).getWidth();var hObj=obj.getObjectByNumber(i).getHeight();if(((xObj+wObj>=xObjTest)&&(xObjTest+wObjTest>=xObj))&&((yObj+hObj>=yObjTest)&&(yObjTest+hObjTest>=yObj))){return true}}}return false}

/****************************************************************************************************************/

function disattiva_caps(){ try { if(java.awt.Toolkit.getDefaultToolkit().getLockingKeyState( java.awt.event.KeyEvent.VK_CAPS_LOCK)){java.awt.Toolkit.getDefaultToolkit().setLockingKeyState( java.awt.event.KeyEvent.VK_CAPS_LOCK,false)} }catch (e){}}
/**/
/*

---UTILIZZO---
textBox = [];
crea_array(root.down('1').down('valore'), 1.5, ',', '%', 3, 0, 'inf');
---------------------

parametri crea_array:
oggetto - è la path della textbox;
valore  - NUMERICO- è il valore di cui verra incrementato o decrementato il valore della textbox;
separatore - STRINGA - è il carattere di separazione delle cifre decimali;
unita_misura - STRINGA -  è la stringa che rappresenta l'unità di misura del valore della textbox;
decimali - NUMERICO - indica il numero di cifre decimali da visualizzare;
minimo - NUMERICO o 'inf' - indica il minimo oltre il quale nn si può scendere, con 'inf' non c'è limite;
massimo - NUMERICO o 'inf' - indica il numero massimo oltre il quale non si può salire, con 'inf' non c'è limite.

parametri cambia_valore:
segno - STRINGA - può avere i valori 'incrementa' (o '+')  e 'decrementa' (o '-');
oggetto - è la textbox;

per l'array textBox[]
0 - valore
1 - separatore
2 - unita_misura
3 - decimali
4 - valore_attuale: viene settato con il valore contenuto nella textBox all'avvio della sim o con 0 o con il minimo se specificato
5 - minimo
6 - massimo

*/
function crea_array(oggetto, valore, separatore, unita_misura, decimali, minimo, massimo){
	/***Ricavo la path dell'oggetto, l'id è la path senza apici*/
	id = printName(oggetto);
	re=/'/g;
	id=id.replace(re,"");
	/***Il primo valore attuale è il numero contenuto nella textbox all'avvio della sim o  altrimenti il minimo*/
	if(unita_misura!='')
	{
		eval('re=/'+ unita_misura + '/gi');
		valore_attuale=Number(oggetto.getText().replace(re,""));
	}else{
		valore_attuale=Number(oggetto.getText());
	}
	if (isNaN(valore_attuale))
	{
		if(minimo=='inf')
		{
			valore_attuale=0;
		}else{
			valore_attuale = minimo;
		}
	}
	textBox[id] = new Array( valore, separatore , unita_misura, decimali, valore_attuale, minimo, massimo);
}


function printName(element) {
	if (element.getName()=='root')
		return 'root';
	return printName(element.up())+".down('"+element.getName()+"')";
}

function cambia_valore(segno,oggetto) 
{
	contenuto=oggetto.getText();
	id = printName(oggetto);

	/***Tolgo gli apici per ricavale l'id*/
	re=/'/g;
	id=id.replace(re,"");
	
	/***Tolgo l'unita di misura e gli spazi vuoti*/
	if(textBox[id][2]!='')
	{	
		eval('re=/'+ textBox[id][2] + '/gi');
	}
	newstr=contenuto.replace(re,'');
	newstr=newstr.replace(' ','');

	/***Sostituisco il carattere di separazione con il . */
	newstr=newstr.replace(textBox[id][1],'.');

	risultato=new Number(newstr);

	/***Se il valore non è un numero o è una stringa vuota lo sostituisco con l'ultimo valore corretto*/
	if(isNaN(risultato) || newstr==''){
		risultato=textBox[id][4];
	}

	/***Eseguo l'operazione richiesta e l'arrotondamento*/
	arrotondamento= Math.pow(10,textBox[id][3]);
	risultato = risultato * arrotondamento;
	var valore = Number(textBox[id][0]) * arrotondamento;

	if (segno=='incrementa' || segno=='+')
	{
		risultato=risultato+valore;
	}
	if (segno=='decrementa' || segno=='-')
	{
		risultato=risultato-valore;
	}
	
	/*Se l'arrotondamento non deve essere fatto con il Math.rount (1.9=2) ma con il parseInt (1.9=1) scambiare le 2 righe seguenti*/
	risultato = Math.round(risultato);
	//risultato = parseInt(risultato);

	risultato = risultato / arrotondamento;

	/***Se il risultato è minore del minimo lo sostituisco con il minimo stesso*/
	if(textBox[id][5]!='inf' && risultato<textBox[id][5])
	{
		risultato=textBox[id][5];
	}

	/***Se il risultato è maggiore del massimo lo sostituisco con il massimo stesso*/
	if(textBox[id][6]!='inf' && risultato>textBox[id][6]){
		risultato=textBox[id][6];
	}

	/***Imposto il nuovo valore_attuale*/
	textBox[id][4]=risultato;

	/***Sistemo il formato del risultato*/
	risultato=risultato.toString();
	var zeri = 0
	/*
	//quest'if va sostituito all'if seguente il commento nel caso in cui i valori interi non debbano visualizzare i decimali
	if((risultato.indexOf('.')>0))
	{
		zeri = Number(textBox[id][3]) - (risultato.substring((risultato.indexOf('.')+1), risultato.length).length);
	}
	
	*/
	
	
	if(!(risultato.indexOf('.')>0))
	{
		if(textBox[id][3]>0)
			{
			zeri = Number(textBox[id][3]);
			risultato += '.';
		}
	}else{
		zeri = Number(textBox[id][3]) - (risultato.substring((risultato.indexOf('.')+1), risultato.length).length);
	}
	for(var i=0;i<zeri;i++)
	{
		risultato += '0';
	}
	risultato=risultato.replace('.',textBox[id][1]);

	/***Reimposto il testo della textbox*/
	oggetto.setText(risultato.toString()+' '+textBox[id][2]);
}

/**/

function uscita(frame){
		if(!$('pathEffettoFinale').down(frame).isVisible()){
			$('pathEffettoFinale').goTo(frame);
//			api.addAction('uscita_ok');
//			api.confirm();
			setTimeout('delayUscita()',300);
		}
}

function delayUscita(){
	api.addAction('_67218_');
	api.confirm();
}



































































