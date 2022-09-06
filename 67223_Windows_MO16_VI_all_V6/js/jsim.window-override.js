jSim.Window.extend({
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
	}
});
















