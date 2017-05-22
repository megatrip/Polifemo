// ---------------------------
// CONTROLLO DEL LOCAL STORAGE
// ---------------------------
setInterval(function() {
	// chiusura finestra della cartella media
	var finestraMedia = nw.Window.get();
	var media = localStorage["media"];
	if (media == "no") {
		finestraMedia.close();
	}
	// opacità icone dopo oscuramento e sfumatura
	if (localStorage["oscuramento-immagini-video-colori-codici"] == "si") {
		$(".immagine, .video, .colore, .codice").css("opacity", "0.35");
	}
	if (localStorage["sfumatura-suoni"] == "si") {
		$(".audio").css("opacity", "0.35");
	}
	if (localStorage["oscuramento-testi"] == "si") {
		$(".testo").css("opacity", "0.35");
	}
}, 250);
// ------------------------------------------------------------------
// CARICAMENTO DEI MODULI NODE.JS PER LA LETTURA DELLA CARTELLA MEDIA
// ------------------------------------------------------------------
var fs = require("fs");
var path = require("path");
// ------------------------------------------------
// INDIVIDUAZIONE DEL PERCORSO ASSOLUTO DI POLIFEMO
// ------------------------------------------------
var root = process.env.PWD+"/Polifemo/";
// -------------------------------------------------------
// CREAZIONE DEGLI ARRAY PER I FORMATI DEI FILE CONSENTITI
// -------------------------------------------------------
var testi = [".txt"];
var immagini = [".jpg", ".JPG", ".jpeg", ".JPEG", ".png", ".PNG", ".gif", ".GIF", ".svg", ".SVG"];
var video = [".mp4", ".MP4", ".webm", ".WEBM", ".ogg", ".OGG", ".ogv", ".OGV"];
var audio = [".mp3", ".MP3", ".wav", ".WAV"];
var codici = [".html"];
// ----------------------------
// LETTURA DELLA CARTELLA MEDIA
// ----------------------------
var media_dir = root+"media/";
var file = fs.readdirSync(media_dir);
// -------------------------
// SUDDIVISIONE TIPI DI FILE
// -------------------------
for (var i in file) {
	var stats = fs.statSync(media_dir+"/"+file[i]);
	if (stats.isFile()) {
		// immagini
		if ($.inArray(path.extname(file[i]), immagini) !== -1) {
			var url = "file:///"+media_dir+file[i];
			$("#immagini").append("<li><img class=\"immagine\" src=\""+url+"\"><span>"+file[i]+"</span></li>");
		}
		// video
		else if ($.inArray(path.extname(file[i]), video) !== -1) {
			var url = "file:///"+media_dir+file[i];
			var poster = "file:///"+media_dir+"video-thumbs/"+path.basename(file[i], path.extname(file[i]))+".png";
			$("#video").append("<li><video class=\"video\" src=\""+url+"\" poster=\""+poster+"\"></video><span>"+file[i]+"</span></li>");
		}
		// colori
		else if (path.extname(file[i]) == "") {
			var colori = fs.readFileSync(media_dir+file[i], "utf-8").toString().split("\n");
			$.each(colori, function(indice, valore) {
				$("#colori").append("<li><div class=\"colore\" style=\"background-color:"+valore+";\"></div><span>"+valore+"</span></li>");
			});
		}
		// suoni
		else if ($.inArray(path.extname(file[i]), audio) !== -1) {
			var url = "file:///"+media_dir+file[i];
			$("#audio").append("<li><div class=\"audio\" data-audio=\""+url+"\"></div><span>"+file[i]+"</span></li>");
		}
		// testi
		else if ($.inArray(path.extname(file[i]), testi) !== -1) {
			var titolo = path.basename(file[i], path.extname(file[i]));
			$("#testi").append("<li><p class=\"testo\">"+titolo+"</p><span>"+file[i]+"</span></li>");
		}
		// codici
		else if ($.inArray(path.extname(file[i]), codici) !== -1) {
			var nome = path.basename(file[i], path.extname(file[i]));
			var folder = "file:///"+media_dir+"code_elements/";
			var icona = folder+nome+"_thumbnail.svg";
			$("#codici").append("<li><img class=\"codice\" src=\""+icona+"\"><span>"+file[i]+"</span></li>");
		}
	}
}
// ----------------------------
// ELIMINAZIONE CATEGORIE VUOTE
// ----------------------------
$("ul").each(function() {
	if ($(this).find("li").length == 0) {
		var name = $(this).attr("id");
		var name = $(this).attr("id").charAt(0).toUpperCase()+name.slice(1);
		$("h1:contains("+name+")").css("display", "none");
	}
});
// -----------------------
// EVENTI DEI TIPI DI FILE
// -----------------------
// immagini
$(".immagine").each(function() {
	$(this).click(function() {
		$(".immagine, .video, .colore, .codice").css("opacity", "0.35");
		$(this).css("opacity", "1");
		var src = $(this).attr("src");
		localStorage.setItem("click", "si");
		localStorage.setItem("file", src);
		localStorage.setItem("tipo", "immagine");
	});
});
// video
$(".video").each(function() {
	$(this).click(function() {
		$(".immagine, .video, .colore, .codice").css("opacity", "0.35");
		$(this).css("opacity", "1");
		var src = $(this).attr("src");
		localStorage.setItem("click", "si");
		localStorage.setItem("file", src);
		localStorage.setItem("tipo", "video");
	});
});
// suoni
$(".audio").each(function() {
	$(this).click(function() {
		$(".audio").css("opacity", "0.35");
		$(this).css("opacity", "1");
		var src = $(this).data("audio");
		localStorage.setItem("click", "si");
		localStorage.setItem("file", src);
		localStorage.setItem("tipo", "suono");
	});
});
// colori
$(".colore").each(function() {
	$(this).click(function() {
		$(".immagine, .video, .colore, .codice").css("opacity", "0.35");
		$(this).css("opacity", "1");
		var src = $(this).next("span").text();
		localStorage.setItem("click", "si");
		localStorage.setItem("file", src);
		localStorage.setItem("tipo", "colore");
	});
});
// testi
$(".testo").each(function() {
	$(this).click(function() {
		$(".testo").css("opacity", "0.35");
		$(this).css("opacity", "1");
		var nomeFile = $(this).next("span").text();
		var src = fs.readFileSync(media_dir+nomeFile, "utf-8");
		localStorage.setItem("click", "si");
		localStorage.setItem("file", src);
		localStorage.setItem("tipo", "testo");
	});
});
// codici
$(".codice").each(function() {
	$(this).click(function() {
		$(".immagine, .video, .colore, .codice").css("opacity", "0.35");
		$(this).css("opacity", "1");
		var nomeFile = $(this).next("span").text();
		var src = fs.readFileSync(media_dir+nomeFile, "utf-8");
		localStorage.setItem("click", "si");
		localStorage.setItem("file", src);
		localStorage.setItem("tipo", "codice");
	});
});
// ----------------------------------------
// DIMENSIONE DEGLI ELEMENTI COLORE E AUDIO
// ----------------------------------------
$(window).on("load", function() {
	var dimensioneColore = $(".colore").width();
	var dimensioneAudio = $(".audio").width();
	$(".colore").css("height", dimensioneColore+"px");
	$(".audio").css("height", dimensioneAudio+"px");
});
$(window).on("resize", function() {
	var dimensioneColore = $(".colore").width();
	var dimensioneAudio = $(".audio").width();
	$(".colore").css("height", dimensioneColore+"px");
	$(".audio").css("height", dimensioneAudio+"px");
});
// -------------------------------------------------------------------------
// PRESSIONE DEL TASTO ENTER PER RICARICARE LA FINESTRA DELLA CARTELLA MEDIA
// -------------------------------------------------------------------------
$(document).keyup(function(e) {
	var finestraMedia = nw.Window.get();
	if (e.keyCode === 116) {
		finestraMedia.reload();
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
