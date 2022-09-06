$('font', new jSim.Window());

$('font').extend ({

		specializedInit : function() {
			try {

				this.model.movieTabs = this.model.path.down('1').down('tabs');

				this.model.type = this.model.movieTabs.down('1').down('fontType');
				this.model.type.setDeactivationOnOuterClick(true);
				this.model.type.setSelectionColor('rgb(136,195,255)');
				this.model.type.setSelectedFontColor('rgb(0,0,0)');
				this.model.type.setTextRendering("auto");

				this.model.style = this.model.movieTabs.down('1').down('fontStyle');
				this.model.style.setDeactivationOnOuterClick(true);
				this.model.style.setSelectionColor('rgb(136,195,255)');
				this.model.style.setSelectedFontColor('rgb(0,0,0)');
				this.model.style.setTextRendering("auto");

				this.model.size = this.model.movieTabs.down('1').down('fontSize');
				this.model.size.setDeactivationOnOuterClick(true);
				this.model.size.setSelectionColor('rgb(136,195,255)');
				this.model.size.setSelectedFontColor('rgb(0,0,0)');
				this.model.size.setTextRendering("auto");

				handler.register("invio", "actAs", "!isUnder($('font').get('path').down('1').down('carattere').down('ok'))", $('font').get('path').down('1').down('carattere').down('ok'));
				
				this.model.JSonInit = {  id : 'init', obj : [ ]}; 
				this.model.JSonFinal = { id : 'final',obj : [ ]}; 
				this.model.JSonTest = {  id : 'test', obj : [ ]}; 

				this.initObjects();

			} catch (e) {
				Utils.printException(e,'specializedInit');
			}
		},

		specializedOpen : function() {			

			this.setFontProperty('Type', this.model.movieTabs.down('1').down('type').down('Arial'));
			this.setFontProperty('Style', this.model.movieTabs.down('1').down('style').down('Regular'));
			this.setFontProperty('Size', this.model.movieTabs.down('1').down('size').down('16'));
		//	this.model.movieTabs.down('1').down('1').setAllToFrame('normal');
			//this.model.movieTabs.down('1').down('1').down('colorValue').goTo('auto');


/*			if(sim.stepCorsivo){

			this.model.movieTabs.down('1').down('style').goTo('Corsivo');
			this.model.style.setText('Corsivo');
			}
*/

		},

		initObjects: function(){
			try {
					
				/*$('sottolineatoWin', new jSim.Combo($('pathTendine').down('1').down('sottolineatoWin')));
				$('sottolineatoWin').init();
				$('sottolineatoWin').extend({
					specializedSetProperty : function(){

					}
				});*/

			 } catch (e) {
				Utils.printException(e,'initObjects');
			}

		},


		setFontProperty : function(propertyName, obj){
			try{
				var value = obj.getName();
				obj.up().setAllToFrame('normal');
				obj.goTo('click');
				this.model.movieTabs.down('1').down('font' + propertyName).setText(value);	
		
			}catch(e){
				Utils.printException(e,'setFontProperty');
			}
		},

		getCurrentTab : function() {	
			try {
				return this.model.movieTabs.getCurrentFrame();
			} catch (e) {
				Utils.printException(e,'getCurrentTab');
			}
		},

		keyPressed : function(){
			try{
				if(this.model.type.isActive()){
					this.model.movieTabs.down('1').down('type').setAllToFrame('normal');
				}
				else {
					if(this.model.style.isActive()){
						this.model.movieTabs.down('1').down('style').setAllToFrame('normal');
					}
					else {
						if(this.model.size.isActive()){
							this.model.movieTabs.down('1').down('size').setAllToFrame('normal');
						}
					}
				}
			}catch(e){
				api.addAction('eccezione in keyPressed ' + e);
			}
		},

		openTab : function(tab) {	
			try {

				var nameTab = tab;
	
				if(typeof nameTab === 'number') {
					nameTab = String(nameTab);
				} else if (typeof nameTab !== 'string') {
					nameTab = nameTab.getName()
				}
				
				if(this.getCurrentTab().getName() === nameTab) {
					return;
				}
				this.model.movieTabs.goTo(nameTab);

			} catch (e) {
				Utils.printException(e,'openTab');
			}
		},

		clickCheck : function (src) {
			try {
				api.addAction('check errato');
				api.confirm();
				return;
				var btnValue = btn.getCurrentFrame();

				if(btnValue === 'normal') {
					btn.goTo('click');
				} else {
					btn.goTo('normal');
				}

			} catch (e) {
				Utils.printException(e, 'clickCheck');
			}
		},

		confirm : function () {
			try {
				var currentType = this.model.type.getText().replace(/ /g, '').toLowerCase(),
					currentStyle = this.model.style.getText().replace(/ /g, '').toLowerCase(),
					currentSize = this.model.size.getText().replace(/ /g, '').toLowerCase();

				if(currentType === 'arial' && currentStyle === 'regular' && currentSize === '16') {
					this.close();
				} else if(currentType === 'arial' && currentStyle === 'bold' && currentSize === '16') {
						this.close();
						sim.setFinalEffect();
				} else {
					api.addAction('parametri errati');
					api.confirm();
				}

				/*switch (currentType) {
					case 'aparajita':
						this.close();
						break;
					case 'arial':
						this.close();
						sim.applyFont();
						break;
					default:
						api.addAction('font errato');
						api.confirm();
				}*/

			} catch (e) {
				Utils.printException(e, 'confirm');
			}
		}
	
});

$('font').model.extend({			
	movieTabs : null
});



























