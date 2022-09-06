var codes;
/*--------------------gestione shortcut----------------*/
var ShortcutHandler=function(instanceName){var i,codesLength;this._evento=null;this._l10n=null;this._extension=null;this._shortcutCodes=[];this._shortcutData=[];this._multiShortcutData=[];this._instanceName=instanceName;this._waitForMultiple=[];codes=this.parseShortcutCodes('ctrl');codesLength=codes.length;for(i=0;i<codesLength;i+=1){this._waitForMultiple.push(codes[i])}};
ShortcutHandler.prototype={setEvent:function(evento){this._evento=evento},l10n:function(l10nFunction){this._l10n=l10nFunction},extend:function(extFunction){this._extension=extFunction},parseShortcutCodes:function(shortcut){shortcut=shortcut.toLowerCase();var codes=[],ascii='',tmpCodes,tmpArray,i,number,ctrlCode;if(this._extension!==null){tmpCodes=this._extension(shortcut);if(tmpCodes.length>0){return tmpCodes}}if(shortcut==='invio'){codes.push('0 10 0 0 0');return codes}if(shortcut==='alt'){codes.push('18 0 0 8 0');return codes}if(shortcut==='spazio'){codes.push('0 32 0 0 0');return codes}if(shortcut==='ctrl'){codes.push('17 0 2 0 0');return codes}if(shortcut==='shift'){codes.push('16 0 0 0 1');return codes}if(shortcut.length===1){ascii=shortcut.toLowerCase().charCodeAt(0);codes.push('0 '+ascii+' 0 0 0');codes.push('0 '+ascii+' 0 0 1');ascii=shortcut.toUpperCase().charCodeAt(0);codes.push('0 '+ascii+' 0 0 0');codes.push('0 '+ascii+' 0 0 1');if(this._l10n!==null){tmpArray=this._l10n(shortcut.toLowerCase());for(i=0;i<tmpArray.length;i+=1){codes.push(tmpArray[i])}}return codes}if(((shortcut.length===2)||(shortcut.length===3))&&(shortcut.match('f'))){ascii=shortcut.substring(1,shortcut.length);number=parseInt(ascii,10);number=number+111;codes.push(number+' 0 0 0 0');return codes}if(shortcut.match('alt-')){ascii=shortcut.toLowerCase().charCodeAt(4);codes.push('0 '+ascii+' 0 8 0');codes.push('0 '+ascii+' 0 8 1');ascii=shortcut.toUpperCase().charCodeAt(4);codes.push('0 '+ascii+' 0 8 0');codes.push('0 '+ascii+' 0 8 1');return codes}if(shortcut.match('shift-f')&&shortcut.length>7){ascii=shortcut.substring(7,shortcut.length);number=parseInt(ascii,10);number=number+111;codes.push(number+' 0 0 0 1');return codes}if(shortcut.match('shift-')){ascii=shortcut.toLowerCase().charCodeAt(6);codes.push('0 '+ascii+' 0 0 0');codes.push('0 '+ascii+' 0 0 1');ascii=shortcut.toUpperCase().charCodeAt(6);codes.push('0 '+ascii+' 0 0 0');codes.push('0 '+ascii+' 0 0 1');return codes}if(shortcut.match('ctrl-')){ctrlCode=parseInt(shortcut.toUpperCase().charCodeAt(5),10)-64;codes.push('0 '+ctrlCode+' 2 0 0');return codes}return codes},menuHandler:function(menu){if(getValue('menuCliccato')===1){overTendina(menu)}else{downTendina(menu)}},popupHandler:function(mov,x,y){popupMenuXY(mov,x,y)},actAsHandler:function(element,state){var command='',utility=printName(element);command=eval('element.data.a.'+state);eval(command.replace(/this/g,utility))},handle:function(type,condition,value,value1,value2){if(eval(condition)){this.resetMultiShortcutData();switch(type.toLowerCase()){case'menu':this.menuHandler(value);break;case'popup':this.popupHandler(value,value1,value2);break;case'actas':this.actAsHandler(value,value1||'click');break;case'custom':value();break}return true}return false},register:function(shortcut,type,condition,value,value1,value2){var index=null,i;if(typeof shortcut==="string"){this.add(shortcut,type,condition,value,value1,value2);return}for(i=0;i<shortcut.length;i+=1){this.add(shortcut[i],type,condition,value,value1,value2)}},add:function(shortcut,type,condition,value,value1,value2){var index=null,i,patt1,patt2,newIndex;for(i=0;i<this._shortcutData.length;i+=1){if(this._shortcutData[i].shortcut===shortcut){index=i}}if(index===null){if(shortcut.indexOf('>')>-1){patt1=/((([a-z0-9\-]+)>([a-z0-9\-]+))$)/;patt2=/>>/;if(!(patt1.test(shortcut)===true&&patt2.test(shortcut)!==true)){return}this.addMultiStepShortcut(shortcut,condition,type,value,value1,value2);return}else{codes=this.parseShortcutCodes(shortcut)}newIndex=this._shortcutData.length;for(i=0;i<codes.length;i+=1){this._shortcutCodes[codes[i]]=newIndex}index=newIndex;this._shortcutData[index]={};this._shortcutData[index].shortcut=shortcut;this._shortcutData[index].data=[]}this._shortcutData[index].data.push(new Shortcut(type,condition,value,value1,value2))},addMultiStepShortcut:function(shortcut,condition,type,value,value1,value2){var i,tmpCondition,tokens=shortcut.split('>'),nextStep,prevStep;for(i=0;i<tokens.length;i+=1){nextStep=i+1;prevStep=i-1;tmpCondition=condition;if(i>0){tmpCondition=condition+' && (typeof('+this._instanceName+'.getMultiShortcutData("'+tokens[prevStep]+'")!=="undefined")) && ('+this._instanceName+'.getMultiShortcutData("'+tokens[prevStep]+'")==='+i+')'}if(i===(tokens.length-1)){this.add(tokens[i],type,tmpCondition,value,value1,value2);return}eval("var tmpFunction = function() {                       "+this._instanceName+".setMultiShortcutData('"+tokens[i]+"', "+nextStep+"); };");this.add(tokens[i],'custom',tmpCondition,tmpFunction)}},setMultiShortcutData:function(index,value){this._multiShortcutData[index]=value},getMultiShortcutData:function(index,value){return this._multiShortcutData[index]},resetMultiShortcutData:function(){this._multiShortcutData=[]},run:function(){var instanceClass=null,index,i,cs;eval('instanceClass=typeof('+this._instanceName+')');if(instanceClass==="undefined"){alert('--> ATTENZIONE! Hai indicato un valore non corretto come parametro per il construttore dello ShortcutHandler! <--');return}if(this._shortcutData.length===0){return}index=this._shortcutCodes[this._evento];if(typeof index==="undefined"){if(!this._waitForMultiple.in_array(this._evento)){this.resetMultiShortcutData()}return}for(i=0;i<this._shortcutData[index].data.length;i+=1){cs=this._shortcutData[index].data[i];if(this.handle(cs.type,cs.condition,cs.value,cs.value1,cs.value2)){return}}},addWaitForMulti:function(waitCodes){if(typeof waitCodes==="string"){this.addWait(waitCodes);return}for(waitCode in waitCodes){this.addWait(waitCode)}},setWaitForMulti:function(waitCodes){this._waitForMultiple=[];this.addWaitForMulti(waitCodes)},addWait:function(waitCode){var i;codes=this.parseShortcutCodes(waitCode);for(i=0;i<codes.length;i+=1){this._waitForMultiple.push(codes[i])}}};

function charToKor(carattere){var codes=[];switch(carattere){case'a':codes.push('0 12609 0 0 0');break;case'b':codes.push('0 12640 0 0 0');break;case'c':codes.push('0 12618 0 0 0');break;case'd':codes.push('0 12615 0 0 0');break;case'e':codes.push('0 12599 0 0 0');break;case'f':codes.push('0 12601 0 0 0');break;case'g':codes.push('0 12622 0 0 0');break;case'h':codes.push('0 12631 0 0 0');break;case'i':codes.push('0 12625 0 0 0');break;case'j':codes.push('0 12627 0 0 0');break;case'k':codes.push('0 12623 0 0 0');break;case'l':codes.push('0 12643 0 0 0');break;case'm':codes.push('0 12641 0 0 0');break;case'n':codes.push('0 12636 0 0 0');break;case'o':codes.push('0 12624 0 0 0');break;case'p':codes.push('0 12628 0 0 0');break;case'q':codes.push('0 12610 0 0 0');break;case'r':codes.push('0 12593 0 0 0');break;case's':codes.push('0 12596 0 0 0');break;case't':codes.push('0 12613 0 0 0');break;case'u':codes.push('0 12629 0 0 0');break;case'v':codes.push('0 12621 0 0 0');break;case'w':codes.push('0 12616 0 0 0');break;case'x':codes.push('0 12620 0 0 0');break;case'y':codes.push('0 12635 0 0 0');break;case'z':codes.push('0 12619 0 0 0');break}return codes}

Array.prototype.in_array=function(element){var i;for(i=0;i<this.length;i+=1){if(element===this[i]){return true}}return false};
function printName(element){if(element.getName()==='root'){return'root'}return printName(element.up())+".down('"+element.getName()+"')"}
function Shortcut(type,condition,value,value1,value2){this.type=type;this.condition=condition;this.value=value;this.value1=value1;this.value2=value2}

function gestioneCtrlAlt(shortcut) {
	var ascii = '',
		codes = [];
    shortcut = shortcut.toLowerCase();
    
    if (shortcut.match('ctrl-alt-')) {
        ascii = shortcut.toLowerCase().charCodeAt(9);
        codes.push('0 ' + ascii + ' 2 8 0');
        return codes;
    }
    if (shortcut === 'start')		{ codes.push('524 0 0 0 0');return codes; }
    if (shortcut === 'esc')			{ codes.push('0 27 0 0 0');	return codes; }
    if (shortcut === 'tab')			{ codes.push('0 9 0 0 0');	return codes; }
    if (shortcut === 'shift-tab')	{ codes.push('0 9 0 0 1');	return codes; }
    if (shortcut === 'esc') 		{ codes.push('0 27 0 0 0'); return codes; }
    if (shortcut === 'shift-f10')	{ codes.push('121 0 0 0 1');return codes; }
	if (shortcut=='ctrl-page_up')	{ codes.push('33 0 2 0 0'); return codes; }
	if (shortcut=='ctrl-page_down'){ codes.push('34 0 2 0 0');	return codes; }
	if (shortcut=='ctrl-home') 		{ codes.push('36 0 2 0 0'); return codes; }
	if (shortcut=='ctrl-end')		{ codes.push('35 0 2 0 0'); return codes; }
	if (shortcut=='ctrl-f4')		{ codes.push('115 0 2 0 0'); return codes; }
	if (shortcut=='ctrl-invio')		{ codes.push('0 10 2 0 0'); return codes; }

    return codes;
} /*----------------fine gestione shortcut----------------*/



























































