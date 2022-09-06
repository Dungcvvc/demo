/**
 * 
 */
function ExtendedTextBoxListener() {
	/**
	 * 
	 */
	this.SHORT_KEY = GET_SHORT_KEY();
};
/**
 * 
 */
ExtendedTextBoxListener.prototype.keydown = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);
	let key = pEvent.which || pEvent.keyCode;
//  CTRL:disabilitato  -----   ALT:disabilitato  -----  SHIFT:abilitato  	
	if (!this.SHORT_KEY.isCtrlPressed(pEvent) && !this.SHORT_KEY.isAltPressed(pEvent) && this.SHORT_KEY.isShiftPressed(pEvent)){	
		if (key == this.SHORT_KEY.ENTER_KEY){
			customEvent.EXTENDED_EVENT = 'SHIFT-INVIO';
		}
		if (key == this.SHORT_KEY.F10){
			customEvent.EXTENDED_EVENT = 'SHIFT-F10';
		}	
		if (key == this.SHORT_KEY.F12){
			customEvent.EXTENDED_EVENT = 'SHIFT-F12';
		}		
		if (key == this.SHORT_KEY.TAB){
			customEvent.EXTENDED_EVENT = 'SHIFT-TAB';
		}
		if (key == this.SHORT_KEY.INS_KEY){
			customEvent.EXTENDED_EVENT = 'SHIFT-INS';
		}			
	}

//  CTRL:abilitato  -----   ALT:disabilitato  -----  SHIFT:disabilitato  			
	if (this.SHORT_KEY.isCtrlPressed(pEvent) && !this.SHORT_KEY.isAltPressed(pEvent) && !this.SHORT_KEY.isShiftPressed(pEvent)){
		if (key == this.SHORT_KEY.K_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-K';
		}	
		if (key == this.SHORT_KEY.UNO_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-1';
		}		
		if (key == this.SHORT_KEY.P_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-P';
		}
		if (key == this.SHORT_KEY.D_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-D';
		}	
		if (key == this.SHORT_KEY.I_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-I';
		}			
		if (key == this.SHORT_KEY.G_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-G';
		}			
		if (key == this.SHORT_KEY.H_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-H';
		}
		if (key == this.SHORT_KEY.S_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-S';
		}	
		if (key == this.SHORT_KEY.F_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-F';
		}	
		if (key == this.SHORT_KEY.B_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-B';
		}	
		if (key == this.SHORT_KEY.R_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-R';
		}	
		if (key == this.SHORT_KEY.F2){
			customEvent.EXTENDED_EVENT = 'CTRL-F2';
		}	
		if (key == this.SHORT_KEY.F12){
			customEvent.EXTENDED_EVENT = 'CTRL-F12';
		}			
		if (key == this.SHORT_KEY.T_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-T';
		}
		if (key == this.SHORT_KEY.W_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-W';
		}		
		if (key == this.SHORT_KEY.F4){
			customEvent.EXTENDED_EVENT = 'CTRL-F4';
		}				
		if (key == this.SHORT_KEY.PAGEUP_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-PAGEUP';
		}	
		if (key == this.SHORT_KEY.PAGEDOWN_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-PAGEDOWN';
		}		
		if (key == this.SHORT_KEY.L_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-L';
		}
		if (key == this.SHORT_KEY.M_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-M';
		}
		if (key == this.SHORT_KEY.Z_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-Z';
		}	
		if (key == this.SHORT_KEY.F6){
			customEvent.EXTENDED_EVENT = 'CTRL-F6';
		}	
		if (key == this.SHORT_KEY.MENO_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-MENO';
		}	
		if (key == this.SHORT_KEY.TRATTINO_MEDIO_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-TRATTINO_MEDIO';
		}	
		if (key == this.SHORT_KEY.ENTER_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-INVIO';
		}
		if (key == this.SHORT_KEY.V_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-V';
		}		
	}
	
//  CTRL:disabilitato  -----   ALT:abilitato  -----  SHIFT:abilitato  	
	if (!this.SHORT_KEY.isCtrlPressed(pEvent) && this.SHORT_KEY.isAltPressed(pEvent) && this.SHORT_KEY.isShiftPressed(pEvent)){	
		if (key == this.SHORT_KEY.N_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-N';
		}
		if (key == this.SHORT_KEY.F_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-F';
		}
		if (key == this.SHORT_KEY.D_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-D';
		}
		if (key == this.SHORT_KEY.P_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-P';
		}
		if (key == this.SHORT_KEY.F2){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-F2';
		}	
		
	}		
	
	
	
//  CTRL:disabilitato  -----   ALT:disabilitato  -----  SHIFT:disabilitato	
	if (!this.SHORT_KEY.isCtrlPressed(pEvent) && !this.SHORT_KEY.isAltPressed(pEvent) && !this.SHORT_KEY.isShiftPressed(pEvent)){
		if (key == this.SHORT_KEY.F1){
			customEvent.EXTENDED_EVENT = 'F1';
		}
		if (key == this.SHORT_KEY.F7){
			customEvent.EXTENDED_EVENT = 'F7';
		}		
		if (key == this.SHORT_KEY.ENTER_KEY){
			customEvent.EXTENDED_EVENT = 'ENTER_KEY';
		}	
		if (key == this.SHORT_KEY.BACKSPACE_KEY){
			customEvent.EXTENDED_EVENT = 'BACKSPACE';
		}
		if (key == this.SHORT_KEY.F12){
			customEvent.EXTENDED_EVENT = 'F12';
		}	
		if (key == this.SHORT_KEY.CANC_KEY){
			customEvent.EXTENDED_EVENT = 'CANC';
		}	
		if (key == this.SHORT_KEY.F5){
			customEvent.EXTENDED_EVENT = 'F5';
		}	
		if (key == this.SHORT_KEY.TAB){
			customEvent.EXTENDED_EVENT = 'TAB';
		}			
		
	}

//  CTRL:disabilitato  -----   ALT:abilitato  -----  SHIFT:disabilitato
	if (!this.SHORT_KEY.isCtrlPressed(pEvent) && this.SHORT_KEY.isAltPressed(pEvent) && !this.SHORT_KEY.isShiftPressed(pEvent)){
		if (key == this.SHORT_KEY.ALT_KEY){
			customEvent.EXTENDED_EVENT = 'ALT';
		}	
		if (key == this.SHORT_KEY.C_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-C';
		}		
		if (key == this.SHORT_KEY.F_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-F';
		}			
		if (key == this.SHORT_KEY.FRECCIA_DESTRA){
			customEvent.EXTENDED_EVENT = 'ALT-DESTRA';
		}	
		if (key == this.SHORT_KEY.FRECCIA_SINISTRA){
			customEvent.EXTENDED_EVENT = 'ALT-SINISTRA';
		}	
		if (key == this.SHORT_KEY.FRECCIA_SU){
			customEvent.EXTENDED_EVENT = 'ALT-SU';
		}				
		if (key == this.SHORT_KEY.F7){
			customEvent.EXTENDED_EVENT = 'ALT-F7';
		}	
		if (key == this.SHORT_KEY.UNO_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-1';
		}				
	}	
	
//  CTRL:abilitato  -----   ALT:disabilitato  -----  SHIFT:abilitato	
	if (this.SHORT_KEY.isCtrlPressed(pEvent) && !this.SHORT_KEY.isAltPressed(pEvent) && this.SHORT_KEY.isShiftPressed(pEvent)){
		if (key == this.SHORT_KEY.I_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-I';
		}	
		if (key == this.SHORT_KEY.G_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-G';
		}	
		if (key == this.SHORT_KEY.H_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-H';
		}		
		if (key == this.SHORT_KEY.P_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-P';
		}		
		if (key == this.SHORT_KEY.F_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-F';
		}		
		if (key == this.SHORT_KEY.F12){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-F12';
		}	
		if (key == this.SHORT_KEY.M_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-M';
		}			
	}	
	
	

	this.keyPressed(pEvent);
	keyboardProxy.keydown(customEvent);
 };
 
 
 			
/**
 * 
 */
 ExtendedTextBoxListener.prototype.keyup = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);
	keyboardProxy.keyup(customEvent);
 };
/**
 * 
 */
 ExtendedTextBoxListener.prototype.keypress = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);	
	keyboardProxy.keypress(customEvent);
 };
/**
 * 
 */
 ExtendedTextBoxListener.prototype.keyPressed = function(pEvent){ 
	//
	let TEXTBOX_KEY_CONTROLLER = GET_TEXTBOX_KEY_CONTROLLER();
	let currentExtendedTextBox = TEXTBOX_KEY_CONTROLLER.getExtendedTextBox(pEvent.currentTarget.activeElement);
	if (this.SHORT_KEY.isCtrlPressed(pEvent)){
		this.ctrlKeyPressed(pEvent, currentExtendedTextBox);
	} else if (this.SHORT_KEY.isAltPressed(pEvent)){
		
	} else {
		this.generalKeyPressed(pEvent, currentExtendedTextBox);
	}
	//
 }; 
/**
 * 
 */
 ExtendedTextBoxListener.prototype.ctrlKeyPressed = function(pEvent, pEextendedTextBox) {
	let KEY = pEvent.which || pEvent.keyCode;
	if (KEY == this.SHORT_KEY.V_KEY) {
        console.log("Ctrl + V Pressed !");			
		if (pEextendedTextBox.CTRL_V_PRESSED == null || pEextendedTextBox.CTRL_V_PRESSED == undefined){
			
		} else if (pEextendedTextBox.CTRL_V_PRESSED == false){
			pEvent.preventDefault();
		} else if (pEextendedTextBox.CTRL_V_PRESSED != false && pEextendedTextBox.CTRL_V_PRESSED != null && pEextendedTextBox.CTRL_V_PRESSED != undefined){
			pEvent.preventDefault();
			eval(pEextendedTextBox.CTRL_V_PRESSED);
		}
    } else if (KEY == this.SHORT_KEY.C_KEY) {
        console.log("Ctrl + C Pressed !");			
		if (pEextendedTextBox.CTRL_C_PRESSED == null || pEextendedTextBox.CTRL_C_PRESSED == undefined){
			
		} else if (pEextendedTextBox.CTRL_C_PRESSED == false){
			pEvent.preventDefault();
		} else if (pEextendedTextBox.CTRL_C_PRESSED != false && pEextendedTextBox.CTRL_C_PRESSED != null && pEextendedTextBox.CTRL_C_PRESSED != undefined){
			pEvent.preventDefault();
			eval(pEextendedTextBox.CTRL_C_PRESSED);
		}
    } else if (KEY == this.SHORT_KEY.A_KEY) {
        console.log("Ctrl + A Pressed !");			
		if (pEextendedTextBox.CTRL_A_PRESSED == null || pEextendedTextBox.CTRL_A_PRESSED == undefined){
			
		} else if (pEextendedTextBox.CTRL_A_PRESSED == false){
			pEvent.preventDefault();
		} else if (pEextendedTextBox.CTRL_A_PRESSED != false && pEextendedTextBox.CTRL_A_PRESSED != null && pEextendedTextBox.CTRL_A_PRESSED != undefined){
			pEvent.preventDefault();
			eval(pEextendedTextBox.CTRL_A_PRESSED);
		}
    }
 };
/**
 * 
 */
ExtendedTextBoxListener.prototype.generalKeyPressed = function(pEvent, pEextendedTextBox) {
	let KEY = pEvent.which || pEvent.keyCode;
	switch (KEY){
		case this.SHORT_KEY.ENTER_KEY:
			if (pEextendedTextBox.ENTER_CONFIRM != null && pEextendedTextBox.ENTER_CONFIRM != undefined){
				pEvent.preventDefault();
				eval(pEextendedTextBox.ENTER_CONFIRM);
				break;
			}
			if (pEextendedTextBox.ENTER_DISABLED){
				pEvent.preventDefault();
				pEextendedTextBox.TEXTAREA_CHILD.value = pEextendedTextBox.TEXTAREA_CHILD.value.replace( /\r?\n/gi, '');
				break;
			}
			if (pEextendedTextBox.MIN_HEIGHT != null && pEextendedTextBox.MIN_HEIGHT != undefined){
				if (pEextendedTextBox.HEIGHT != null && pEextendedTextBox.HEIGHT < pEextendedTextBox.MIN_HEIGHT){
					pEextendedTextBox.TEXTAREA_CHILD.value = pEextendedTextBox.TEXTAREA_CHILD.value.replace( /\r?\n/gi, '');
				}
			}
			if (pEextendedTextBox.DISABLED_WITH_BLINKING){
				pEvent.preventDefault();
				pEextendedTextBox.TEXTAREA_CHILD.value = pEextendedTextBox.TEXTAREA_CHILD.value.replace( /\r?\n/gi, '');
				break;
			}
			break;
		default:
			if (pEextendedTextBox.DISABLED_WITH_BLINKING){
				pEvent.preventDefault();
				if (pEextendedTextBox.TEXTAREA_CHILD.value != null && pEextendedTextBox.TEXTAREA_CHILD.value != undefined && pEextendedTextBox.TEXTAREA_CHILD.value != ''){
					pEextendedTextBox.TEXTAREA_CHILD.value = pEextendedTextBox.TEXTAREA_CHILD.value.replace(pEextendedTextBox.TEXTAREA_CHILD.value, pEextendedTextBox.TEXTAREA_CHILD.value);
				} else {
					pEextendedTextBox.TEXTAREA_CHILD.value = pEextendedTextBox.TEXTAREA_CHILD.value.replace(pEextendedTextBox.TEXTAREA_CHILD.value, '');
				}
				break;
			}	
			if (pEextendedTextBox.ON_KEY_PRESSED != null){
				eval(pEextendedTextBox.ON_KEY_PRESSED);
				break;
			}
			if (pEextendedTextBox.MIN_WIDTH != null && pEextendedTextBox.MIN_WIDTH != undefined && pEextendedTextBox.MIN_WIDTH_MAX_CHAR != null && pEextendedTextBox.MIN_WIDTH_MAX_CHAR != undefined){
				if (pEextendedTextBox.WIDTH != null && pEextendedTextBox.WIDTH < pEextendedTextBox.MIN_WIDTH){
					pEextendedTextBox.TEXTAREA_CHILD.maxLength = pEextendedTextBox.MIN_WIDTH_MAX_CHAR;
				}
			}
			break;
	}
};