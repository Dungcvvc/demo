/***js/jSim.js begin ***/
EventManager.prototype.addMouseDownEventListener=function(listener){this.addEventListener(document.rootElement,listener,"mousedown","actionPerformed",false)};EventManager.prototype.removeMouseDownEventListener=function(listener){this.removeEventListener(document.rootElement,listener,"mousedown")};function jSim(){};jSim.TYPE="jSim";jSim.VERSION="0.2.1";Utils.IdGenerator=function(){this.id=0};Utils.IdGenerator._INSTANCE=null;Utils.IdGenerator.getInstance=function(){if(!Utils.IdGenerator._INSTANCE){Utils.IdGenerator._INSTANCE=new Utils.IdGenerator()}return Utils.IdGenerator._INSTANCE};Utils.IdGenerator.prototype.getId=function(){return++this.id};
Object.defineProperty(Object.prototype, 'extend', {
	enumerable : false,
	configurable : true,
	writable : true, // Set to False
	value : function(obj) {
		if (!this.prototype)
			this.prototype = new Object();
		for (item in obj) {
			if (this instanceof Function)
				this.prototype[item] = obj[item];
			else
				this[item] = obj[item]
		}
	}
});

Object.defineProperty(Object.prototype, 'createNameSpace', {
	enumerable : false,
	configurable : true,
	writable : true, // Set to False
	value : function(ns, callback) {
		this[ns] = callback
	}
});

Object.defineProperty(Object.prototype, 'inheritsFrom', {
	enumerable : false,
	configurable : true,
	writable : true, // Set to False
	value : function() {
		if (!this.prototype)
			this.prototype = new Object();
		for (var i = 0; i < arguments.length; i++) {
			var obj = new arguments[i]();
			for ( var b in obj) {
				if (!this.prototype[b])
					this.prototype[b] = obj[b]
			}
		}
	}
});

Object.defineProperty(Object.prototype, 'persist', {
	enumerable : false,
	configurable : true,
	writable : true, // Set to False
	value : function(obj) {
		for (item in obj) {
			this[item] = obj[item]
		}
	}
});

function Utils(){};Utils.VERSION="0.1.0";Utils.TYPE="Utils";
/***js/jSim.js end ***/
/***js/jSim_Abstract.js begin ***/
jSim.createNameSpace("Abstract",function(){});jSim.Abstract.extend({get:function(attr){return this.get(attr)},set:function(attr,val){this.set(attr,val)}});jSim.Abstract.createNameSpace("Model",function(){this.name="abstract"});jSim.Abstract.createNameSpace("View",function(model,controller){this.model=model;this.controller=controller});jSim.Abstract.View.extend({get:function(attr){return this.controller.get(attr)},set:function(attr,val){this.controller.set(attr,val)}});jSim.Abstract.createNameSpace("Controller",function(){this.model=new jSim.Abstract.Model();this.view=new jSim.Abstract.View(this.model,this)});jSim.Abstract.Controller.extend({get:function(attr){return this.model[attr]},set:function(attr,val){this.model[attr]=val},init:function(){},specializedInit:function(){}});
/***js/jSim_Abstract.js end ***/
