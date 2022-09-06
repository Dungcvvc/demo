/*
 * Inserire qui l'override dei metodi specializedInit dei popup utilizzati
 */
word.addCodeToPopups = function() {
	try {
		$('dxContestuale').extend({
			specializedInit : function() {
				this.get('path').down('1').down('dxContestuale').down('6').setAction("click", "word.close(); $('dxContestuale').close();");
			}
		});
	
		//Dx su testo
		$('dxTesto').extend({
			specializedInit : function() {
//				this.get("path").down('1').down('carattere').setOpacity(0);
//				this.get("path").down('1').down('dimensione').setOpacity(0);
				this.get("path").down('1').down('carattere').setTextRendering("auto");
				this.get("path").down('1').down('dimensione').setTextRendering("auto");
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxTesto').close();");
			}
		});
	
		//Dx su testo
		$('dxVuoto').extend({
			specializedInit : function() {
//				this.get("path").down('1').down('carattere').setOpacity(0);
//				this.get("path").down('1').down('dimensione').setOpacity(0);
				this.get("path").down('1').down('carattere').setTextRendering("auto");
				this.get("path").down('1').down('dimensione').setTextRendering("auto");
				this.get("path").down('1').down('1').down('area_close').setAction("click","$('dxVuoto').close();");
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




	//Dx su tabella
	$('dxFolderSave').extend({
		specializedInit : function() {
			this.get("path").down('1').down('b').down('b').addAction("click","salva_back(salva_pathSalva.down('1').down('movie_cartelle').down(getValue('salva_cartellaSalva')).down('back').down('b'));");
			this.get("path").down('1').down('dxFolderSave').down('l').setAction("click","$('dxFolderSave').close(); salva_openFolderFromPopup();");
			this.get("path").down('1').down('dxFolderSave').down('o').setAction("click","$('dxFolderSave').close(); salva_openFolderFromPopup();");
		}
	});

    $("dxFileSave").extend({
        specializedInit: function() {
            this.get("path").down('1').down('dxFileSave').down('l').setAction("click","$('dxFileSave').close(); salva_openFileFromPopup();");
            this.get("path").down('1').down('dxFileSave').down('l').setAction("rclick","$('dxFileSave').close(); salva_openFileFromPopup();");
		}
    });



	} catch (e) {
			Utils.printException(e,'addCodeToPopups');
	}
}

























































