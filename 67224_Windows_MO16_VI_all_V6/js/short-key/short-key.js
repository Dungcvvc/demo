/**
 * 
 */
function ShortKey() {
	/**
	 * 
	 */
	this.ENTER_KEY = 13;
	/**
	 * 
	 */
	this.CTRL_KEY = 17;
	/**
	 * 
	 */
	this.INS_KEY = 45;
	/**
	 * 
	 */
	this.V_KEY = 86;
	/**
	 * 
	 */
	this.C_KEY = 67;
	/**
	 * 
	 */
	this.A_KEY = 65;
	/**
	 * 
	 */
	this.ALT_KEY = 18;
	/**
	 * 
	 */
	this.STAMP_KEY = 44;
	/**
	 * 
	 */
	this.F1 = 112;
	/**
	 * 
	 */
	this.F6 = 117;
	/**
	 * 
	 */
	this.TAB = 9;
	/**
	 * 
	 */	 
	this.P_KEY = 80;
	/**
	 * 
	 */	 
	 this.F2 = 113;
	/**
	 * 
	 */	 
	 this.F3 = 114;
	/**
	 * 
	 */	 	 
	 this.F4 = 115;
	/**
	 * 
	 */	 
	 this.F5 = 116;
	/**
	 * 
	 */		 
	 this.F12 = 123;
	/**
	 * 
	 */	 
	 this.SHIFT_KEY = 16;
	/**
	 * 
	 */	 
	 this.X_KEY = 88;
	/**
	 * 
	 */
	 this.TRATTINO_MEDIO_KEY = 189;
	/**
	 * 
	 */
	 this.MENO_KEY = 109;
 	 /**
	 * 
	 */	 
	  this.CANC_KEY = 46;
	 /**
	  * 
	  */
	  this.BACKSPACE_KEY = 8;
	  /**
		* 
	  */	
	  this.K_KEY = 75;
	  /**
		* 
	  */	
	  this.UNO_KEY = 49;
	  /**
		* 
	  */
	 this.F10 = 121;
	/**
	 * 
	 */
	 this.F7 = 118;
	/**
	 * 
	 */	 
	  this.S_KEY = 83;
	  /**
		* 
	  */	  
	  this.ESC_KEY = 27;
	  /**
		* 
	  */
	  this.D_KEY = 68;
	  /**
		* 
	  */	
	  this.I_KEY = 73;
	  /**
		* 
	  */	
	  this.G_KEY = 71;
	  /**
		* 
	  */
	  this.H_KEY = 72;
	  /**
		* 
	  */	
	  this.S_KEY = 83;
	  /**
		* 
	  */
	  this.W_KEY = 87;
	  /**
		* 
	  */
	  this.FRECCIA_DESTRA = 39;
	  /**
		* 
	  */
	  this.FRECCIA_SINISTRA = 37;
	  /**
		* 
	  */
	  this.FRECCIA_SU = 38;
	  /**
		* 
	  */	
	  this.FRECCIA_GIU = 40;
	  /**
		* 
	  */	
	  this.F_KEY = 70;
	  /**
		* 
	  */	 
	  this.B_KEY = 66;
	  /**
		* 
	  */	
	  this.R_KEY = 82;
	  /**
		* 
	  */
	  this.N_KEY = 78;
	  /**
		* 
	  */
	  this.T_KEY = 84;
	  /**
		* 
	  */
	  this.PAGEUP_KEY = 33;
	  /**
		* 
	  */		  	  
	  this.PAGEDOWN_KEY = 34;
	  /**
		* 
	  */	
	  this.L_KEY = 76;
	  /**
		* 
	  */
	  this.M_KEY = 77;
	  /**
		* 
	  */	
	  this.Z_KEY = 90;
	  /**
		* 
	  */
	  this.PIU_TASTIERINO_KEY = 107;
	  /**
		* 
	  */
	  this.PIU_KEY = 187;
	  /**
		* 
	  */
	  this.PUNTO_KEY = 190;
	  /**
		* 
	  */
	  this.O_KEY = 79;
	  /**
		* 
	  */
	  this.U_KEY = 85;
	  /**
		* 
	  */	
	  this.E_KEY = 69;
	  /**
		* 
	  */	  
};
/**
 * 
 */
ShortKey.prototype.isAltPressed = function(pEvent) {
	//
	let KEY = pEvent.which || pEvent.keyCode;
	let ALT = pEvent.altKey ? pEvent.altKey : ((KEY === this.ALT_KEY) ? true : false);
	return ALT;
};
/**
 * 
 */
ShortKey.prototype.isCtrlPressed = function(pEvent) {
	//
	let KEY = pEvent.which || pEvent.keyCode;
	let CTRL = pEvent.ctrlKey ? pEvent.ctrlKey : ((KEY === this.CTRL_KEY) ? true : false);
	return CTRL;
};
ShortKey.prototype.isShiftPressed = function(pEvent) {
	 //
	 let KEY = pEvent.which || pEvent.keyCode;
	 let SHIFT = pEvent.shiftKey ? pEvent.shiftKey : ((KEY === this.SHIFT_KEY) ? true : false);
	 return SHIFT;
};

var ShortKeyManager = (function() {
	
	var instance = null;

	function createInstance() {
		var object = new ShortKey();
		return object;
	}

	return { getInstance : function() {
			if (instance === null) {
				instance = createInstance();
			}
			return instance;
		}
	};
	
})();
/**
 * 
 */
function GET_SHORT_KEY() {
	return ShortKeyManager.getInstance();
};
/**
 * 
 */