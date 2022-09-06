$('zoom', new jSim.Window());


$('zoom').extend ({

		specializedInit : function() {
			try {
				this.model.path.down('1').down('value').setSelectionColor('rgb(136,195,255)');
				this.model.path.down('1').down('value').setSelectedFontColor('rgb(0,0,0)');
				this.model.pagine1x2 = false;


				this.model.JSonInit = {
							id : 'init',
							obj : [ 
									{ path : this.model.path.down('1').down('value'), value : "100%", remove : [" ", "%"] , type : "textbox"}
								  ]
							}; 
				this.model.JSonTest  = {
							id : 'test',
							obj : [ 
									{ path : this.model.path.down('1').down('value'), value : "80", remove : [" ", "%"] , type : "textbox"}
								  ]
							}; 
				this.model.JSonFinal = {
							id : 'final',
							obj : [ 
									{ path : this.model.path.down('1').down('value'), value : "80", remove : [" ", "%"] , type :  "textbox"}
								  ]
							}; 
	
				this.initObjects();
	
				handler.register(['invio'], 'actAs', "!isUnder($('zoom').get('path').down('1').down('zoom').down('ok'))", $('zoom').get('path').down('1').down('zoom').down('ok'));
			} catch (e) {
				Utils.printException(e, 'specializedInit')
			}
		},

		initObjects : function () {
			try {
				$('zoomValueRadio', new jSim.RadioGroup(this.model.path.down('1').down('radio')));
				$('zoomValueRadio').init();
				$('zoomValueRadio').extend({
					specializedClick: function () {
						if($('zoom').model.pagine1x2 && this.model.selected.getName() === '10') {api.addAction('____');return;} 
						$('zoom').model.path.down('1').down('zoom').down('anteprima').goTo(this.model.selected.getName());
						$('zoom').model.path.down('1').down('value').setText(this.model.selected.getName() + '%');
						$('zoom').model.pagine1x2 = false;
					}		
				});

				$('zoomValueSpin', new jSim.Spin());
				$('zoomValueSpin').init($('zoom').model.path.down('1').down('value'),
										$('zoom').model.path.down('1').down('zoom').down('spin_up'), 
										$('zoom').model.path.down('1').down('zoom').down('spin_down'),
										 1, '', '%', 0 , 0, 'inf');
				$('zoomValueSpin').extend({
					specializedChangeValue: function () {
						var btnName = this.model.txtPath.getText().replace(/%/, '').replace(/ /, '');
						$('zoomValueRadio').model.selected = null;

						if(!$('zoom').model.pagine1x2) {
							$('zoom').model.path.down('1').down('radio').setAllToFrame('normal');
	
							if ($('zoom').model.path.down('1').down('radio').down(btnName) !== undefined) {
								$('zoomValueRadio').click($('zoom').model.path.down('1').down('radio').down(btnName));
							}
						}

						this.model.txtPath.setText(this.model.txtPath.getText().replace(/ /, ''));
						document.getElementById("txt_19126").childNodes[0].select();
					}
				});
				
			} catch (e) {
				Utils.printException(e, 'initObjects')
			}
		},

		specializedOpen : function () { 
			this.model.path.down('1').down('radio').setAllToFrame('normal');
			$('zoomValueRadio').click(this.model.path.down('1').down('radio').down('100'));

			if(sim.stepPagine) {
				this.impostaPagine();
			}
		},

		specializedClose : function () { 
			this.model.pagine1x2 = true;
		},




		confirm: function () {
			try {
				this.setJSonFromWindow(this.model.JSonFinal);
				this.parseJSon(this.model.JSonTest);
				var jsonApp = this.model.JSonInit;
				var resultForNotChanged = this.compareJSonInit(jsonApp, this.model.JSonFinal);
				if (resultForNotChanged) {
					api.addAction('no modifiche');
					api.confirm();
				} else {
					var result = this.compareJSon(this.model.JSonFinal, this.model.JSonTest);
					this.specializedConfirm(result)
				}
			} catch (e) {
				Utils.printException(e, 'confirm')
			}
		},

		specializedConfirm : function(testResult) {
			if (testResult) {
				uscita('1');
			} 
			else {
				api.addAction('KO');
				api.confirm();
			}

		},

	overPagine: function (btn) {
		try {
			var nameBtn = btn.getName(), 
				coord = nameBtn.split('_'),
				x = Number(coord[1]),
				y = Number(coord[0]),
				i, j, k, h;
				
			for (i = 1; i <= x; i += 1) {
				for (j = 1; j <= y; j += 1) {
					btn.up().down(j + '_' + i).goTo('mouseover');
				}
				for (k = y + 1; k <= 2; k += 1) {
					btn.up().down(k + '_' + i).goTo('normal');
				}
			}
	
			for (h = 1; h <= 2; h += 1) {
				for (k = x + 1; k <= 4; k += 1) {
					btn.up().down(h + '_' + k).goTo('normal');
				}
			}

			btn.up().down('anteprima').goTo(y + '_' + x);

		} catch (e) {
			Utils.printException(e, 'overPagine')
		}
	},

	resetAll: function () {
		try {
			this.model.path.down('1').down('tndPagine').down('1').down('1').setAllToFrame('normal');
		} catch (e) {
			Utils.printException(e, 'outPagine')
		}
	},

	upPagine: function (btn) {
		try {
			if(btn.getName() === '1_2') {
				this.resetAll();
				btn.up().up().up().goTo('0');
				this.impostaPagine();

			} else {
				api.addAction('selezioneErrata');
				api.confirm();
			}
		} catch (e) {
			Utils.printException(e, 'clickPagine')
		}
	},

	impostaPagine: function (btn) {
		try {
				$('zoomValueRadio').click(this.model.path.down('1').down('radio').down('10'))
				this.model.path.down('1').down('zoom').down('anteprima').goTo('1x2');
				this.model.pagine1x2 = true;
				this.model.path.down('1').down('value').setText('37%');
		} catch (e) {
			Utils.printException(e, 'impostaPagine')
		}
	},

	confermaZoom: function (btn) {
		try {
			var valueTxt = this.model.path.down('1').down('value').getText().toLowerCase().replace(/ /g, '').replace(/%/g, '')
			if(!this.model.pagine1x2) {
				if(valueTxt === '80') {
					this.close();
					sim.setFinalEffect();
				}/* else if(valueTxt === '80') {
					this.close();
					sim.impostaSfondo();
				}*/ else {
					api.addAction('errorePercZoom');
					api.confirm();
				}
			} else {
				api.addAction('erroreZoom');
				api.confirm();
			}

		} catch (e) {
			Utils.printException(e, 'confermaZoom')
		}
	}
});











