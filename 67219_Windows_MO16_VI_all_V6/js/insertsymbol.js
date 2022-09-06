$('insertSymbol', new jSim.Window());

$('insertSymbol').extend ({

		specializedInit : function() {
			try {

				this.model.movieTabs = this.model.path.down('1').down('tabs');

				handler.register("invio", "actAs", "!isUnder($('insertSymbol').get('path').down('1').down('simbolo').down('insert'))", $('insertSymbol').get('path').down('1').down('simbolo').down('insert'));
				
				this.model.JSonInit = {  id : 'init', obj : [ ]}; 
				this.model.JSonFinal = { id : 'final',obj : [ ]}; 
				this.model.JSonTest = {  id : 'test', obj : [ ]}; 

			} catch (e) {
				Utils.printException(e,'specializedInit');
			}
		},

		specializedOpen : function () {
			this.selectItem(this.model.path.down('1').down('tabs').down('2').down('btn').down('1'));
			this.selectItem(this.model.path.down('1').down('tabs').down('1').down('btn').down('1'));
		},

		getCurrentTab : function() {	
			try {
				return this.model.movieTabs.getCurrentFrame();
			} catch (e) {
				Utils.printException(e,'getCurrentTab');
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
				if (nameTab === '2') {
					this.selectItem(this.model.path.down('1').down('tabs').down('2').down('btn').down('1'));
				}
				this.model.movieTabs.goTo(nameTab);

			} catch (e) {
				Utils.printException(e,'openTab');
			}
		},

		selectItem : function (src) {
			src.up().setAllToFrame('normal');
			src.goTo('click');
			this.model.selectedItem = src.getName();
		},

		dblClickItem : function (src) {
			this.selectItem(src);
			this.confirm();
		},


		confirm : function () {
			if (this.model.selectedItem === this.model.correctItem) {
				this.close();
				sim.addSymbol();
			}
			else {
				api.addAction('ko');
				api.confirm();
			}
		}
});

	$('insertSymbol').model.extend({			
		movieTabs : null,
		selectedItem : '',
		correctItem : 's4'
	});







