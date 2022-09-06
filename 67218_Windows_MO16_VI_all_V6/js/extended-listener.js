var $d = jQuery.noConflict();
//
$d(document).ready(function (pEvent) {
	let TEXTBOX_KEY_CONTROLLER = GET_TEXTBOX_KEY_CONTROLLER();
	TEXTBOX_KEY_CONTROLLER.initExtendedTextBox();
});
//
$d(document).focusin(function(pEvent) {
	let EXTENDED_KEYBOARD_CONTROLLER = GET_EXTENDED_KEYBOARD_CONTROLLER();
	EXTENDED_KEYBOARD_CONTROLLER.switchKeyEventContext(pEvent);
});
//
$d(document).keydown(function (pEvent) {
	let EXTENDED_KEYBOARD_CONTROLLER = GET_EXTENDED_KEYBOARD_CONTROLLER();
	EXTENDED_KEYBOARD_CONTROLLER.switchKeyEventContext(pEvent);
});
//
$d(document).keypress(function (pEvent) {
	let EXTENDED_KEYBOARD_CONTROLLER = GET_EXTENDED_KEYBOARD_CONTROLLER();
	EXTENDED_KEYBOARD_CONTROLLER.switchKeyEventContext(pEvent);
});
//
$d(document).keyup(function (pEvent) {
	let EXTENDED_KEYBOARD_CONTROLLER = GET_EXTENDED_KEYBOARD_CONTROLLER();
	EXTENDED_KEYBOARD_CONTROLLER.switchKeyEventContext(pEvent);
});
/**
 * 
 */