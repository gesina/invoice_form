/********************************
 
 RECHNUNGSERSTELLER
 Briefoptionen-Datei

**********************************/

// DATEN
//----------------------------------------

var optionfilename="tex_letteroptions";

var komavars={
	fromname:"Max Mustermann",
	fromphone:"+49 999 000000",
	fromaddress:"Beispielstraße 1\\\\11111 Beispielstadt",
	fromemail:"max.mustermann@gmail.com",
	frommobilephone:"+49 199 000000",
	fromurl:"www.xxx.de",
	place:"Regensburg",
	signature:"\\usekomavar{fromname}",
	// Leere variablen werden nicht gesetzt
	fromfax:"",
	title:"",
	adressee:"",     // Name, Anschrift im Anschriftfenster
	toaddress:"",    // Empfänger Straße, Empfänger Ort
	backaddress:"",  // Rückadresse für Brieffenster (nur falls anders als oben)
	yourref:"",      // Datumszeile: "Ihr Zeichen"
	yourmail:"",     // Datumszeile: "Ihr Schreiben"
	myref:"",        // Datumszeile: "Unser Zeichen"
	firsthead:""     // Zusatztext unter der Kopfzeile
};

// Für die Fußzeile
var bank="Example Bank";
var IBAN="DE00\\,0000\\,0000\\,0000\\,0000\\,00";
var BIC="XXXXXX0XXX";
var UST_ID_Nr = "DE000000000"; // UST-ID-Nr.


// EINSTELLUNGEN
//---------------------------------------

var komaoptions = "\\KOMAoptions{%\n"
    +"  foldmarks=true,%\n"
	+"  % fromphone,frommobilephone,fromemail,fromlogo,%\n"
	+"  fromlogo,\n"
	+"  fromrule=afteraddress,%\n"
	+"  fromalign=left,%\n"
	+"  % firsthead, % aktiviert Briefkopf trotz locationleft\n"
	+"  % symbolicnames=true,% Symbole statt Bezeichner (Telefon etc.)\n"
	+"  locfield=wide,%\n"
	+"  firstfoot=true,\n"
	+"}\n";


// Tabelle mit Bankverbindung
var komavar_frombank = "\\setkomavar{frombank}[Bankverbindung]{%\n"
	+"  \\begin{tabular}[t]{@{}l@{~}l@{}}\n"
	+"    % \\multicolumn{2}{@{}l@{}}{\\textbf{Bankverbindung:}}\\\\\n"
	+"    Kontoinh.: & {\\ttfamily\\usekomavar{fromname}} \\\\\n"
	+"    % {Institut:} & {\\ttfamily "+bank+"} \\\\\n"
	+"    {IBAN:} & {\\ttfamily "+IBAN+"} \\\\\n"
	+"    {BIC:} & {\\ttfamily "+BIC+"}%\n"
	+"  \\end{tabular}\n"
	+"}\n";

// Tabelle in der Fußzeile mit Bankverbindung und UST-ID-Nr.
var komavar_firstfoot = "\\setkomavar{firstfoot}{%\n"
	+"  \\parbox[t]{\\textwidth}{%\n"
	+"    \\footnotesize\n"
	+"	\\begin{tabular}[t]{l@{}}%\n"
	+"      \\usekomavar*{fromemail}\\usekomavar{fromemail}\\\\\n"
	+"      \\usekomavar*{frommobilephone}\\usekomavar{frommobilephone}\\\\\n"
	+"      \\usekomavar*{fromphone}\\usekomavar{fromphone}	\n"
	+"	\\end{tabular}\n"
	+"	\\hfill\n"
	+"	\\begin{tabular}[t]{l@{}}%\n"
	+"      UST-ID-Nr.: \\texttt{"+UST_ID_Nr+"}\n"
	+"	\\end{tabular}\n"
	+"	\\hfill\n"
	+"	\\usekomavar{frombank}\n"
	+"  }\n"
	+"}\n";

// Feld rechts über dem Datum mit Kontaktdaten
var komavar_location = "";
/* z.B. 
   "\\setkomavar{location}{%\n"
	+"\\small\n"
	+"\\textbf{Kontakt:}\\\\\n"
	+"\\usekomavar*{fromemail}\\usekomavar{fromemail}\\\\\n"
	+"\\usekomavar*{frommobilephone}\\usekomavar{frommobilephone}\\\\\n"
	+"\\usekomavar*{fromphone}\\usekomavar{fromphone}\n"
	+"\\usekomavar*{frombank}\\\\\n"
	+"\\usekomavar{frombank}%\n"
	+"}\n";
*/


// TEXTGENERIERUNG
//--------------------------------------------
var komavars_text="";
for(var komavar in komavars) {
	if(komavars[komavar]){
		komavars_text+="\\setkomavar{"+komavar+"}{"+komavars[komavar]+"}\n";
	}
}
komavars_text+=komavar_frombank + komavar_firstfoot + komavar_location;


var options= "\\ProvidesFile{"
	+ optionfilename + ".lco}\n"
	+ komaoptions
	+ komavars_text;

