# Rechnungsersteller
This source code is intended to be a minimal website to produce
LaTeX-typesetted invoices.
It offers a simple form to enter metadata and invoice assets,
dynamically caculates the total amounts and finally offers to download
the result as LaTeX-document together with an .lco-file with the preset
metadata (plus a download for the logo).
It is intended to easily produce nice LaTeX-invoices even without any
knowledge of LaTeX once everything is configured.

## Disclaimer
Due to a lack of time when this form was first needed, this project is
merely a functional, quite inflexible peace of work that has not really
been maintained since.
Hence, some of the comments are in German and a bit of knowledge
about LaTeX will be necessary for complicated configuration.

Also the table cannot break over pages since this feature was not
needed at the time.

However, the LaTeX-template was made with love and you will hopefully
enjoy the output.
Anyways, do not hesitate to contact me if you have any suggestions or
wishes for the project.


## Structure
The form offers many fields to enter data and metadata of the invoice.
Mind: All date fields can be switched between manual entry (e.g. *May
to June*) and normal date input. 
When done, you can download
- a LaTeX-file with the content
- a `.lco`-file with preset metadata
- a logo

The complete logic (bindings, caculation, adjustments of the text for
LaTeX, download management) can be found in `invoice_form.js`.
It uses the preset variables set in `settings_document.js`,
`settings_letter.js`, `settings_logo.js`.

This project uses `jquery-3.2.1.min.js` provided from
http://jquery.com/download/. I recommend providing the used
jQuery-version offline since this form is intended for local
use. However, feel free to upgrade to any higher version – simply
adjust the script-source at the bottom of `invoice_form.html`.

## Configuration
### LaTeX-Document (`settings_document.js`)
You can modify the preamble of the document in `settings_document.js`.
Simply adjust the values of the corresponding variables.

**Warning**: Do not change the document class!
The form is intended to produce a letter with
the [`scrlttr2`-class of Markus Kohm][http://ctan.org/pkg/koma-script].
This class allows to store further settings on the letter (adressee,
date, place, contact information, signature etc.) in a separate
`.lco`-file.
(This has to be referenced in the main .tex-file and needs
to be at hand for compilation.)

### Letter Metadata (`settings_letter.js`) 
As described above the metadata of the letter can be stored in a
separate `.lco`-file.
The data can be configured in `settings_letter.js`, again simply
adjust the values of the variables.

### Logo Metadata (`settings_logo.js`)
The logo is intended to be stored in a data URI scheme within
`settings_logo.js`.
Here you should also specify the intended name of the downloaded file
and its file-ending (you have to use one the `pdflatex` can find
automatically).
An (ugly) example is provided.


## Compilation of the LaTeX-file
You need to download the settings-files (the logo and the `.lco`-file)
as well as the `.tex`-file. Make shure they lie in the same folder.
Then just call
```bash
pdflatex <invoice filename>.tex
```
The latest test were done with *Chromium 59.0.3071.86* and standard
*TeX Live 2016* distribution.
