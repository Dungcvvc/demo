const FINAL_VALUE = '_67223_';
const OVERLAY_ID = "ov-qs-ld";
const TITLE_SCO_ID = "head-title";
//
$d(document).ready(function(e) {
	
	API_DB.putIfAbsent(QCO_S);
	
	$d('#fakebutton').on("click", function(evt, event) {
		API_DB.confirm(QCO_S, event.data);
		showOverlay();
	});
	
});
//
function showOverlay() {
    document.getElementById(OVERLAY_ID).removeAttribute("hidden");
    document.getElementById(TITLE_SCO_ID).style.display = "none"
};
//