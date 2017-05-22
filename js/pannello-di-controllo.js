// ------------------
// DIMENSIONI DEL MONITOR
// ------------------
var altezza = window.screen.availHeight;
var larghezza = window.screen.availWidth;
// ------------------------------------------------------------
// IMPOSTAZIONI DELLA FINESTRA DEL PANNELLO DI CONTROLLO
// ------------------------------------------------------------
var finestraControllo = nw.Window.get();
finestraControllo.moveTo(0, 0);
finestraControllo.resizeTo(760, 80);
finestraControllo.setAlwaysOnTop(true);
finestraControllo.setResizable(false);
finestraControllo.show(true);
// ---------------------------------------------
// IMPOSTAZIONI DEI VALORI DI DEFAULT DEL LOCAL STORAGE
// ---------------------------------------------
localStorage.setItem("media", "no");
localStorage.setItem("proiettore", "no");
localStorage.setItem("schermo-intero", "no");
if (localStorage.getItem("dissolvenza") === null) {
	localStorage.setItem("dissolvenza", "1000");
}
var dissolvenza = parseFloat(localStorage["dissolvenza"])/1000;
$("#dissolvenza").text(dissolvenza);
localStorage.setItem("oscuramento-immagini-video-colori-codici", "no");
localStorage.setItem("oscuramento-testi", "no");
localStorage.setItem("allineamento-testo", "middle");
var allineamentoTesto = localStorage["allineamento-testo"];
$("#"+allineamentoTesto).attr("data-click", 1);
localStorage.setItem("sfumatura-suoni", "no");
localStorage.setItem("click", "no");
localStorage.setItem("file", undefined);
// ---------------------------------------------------------------
// CONTROLLO DEL LOCAL STORAGE DELLO SCHERMO INTERO DEL PROIETTORE
// ---------------------------------------------------------------
setInterval(function() {
	var schermoIntero = localStorage["schermo-intero"];
	if (schermoIntero == "no") {
		$("#schermo-intero").attr("data-click", 0);
	}
}, 250);
// --------------------------------------------------------------------
// APERTURA/CHIUSURA E IMPOSTAZIONI DELLA FINESTRA DELLA CARTELLA MEDIA
// --------------------------------------------------------------------
$("#media").on("click",function() {
	if($(this).attr("data-click") == 0) {
		$(this).attr("data-click", 1);
		localStorage.setItem("media", "si");
		nw.Window.open("media.html", {show: false}, function(finestraMedia) {
			finestraMedia.moveTo(0, altezza-600);
			finestraMedia.resizeTo(800, 600);
			finestraMedia.show(true);
		});
	} 
	else {
		$(this).attr("data-click", 0);
		localStorage.setItem("media", "no");
	}
});
// --------------------------------------------------------------
// APERTURA/CHIUSURA E IMPOSTAZIONI DELLA FINESTRA DEL PROIETTORE
// --------------------------------------------------------------
$("#proiettore").on("click",function() {
	if($(this).attr("data-click") == 0) {
		$(this).attr("data-click", 1);
		localStorage.setItem("proiettore", "si");
		nw.Window.open("proiettore.html", {show: false, always_on_top: true}, function(finestraProiettore) {
			finestraProiettore.moveTo(larghezza-320, 0);
			finestraProiettore.resizeTo(320, 240);
			finestraProiettore.show(true);
			//finestraProiettore.setResizable(false);
		});
	} 
	else {
		$(this).attr("data-click", 0);
		localStorage.setItem("proiettore", "no");
	}
});
// -----------------------------------------------
// ATTIVAZIONE/DISATTIVAZIONE DELLO SCHERMO INTERO
// -----------------------------------------------
$("#schermo-intero").on("click",function() {
	if($(this).attr("data-click") == 0) {
		$(this).attr("data-click", 1);
		localStorage.setItem("schermo-intero", "si");
	} 
	else {
		$(this).attr("data-click", 0);
		localStorage.setItem("schermo-intero", "no");
	}
});
// -------------------------------------------
// IMPOSTAZIONE DELLA DURATA DELLA DISSOLVENZA
// -------------------------------------------
$("#piu").click(function() {
	dissolvenza+= 0.5;
	if (dissolvenza > 10) {
		dissolvenza = 10;
	}
	$("#dissolvenza").text(dissolvenza);
	localStorage.setItem("dissolvenza", dissolvenza*1000);
	console.log(localStorage["dissolvenza"]);
});
$("#meno").click(function() {
	dissolvenza-= 0.5;
	if (dissolvenza < 0) {
		dissolvenza = 0;
	}
	$("#dissolvenza").text(dissolvenza);
	localStorage.setItem("dissolvenza", dissolvenza*1000);
});
// --------------------------------------------------------
// ATTIVAZIONE DELL'OSCURAMENTO DI IMMAGINI, VIDEO E COLORI
// --------------------------------------------------------
$("#oscuramento-immagini-video-colori-codici").click(function() {
	localStorage.setItem("oscuramento-immagini-video-colori-codici", "si");
});
// -------------------------------------
// ATTIVAZIONE DELLA SFUMATURA DEI SUONI
// -------------------------------------
$("#sfumatura-suoni").click(function() {
	localStorage.setItem("sfumatura-suoni", "si");
});
// --------------------------------------
// ATTIVAZIONE DELL'OSCURAMENTO DEI TESTI
// --------------------------------------
$("#oscuramento-testi").click(function() {
	localStorage.setItem("oscuramento-testi", "si");
});
// --------------------------------------
// ALLINEAMENTO DEI TESTI
// --------------------------------------

$("#top").on("click",function() {
	if($(this).attr("data-click") == 0) {
		$(this).attr("data-click", 1);
		$("#middle").attr("data-click", 0);
		$("#bottom").attr("data-click", 0);
		localStorage.setItem("allineamento-testo", "top");
	} 
});
$("#middle").on("click",function() {
	if($(this).attr("data-click") == 0) {
		$(this).attr("data-click", 1);
		$("#top").attr("data-click", 0);
		$("#bottom").attr("data-click", 0);
		localStorage.setItem("allineamento-testo", "middle");
	} 
});
$("#bottom").on("click",function() {
	if($(this).attr("data-click") == 0) {
		$(this).attr("data-click", 1);
		$("#top").attr("data-click", 0);
		$("#middle").attr("data-click", 0);
		localStorage.setItem("allineamento-testo", "bottom");
	} 
});
// --------------------------------------------------------------
// APERTURA/CHIUSURA E IMPOSTAZIONI DELLA FINESTRA DEL LOG
// --------------------------------------------------------------
$("#log").on("click",function() {
	if($(this).attr("data-click") == 0) {
		$(this).attr("data-click", 1);
		localStorage.setItem("log", "si");
		nw.Window.open("log.html", {show: false}, function(finestraLog) {
			finestraLog.moveTo(larghezza-(larghezza-800), altezza-320);
			finestraLog.resizeTo(larghezza-800, 320);
			finestraLog.show(true);
		});
	} 
	else {
		$(this).attr("data-click", 0);
		localStorage.setItem("log", "no");
	}
});
// ---------------------------------------------------------
// PRESSIONE DEL TASTO ESC PER DISATTIVARE LO SCHERMO INTERO
// ---------------------------------------------------------
$(document).keyup(function(e) {
	if (e.keyCode === 27) {
		localStorage.setItem("schermo-intero", "no");
	}
});
