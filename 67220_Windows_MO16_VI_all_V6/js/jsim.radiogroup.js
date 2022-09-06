/***js/jSim.RadioGroup.js begin ***/
jSim.createNameSpace("RadioGroup",function(radioPath){this.model=new jSim.RadioGroup.Model();this.view=new jSim.RadioGroup.View(this.model,this);this.model.group=radioPath});jSim.RadioGroup.inheritsFrom(jSim.Abstract.Controller);jSim.RadioGroup.extend({init:function(defaultObj){this.model.name=$(this);this.addCode();if(arguments.length===1){this.click(defaultObj)}else{this.click(this.model.group.getObjectByNumber(0))}this.specializedInit()},specializedInit:function(){},addCode:function(){try{var i=0;var btn,btnName;var numObj=this.model.group.getObjectCount();for(i;i<numObj;i+=1){btn=this.model.group.getObjectByNumber(i);btnName=$(this);btn.setAction('click',"$('"+btnName+"').click("+pathObj(btn)+")")}}catch(e){api.addAction('Eccezione in init: '+e)}},click:function(btn){try{this.model.group.setAllToFrame('normal');btn.goTo('click');this.model.selected=btn;this.specializedClick()}catch(e){api.addAction('Eccezione in click: '+e)}},specializedClick:function(){}});jSim.RadioGroup.createNameSpace("Model",function(){this.name=null;this.group=null;this.initialized=false;this.selected=null});jSim.RadioGroup.Model.inheritsFrom(jSim.Abstract.Model);jSim.RadioGroup.createNameSpace("View",function(model,controller){this.model=model;this.controller=controller});jSim.RadioGroup.View.inheritsFrom(jSim.Abstract.View);
/***js/jSim.RadioGroup.js end ***/
