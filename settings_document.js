/********************************
 
 RECHNUNGSERSTELLER
 Dokumenteinstellungen-Datei

**********************************/


var documentclass="\\documentclass"
    + "[german,fontsize=11pt,paper=a4,parskip=half]"
    + "{scrlttr2}\n"; // !! do not change this!

var packages= //
	// encondings (utf8 input-encoding, 8-bit font encoding)
	"\\usepackage[utf8]{inputenc}\n\\usepackage[T1]{fontenc}\n"
	// language specifics
	+"\\usepackage{babel}\n"
	// font (Latin Modern with microtypographic optimisations)
	+"\\usepackage{lmodern,microtype}\n"
    // colors, media
	+"\\usepackage{graphicx,color}\n"
    // more symbols (€-sign)
	+"\\usepackage{marvosym}\n"
    // tables
	+"\\usepackage{booktabs,tabularx}\n";

// stuff before beginning of document
var styles= "";
/* e.g. "\\definecolor{kellygreen}{rgb}{0.3, 0.73, 0.09}\n" */
