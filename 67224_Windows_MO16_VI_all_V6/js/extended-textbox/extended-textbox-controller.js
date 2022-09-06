/**
 * 
 */
function ExtendedTextBoxController() {
	/**
	 * 
	 */
	this.EXTENDED_TEXTBOX_LIST = null;
	/**
	 * 
	 */
	this.CURRENT_EXTENDED_TEXTBOX = null;
	/**
	 * 
	 */
	this.SHORT_KEY = GET_SHORT_KEY();
	/**
	 * 
	 */
	this.EXTENDED_TEXTBOX_BUILDER = GET_EXTENDED_TEXTBOX_BUILDER();
	/**
	 * 
	 */
};
/**
 * 
 */
ExtendedTextBoxController.prototype.initExtendedTextBox = function() {
	this.EXTENDED_TEXTBOX_LIST = new ExtendedTextBoxList();
	//
	this.EXTENDED_TEXTBOX_BUILDER.controlStaticPath();
	this.EXTENDED_TEXTBOX_LIST.LIST = this.EXTENDED_TEXTBOX_BUILDER.buildExtendedTextBox();
	this.EXTENDED_TEXTBOX_BUILDER.associateExtendedTextBoxMethod();
};
/**
 *
 */ 
 ExtendedTextBoxController.prototype.getExtendedTextBox = function(activeElement){
	 let found = false;
	 if (activeElement != null && activeElement != undefined){
		let i;
		for (i=0; i < this.EXTENDED_TEXTBOX_LIST.LIST.length; i++){
			if (activeElement.parentNode.id == this.EXTENDED_TEXTBOX_LIST.LIST[i].FOREIGN_OBJECT_PARENT.id){
				found = this.EXTENDED_TEXTBOX_LIST.LIST[i];
				break;
			}
		}
	 }
	 return found;
 };
/**
 *
 */ 
 ExtendedTextBoxController.prototype.setCurrentExtendedTextBox = function(pExtendedTextBox){
	 if (pExtendedTextBox != null && pExtendedTextBox != undefined){
		this.CURRENT_EXTENDED_TEXTBOX = pExtendedTextBox;
	 }
 };
/**
 * 
 */
var ExtendedTextBoxControllerManager = (function() {
	
	var instance = null;

	function createInstance() {
		var object = new ExtendedTextBoxController();
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
 function GET_TEXTBOX_KEY_CONTROLLER() {
	return ExtendedTextBoxControllerManager.getInstance();
 };
/**
 * 
 */