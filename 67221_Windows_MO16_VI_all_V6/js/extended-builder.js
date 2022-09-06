/**
 *
 */
function ExtendedTextBoxBuilder() {
	/**
	 * 
	 */
	this.TEXTBOX_LIST = initExtendedTextbox();
	/**
	 * 
	 */
	this.STATIC_TEXTBOX_LIST = initStaticExtendedTextbox();
};
/**
 *
 */
 ExtendedTextBoxBuilder.prototype.controlStaticPath = function(){
	 //
	 if (this.STATIC_TEXTBOX_LIST != null && this.STATIC_TEXTBOX_LIST != undefined && this.STATIC_TEXTBOX_LIST.length > 0){
		 let i, j;
		 for (i=0; i < this.STATIC_TEXTBOX_LIST.length; i++){
			 try {
				let textBoxObj = eval(this.STATIC_TEXTBOX_LIST[i].PATH);
				let property = {ID: textBoxObj.id, SOURCE_TEXTBOX: textBoxObj, DISABLED: true, NEW_HEIGHT: '19px', TEXT_COLOR: 'black', OPACITY: '1', FONT_SIZE: '11px'};
				if (textBoxObj != undefined && textBoxObj != null){
					if (Object.keys(this.STATIC_TEXTBOX_LIST[i]).length > 1){
						for (j=1; j < Object.keys(this.STATIC_TEXTBOX_LIST[i]).length; j++){
							try {
								let newProperty = Object.keys(this.STATIC_TEXTBOX_LIST[i])[j];
								property[newProperty] = this.STATIC_TEXTBOX_LIST[i][newProperty];
							} catch (ex){
								console.log("STATIC TEXTBOX PROPERTY[" + j + "] NOT PROCESSED - Error: " + ex.message);
								continue;
							}
						}
					}  
					this.TEXTBOX_LIST.push(property);
					console.log("STATIC TEXTBOX [" + i + "] PROCESSED: " + textBoxObj.id);
				}
			 } catch (ex){
				 console.log("STATIC TEXTBOX [" + i + "] NOT PROCESSED - Error: " + ex.message);
				 continue;
			 }
		 }
	 }
 };
/**
 * 
 */
 ExtendedTextBoxBuilder.prototype.replacePath = function(inputPath){
	let splittedInput = inputPath.split('/');
	let i;
	let tmpString;
	for (i=1; i < splittedInput.length; i++){
		if (i == 1){
			tmpString = splittedInput[i]; 
		} else {
			tmpString = tmpString + ".down('" + splittedInput[i] + "')";
		}
	}
	return tmpString;
 };
/**
 * 
 */
 ExtendedTextBoxBuilder.prototype.buildExtendedTextBox = function(){
	let returnTxtList = new Array();
	if (this.TEXTBOX_LIST != null && this.TEXTBOX_LIST != undefined && this.TEXTBOX_LIST.length > 0){
		for (i=0; i < this.TEXTBOX_LIST.length; i++){
			returnTxtList.push(this.addExtendedTextBox(this.TEXTBOX_LIST[i]));
		}
	}
	return returnTxtList;
 };
/**
 * 
 */
 ExtendedTextBoxBuilder.prototype.associateTextBox = function(pTextBox){
	 let i;
	 for (i=0; i < this.TEXTBOX_LIST.length; i++){
		 if (pTextBox.id == this.TEXTBOX_LIST[i].ID){
			 this.TEXTBOX_LIST[i].SOURCE_TEXTBOX = pTextBox;
		 }
	 }
 };
/**
 * 
 */
 ExtendedTextBoxBuilder.prototype.associateExtendedTextBoxMethod = function(){
	 if (this.TEXTBOX_LIST != null && this.TEXTBOX_LIST != undefined && this.TEXTBOX_LIST.length > 0){
		let i, j, k;
		let extendedTextBoxProtoList = new Array();
		let textBoxProtoList = new Array();
		//
		extendedProtoList = Object.keys(ExtendedTextBox.prototype);
		textBoxProtoList = Object.keys(TextBox.prototype);
		//
		if (extendedProtoList.length > 0){
			for (j=0; j < extendedProtoList.length; j++){
				for (k=0; k < textBoxProtoList.length; k++){
					if (extendedProtoList[j] == textBoxProtoList[k]){
						console.log(extendedProtoList[j] + ' : OVERRIDE');
						TextBox.prototype[textBoxProtoList[k]] = ExtendedTextBox.prototype[extendedProtoList[j]];
					} else {
						continue;
					}
				}
			}
		}
	 }
 };
/**
 *
 */
ExtendedTextBoxBuilder.prototype.addExtendedTextBox = function(data) {
	return new ExtendedTextBox(data);
}; 
/**
 * 
 */
var ExtendedTextBoxBuilderManager = (function() {
	
	var instance = null;

	function createInstance() {
		var object = new ExtendedTextBoxBuilder();
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
 function GET_EXTENDED_TEXTBOX_BUILDER(){
	 return ExtendedTextBoxBuilderManager.getInstance();
 };