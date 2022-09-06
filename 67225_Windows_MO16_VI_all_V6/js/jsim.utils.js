/***js/jSim_Utils.js begin ***/
jSim.createNameSpace("Utils",function(){this.printException=function(e,a){RTSetValue('/qco/logged','\n\n ECCEZIONE in '+a+'\n   |   Type:    '+e.name+'\n   |   Message: '+e.message+'\n   |   File:    '+e.fileName+'\n   |   Linea:   '+e.lineNumber+'\n')}});jSim.Utils.persist({_INSTANCE:null,getInstance:function(){if(this._INSTANCE==null){this._INSTANCE=new jSim.Utils()}return this._INSTANCE}});var Utils=jSim.Utils.getInstance();
/***js/jSim_Utils.js end ***/
