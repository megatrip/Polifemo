// ---------------------------------------------------------------
// CARICAMENTO DEL MODULO NODE.JS PER GESTIRE IL PERCORSO DEI FILE
// ---------------------------------------------------------------
var path = require("path");
// --------------------------------------------------------------
// VARIABILE PER GESTIRE LA PAUSA DEL CONTROLLO DEL LOCAL STORAGE
// --------------------------------------------------------------
var pausa = false;
// ---------------------------
// CONTROLLO DEL LOCAL STORAGE
// ---------------------------
var controllo = window.setInterval(function() {
	if(!pausa) {
		var proiettore = localStorage["proiettore"];
		var schermoIntero = localStorage["schermo-intero"];
		var dissolvenza = parseFloat(localStorage["dissolvenza"]);
		var oscuramentoImmaginiVideoColoriCodici = localStorage["oscuramento-immagini-video-colori-codici"];
		var sfumaturaSuoni = localStorage["sfumatura-suoni"];
		var oscuramentoTesti = localStorage["oscuramento-testi"];
		var allineamentoTesto = localStorage["allineamento-testo"];
		var click = localStorage["click"];
		var file = localStorage["file"];
		var tipo = localStorage["tipo"];
		var finestraProiettore = nw.Window.get();
		// --------------------------------------
		// CHIUSURA DELLA FINESTRA DEL PROIETTORE
		// --------------------------------------
		if (proiettore == "no") {
			localStorage.setItem("schermo-intero", "no");
			finestraProiettore.close();
		}
		// --------------------------------------------------------------
		// ATTIVAZIONE/DISATTIVAZIONE DELLO SCHERMO INTERO DEL PROIETTORE
		// --------------------------------------------------------------
		if (schermoIntero == "si") {
			finestraProiettore.enterFullscreen();
		}
		else {
			finestraProiettore.leaveFullscreen();
		}
		// ---------------------------------------
		// OSCURAMENTO DI IMMAGINI, VIDEO, COLORI E CODICI
		// ---------------------------------------
		if (oscuramentoImmaginiVideoColoriCodici == "si") {
			// verifica dell'esistenza di un'immagine, di un video, di un colore o di un codice
			if ($("#proiettore-immagini-video-colori-codici").attr("style") || $("#proiettore-immagini-video-colori-codici style").length || $("#proiettore-immagini-video-colori-codici video").length) {
				pausa = true;
				// sfumatura del volume di un eventuale video
				if ($("#proiettore-immagini-video-colori-codici video").length) {
		            $("#proiettore-immagini-video-colori-codici video").animate({volume: 0}, dissolvenza);
		        }
				$("#proiettore-immagini-video-colori-codici").fadeOut(dissolvenza, function() {
					// svuotamento proiettore
					$("#proiettore-immagini-video-colori-codici").empty();
					// eliminazione attibuto style
					$("#proiettore-immagini-video-colori-codici").removeAttr("style");
					localStorage.setItem("oscuramento-immagini-video-colori-codici", "no");
					pausa = false;
				});
			}
			else {
				localStorage.setItem("oscuramento-immagini-video-colori-codici", "no");
				pausa = false;
			}
		}
		// ---------------------
		// OSCURAMENTO DEI TESTI
		// ---------------------
		if (oscuramentoTesti == "si") {
			// verifica dell'esistenza di un testo
			if ($("#proiettore-testi div").length) {
				pausa = true;
				$("#proiettore-testi").fadeOut(dissolvenza, function() {
					// svuotamento proiettore
					$("#proiettore-testi").empty();
					// eliminazione attibuto style
					$("#proiettore-testi").removeAttr("style");
					localStorage.setItem("oscuramento-testi", "no");
					pausa = false;
				});
			}
			else {
				localStorage.setItem("oscuramento-testi", "no");
				pausa = false;
			}
		}
		// -------------------
		// SFUMATURA DEI SUONI
		// -------------------
		if (sfumaturaSuoni == "si") {
			// verifica dell'esistenza di un suono
			if ($("#proiettore-suoni audio").length) {
				pausa = true;
				// sfumatura del volume
				$("#proiettore-suoni audio").animate({volume: 0}, dissolvenza, function() {
					// svuotamento proiettore
	            	$("#proiettore-suoni").empty();
	            	localStorage.setItem("sfumatura-suoni", "no");
	            	pausa = false;
	            });
			}
			else {
				localStorage.setItem("sfumatura-suoni", "no");
            	pausa = false;
			}
		}
		// -----------------------------------------------
		// PROIEZIONE DI UN'IMMAGINE, UN VIDEO O UN COLORE
		// -----------------------------------------------
		if (click == "si" && tipo != "testo" && tipo != "suono") {
			pausa = true;
			localStorage.setItem("click", "no");
			// sfumatura del volume di un eventuale video
			if ($("#proiettore-immagini-video-colori-codici video").length) {
	            $("#proiettore-immagini-video-colori-codici video").animate({volume: 0}, dissolvenza);
	        }
	        // -----------------------------------------------------------------------------------------
	        // CREAZIONE DI UNA COPIA DEL PROIETTORE (PER OTTENERE UN EFFETTO DI DISSOLVENZA INCROCIATA)
	        // -----------------------------------------------------------------------------------------
	        // immagine
	        if (tipo == "immagine") {
				$("body").prepend("<div id=\"proiettore-immagini-video-colori-codici-copia\" style=\"background-image:url('"+file+"')\"></div>");
			}
			// video
	        if (tipo == "video") {
				$("body").prepend("<div id=\"proiettore-immagini-video-colori-codici-copia\"><video src=\""+file+"\"></video></div>");
			}
			// colore
	        if (tipo == "colore") {
				$("body").prepend("<div id=\"proiettore-immagini-video-colori-codici-copia\" style=\"background-color:"+file+"\"></div>");
			}
			// codice
			if (tipo == "codice") {
				$("body").prepend("<div id=\"proiettore-immagini-video-colori-codici-copia\">"+file+"</div>");
			}
			// occultamento proiettore
			$("#proiettore-immagini-video-colori-codici").fadeOut(dissolvenza, function() {
				// eliminazione del proiettore e ridenominazione della copia
				$("#proiettore-immagini-video-colori-codici").remove();
				$("#proiettore-immagini-video-colori-codici-copia").attr("id", "proiettore-immagini-video-colori-codici");
				// avvio di un eventuale video
				if ($("#proiettore-immagini-video-colori-codici video").length) {
					$("#proiettore-immagini-video-colori-codici video")[0].play();
				}
				pausa = false;
			});
		}
		// ------------------------
		// RIPRODUZIONE DI UN SUONO
		// ------------------------
		else if (click == "si" && tipo == "suono") {
			pausa = true;
			localStorage.setItem("click", "no");
			// verifica di un suono preesistente
			if ($("#proiettore-suoni audio").length) {
				// sfumatura volume suono preesistente
	            $("#proiettore-suoni audio").animate({volume: 0}, dissolvenza, function() {
	            	// sostituzione suono e avvio
	            	$("#proiettore-suoni").html("<audio src=\""+file+"\"></audio>");
	            	$("#proiettore-suoni audio")[0].play();
	            });
	        }
	        else {
	        	// inserimento suono e avvio
	        	$("#proiettore-suoni").html("<audio src=\""+file+"\"></audio>");
	        	$("#proiettore-suoni audio")[0].play();
	        }
			pausa = false;
		}
		// ----------------------
		// PROIEZIONE DI UN TESTO
		// ----------------------
		else if (click == "si" && tipo == "testo") {
			pausa = true;
			localStorage.setItem("click", "no");
			// impostazioni stile del carattere
			var dimensione = $(window).height()/10.66;
			var bordo = $(window).height()/240;
			$("#proiettore-testi").css("font-size", dimensione+"px").css("-webkit-text-stroke", bordo+"px #333333");
	        // -----------------------------------------------------------------------------------------
	        // CREAZIONE DI UNA COPIA DEL PROIETTORE (PER OTTENERE UN EFFETTO DI DISSOLVENZA INCROCIATA)
	        // -----------------------------------------------------------------------------------------
			$("#proiettore-testi").before("<div id=\"proiettore-testi-copia\"><div><p>"+file+"</p></div></div>");
			// impostazioni stile del carattere
			$("#proiettore-testi-copia p").css("vertical-align", allineamentoTesto);
			$("#proiettore-testi-copia").css("font-size", dimensione+"px").css("-webkit-text-stroke", bordo+"px #333333").fadeIn(dissolvenza);
			// occultamento del proiettore
			$("#proiettore-testi").fadeOut(dissolvenza, function() {
				// eliminazione del proiettore e ridenominazione della copia
				$("#proiettore-testi").remove();
				$("#proiettore-testi-copia").attr("id", "proiettore-testi");
				pausa = false;
			});
		}
	}
	// ------------------------
	// LOCAL STORAGE PER IL LOG
	// ------------------------
	// immagine
	var logImmagine = $("#proiettore-immagini-video-colori-codici").css("background-image");
	logImmagine = path.basename(logImmagine.replace("url(\"", "").replace("\")", ""));
	if (logImmagine == "none") {
		localStorage.setItem("log-immagine", "");
	}
	else {
		localStorage.setItem("log-immagine", logImmagine);
	}
	// video
	if ($("#proiettore-immagini-video-colori-codici video").length) {
		var logVideo = path.basename($("#proiettore-immagini-video-colori-codici video").attr("src"));
		var durataVideo = $("#proiettore-immagini-video-colori-codici video")[0].duration;
		var avanzamentoVideo = $("#proiettore-immagini-video-colori-codici video")[0].currentTime;
		// conversione durata video da secondi a hh:mm:ss
		var oreDurataVideo = Math.floor(durataVideo/3600);
		var minutiDurataVideo = Math.floor((durataVideo-(oreDurataVideo*3600))/60);
		var secondiDurataVideo = Math.floor(durataVideo-(oreDurataVideo*3600)-(minutiDurataVideo*60));
		var logDurataVideo = (oreDurataVideo < 10 ? "0" + oreDurataVideo : oreDurataVideo);
		logDurataVideo += ":" + (minutiDurataVideo < 10 ? "0" + minutiDurataVideo : minutiDurataVideo);
		logDurataVideo += ":" + (secondiDurataVideo  < 10 ? "0" + secondiDurataVideo : secondiDurataVideo);
		// conversione avanzamento video da secondi a hh:mm:ss
		var oreAvanzamentoVideo = Math.floor(avanzamentoVideo/3600);
		var minutiAvanzamentoVideo = Math.floor((avanzamentoVideo-(oreAvanzamentoVideo*3600))/60);
		var secondiAvanzamentoVideo = Math.floor(avanzamentoVideo-(oreAvanzamentoVideo*3600)-(minutiAvanzamentoVideo*60));
		var logAvanzamentoVideo = (oreAvanzamentoVideo < 10 ? "0" + oreAvanzamentoVideo : oreAvanzamentoVideo);
		logAvanzamentoVideo += ":" + (minutiAvanzamentoVideo < 10 ? "0" + minutiAvanzamentoVideo : minutiAvanzamentoVideo);
		logAvanzamentoVideo += ":" + (secondiAvanzamentoVideo  < 10 ? "0" + secondiAvanzamentoVideo : secondiAvanzamentoVideo);
		// calcolo percentuale avanzamento
		var logPercentualeVideo = Math.floor(avanzamentoVideo/durataVideo*100);
		localStorage.setItem("log-video", logVideo);
		localStorage.setItem("log-durata-video", logDurataVideo);
		localStorage.setItem("log-avanzamento-video", logAvanzamentoVideo);
		localStorage.setItem("log-percentuale-video", logPercentualeVideo+"%");
	}
	else {
		localStorage.setItem("log-video", "");
		localStorage.setItem("log-durata-video", "");
		localStorage.setItem("log-avanzamento-video", "");
		localStorage.setItem("log-percentuale-video", "");
	}
	// suono
	if ($("#proiettore-suoni audio").length) {
		var logAudio = path.basename($("#proiettore-suoni audio").attr("src"));
		var durataAudio = $("#proiettore-suoni audio")[0].duration;
		var avanzamentoAudio = $("#proiettore-suoni audio")[0].currentTime;
		// conversione durata audio da secondi a hh:mm:ss
		var oreDurataAudio = Math.floor(durataAudio/3600);
		var minutiDurataAudio = Math.floor((durataAudio-(oreDurataAudio*3600))/60);
		var secondiDurataAudio = Math.floor(durataAudio-(oreDurataAudio*3600)-(minutiDurataAudio*60));
		var logDurataAudio = (oreDurataAudio < 10 ? "0" + oreDurataAudio : oreDurataAudio);
		logDurataAudio += ":" + (minutiDurataAudio < 10 ? "0" + minutiDurataAudio : minutiDurataAudio);
		logDurataAudio += ":" + (secondiDurataAudio  < 10 ? "0" + secondiDurataAudio : secondiDurataAudio);
		// conversione avanzamento audio da secondi a hh:mm:ss
		var oreAvanzamentoAudio = Math.floor(avanzamentoAudio/3600);
		var minutiAvanzamentoAudio = Math.floor((avanzamentoAudio-(oreAvanzamentoAudio*3600))/60);
		var secondiAvanzamentoAudio = Math.floor(avanzamentoAudio-(oreAvanzamentoAudio*3600)-(minutiAvanzamentoAudio*60));
		var logAvanzamentoAudio = (oreAvanzamentoAudio < 10 ? "0" + oreAvanzamentoAudio : oreAvanzamentoAudio);
		logAvanzamentoAudio += ":" + (minutiAvanzamentoAudio < 10 ? "0" + minutiAvanzamentoAudio : minutiAvanzamentoAudio);
		logAvanzamentoAudio += ":" + (secondiAvanzamentoAudio  < 10 ? "0" + secondiAvanzamentoAudio : secondiAvanzamentoAudio);
		// calcolo percentuale avanzamento
		var logPercentualeAudio = Math.floor(avanzamentoAudio/durataAudio*100);
		localStorage.setItem("log-audio", logAudio);
		localStorage.setItem("log-durata-audio", logDurataAudio);
		localStorage.setItem("log-avanzamento-audio", logAvanzamentoAudio);
		localStorage.setItem("log-percentuale-audio", logPercentualeAudio+"%");
	}
	else {
		localStorage.setItem("log-audio", "");
		localStorage.setItem("log-durata-audio", "");
		localStorage.setItem("log-avanzamento-audio", "");
		localStorage.setItem("log-percentuale-audio", "");
	}
	// colore
	var logColore = $("#proiettore-immagini-video-colori-codici").css("background-color");
	localStorage.setItem("log-colore", logColore);
	// testo
	if ($("#proiettore-testi div p").length) {
		var logTesto = $("#proiettore-testi div p").text();
		var logAllineamentoTesto = $("#proiettore-testi div p").css("vertical-align");
		localStorage.setItem("log-testo", logTesto);
		localStorage.setItem("log-allineamento-testo", logAllineamentoTesto);
	}
	else {
		localStorage.setItem("log-testo", "");
		localStorage.setItem("log-allineamento-testo", "");
	}
	// codice
	if ($("#proiettore-immagini-video-colori-codici style").length) {
		var logCodice = $("#proiettore-immagini-video-colori-codici span").text();
		localStorage.setItem("log-codice", logCodice);
	}
	else {
		localStorage.setItem("log-codice", "");
	}
}, 250);
// ------------------------------------------------------
// STILE DEL CARATTERE CON IL PROIETTORE A SCHERMO INTERO
// ------------------------------------------------------
$(window).on("resize", function() {
	var dimensione = $(window).height()/10.66;
	var bordo = $(window).height()/240;
	$("#proiettore-testi").css("font-size", dimensione+"px").css("-webkit-text-stroke", bordo+"px #333333");
});
// ---------------------------------------------------------
// PRESSIONE DEL TASTO ESC PER DISATTIVARE LO SCHERMO INTERO
// ---------------------------------------------------------
$(document).keyup(function(e) {
	if (e.keyCode === 27) {
		localStorage.setItem("schermo-intero", "no");
	}
});