/**
*	Un listener custom per implementare i propri eventi di tastiera
*/
function CustomKeyboardListener(keyboard) {
	this.o_keyboard = keyboard;
	keyboard.addListener(this);
};
var evento;

/**
*	Lavora sull'evento
*/
CustomKeyboardListener.prototype.handleEvent = function(evt) {
/*------------------------Gestione SHORTCUT-----------------------------------------*/

	evento = evt.keyCode + ' ' + evt.charCode + ' ' + evt.getCtrlKey() + ' ' + evt.getAltKey() + ' ' + evt.getShiftKey(),
		tmpPos = evento.indexOf(' '),
		tmpValue;
//	setTimeout($('fr').fr_checkTextBoxActive(),50); 
	//api.addAction('evento ' + evento);
	if (evento.substr(tmpPos + 1, 7) !== '0 0 0 0') {
	
		if (evt.getCtrlKey() || evt.getAltKey() || evt.getShiftKey()) { //shift-f10,shift,alt,ctrl
			handler.setEvent(evento);
			handler.run();
			return;
		}
		if (evento.substr(0, tmpPos) === '0') {
			handler.setEvent(evento);
			handler.run();
			return;
		}
	} else {
		//tasti funzione
		var tmpValue = Number(evento.substr(0, tmpPos));
		if ((111 < tmpValue && tmpValue < 124) 
				|| tmpValue === 33 
				|| tmpValue === 34) {
			handler.setEvent(evento);
			handler.run();
		}
	
	}

/*------------------------Gestione SHORTCUT-----------------------------------------*/
};





































































































