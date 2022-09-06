/**
 * 
 * ExtendedTextBox è in relazione con l'oggetto TextBox e l' oggetto html TextArea
 * NB: NON E' UNA VERA E PROPRIA ESTENSIONE
 *
 *
 */
function ExtendedTextBox(data) {
	/**
	 * 
	 */
	this.FOREIGN_OBJECT_PARENT = document.getElementById(data.ID);
	/**
	 * 
	 */
	this.TEXTAREA_CHILD = this.getTextArea();
	/**
	 *
	 */
	this.SOURCE_TEXTBOX = data.SOURCE_TEXTBOX;
	/**
	 *
	 */
	this.MIN_HEIGHT = data.MIN_HEIGHT;
	/**
	 * 
	 */
	this.MIN_WIDTH = data.MIN_WIDTH;
	/**
	 * 
	 */
	this.MIN_WIDTH_MAX_CHAR = data.MIN_WIDTH_MAX_CHAR;
	/**
	 * 
	 */
	this.HEIGHT = this.TEXTAREA_CHILD.style.height;
	/**
	 * 
	 */
	this.NEW_HEIGHT = this.setNewHeight(data.NEW_HEIGHT);
	/**
	 * 
	 */
	this.NEW_WIDTH = this.setNewWidth(data.NEW_WIDTH);
	/**
	 * 
	 */
	this.WIDTH = this.TEXTAREA_CHILD.style.width;
	/**
	 * 
	 */
	this.TEXT_VALUE = this.setTextValue(data.TEXT_VALUE);
	/**
	 * 
	 */
	this.DISABLED = this.setDisabled(data.DISABLED);
	/**
	 * 
	 */
	this.DISABLED_WITH_BLINKING = data.DISABLED_WITH_BLINKING;
	/**
	 * 
	 */
	this.ACTIVE_ON_LOAD = this.setActive(data.ACTIVE_ON_LOAD);
	/**
	 * 
	 */
	this.ENTER_DISABLED = data.ENTER_DISABLED;
	/**
	 * 
	 */
	this.MAX_CHAR = this.setMaxChar(data.MAX_CHAR);
	/**
	 * 
	 */
	this.OUTLINE = this.setOutline(data.OUTLINE);
	/**
	 * 
	 */
	this.BORDER = this.setBorder(data.BORDER);
	/**
	 * 
	 */
	this.MARGIN = this.setMargin(data.MARGIN);
	/**
	 * 
	 */
	this.CURSOR = this.setCursor(data.CURSOR);
	/**
	 * 
	 */
	this.TEXT_COLOR = this.setTextColor(data.TEXT_COLOR);
	/**
	 * 
	 */
	this.DISPLAY = this.setDisplay(data.DISPLAY);
	/**
	 *
	 */
	this.PLACEHOLDER = this.setPlaceholder(data.PLACEHOLDER);
	/**
	 *
	 */
	this.OPACITY = this.setOpacity(data.OPACITY);
	/**
	 *
	 */
	this.CLICK = this.setOnClickFunction(data.CLICK);
	/**
	 *
	 */
	this.REMOVE_ATTRIBUTE = this.removeAttribute(data.REMOVE_ATTRIBUTE);
	/**
	 *
	 */
	this.RIGHT_CLICK = this.setOnRightClickFunction(data.RIGHT_CLICK);
	/**
	 *
	 */
	this.DOUBLE_CLICK = this.setOnDoubleClickFunction(data.DOUBLE_CLICK);
	/**
	 *
	 */
	this.FONT_SIZE = this.setFontSize(data.FONT_SIZE);
	/**
	 *
	 */
	this.BACKGROUND_COLOR = this.setBackgroundColor(data.BACKGROUND_COLOR);
	/**
	 *
	 */
	this.ENTER_CONFIRM = data.ENTER_CONFIRM;
	/**
	 *
	 */
	this.ON_KEY_PRESSED = data.ON_KEY_PRESSED;
	/**
	 *
	 */
	this.CTRL_V_PRESSED = data.CTRL_V_PRESSED;
	/**
	 *
	 */
	this.CTRL_C_PRESSED = data.CTRL_C_PRESSED;
	/**
	 *
	 */
	this.CTRL_A_PRESSED = data.CTRL_A_PRESSED;
	/**
	 *
	 */
	this.OVERFLOW = this.setOverflow(data.OVERFLOW);
	/**
	 *
	 */
	this.WHITE_SPACE = this.setWhiteSpace(data.WHITE_SPACE);
	/**
	 * 
	 */
	this.VISIBILITY = this.setVisibility(data.VISIBILITY);
	/**
	 * 
	 */
	this.PARENT_VISIBILITY = this.setParentVisibility(data.PARENT_VISIBILITY);
	/**
	 * 
	 */
	this.TA_ATTRIBUTE = this.setTaAttribute(data.TA_ATTRIBUTE);
	/**
	 * 
	 */
	this.FOCUS_OUT = this.setOnFocusOut(data.FOCUS_OUT);
	/**
	 * 
	 */
	this.NEW_POSITION = this.setNewPosition(data.NEW_POSITION);
	/**
	 * 
	 */	 	
};
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'getTextArea', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function() {
		let i;
		let returnValue = null;
		let nChild = this.FOREIGN_OBJECT_PARENT.childNodes;
		if (nChild.length > 0){
			for (i = 0; i < nChild.length; i++){
				if (nChild[i].localName === 'textarea'){
					returnValue = TEXTAREA_CHILD = nChild[i];
					break;
				}
			}
		}
		return returnValue;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setTextValue', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pText){
		if (pText != null && pText != undefined && pText != ''){
			this.TEXTAREA_CHILD.value = pText;
		}
		return pText;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setDisabled', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pDisabled){
		if (pDisabled != null && pDisabled != undefined && pDisabled != ''){
			this.TEXTAREA_CHILD.disabled = pDisabled;
		}
		return pDisabled;
	}
});
/**
 * 
 */

Object.defineProperty(ExtendedTextBox.prototype, 'setActive', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pActiveOnLoad){
		if (pActiveOnLoad != null && pActiveOnLoad != undefined && pActiveOnLoad != ''){
			if (pActiveOnLoad){
				this.TEXTAREA_CHILD.autofocus = true;
			}
		}
		return pActiveOnLoad;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setNewHeight', {
	enumerable : false,
	configurable : true,
	writable : true,
	value: function(pHeight){
		if (pHeight != null && pHeight != undefined && pHeight != ''){
			this.TEXTAREA_CHILD.style.height = pHeight;
			this.HEIGHT = pHeight;
		}
		return pHeight;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setNewWidth', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pWidth){
		if (pWidth != null && pWidth != undefined && pWidth != ''){
			this.TEXTAREA_CHILD.style.width = pWidth;
			this.WIDTH = pWidth;
		}
		return pWidth;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setMaxChar', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pMChar){
		if (pMChar != null && pMChar != undefined && pMChar != ''){
			this.TEXTAREA_CHILD.maxLength = pMChar;
			this.MAX_CHAR = pMChar;
		}
		return pMChar;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setOutline', {
	enumerable : false,
	configurable : true,
	writable : true,
	value: function(pOutline){
		if (pOutline != null && pOutline != undefined && pOutline != ''){
			this.TEXTAREA_CHILD.style.outline = pOutline;
			this.OUTLINE = pOutline;
		}
		return pOutline;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setBorder', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pBorder){
		if (pBorder != null && pBorder != undefined && pBorder != ''){
			this.TEXTAREA_CHILD.style.border = pBorder;
			this.BORDER = pBorder;
		}
		return pBorder;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setMargin', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pMargin){
		if (pMargin != null && pMargin != undefined && pMargin != ''){
			this.TEXTAREA_CHILD.style.margin = pMargin;
			this.MARGIN = pMargin;
		}
		return pMargin;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setCursor', {
	enumerable : false,
	configurable : true,
	writable : true,
	value: function(pCursor){
		if (pCursor != null && pCursor != undefined && pCursor != ''){
			this.TEXTAREA_CHILD.style.margin = pCursor;
			this.MARGIN = pCursor;
		}
		return pCursor;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setTextColor', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pColor){
		if (pColor != null && pColor != undefined && pColor != ''){
			this.TEXTAREA_CHILD.style.color = pColor;
			this.MARGIN = pColor;
		}
		return pColor;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setDisplay', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pDisplay) {
		if (pDisplay != null && pDisplay != undefined && pDisplay != ''){
			this.TEXTAREA_CHILD.style.display = pDisplay;
			this.DISPLAY = pDisplay;
		}
		return pDisplay;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setPlaceholder', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pPlaceholder){
		if (pPlaceholder != null && pPlaceholder != undefined && pPlaceholder != ''){
			this.TEXTAREA_CHILD.setAttribute('placeholder', pPlaceholder);
			this.PLACEHOLDER = pPlaceholder;
		}
		return pPlaceholder;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setOpacity', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pOpacity){
		if (pOpacity != null && pOpacity != undefined && pOpacity != ''){
			this.TEXTAREA_CHILD.style.opacity = pOpacity;
			this.OPACITY = pOpacity;
		}
		return pOpacity;
	}
});
/**
 * 
 */
Object.defineProperty(ExtendedTextBox.prototype, 'setOnClickFunction', {
	enumerable : false,
	configurable : true,
	writable : true,
	value: function(pClickFunction){
		if (pClickFunction != null && pClickFunction != undefined && pClickFunction != ''){
			this.TEXTAREA_CHILD.setAttribute('onclick', pClickFunction);
			this.CLICK = pClickFunction;
		}
		return pClickFunction;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'removeAttribute', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pAttribute){
		if (pAttribute != null && pAttribute != undefined && pAttribute != ''){
			let i;
			if (pAttribute.length > 0){
				for (i=0; i < pAttribute.length; i++){
					this.TEXTAREA_CHILD.removeAttribute(pAttribute[i]);
				}
			}
		}
		return pAttribute;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setOnRightClickFunction', {
	enumerable : false,
	configurable : true,
	writable : true,
	value: function(pRightClickFunction){
		if (pRightClickFunction != null && pRightClickFunction != undefined && pRightClickFunction != ''){
			this.TEXTAREA_CHILD.setAttribute('oncontextmenu', pRightClickFunction);		
			this.RIGHT_CLICK = pRightClickFunction;
		}
		return pRightClickFunction;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setOnDoubleClickFunction', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pDoubleClickFunction){
		if (pDoubleClickFunction != null && pDoubleClickFunction != undefined && pDoubleClickFunction != ''){
			this.TEXTAREA_CHILD.setAttribute('ondblclick', pDoubleClickFunction);		
			this.DOUBLE_CLICK = pDoubleClickFunction;
		}
		return pDoubleClickFunction;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setFontSize', {
	enumerable : false,
	configurable : true,
	writable : true,
	value: function(pFontSize){
		if (pFontSize != null && pFontSize != undefined && pFontSize != ''){
			this.TEXTAREA_CHILD.style.fontSize = pFontSize;		
			this.FONT_SIZE = pFontSize;
		}
		return pFontSize;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setBackgroundColor', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pBackgroundColor){
		if (pBackgroundColor != null && pBackgroundColor != undefined && pBackgroundColor != ''){
			this.TEXTAREA_CHILD.style.backgroundColor  = pBackgroundColor;		
			this.BACKGROUND_COLOR = pBackgroundColor;
		}
		return pBackgroundColor;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setOverflow', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pOverflow){
		if (pOverflow != null && pOverflow != undefined && pOverflow != ''){
			this.TEXTAREA_CHILD.style.overflow  = pOverflow;		
			this.OVERFLOW = pOverflow;
		}
		return pOverflow;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setWhiteSpace', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pWhiteSpace){
		if (pWhiteSpace != null && pWhiteSpace != undefined && pWhiteSpace != ''){
			this.TEXTAREA_CHILD.style.whiteSpace  = pWhiteSpace;		
			this.WHITE_SPACE = pWhiteSpace;
		}
		return pWhiteSpace;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setVisibility', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pVisibility){
		if (pVisibility != null && pVisibility != undefined && pVisibility != ''){
			this.TEXTAREA_CHILD.visibility = pVisibility;
		}
		return pVisibility;
	}
});
/**
 * 
 */
  Object.defineProperty(ExtendedTextBox.prototype, 'setParentVisibility', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pParentVisibility){
		if (pParentVisibility != null && pParentVisibility != undefined && pParentVisibility != ''){			
			this.FOREIGN_OBJECT_PARENT.setAttribute('visibility', pParentVisibility);			
		}
		return pParentVisibility;
	}
});
/**
 * 
 */
 Object.defineProperty(ExtendedTextBox.prototype, 'setTaAttribute', {
	enumerable : false,
	configurable : true,
	writable : true,
	value : function(pAttribute){
		if (pAttribute != null && pAttribute != undefined && pAttribute != ''){
			let i;
			if (pAttribute.length > 0){
				for (i=0; i < pAttribute.length; i++){
					this.TEXTAREA_CHILD.setAttribute(pAttribute[i].TYPE, pAttribute[i].VALUE);
				}
			}
		}
		return pAttribute;
	}
});
/**
 * 
 */
   Object.defineProperty(ExtendedTextBox.prototype, 'setOnFocusOut', {
	enumerable : false,
	configurable : true,
	writable : true,
	value: function(pOnFocusOutFunction){
		if (pOnFocusOutFunction != null && pOnFocusOutFunction != undefined && pOnFocusOutFunction != ''){
			this.TEXTAREA_CHILD.setAttribute('onfocusout', pOnFocusOutFunction);		
			this.RIGHT_CLICK = pOnFocusOutFunction;
		}
		return pOnFocusOutFunction;
	}
});
/**
 * 
 */
  
   Object.defineProperty(ExtendedTextBox.prototype, 'setNewPosition', {
		enumerable : false,
		configurable : true,
		writable : true,
		value : function(pPosition){
			if (pPosition != null && pPosition != undefined && pPosition != ''){
				this.FOREIGN_OBJECT_PARENT.setAttribute('transform', pPosition);
				this.NEW_POSITION = pPosition;
			}
			return pPosition;
		}
	});
	/**
	 * 
	 */