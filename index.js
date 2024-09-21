
//server-side.
import express from "express";
import dotenv from "dotenv";
import fetch  from "node-fetch";
import path from "path";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app=express();
app.use(express.static(__dirname + '/public'));


const port=3000;
const APIKEY=process.env.APIKEY;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get("/", (req,res)=>{
    res.render("index.ejs");
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`);
})