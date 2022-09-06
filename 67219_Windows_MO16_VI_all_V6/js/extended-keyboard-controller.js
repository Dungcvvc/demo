/**
 * 
 */
function ExtendedKeyboardController(pEvent) {
	/**
	 * 
	 */
	this.EVENT = pEvent;
};
/**
 * 
 */
ExtendedKeyboardController.prototype.switchKeyEventContext = function(pEvent){
	//
	let eventContext = null;
	this.EVENT = pEvent;
	//
	switch (this.EVENT.currentTarget.activeElement.localName){
		case 'textarea':
			let TEXTBOX_KEY_CONTROLLER = GET_TEXTBOX_KEY_CONTROLLER();
			let currentExtendedTextBox = TEXTBOX_KEY_CONTROLLER.getExtendedTextBox(pEvent.currentTarget.activeElement);
			if (!currentExtendedTextBox){
				eventContext = new EventContext(new TextBoxListener());
			} else {
				TEXTBOX_KEY_CONTROLLER.setCurrentExtendedTextBox(currentExtendedTextBox);
				eventContext = new EventContext(new ExtendedTextBoxListener());
			}
			break;
		case 'body':
			eventContext = new EventContext(new BodyListener());
			break;
		default:
			eventContext = new EventContext(new BodyListener());
			break;
	}
	if (eventContext != null){
		eventContext.executeElementEvent(this.EVENT);
	}
 };
/**
 * 
 */
var ExtendedKeyboardControllerManager = (function() {
	
	var instance = null;

	function createInstance() {
		var object = new ExtendedKeyboardController();
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
 function GET_EXTENDED_KEYBOARD_CONTROLLER() {
	return ExtendedKeyboardControllerManager.getInstance();
 };
/**
 * 
 */