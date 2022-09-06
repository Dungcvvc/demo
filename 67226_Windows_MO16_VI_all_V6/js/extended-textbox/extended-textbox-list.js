/**
 * 
 */
function ExtendedTextBoxList(){
	/**
	 * 
	 */
	this.LIST = new Array();
	
};
/**
 * 
 */
ExtendedTextBoxList.prototype.insert = function() {
	let i;
	if (arguments.length > 0){
		for (i=0; i < arguments.length; i++){
			this.LIST.push(arguments[i]);
		}
	}
};