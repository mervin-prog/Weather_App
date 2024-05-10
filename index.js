
//server-side.
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app=express();
app.use(express.static("public"));


const port=process.env.PORT;
const APIKEY=process.env.APIKEY;




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