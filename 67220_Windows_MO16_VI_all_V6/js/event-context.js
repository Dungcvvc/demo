/**
 * 
 */
function EventContext(pElementEvent){
	/**
	 * 
	 */
	this.ELEMENT_EVENT = pElementEvent;
};
/**
 * 
 */
 EventContext.prototype.executeElementEvent = function(pEvent){
	 let operation = pEvent.type;
	 try {	
		this.ELEMENT_EVENT[operation](pEvent);
	 } catch (ex){
		 console.log(operation.toUpperCase() + ' - ERROR:' + ex.message);
	 }
 };
/**
 * 
 */