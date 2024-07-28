import * as express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const API_KEY = process.env.API_KEY as string;

app.get('/', async (req: Request, res: Response) => {
    const address = req.query.address as string;

    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${address}&appid=${API_KEY}`;

    try {
        const geoResponse = await axios.get(geoUrl);
        const locationData = geoResponse.data[0];
        const lat = locationData.lat;
        const lon = locationData.lon;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);

        const data = weatherResponse.data;
        const cityName = data.name;
        const temperature = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const message = `City Name: ${cityName}<br>Temperature: ${temperature}°C<br>Sunset Time: ${sunsetTime}`;

        res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});

const port2 = process.env.PORT || 3000;
app.listen(port2, () => {
    console.log(`Example app listening on port ${port2}`);
});
