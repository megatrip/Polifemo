// ---------------------------------------------------------------
// CARICAMENTO DEL MODULO NODE.JS PER GESTIRE IL PERCORSO DEI FILE
// ---------------------------------------------------------------
var path = require("path");
// ---------------------------
// CONTROLLO DEL LOCAL STORAGE
// ---------------------------
setInterval(function() {
	// -------------------------------
	// CHIUSURA DELLA FINESTRA DEL LOG
	// -------------------------------
	var finestraLog = nw.Window.get();
	var log = localStorage["log"];
	if (log == "no") {
		finestraLog.close();
	}
	// ---------------------------
	// CONTROLLO DEL LOCAL STORAGE
	// ---------------------------
	// immagine
	var logImmagine = localStorage["log-immagine"];
	$("#log-immagine").html("<b>Immagine: </b>"+logImmagine);
	// video
	var logVideo = localStorage["log-video"];
	$("#log-video").html("<b>Video: </b>"+logVideo);
	var logDurataVideo = localStorage["log-durata-video"];
	$("#log-durata-video").html("<b>Durata: </b>"+logDurataVideo);
	var logAvanzamentoVideo = localStorage["log-avanzamento-video"];
	$("#log-avanzamento-video").html("<b>Avanzamento: </b>"+logAvanzamentoVideo);
	var logPercentualeVideo = localStorage["log-percentuale-video"];
	$("#log-percentuale-video").html("<b>Percentuale: </b>"+logPercentualeVideo);
	// audio
	var logAudio = localStorage["log-audio"];
	$("#log-audio").html("<b>Audio: </b>"+logAudio);
	var logDurataAudio = localStorage["log-durata-audio"];
	$("#log-durata-audio").html("<b>Durata: </b>"+logDurataAudio);
	var logAvanzamentoAudio = localStorage["log-avanzamento-audio"];
	$("#log-avanzamento-audio").html("<b>Avanzamento: </b>"+logAvanzamentoAudio);
	var logPercentualeAudio = localStorage["log-percentuale-audio"];
	$("#log-percentuale-audio").html("<b>Percentuale: </b>"+logPercentualeAudio);
	// colore
	var logColore = localStorage["log-colore"];
	$("#log-colore").html("<b>Colore: </b><span style='background-color:"+logColore+";'></span>");
	// testo
	var logTesto = localStorage["log-testo"];
	$("#log-testo").html("<b>Testo: </b>"+logTesto);
	var logAllineamentoTesto = localStorage["log-allineamento-testo"];
	if (logAllineamentoTesto == "top") {
		var logAllineamentoTesto = "alto";
	}
	else if (logAllineamentoTesto == "middle") {
		var logAllineamentoTesto = "centro";
	}
	else if (logAllineamentoTesto == "bottom") {
		var logAllineamentoTesto = "basso";
	}
	$("#log-allineamento-testo").html("<b>Allineamento: </b>"+logAllineamentoTesto);
	// codice
	var logCodice = localStorage["log-codice"];
	$("#log-codice").html("<b>Codice: </b>"+logCodice);
}, 250);
// ---------------------------------------------------------
// PRESSIONE DEL TASTO ESC PER DISATTIVARE LO SCHERMO INTERO
// ---------------------------------------------------------
$(document).keyup(function(e) {
	if (e.keyCode === 27) {
		localStorage.setItem("schermo-intero", "no");
	}
});