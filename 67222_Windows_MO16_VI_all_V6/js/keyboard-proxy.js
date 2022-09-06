/**
 * 
 */
function KeyboardProxy(pTarget, pEvent) {
	/**
	 * 
	 */
	this.TARGET = pTarget;
	/**
	 * 
	 */
	this.EVENT = pEvent;
};
/**
 * 
 */
 KeyboardProxy.prototype.keypress = function(pEvent){
	if (this.TARGET instanceof BodyListener){
		console.log('BODY KEY PRESS');
	} else if (this.TARGET instanceof ExtendedTextBoxListener){
		console.log('EXTENDED TEXTBOX KEY PRESS');		
	}
 };
/**
 * 
 */
 KeyboardProxy.prototype.keydown = function(pEvent){
	let strShortcut = pEvent.EXTENDED_EVENT;
	if (this.TARGET instanceof BodyListener){				
		this.shortcutManagerDown(strShortcut, pEvent);							
	} else if (this.TARGET instanceof ExtendedTextBoxListener){
		this.shortcutManagerDownExtendedTextBoxListener(strShortcut, pEvent);			
	}
 };
/**
 * 
 */
 KeyboardProxy.prototype.keyup = function(pEvent){
	let strShortcut = pEvent.EXTENDED_EVENT;	 
	if (this.TARGET instanceof BodyListener){	
		this.shortcutManagerUp(strShortcut, pEvent);		
	} else if (this.TARGET instanceof ExtendedTextBoxListener){
		console.log('EXTENDED TEXTBOX KEY UP');		
	}
 };
/**
 * 
 */
KeyboardProxy.prototype.shortcutManagerDown = function(strShortcut, pEvent){
		//funzione che gestisce i vari shortcut richiamati in keydown
		console.log('BODY KEY DOWN ');	
			
		switch(strShortcut) {
			case 'ENTER_KEY':
				this.enterEvent();
				break;				
			case 'CTRL-D':
				//pEvent.SOURCE_EVENT.preventDefault();
				
				break;
			case 'SHIFT-F10':
				this.shiftF10Event(pEvent);				
								
				break;
			case 'ALT-DESTRA':
				this.avantiEvent(pEvent);				
								
				break;					
			case 'ALT-SINISTRA':
				this.dietroEvent(pEvent);				
								
				break;	
			case 'ALT-SU':
				this.levelUpEvent(pEvent);				
								
				break;				
			case 'BACKSPACE':
				this.backSpaceEvent(pEvent);				
								
				break;				
			case 'TAB':
				this.tabEvent(pEvent);
				break;

			case 'SHIFT-TAB':
				this.shiftTabEvent(pEvent);
				break;											
		}
};
/**
 * 
 */
KeyboardProxy.prototype.shortcutManagerDownExtendedTextBoxListener = function(strShortcut, pEvent){
	//funzione che gestisce i vari shortcut richiamati in keydown di ExtendedTextBoxListener
	console.log('ExtendedTextBoxListener KEY DOWN ');	
		
	switch(strShortcut) {		
		case 'BACKSPACE':
//			this.backSpaceEvent(pEvent);				
							
			break;				
		case 'CANC':
//			this.cancEvent(pEvent);				
							
			break;					
		case 'TAB':
			this.tabEventTextbox(pEvent);
			break;
		case 'SHIFT-TAB':
			this.shiftTabEventTextbox(pEvent);
			break;	
		case 'CTRL-V':
		case 'SHIFT-INS':
			pEvent.SOURCE_EVENT.preventDefault();
			break;
					
	}
};
/**
* 
*/
KeyboardProxy.prototype.shortcutManagerUp = function(strShortcut, pEvent){
		//funzione che gestisce i vari shortcut richiamati in keyup
		console.log('BODY KEY UP ');		
		switch(strShortcut) {
			case 'ALT-STAMP':
			
				break;	
			case 'ALT':
				this.altEvent();				
								
				break;					
				
		}
};	  


 
KeyboardProxy.prototype.enterEvent = function(){
	 //funzione (o corpo della funzione) da richiamare alla pressione dell'invio
	 if(!isUnder($('inserisciTabella').model.path.down('1').down('inserisciTabella').down('ok'))){
	 	$('inserisciTabella').confirm();
	 }
};	 
/**
 * 
*/
KeyboardProxy.prototype.shiftF10Event = function(pEvent){
	 pEvent.SOURCE_EVENT.preventDefault();
	 console.log('BODY KEY SHIFT-F10');
//	 if(!isUnder(application.barre.down('1').down('titolo').down('icona'))){
//		application.openPopupShiftf10();
//	 }	 
};
/**
 * 
*/
KeyboardProxy.prototype.avantiEvent = function(pEvent){
	 console.log('BODY KEY ALT-DESTRA');
	 pEvent.SOURCE_EVENT.preventDefault();
//	 if(checkClosed() && pathPannelloControllo.down('1').isVisible()){
//		avantiPannello();
//	 }	 
};
/**
* 
*/
KeyboardProxy.prototype.dietroEvent = function(pEvent){
	 console.log('BODY KEY ALT-SINISTRA');
	 pEvent.SOURCE_EVENT.preventDefault();
//	 if(checkClosed() && pathPannelloControllo.down('1').isVisible()){
//		indietroPannello();
//	 }	 
};
/**
* 
*/
KeyboardProxy.prototype.levelUpEvent = function(pEvent){
	 console.log('BODY KEY ALT-SU');
	 pEvent.SOURCE_EVENT.preventDefault();
//	 if(checkClosed() && !$('pathScheletri').down('1').down('word').down('1').isVisible()){
//			levelUp();
//		 }	
};
/**
* 
*/
KeyboardProxy.prototype.backSpaceEvent = function(pEvent){
	 console.log('BODY KEY BACKSPACE');
	 pEvent.SOURCE_EVENT.preventDefault();
//	 if(checkClosed() && pathPannelloControllo.down('1').isVisible()){
//		indietroPannello();
//	 }	 
};
/**
* 
*/
KeyboardProxy.prototype.altEvent = function(){
	$('currentFocus', null);
	instance.disattivaCaselle();
	instance.closeDropdown();
	instance.closePopups();
};
/**
* 
*/

KeyboardProxy.prototype.tabEvent = function(pEvent){
	 console.log('BODY KEY TAB');
	 pEvent.SOURCE_EVENT.preventDefault();
	// if(condizione){
	//	 tab.tabTextBox('tab');
	// }
	 
};
/**
* 
*/
KeyboardProxy.prototype.shiftTabEvent = function(pEvent){
	 console.log('BODY KEY SHIFT-TAB');
	 pEvent.SOURCE_EVENT.preventDefault();
	// if(condizione){
	//	tab.tabTextBox('shift-tab'); 
	// }
};
/**
* 
*/
KeyboardProxy.prototype.tabEventTextbox = function(pEvent){
	 console.log('BODY KEY TAB');
	 pEvent.SOURCE_EVENT.preventDefault();
	 if(!isUnder($('inserisciTabella').get('path').down('1').down('inserisciTabella').down('x'))){
		tab.tabObject('tab');
	 }
	 
};
/**
* 
*/
KeyboardProxy.prototype.shiftTabEventTextbox = function(pEvent){
	 console.log('BODY KEY SHIFT-TAB');
	 pEvent.SOURCE_EVENT.preventDefault();
	 if(!isUnder($('inserisciTabella').get('path').down('1').down('inserisciTabella').down('x'))){
		tab.tabObject('shift-tab');
	 }
};
/**
* 
*/