var tab={

		arrObject :[],
		selectedState : 'click',   // settare questa variabile con lo stato che definisce un bottone selezionato, in genere è click.(cambiare all occorrenza con mousedown o sel o altro)

		initArrayOrderObject : function(contenitore){
			try {

				//popolo l array passando un eventuale contenitore
				if(arguments.length > 0 && contenitore.getType() === 'panel') {
					var i;
		
					for(i=0; i < contenitore.getObjectCount(); i++){
						this.arrObject.push(contenitore.getObjectByNumber(i));
					}
					return;
				}

				//popolo l array passando oggetti uno ad uno
				this.arrObject[0] = $('inserisciTabella').model.txtCols;
				this.arrObject[1] = $('inserisciTabella').model.txtRows;

			} catch (e) {
				Utils.printException(e, 'initArrayOrderObject');
			}
		},

		returnArrayObject : function(){
			try {
				return this.arrObject;
			} catch (e) {
				Utils.printException(e, 'returnArrayObject');
			}
		},

		isActiveObject : function(){

			try {
				var tmpArr = this.arrObject;
	
				for(var i=0; i < tmpArr.length; i++){
					if((tmpArr[i].isActive !== undefined && tmpArr[i].isActive()) || tmpArr[i].element.childNodes[0] == document.activeElement) return i;
				}
	
				for(var i=0; i < tmpArr.length; i++){
					if((tmpArr[i].getCurrentFrame !== undefined && tmpArr[i].getCurrentFrame() === this.selectedState) || tmpArr[i].element.childNodes[0] == document.activeElement) return i;
				}
			} catch (e) {
				Utils.printException(e, 'isActiveObject');
			}

		},

		returnActiveObject : function(){
			try {
				return this.arrObject[this.isActiveObject()];		
			} catch (e) {
				Utils.printException(e, 'returnActiveObject');
			}
		},
		
		tabObject : function(key){

			try {
				var tmpArr = this.arrObject,
					index = 0;
				if(tmpArr === null){
					return;
				}

				switch(key){
					case'tab':

						if(this.isActiveObject() < tmpArr.length-1){
							index = this.isActiveObject()+1;
							
							switch(tmpArr[index].getType()) {
								case 'textbox':
									if(tmpArr[index-1].resetSelection !== undefined) {
										tmpArr[index-1].resetSelection();
									}	

									this.activateTextbox(tmpArr[index]);
									break;
								case 'button':
									if(tmpArr[index-1].deactivate !== undefined) {
										tmpArr[index-1].deactivate();
										tmpArr[index-1].resetSelection();
									}
									this.activateButton(tmpArr[index]);
									break;
							}
						}
					break;
					case'shift-tab':
						if(this.isActiveObject() > 0){
							index = this.isActiveObject()-1;
							switch(tmpArr[index].getType()) {
								case 'textbox':
									if(tmpArr[index+1].resetSelection !== undefined) {
										tmpArr[index+1].resetSelection();
									}									
									this.activateTextbox(tmpArr[index]);
									break;
								case 'button':
									if(tmpArr[index+1].deactivate !== undefined) {
										tmpArr[index+1].deactivate();
										tmpArr[index+1].resetSelection();
									}
									this.activateButton(tmpArr[index]);
									break;
							}
						}
					break;
				}
			} catch (e) {
				Utils.printException(e, 'tabObject');
			}
		},

		activateTextbox : function(object){
			try {
				object.element.childNodes[0].focus();
				object.element.childNodes[0].select();
			} catch (e) {
				Utils.printException(e, 'activateTextbox');
			}
		},

		activateButton : function(object){
			try {
			var utility = printName(object),
				command = object.data.a.click.replace(/this/g, utility);
				eval(command);

			} catch (e) {
				Utils.printException(e, 'activateButton');
			}

		}

}














