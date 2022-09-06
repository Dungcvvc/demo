
/*-----------------------------------------FINESTRA SALVA--------------------------------------*/

function salva_apri(nameString){
		currentFocus = null;
		if(salva_onlySave){
			salva_enableSetTipo = true;
			salva_enableTendineIndirizzi = false;
			salva_pathSalva.down('1').down('schermaFileName').goTo('1');
		}
		salva_pathSalva.down('1').down('icon').down('1').down('icon').down('icon').goTo(salva_software);
		salva_pathSalva.goTo('1');
		salva_openInitFolder();
		salva_specializedApri(nameString);
		winSave_opened = true;
		window.getSelection().empty();
	}

function salva_specializedApri(nameString){
		salva_pathSalva.down('1').down('saveAs').down('sfondo').goTo(salva_typeWindow);
		salva_pathSalva.down('1').down('type_window').goTo(salva_typeWindow);
		salva_pathSalva.down('1').down('movie_barre').down('1').down('type_window').goTo(salva_typeWindow);
		if(salva_typeWindow == 'save'){
			salva_pathSalva.down('1').down('icon').down('1').down('titleWin').setText(salva_strTitleSave);
			if(nameString !== undefined) {
				salva_nomeFile.setText(nameString);
			} else {
				salva_nomeFile.setText(salva_strNameFileInit);
			}
			if(!salva_onlySave){
				salva_nomeFile.activate();
				salva_nomeFile.selectAll();
			}
			salva_setTipoStart(sim.valueTipo);
		}
		else if(salva_typeWindow == 'open'){
			salva_pathSalva.down('1').down('icon').down('1').down('titleWin').setText(salva_strTitleOpen);
			salva_nomeFile_open.setText(salva_strNameFileInit);
			salva_nomeFile_open.activate();
			salva_nomeFile_open.selectAll();
		}
}
function salva_selectNameFile(){
	salva_back(salva_pathSalva.down('1').down('movie_cartelle').down('root').down('back').down('b'));
	if(!salva_onlySave){
				salva_nomeFile.activate();
				salva_nomeFile.selectAll();
			}
	else if(salva_typeWindow == 'open'){
				salva_nomeFile_open.activate();
				salva_nomeFile_open.selectAll();
	}

}
function salva_openInitFolder(){
		var btnCont = salva_pathSalva.down('1').down('movie_cartelle').down('root').down('folder');
		if(salva_initFolder != 'root'){
			salva_doubleClickCartella(btnCont.down(salva_initFolder));
		}
}
function salva_clickCartella(car){
			if(!salva_onlySave){
				car.up().up().down('contenitore').setAllToFrame('normal');
				car.up().up().down('contenitore').down(car.getName()).goTo('click');
				setVariable('salva_itemSalva',car.getName());
				car.up().up().up().up().down('movie_apri').goTo(salva_typeWindow);
			}			
	}
function salva_rightClickCartella(car){
			if(!salva_onlySave){
				car.up().up().down('contenitore').setAllToFrame('normal');
				car.up().up().down('contenitore').down(car.getName()).goTo('click');
				setVariable('salva_itemSalva',car.getName());
				car.up().up().up().up().down('movie_apri').goTo(salva_typeWindow);
				if(arguments[1] != null && arguments[2] != null){
						salva_openPopupFolder(true, arguments[1], arguments[2]);
				}
				else{
						salva_openPopupFolder(false);				
				}
				
			}	
}
function salva_openPopupFolder(position){
		if(position){
			$('dxFolderSave').open(arguments[1], arguments[2]);
		}
		else{
			$('dxFolderSave').open();
		}
}

function salva_checkFolderSelected(){

		var salva_arrayPositionFolder = new Array();
			salva_arrayPositionFolder[0] = 188;

		switch(getValue('salva_itemSalva')){
			case'cartella1':
					salva_arrayPositionFolder[1] = 120;
			break;
			case'cartella2':
					salva_arrayPositionFolder[1] = 150;
			break;
		}

		return salva_arrayPositionFolder;
}
function salva_shiftf10Folder(){
api.addAction('itemSalva_'+getValue('salva_itemSalva'));
		if(getValue('salva_itemSalva') != 'null'){
				var positionArray =  salva_checkFolderSelected();
				salva_openPopupFolder(true, positionArray[0], positionArray[1]);
		}
}

function salva_doubleClickCartella(car){
			if(!salva_onlySave){
				salva_resetta(car.up().up().up().up().up());
				car.up().up().up().goTo(car.getName());
				setVariable('salva_cartellaSalva',car.getName());
				car.up().up().up().up().down('movie_barre').down('1').down('cartelleIndirizzi').goTo(car.getName());
			}
	}
function salva_overCartella(car){
			if(!salva_onlySave){
				if(car.up().up().down('contenitore').down(car.getName()).getCurrentFrame() != 'click'){
					car.up().up().down('contenitore').down(car.getName()).goTo('mouseover');
				}
			}
	}
function salva_outCartella(car){
			if(!salva_onlySave){
				if(car.up().up().down('contenitore').down(car.getName()).getCurrentFrame() != 'click'){
					car.up().up().down('contenitore').down(car.getName()).goTo('normal');
				}
			}
	}
/*-------------------apertura tendine tools di finestra-----------------*/
function salva_openTendineTools(btn){
			if(!salva_onlySave){
				salva_pathTendine.down('tools').down(btn.getName()).down('1').down('contenitore').setAllToFrame('normal');;
				salva_pathTendine.down('tools').down(btn.getName()).goTo('1');
			}
	}

/*----------------------------------------------------------------------*/
function salva_back(btn){
			if(!salva_onlySave){
				btn.up().up().down('contenitore').setAllToFrame('normal');
				setVariable('salva_itemSalva','null');
				btn.up().up().up().up().down('movie_apri').goTo('0');
			}
	}	
function salva_resetta(mov)
{
	 mov.down('1').down('movie_cartelle').down('root').down('contenitore').setAllToFrame('normal');
	 mov.down('1').down('movie_cartelle').down('cartella1').down('contenitore').setAllToFrame('normal');
	 mov.down('1').down('movie_cartelle').down('cartella2').down('contenitore').setAllToFrame('normal');
	 mov.down('1').down('movie_apri').goTo('0');	

	 setVariable('salva_itemSalva','null');
	 setVariable('salva_cartellaSalva','null');
}


function salva_livelloSuperiore(mov)
{
	if(!salva_onlySave){
		 if(getValue('salva_cartellaSalva')=='cartella1' || getValue('salva_cartellaSalva')=='cartella2')
		   {
		
			setVariable('salva_avanti',getValue('salva_cartellaSalva'));
			salva_resetta(mov);    
			mov.down('1').down('movie_barre').down('1').down('cartelleIndirizzi').goTo('0');
			setVariable('salva_cartellaSalva','root');
			mov.down('1').down('movie_cartelle').goTo('root');
		
		   
		   }
	}
}

function salva_avanti(mov)
{
	if(!salva_onlySave){
		if (getValue('salva_cartellaSalva')=='root')
		{
			if(getValue('salva_avanti')=='cartella2')
			{
				mov.down('1').down('movie_cartelle').goTo('cartella2');
				mov.down('1').down('movie_barre').down('1').down('cartelleIndirizzi').goTo('cartella2');
				setVariable('salva_cartellaSalva','cartella2');
			}
			else
			{
				if(getValue('salva_avanti')=='cartella1' )
				{
					mov.down('1').down('movie_cartelle').goTo('cartella1');
					setVariable('salva_cartellaSalva','cartella1');
					mov.down('1').down('movie_barre').down('1').down('cartelleIndirizzi').goTo('cartella1');
				}
			}
		}
	}
}

function salva_chiudi(mov)
{
	 salva_resetta(mov);
	if(salva_typeWindow == 'save'){
		 salva_nomeFile.setText(salva_strNameFileInit);
	}
	else{
		 salva_nomeFile_open.setText(salva_strNameFileInit);
	}
	if(salva_enableSetTipo && salva_typeWindow=='save'){
		salva_setTipo(salva_pathTendine.down('type').down('type_'+salva_software).down('1').down('type').down(salva_tipoFileInit)); 
	}
	 setVariable('salva_cartellaSalva', salva_initFolder);
	 mov.down('1').down('movie_barre').down('1').down('cartelleIndirizzi').goTo('0');
	 mov.goTo('0'); 
	winSave_opened = false;
}


function salva_uscita(modo,mov)
{
 var uscita=0;
 var casella;
	if(salva_typeWindow == 'save'){
		 casella=salva_nomeFile.getText().toLowerCase();
	}
	else{		
		 casella=salva_nomeFile_open.getText().toLowerCase();
	}

	 casella=casella.replace(/ /g,'');

 if(getValue('salva_itemSalva')!='null')
   {
    if(getValue('salva_itemSalva')=='root' || getValue('salva_itemSalva')=='cartella1' || getValue('salva_itemSalva')=='cartella2')
      {
       mov.down('1').down('movie_cartelle').goTo(getValue('salva_itemSalva'));

       switch (getValue('salva_itemSalva'))
              {
			   case 'root': mov.down('1').down('movie_barre').down('1').down('cartelleIndirizzi').goTo('0');
               break;
  
               case 'cartella1': mov.down('1').down('movie_barre').down('1').down('cartelleIndirizzi').goTo('cartella1');
               break;
  
               case 'cartella2': mov.down('1').down('movie_barre').down('1').down('cartelleIndirizzi').goTo('cartella2');
               break;
              }
       salva_resetta(mov);
       switch (mov.down('1').down('movie_cartelle').getCurrentFrame().getName())
	{
			   case 'root': setVariable('salva_cartellaSalva','root');
               break;
  
               case 'cartella1': setVariable('salva_cartellaSalva','cartella1');
               break;
  
               case 'cartella2': setVariable('salva_cartellaSalva','cartella2');
               break;
	}
      }
    else
      {uscita=1;}
   }
 else
   {  
    if(casella!='' && casella !="*.txt")
      {uscita=2;}
   }
   
casella=casella.replace(/mhtml/g,'mht');
casella=casella.replace(/html/g,'htm');
var stringaUscita = '';
var cartella = getValue('salva_cartellaSalva');

 switch (uscita)
        {case 1:
				if(salva_typeWindow == 'save'){
					 stringaUscita = modo+'_/_'+cartella+'|'+getValue('salva_itemSalva')+'_/_'+salva_tipoFileText.getText();
				}
				else{
					 stringaUscita = modo+'_/_'+cartella+'|'+getValue('salva_itemSalva');
				}
				
         break;
    
         case 2:
				if(salva_typeWindow == 'save'){
					 stringaUscita = modo+'_/_'+cartella+'|'+casella+'_/_'+salva_tipoFileText.getText();
				}
				else{
					 stringaUscita = modo+'_/_'+cartella+'|'+casella;
				}

         break;
        }

if (uscita != 0)
	{
api.addAction(''+stringaUscita.replace(/ /g, '').toLowerCase());
		 switch (stringaUscita.replace(/ /g, '').toLowerCase())
			{
			

			case 'salva_/_root|c:\\docs\\projects\\'+salva_strUscita+'_/_pdf(*.pdf)':
			case 'salva_/_cartella1|c:\\docs\\projects\\'+salva_strUscita+'_/_pdf(*.pdf)':
			case 'salva_/_cartella2|c:\\docs\\projects\\'+salva_strUscita+'_/_pdf(*.pdf)':
			case 'salva_/_cartella2|'+salva_strUscita+'_/_pdf(*.pdf)':
			case 'salva_/_root|projects\\'+salva_strUscita+'_/_pdf(*.pdf)':
			case 'salva_/_root|projects\\'+salva_strUscita+'.pdf_/_pdf(*.pdf)':
			case 'salva_/_root|c:\\docs\\projects\\'+salva_strUscita+'.pdf_/_pdf(*.pdf)':
			case 'salva_/_cartella1|c:\\docs\\projects\\'+salva_strUscita+'.pdf_/_pdf(*.pdf)':
			case 'salva_/_cartella2|c:\\docs\\projects\\'+salva_strUscita+'.pdf_/_pdf(*.pdf)':
			case 'salva_/_cartella2|'+salva_strUscita+'.pdf_/_pdf(*.pdf)':

					salva_afterSave();  
				break;

			default:

				api.addAction('errata');
				api.confirm();
			break;

			}
		
	}
}

function salva_deseleziona()
{
	salva_pathSalva.down('1').down('movie_cartelle').down('root').down('contenitore').setAllToFrame('normal');
	salva_pathSalva.down('1').down('movie_cartelle').down('cartella2').down('contenitore').setAllToFrame('normal');
	salva_pathSalva.down('1').down('movie_cartelle').down('cartella1').down('contenitore').setAllToFrame('normal');
	setVariable('salva_itemSalva','null');

}
function salva_apriTipoFile(){

		if(salva_enableSetTipo){
			salva_pathSalva.down('1').down('type_window').down('save').down('save').down('type').goTo('mousedown');
			salva_checkTipoFile();
			salva_pathTendine.down('type').down('type_'+salva_software).goTo('1');
		}
	}
function salva_chiudiTipoFile(){
			salva_pathTendine.down('type').down('type_'+salva_software).goTo('0');
			salva_pathSalva.down('1').down('type_window').down('save').down('save').down('type').goTo('normal');
	}
function salva_checkTipoFile(){
			salva_pathTendine.down('type').down('type_'+salva_software).down('1').down('type').setAllToFrame('normal');
			salva_pathTendine.down('type').down('type_'+salva_software).down('1').down('type').down(salva_tipoFile).goTo('mouseover');
	}
function salva_setTipoStart(btn){
		salva_tipoFile = btn;
		if(getValue('salva_itemSalva')!='null'){salva_pathSalva.down('1').down('movie_apri').goTo(salva_typeWindow);}
		switch(btn){
			case '1':
				salva_tipoFileText.setText('Word document (*.docx)');
				salva_setEstensione('docx');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '2':
				salva_tipoFileText.setText('Word Macro-Enabled Document (*.docm)');
				salva_setEstensione('docm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '3':
				salva_tipoFileText.setText('Word 97-2003 Document (*.doc)');
				salva_setEstensione('doc');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '4':
				salva_tipoFileText.setText('Word Template (*.dotx)');
				salva_setEstensione('dotx');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '5':
				salva_tipoFileText.setText('Word Macro-Enabled Template (*.dotm)');
				salva_setEstensione('dotm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '6':
				salva_tipoFileText.setText('Word 97-2003 Template (*.dot)');
				salva_setEstensione('dot');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;

			case '7':
				salva_tipoFileText.setText('PDF (*.pdf)');
				salva_setEstensione('pdf');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '8':
				salva_tipoFileText.setText('XPS Documento (*.xps)');
				salva_setEstensione('xps');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '9':
				salva_tipoFileText.setText('Single File Web Page (*.mht;*.mhtml)');
				salva_setEstensione('mht');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('1') ;
			break;
			case '10':
				salva_tipoFileText.setText('Web Page (*.htm;*.html)');
				salva_setEstensione('htm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('1') ;
			break;
			case '11':
				salva_tipoFileText.setText('Web Page, Filtered (*.htm;*.html)');
				salva_setEstensione('htm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('1') ;
			break;
			case '12':
				salva_tipoFileText.setText('Rich Text Format (*.rtf)');
				salva_setEstensione('rtf');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '13':
				salva_tipoFileText.setText('Plain Text (*.txt)');
				salva_setEstensione('txt');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '14':
				salva_tipoFileText.setText('Word XML Document (*.xml)');
				salva_setEstensione('xml');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '15':
				salva_tipoFileText.setText('Word 2003 XML Document (*.xml)');
				salva_setEstensione('xml');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '16':
				salva_tipoFileText.setText('Strict Open XML Document (*.docx)');
				salva_setEstensione('docx');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '17':
				salva_tipoFileText.setText('OpenDocument Text (*.odt)');
				salva_setEstensione('odt');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;

		}
		

}
function salva_setTipo(btn){
		salva_tipoFile = btn.getName();
		salva_chiudiTipoFile();
		if(getValue('salva_itemSalva')!='null'){salva_pathSalva.down('1').down('movie_apri').goTo(salva_typeWindow);}
		switch(btn.getName()){
			case '1':
				salva_tipoFileText.setText('Word document (*.docx)');
				salva_setEstensione('docx');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '2':
				salva_tipoFileText.setText('Word Macro-Enabled Document (*.docm)');
				salva_setEstensione('docm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '3':
				salva_tipoFileText.setText('Word 97-2003 Document (*.doc)');
				salva_setEstensione('doc');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '4':
				salva_tipoFileText.setText('Word Template (*.dotx)');
				salva_setEstensione('dotx');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '5':
				salva_tipoFileText.setText('Word Macro-Enabled Template (*.dotm)');
				salva_setEstensione('dotm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '6':
				salva_tipoFileText.setText('Word 97-2003 Template (*.dot)');
				salva_setEstensione('dot');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;

			case '7':
				salva_tipoFileText.setText('PDF (*.pdf)');
				salva_setEstensione('pdf');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '8':
				salva_tipoFileText.setText('XPS Documento (*.xps)');
				salva_setEstensione('xps');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '9':
				salva_tipoFileText.setText('Single File Web Page (*.mht;*.mhtml)');
				salva_setEstensione('mht');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('1') ;
			break;
			case '10':
				salva_tipoFileText.setText('Web Page (*.htm;*.html)');
				salva_setEstensione('htm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('1') ;
			break;
			case '11':
				salva_tipoFileText.setText('Web Page, Filtered (*.htm;*.html)');
				salva_setEstensione('htm');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('1') ;
			break;
			case '12':
				salva_tipoFileText.setText('Rich Text Format (*.rtf)');
				salva_setEstensione('rtf');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '13':
				salva_tipoFileText.setText('Plain Text (*.txt)');
				salva_setEstensione('txt');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '14':
				salva_tipoFileText.setText('Word XML Document (*.xml)');
				salva_setEstensione('xml');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '15':
				salva_tipoFileText.setText('Word 2003 XML Document (*.xml)');
				salva_setEstensione('xml');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '16':
				salva_tipoFileText.setText('Strict Open XML Document (*.docx)');
				salva_setEstensione('docx');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;
			case '17':
				salva_tipoFileText.setText('OpenDocument Text (*.odt)');
				salva_setEstensione('odt');
				salva_pathSalva.down('1').down('otherView').down('1').down('web').goTo('0') ;
			break;

		}
		

}
function salva_setEstensione(estensione){
		var casella=salva_nomeFile.getText();
		casella=casella.replace(/(.*)\.(.*)/,"$1");
		salva_nomeFile.setText(casella+"\."+estensione);
	}
function salva_afterSave(){
		if(sim.checkInsert()) {
			salva_chiudi(salva_pathSalva);
			sim.setFinalEffect();
		} else {
			api.addAction('erroreInserimentoTxt');
			api.confirm();
		}
		
	}

/*---------------------------------------gestione tendine indirizzi-------------------------------*/


function salva_overIndirizzi(origine)
{

	salva_pathTendine.down('barraIndirizzi').down('movie_tendine').goTo(origine.getName());

}



function salva_apriTendineIndirizzi(btn)
{
	if(salva_enableTendineIndirizzi)
	{
				salva_pathTendine.down('barraIndirizzi').down('movie_tendine').goTo(btn.getName());

				var cartellaVisible = salva_pathSalva.down('1').down('movie_cartelle').getCurrentFrame().getName();
				if(cartellaVisible != 'cartella1' && cartellaVisible != 'cartella2'){
					switch(btn.getName()){
						case 'freccia':
						case 'c':
						case 'root':
								salva_pathTendine.down('barraIndirizzi').down('movieOver').goTo('root'); 
						break;
					}
				}
				else{
						salva_pathTendine.down('barraIndirizzi').down('movieOver').goTo(cartellaVisible); 
				}


				
	}
	
}




function salva_chiudiTendineIndirizzi()
{

	salva_pathTendine.down('barraIndirizzi').down('movieOver').goTo('0');
	salva_pathTendine.down('barraIndirizzi').down('movie_tendine').goTo('0')

}
function salva_customizeActionPopupFolder(){

	$('pathPopup').down('1').down('dxFolderSave').down('1').down('b').down('b').addAction("click","salva_back(salva_pathSalva.down('1').down('movie_cartelle').down(getValue('salva_cartellaSalva')).down('back').down('b'));");
	$('pathPopup').down('1').down('dxFolderSave').down('1').down('dxFolderSave').down('l').setAction("click","$('dxFolderSave').close($('pathPopup').down('1').down('dxFolderSave').down('1').down('b').down('b')); salva_openFolderFromPopup();");
	$('pathPopup').down('1').down('dxFolderSave').down('1').down('dxFolderSave').down('o').setAction("click","$('dxFolderSave').close($('pathPopup').down('1').down('dxFolderSave').down('1').down('b').down('b')); salva_openFolderFromPopup();");
}
function salva_deactivateCaselle(){
	salva_nomeFile.deactivate();
	salva_nomeFile_open.deactivate();
}
function salva_openFolderFromPopup(){
		salva_doubleClickCartella(salva_pathSalva.down('1').down('movie_cartelle').down('root').down('folder').down(getValue('salva_itemSalva')));
}

function salva_apriFromSubMenu(){
var btnCont = word.menu.down('1').down('submenu').down('8').down('anteprima').down('2').down('2');
var arrayObj = findState(btnCont, 'click');
	if(printResultFindState(arrayObj) === '|1|' || printResultFindState(arrayObj) === '|5|'){
		$('headerRibbon').chiudiMenu();
		salva_apri();
	}	
	else{
		api.addAction('no');api.confirm();
	}
}
/*-----------------------------------------FINE FINESTRA SALVA--------------------------------------*/

































