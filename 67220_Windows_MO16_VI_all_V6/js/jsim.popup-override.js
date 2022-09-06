/*
 * Inserire qui l'override dei metodi specializedInit dei popup utilizzati
 */
word.addCodeToPopups = function() {
	try {
		$('dxContestuale').extend({
			specializedInit : function() {
				this.get('path').down('1').down('1').down('6').setAction("click", "word.close(); $('dxContestuale').close();");
				//this.get('path').down('1').down('1').down('dis_slice_3').setAction("click", "application.openApp(application.dxAnteprima,true); $('dxContestuale').close();application.closeDropdown();");
				this.get('path').down('1').down('1').down('dis_slice_0').setAction("click", "$('dxContestuale').close();application.closeDropdown();");
				this.get('path').down('1').down('1').down('riduci').setAction("click", "word.riduci(); $('dxContestuale').close();application.closeDropdown();");
			}
		});
	
		$('dxContestualeRipristina').extend({
			specializedInit : function() {
				this.get('path').down('1').down('1').down('1').setAction("click", "word.ripristina(application.dxAnteprima); $('dxContestualeRipristina').close();application.closeDropdown();");
				this.get('path').down('1').down('1').down('5').setAction("click", "word.ripristina(application.dxAnteprima,true); $('dxContestualeRipristina').close();application.closeDropdown();");
				this.get('path').down('1').down('1').down('6').setAction("click", "word.close(); $('dxContestuale').close();");
			}
		});


	
	    //Dx su testo
		$('dxTestoWordDis').extend({
			specializedInit : function() {
//				this.get("path").down('1').down('carattere').setOpacity(0);
//				this.get("path").down('1').down('dimensione').setOpacity(0);
				this.get("path").down('1').down('carattere').setTextRendering("auto");
				this.get("path").down('1').down('dimensione').setTextRendering("auto");
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxTestoWordDis').close();");

				this.get("path").down('1').down('1').down('19').setAction("click","$('dxTestoWordDis').close(); sim.paste(true);");
				this.get("path").down('1').down('1').down('18').setAction("click","$('dxTestoWordDis').close(); sim.paste(true);");
				this.get("path").down('1').down('1').down('17').setAction("click","$('dxTestoWordDis').close(); sim.paste(true);");
			}
		});
		//Dx su testo
		$('dxTestoWord').extend({
			specializedInit : function() {
//				this.get("path").down('1').down('carattere').setOpacity(0);
//				this.get("path").down('1').down('dimensione').setOpacity(0);
				this.get("path").down('1').down('carattere').setTextRendering("auto");
				this.get("path").down('1').down('dimensione').setTextRendering("auto");
				this.get("path").down('1').down('1').down('copia').setAction("click","$('dxTestoWord').close(); 	sim.copy();");
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxTestoWord').close();");
			}
		});
	
		//Dx su testo
		$('dxVuotoWord').extend({
			specializedInit : function() {
//				this.get("path").down('1').down('carattere').setOpacity(0);
//				this.get("path").down('1').down('dimensione').setOpacity(0);
				this.get("path").down('1').down('carattere').setTextRendering("auto");
				this.get("path").down('1').down('dimensione').setTextRendering("auto");
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxVuotoWord').close();");
				this.get("path").down('1').down('1').down('18').setAction("click","$('dxVuotoWord').close(); sim.paste(true);");
				this.get("path").down('1').down('1').down('19').setAction("click","$('dxVuotoWord').close(); sim.paste(true);");
				this.get("path").down('1').down('1').down('17').setAction("click","$('dxVuotoWord').close(); sim.paste(true);");
			}
		});
	
	
		//Dx su immagini
		$('dxImage').extend({
			specializedInit : function() {
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxImage').close();");
			}
		});
	
	
		//Dx su tabella
		$('dxTabella').extend({
			specializedInit : function() {
//				this.get("path").down('1').down('carattere').setOpacity(0);
//				this.get("path").down('1').down('dimensione').setOpacity(0);
				this.get("path").down('1').down('carattere').setTextRendering("auto");
				this.get("path").down('1').down('dimensione').setTextRendering("auto");
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxTabella').close();");
			}
		});
	
		//Dx su tabella
		$('dxCella').extend({
			specializedInit : function() {
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxCella').close();");
			}
		});
	
		//Dx su tabella
		$('dxRigaColonna').extend({
			specializedInit : function() {
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxRigaColonna').close();");
			}
		});
	} catch (e) {
			Utils.printException(e,'addCodeToPopups');
	}
}




























































