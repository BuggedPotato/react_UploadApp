var express = require("express");
var app = express();
var formidable = require( "formidable" );
const PORT = 3000;

app.use( express.static( "static" ) );

app.post( "/upload", ( req, res )=>{
    let form = formidable({});

    form.uploadDir = __dirname + '/static/upload/';       // folder do zapisu zdjęcia
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, function (err, fields, files) {
 
        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);

        let imagetoupload = files.imagetoupload;

        let toSend = [ fields, { imagetoupload } ];
        // res.setHeader( "Content-Type", "application/json" );
        // res.send(JSON.stringify(toSend, null,5));
		res.send( "dadadad" );
    });
} );

app.listen(PORT, function () {
    console.log("Start serwera na porcie " + PORT );
});