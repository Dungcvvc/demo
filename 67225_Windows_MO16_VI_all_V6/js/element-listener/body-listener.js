/**
 * 
 */
function BodyListener() {
	/**
	 * 
	 */
	this.SHORT_KEY = GET_SHORT_KEY();
};
/**
 * 
 */
BodyListener.prototype.keypress = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);
	keyboardProxy.keypress(customEvent);
};
/**
 * 
 */
 BodyListener.prototype.keydown = function(pEvent){
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
		if (key == this.SHORT_KEY.INS_KEY){
			customEvent.EXTENDED_EVENT = 'SHIFT-INS';
		}
		if (key == this.SHORT_KEY.F12){
			customEvent.EXTENDED_EVENT = 'SHIFT-F12';
		}	
		if (key == this.SHORT_KEY.CANC_KEY){
			customEvent.EXTENDED_EVENT = 'SHIFT-CANC';
		}
		if (key == this.SHORT_KEY.FRECCIA_SU){
			customEvent.EXTENDED_EVENT = 'SHIFT-SU';
		}
		if (key == this.SHORT_KEY.FRECCIA_GIU){
			customEvent.EXTENDED_EVENT = 'SHIFT-GIU';
		}	
		if (key == this.SHORT_KEY.TAB){
			customEvent.EXTENDED_EVENT = 'SHIFT-TAB';
		}	
		if (key == this.SHORT_KEY.FRECCIA_DESTRA){
			customEvent.EXTENDED_EVENT = 'SHIFT-DESTRA';
		}	
		if (key == this.SHORT_KEY.FRECCIA_SINISTRA){
			customEvent.EXTENDED_EVENT = 'SHIFT-SINISTRA';
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
		if (key == this.SHORT_KEY.C_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-C';
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
		if (key == this.SHORT_KEY.PIU_TASTIERINO_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-PIU_TASTIERINO';
		}
		if (key == this.SHORT_KEY.PIU_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-PIU';
		}	
		if (key == this.SHORT_KEY.ENTER_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-INVIO';
		}		
		if (key == this.SHORT_KEY.X_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-X';
		}
		if (key == this.SHORT_KEY.V_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-V';
		}			
		if (key == this.SHORT_KEY.O_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-O';
		}
		if (key == this.SHORT_KEY.U_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-U';
		}	
		if (key == this.SHORT_KEY.E_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-E';
		}
		if (key == this.SHORT_KEY.A_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-A';
		}	
		if (key == this.SHORT_KEY.TAB){
			customEvent.EXTENDED_EVENT = 'CTRL-TAB';
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
		if (key == this.SHORT_KEY.FRECCIA_DESTRA){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-DESTRA';
		}	
		if (key == this.SHORT_KEY.FRECCIA_SINISTRA){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-SINISTRA';
		}	
		if (key == this.SHORT_KEY.FRECCIA_SU){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-SU';
		}
		if (key == this.SHORT_KEY.FRECCIA_GIU){
			customEvent.EXTENDED_EVENT = 'ALT-SHIFT-GIU';
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
		if (key == this.SHORT_KEY.CANC_KEY){
			customEvent.EXTENDED_EVENT = 'CANC';
		}		
		if (key == this.SHORT_KEY.F12){
			customEvent.EXTENDED_EVENT = 'F12';
		}	
		if (key == this.SHORT_KEY.ESC_KEY){
			customEvent.EXTENDED_EVENT = 'ESC';
		}	
		if (key == this.SHORT_KEY.F5){
			customEvent.EXTENDED_EVENT = 'F5';
		}	
		if (key == this.SHORT_KEY.PUNTO_KEY){
			customEvent.EXTENDED_EVENT = 'PUNTO';
		}
		if (key == this.SHORT_KEY.O_KEY){
			customEvent.EXTENDED_EVENT = 'O';
		}
		if (key == this.SHORT_KEY.F2){
			customEvent.EXTENDED_EVENT = 'F2';
		}	
		if (key == this.SHORT_KEY.TAB){
			customEvent.EXTENDED_EVENT = 'TAB';
		}	
		if (key == this.SHORT_KEY.FRECCIA_DESTRA){
			customEvent.EXTENDED_EVENT = 'DESTRA';
		}	
		if (key == this.SHORT_KEY.FRECCIA_SINISTRA){
			customEvent.EXTENDED_EVENT = 'SINISTRA';
		}	
		if (key == this.SHORT_KEY.FRECCIA_SU){
			customEvent.EXTENDED_EVENT = 'SU';
		}
		if (key == this.SHORT_KEY.FRECCIA_GIU){
			customEvent.EXTENDED_EVENT = 'GIU';
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
		if (key == this.SHORT_KEY.I_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-I';
		}
		if (key == this.SHORT_KEY.P_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-P';
		}		
		if (key == this.SHORT_KEY.L_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-L';
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
		if (key == this.SHORT_KEY.D_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-D';
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
		if (key == this.SHORT_KEY.W_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-W';
		}	
		if (key == this.SHORT_KEY.S_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-S';
		}
		if (key == this.SHORT_KEY.T_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-T';
		}
		if (key == this.SHORT_KEY.TAB){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-TAB';
		}	
	}
//  CTRL:abilitato  -----   ALT:abilitato  -----  SHIFT:abilitato	
	if (this.SHORT_KEY.isCtrlPressed(pEvent) && this.SHORT_KEY.isAltPressed(pEvent) && this.SHORT_KEY.isShiftPressed(pEvent)){
		if (key == this.SHORT_KEY.S_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-CTRL-SHIFT-S';
		}		
		if (key == this.SHORT_KEY.G_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-ALT-G';
		}			
	}	
	keyboardProxy.keydown(customEvent);
 };
/**
 * 
 */
 BodyListener.prototype.keyup = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);
	let key = pEvent.which || pEvent.keyCode;
	
//  CTRL:disabilitato  -----   ALT:abilitato  -----  SHIFT:disabilitato	
	if (!this.SHORT_KEY.isCtrlPressed(pEvent) && this.SHORT_KEY.isAltPressed(pEvent) && !this.SHORT_KEY.isShiftPressed(pEvent)){	
		if (key == this.SHORT_KEY.STAMP_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-STAMP';
		}
		if (key == this.SHORT_KEY.X_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-X';
		}	
		if (key == this.SHORT_KEY.S_KEY){
			customEvent.EXTENDED_EVENT = 'ALT-S';
		}	
	} 
	
//  CTRL:abilitato  -----   ALT:disabilitato  -----  SHIFT:disabilitato	
	if (this.SHORT_KEY.isCtrlPressed(pEvent) && !this.SHORT_KEY.isAltPressed(pEvent) && !this.SHORT_KEY.isShiftPressed(pEvent)){		
		if (key == this.SHORT_KEY.F6){
			customEvent.EXTENDED_EVENT = 'CTRL-F6';
		}
		if (key == this.SHORT_KEY.P){
			customEvent.EXTENDED_EVENT = 'CTRL-P';
		}
		if (key == this.SHORT_KEY.F2){
			customEvent.EXTENDED_EVENT = 'CTRL-F2';
		}
		if (key == this.SHORT_KEY.X_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-X';
		}
		if (key == this.SHORT_KEY.F10_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-F10';
		}

	}
	
//  CTRL:abilitato  -----   ALT:abilitato  -----  SHIFT:disabilitato	
	if (this.SHORT_KEY.isCtrlPressed(pEvent) && this.SHORT_KEY.isAltPressed(pEvent) && !this.SHORT_KEY.isShiftPressed(pEvent)){		
		if (key == this.SHORT_KEY.C_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-ALT-C';
		}
		if (key == this.SHORT_KEY.G_KEY){
			customEvent.EXTENDED_EVENT = 'CTRL-ALT-G';
		}
	}
	
//  CTRL:abilitato  -----   ALT:disabilitato  -----  SHIFT:abilitato	
	if (this.SHORT_KEY.isCtrlPressed(pEvent) && !this.SHORT_KEY.isAltPressed(pEvent) && this.SHORT_KEY.isShiftPressed(pEvent)){		
		if (key == this.SHORT_KEY.F12){
			customEvent.EXTENDED_EVENT = 'CTRL-SHIFT-F12';
		}
	}	
	
//  CTRL:disabilitato  -----   ALT:disabilitato  -----  SHIFT:disabilitato	
	if (!this.SHORT_KEY.isCtrlPressed(pEvent) && !this.SHORT_KEY.isAltPressed(pEvent) && !this.SHORT_KEY.isShiftPressed(pEvent)){			
		if (key == this.SHORT_KEY.ESC_KEY){
			customEvent.EXTENDED_EVENT = 'ESC_KEY';
		}	
		if (key == this.SHORT_KEY.ENTER_KEY){
			customEvent.EXTENDED_EVENT = 'ENTER_KEY';
	    }
	}
	keyboardProxy.keyup(customEvent);
 };
/**
 * 
 */
