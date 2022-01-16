import express from 'express';
import bodyParser from 'body-parser';
import fs from "fs";
import path from "path";
import data1 from "./data1.json";
import data2 from "./data2.json";
import data3 from "./data3.json";



const PORT = 5000;
const app = express();
const __dirname = path.resolve();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


function startApp() {
    try {
        app.listen(PORT, () => console.log('Server has been started on port' + PORT));
    } catch (e) {
        console.log(e);
    };
};


app.get('/', function(req, res) {
    try {
        res.sendFile(__dirname + "/index.html");
    } catch (e) {
        res.status(500).json(e);
    }


});

// Getting information about the 1 event
app.get(`/data1`, function(req, res) {
    try {
        res.json(data1);
    } catch (e) {
        res.status(500).json(e);
    }

});

// Getting information about the 2 event
app.get(`/data2`, function(req, res) {
    try {
        res.json(data2);
    } catch (e) {
        res.status(500).json(e);
    }

});

// Getting information about the 3 event
app.get(`/data3`, function(req, res) {
    try {
        res.json(data3);
    } catch (e) {
        res.status(500).json(e);
    }

});



app.post('/event', function(req, res) {

    try {
        const numOfEvent = req.body.number;
        const url = `data${numOfEvent}.json`;
        const data = JSON.stringify(req.body);
        fs.writeFile(url, data, function(e) {
            if (e) {
                alert('Ошибка записи файла')
            }
        });
        res.json(req.body)
    } catch (e) {
        res.status(500).json(e);
    }

});



startApp();