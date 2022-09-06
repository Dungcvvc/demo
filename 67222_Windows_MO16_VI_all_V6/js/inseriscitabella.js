

$('inserisciTabella', new jSim.Window());

	$('inserisciTabella').extend({
		specializedInit : function() {
			try {

				this.model.contSpin = this.model.path.down('1').down('spin');
				this.model.txtRows = this.model.path.down('1').down('rows');
				this.model.txtCols = this.model.path.down('1').down('columns');

				this.model.txtRows.setSelectionColor('rgb(136,195,255)');
				this.model.txtRows.setSelectedFontColor('rgb(0,0,0)');
				this.model.txtRows.setDeactivationOnOuterClick(true);
				this.model.txtRows.setTextRendering('auto');
				this.model.txtCols.setSelectionColor('rgb(136,195,255)');
				this.model.txtCols.setSelectedFontColor('rgb(0,0,0)');
				this.model.txtCols.setDeactivationOnOuterClick(true);
				this.model.txtCols.setTextRendering('auto');
				tab.initArrayOrderObject();

				this.initObjects();

				handler.register('invio', 'actAs', "!isUnder($('inserisciTabella').model.path.down('1').down('inserisciTabella').down('ok'))", $('inserisciTabella').model.path.down('1').down('inserisciTabella').down('ok'));

				handler.register('tab','custom',"!isUnder($('inserisciTabella').get('path').down('1').down('inserisciTabella').down('x'))", function(){tab.tabObject('tab');});
		
				handler.register('shift-tab','custom',"!isUnder($('inserisciTabella').get('path').down('1').down('inserisciTabella').down('x'))", function(){tab.tabObject('shift-tab');});


			
	//			  this.model.JSonInit = {  id : 'init', obj : [ ]}; 
	//			  this.model.JSonFinal = { id : 'final',obj : [ ]}; 
	//			  this.model.JSonTest = {  id : 'test', obj : [ ]}; 

				this.model.JSonInit = {  
							id : 'init',
							obj : [ 
								{ path : this.model.txtRows, value : "2", remove : null , type : "number"},
								{ path : this.model.txtCols, value : "5", remove : null , type : "number"}


						   ]
					}; 
				this.model.JSonFinal = {  
							id : 'final',
							obj : [ 
								{ path : this.model.txtRows, value : "2", remove : null , type : "number"},
								{ path : this.model.txtCols, value : "5", remove : null , type : "number"}
						   ]
					}; 
	
				this.model.JSonTest = {  
							id : 'test',
							obj : [ 
								{ path : this.model.txtRows, value : "4", remove : null , type : "number"},
								{ path : this.model.txtCols, value : "4", remove : null , type : "number"}
						   ]
					}; 

				
			} catch (e) {
				Utils.printException(e,'specializedInit');
			}
		},

		initObjects: function(){
			try {
		
				$('columnsSpin', new jSim.Spin());
				$('columnsSpin').init($('inserisciTabella').model.txtCols,
										$('inserisciTabella').model.contSpin.down('up1'), 
										$('inserisciTabella').model.contSpin.down('down1'),
										 1, '', '', 0 , 1, 'inf');
				$('columnsSpin').extend({
					specializedChangeValue: function () {
							document.getElementById("txt_18846").childNodes[0].select();
						}
					});
				$('rowsSpin', new jSim.Spin());
				$('rowsSpin').init($('inserisciTabella').model.txtRows,
										$('inserisciTabella').model.contSpin.down('up2'), 
										$('inserisciTabella').model.contSpin.down('down2'),
										 1, '', '', 0 , 1, 'inf');
				$('rowsSpin').extend({
					specializedChangeValue: function () {
							document.getElementById("txt_18847").childNodes[0].select();
						}
					});
			 } catch (e) {
				Utils.printException(e,'initObjects');
			}

		},
		specializedOpen : function() {	
			try {
				if(arguments.length > 0) {
					this.openTab(arguments[0]);
				}

				
			} catch (e) {
				Utils.printException(e,'specializedOpen');
			}
		},

		specializedClose : function() {	
			try {
				if(sim.txtActivate) {
					sim.txtStep1.activate();
				}

				
			} catch (e) {
				Utils.printException(e,'specializedOpen');
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


		getCurrentTab: function () {
			return this.model.movieTabs.getCurrentFrame();
		},
	
		specializedReset : function() {	
			try {
				
				this.model.path.down('1').down('inserisciTabella').down('check').goTo('normal');
				this.model.path.down('1').down('radio').setAllToFrame('normal');
				this.model.path.down('1').down('radio').down('1').goTo('click');


			} catch (e) {
				Utils.printException(e,'specializedReset');
			}
		},

		clickCheck : function(btn) {	
			try {
				var btnValue = btn.getCurrentFrame();

				if(btnValue === 'normal') {
					btn.goTo('click');
				} else {
					btn.goTo('normal');
				}

				this.specializedClickCheck(btn);

			} catch (e) {
				Utils.printException(e,'specializedReset');
			}
		},

		specializedClickCheck : function(btn) {	
			try {
				

			} catch (e) {
				Utils.printException(e,'specializedClickCheck');
			}
		},


		confirm: function () {
			if(sim.txtActivate){
				try {
					this.setJSonFromWindow(this.model.JSonFinal);
					this.parseJSon(this.model.JSonTest);
					var jsonApp = this.model.JSonInit;
					var resultForNotChanged = this.compareJSonInit(jsonApp, this.model.JSonFinal);
					if (resultForNotChanged) {
						api.addAction('no_modifiche');
						api.confirm();
						return;
					} else {
						var result = this.compareJSon(this.model.JSonFinal, this.model.JSonTest);
						this.specializedConfirm(result)
					}
				   } catch (e) {
						Utils.printException(e,'specializedClickCheck');
					}
			}
			  else{
					api.addAction('casellaDisattiva');
					api.confirm();
					}
		},

		specializedConfirm : function(testResult) {
			if (testResult) {
					this.close();
					sim.setFinalEffect();					
				} else {
					api.addAction('KO');
					api.confirm();
				}

		},	

		activateTextbox: function(pathTextbox) {
			pathTextbox.activate();
			pathTextbox.selectAll();
		}


	});

	$('inserisciTabella').model.extend({			
		contSpin : null,
		txtRows : null,
		txtCols : null
	});


























