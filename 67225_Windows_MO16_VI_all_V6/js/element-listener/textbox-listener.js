/**
 * 
 */
function TextBoxListener() {
	/**
	 * 
	 */
	this.SHORT_KEY = GET_SHORT_KEY();
};
/**
 * 
 */
 TextBoxListener.prototype.keydown = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);
	keyboardProxy.keydown(customEvent);
 };
/**
 * 
 */
 TextBoxListener.prototype.keyup = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);
	keyboardProxy.keyup(customEvent);
 };
/**
 * 
 */
 TextBoxListener.prototype.keypress = function(pEvent){
	let customEvent = new ExtendedEvent(pEvent);
	let keyboardProxy = new KeyboardProxy(this, customEvent);
	keyboardProxy.keypress(customEvent);
 };
/**
 * 
 */