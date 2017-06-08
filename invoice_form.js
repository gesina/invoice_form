/********************************
 
 RECHNUNGSERSTELLER
 Javascriptdatei
 Copyright by Gesina Schwalbe

**********************************/


var entries=0;

var text_datum_zu_manuell = "M";
var text_datum_zu_auto = "A";


// SET SIGNATURE 
$('#unterschrift').text(komavars['fromname']);

// OPERATIONS ON THE TABLE
var recalculate_totals = function(id){
	$('#'+id+'total').val(Number($('#'+id+'menge').val())*Number($('#'+id+'europroeinheit').val()));
	
	var total=0;
	for(var j=0; j<entries; j++){
		total = total+Number($('#'+j+'total').val());
	};
	$('#netto').val(total);
	$('#mwstsatz').val(total*Number($('#mwst').val()/100));
	$('#brutto').val(total+total*Number($('#mwst').val()/100));
};	

var add_entry=function(){
	var j=entries;
	
	var tr=$('<tr id="'+entries+'zeile">').appendTo($('#rechnungstabelle'));
	// Datum
	var tddatum=$('<td>')
			.attr("style", "white-space: nowrap;")
			.appendTo(tr);
	$('<button id="'+entries+'altdatum" type="button">')
		.html(text_datum_zu_manuell)
		.on('click', function(){
			// Datumseingabe manuell
			if((this).innerHTML==text_datum_zu_manuell)
			{
				(this).innerHTML = text_datum_zu_auto;
				$('#'+j+'datum').attr("type", "text").val("");
			}
			// Datumseingabe mit Browserunterstützung
			else
			{
				(this).innerHTML=text_datum_zu_manuell;
				$('#'+j+'datum').attr("type", "date").val("");
			};
		})
		.appendTo(tddatum);
	$('<input id="'+entries+'datum" type="date">')
		.appendTo(tddatum);
	// Bezeichnung
	$('<input id="'+entries+'bezeichnung" type="text">')
		.appendTo($('<td>').appendTo(tr));
	// Menge
	$('<input id="'+entries+'menge" type="number" class="num">')
		.on('change', function(){recalculate_totals(j);})
		.appendTo($('<td>').appendTo(tr));
	// Einheit
	$('<input id="'+entries+'einheit" type="text" class="num">')
		.appendTo($('<td>').appendTo(tr));
	// Euro pro Einheit
	$('<input id="'+entries+'europroeinheit" type="number" class="num">')
		.on('change', function(){recalculate_totals(j);})
		.appendTo($('<td>').appendTo(tr));
	// Total
	$('<input id="'+entries+'total" type="number" class="num" readonly>')
		.appendTo($('<td>').appendTo(tr));
	// Entfernen Button
	var trbutton=$('<td>')
			.appendTo(tr);
	$('<button id="'+entries+'-" type="button">-</button>')
		.on('click', function(){remove_entry(j);})
		.appendTo(trbutton);
	entries=entries+1;
};

var remove_entry = function(id){
	$('#'+id+'zeile').remove();
};


// EVENTHANDLER
add_entry();

$('#neuezeile').on('click', function(){
	add_entry();
});

$('#download_rechnung').on('click', function(){
	var name=$('#dateiname').val();
	if(!name){name="rechnung";};
	download_document(name);
});

$('#download_logo').on('click', function(){
	download_logo();
});

$('#download_lco').on('click', function(){
	download_lco();
});

$('#altdatum').on('click', function(){
			// Datumseingabe manuell
			if((this).innerHTML==text_datum_zu_manuell)
			{
				(this).innerHTML = text_datum_zu_auto;
				$('#datum').attr("type", "text").val("");
			}
			// Datumseingabe mit Browserunterstützung
			else
			{
				(this).innerHTML=text_datum_zu_manuell;
				$('#datum').attr("type", "date").val("");
			};
});

$('#rechnungsnummer').on('change', function(){
	$('#dateiname').val((this).value);
});


// TEXT HANDLING

var proper_date=function(d){
	if(!d){ return "";};
	
	var day = d.getDate().toString();
	var month = (d.getMonth()+1).toString();
	var year = d.getFullYear();
	if(!day || !month || !year) {return "";};

	// führende Nullen
	if(day.length == 1){day= "0"+ day;};
	if(month.length==1){month= "0"+ month;};
	
	return day +"."+ month +"."+ year;
};


var replace_chars=function(string){
	if(!string){return "";};
	return string
		.replace(/&/g, '\\&')
		.replace(/%/g, '\\%');
};


// TEXT CREATION

var create_table=function(){
	var table="\n\n\\bigskip\n"
		+"\\renewcommand{\\thempfootnote}{$\\ast$}\n"
		+"\\begin{minipage}{\\textwidth}\n"
		+"\\begin{tabularx}{\\linewidth}{lXrrrr}\n"
		+"\\textbf{Datum} & \\textbf{Bezeichnung} & \\textbf{Menge} &"
		+"\\textbf{Einheit} & \\textbf{\\EUR /Einheit} & \\textbf{Total in \\EUR }\\\\\\toprule\n";
	for(var i=0; i<entries; i++){
		// Neuberechnung
		recalculate_totals(i);
		// Date
		var datum= $('#'+i+'datum').val();
		if($('#'+i+'altdatum').html()==text_datum_zu_manuell){
			var datum= proper_date(new Date(datum));
		};

		if(i!=0){table= table + "\\\\ \\cmidrule(lr){1-6}\n";};
		table=table + datum
			+" & " + replace_chars($('#'+i+'bezeichnung').val())
			+" & " + $('#'+i+'menge').val()
			+" & " + replace_chars($('#'+i+'einheit').val())
			+" & " + Number($('#'+i+'europroeinheit').val()).toFixed(2).toString()
			+" & " + Number($('#'+i+'total').val()).toFixed(2).toString();		
	};
	table=table + "\\\\ \\cmidrule[1pt]{1-6}\n"
		+ "\\multicolumn{5}{r}{\\textbf{Zwischensumme}} &"
		+ Number($('#netto').val()).toFixed(2) +"\\\\\n"
		+ "\\multicolumn{5}{r}{MwST%\n"
		+ "\\footnote{%\n"
		+ "MwST / SC: EB = EU-Leistungsaustausch / prestations intercommunautaire\n"
		+ "}%\n"
		+ Number($('#mwst').val()).toFixed(0) +"\\%} & "
		+ Number($('#mwstsatz').val()).toFixed(2) + "\\\\\n"
		+ "\\multicolumn{5}{r}{\\textbf{Endsumme Brutto}} & "
		+ Number($('#brutto').val()).toFixed(2)
		+ "\n\\end{tabularx}\n"
		+ "\\end{minipage}\n\n\\bigskip\n";
	return table;
};

var create_address=function(){
	return replace_chars($('#empfaenger').val())
		+" ~\\\\ "+ replace_chars($('#strasse').val())
		+" ~\\\\ "+ replace_chars($('#stadt').val())
		+" ~\\\\ "+ replace_chars($('#land').val());
};



var create_document=function(){
	// preamble (see dokumenteneinstellungen.js):
	var document = documentclass + packages + styles; 

	// Logo
	document=document +"\\setkomavar{fromlogo}{\\includegraphics["
	    + logoscaleoptions
		+ "]{"+logofilename+"}}\n";
	
	// Infozeile
	var kundennr = replace_chars($('#kundennummer').val());
	var rechnungsnummer=replace_chars($('#rechnungsnummer').val());
	var datum=$('#datum').val();
	if($('#altdatum').html()==text_datum_zu_manuell){
		datum=proper_date(new Date(datum));
	};
	if(kundennr){
		document=document +"\\setkomavar{customer}{"+kundennr+"}\n";
	};
	if(rechnungsnummer){
		document=document +"\\setkomavar{invoice}{"+rechnungsnummer+"}\n";
	};
	if(datum){
		document=document +"\\setkomavar{date}{"+datum+"}\n";
	}
	else{
		document=document +"\\setkomavar{date}{\\today}\n";
	};

	// Betreff
	document=document +"\\setkomavar{subject}{"+$('#betreff').val() +"}\n\n";

	// Rest
	document=document
		+"\\begin{document}\n"
		+"\\begin{letter}{" + create_address() + "}\n"
		+"\\LoadLetterOptions{DIN,"+optionfilename+"}\n"
		+"\n\\enlargethispage{7\\baselineskip}\n\n"
		+"\\opening{" +$('#anrede').val() +"}\n\n"
		+ $('#text').val()
		+ create_table()
		+ "\n"+ $('#zahlungshinweis').val() +"\n\n"
		+ "\\closing{"+ $('#grusswort').val()+"}\n";
	if($('#anhang').val()){
		document=document +"\\encl{" + $('#anhang').val() +"}\n";
	};
	document=document
		+ "\\end{letter}\n"
		+ "\\end{document}\n";
	
	return document;
};



// DOWNLOADS

var download_document =function(name){
	// download link with URI-encoded html-text
	var doc = $('<a>')
			.attr({'href' : 'data:text/plain;charset=utf-8,'
				   //URI encoding
				   + encodeURIComponent(create_document()),
				   'download' : name+".tex"
				  });
	
	//execute downloads
	doc.get(0).click();
};

var download_logo = function(){
	var logo = $('<a>')
			.attr({'href' : image_uri,
				   'download' : logofilename + logofileending
				  });

	//execute download
	logo.get(0).click();
};


var download_lco = function(){
	var lco =$('<a>')
			.attr({'href' : 'data:text/plain;charset=utf-8,'
				   //URI encoding
				   + encodeURIComponent(options),
				   'download' : optionfilename +".lco"
				  });
	
	//execute download
	lco.get(0).click();
};

