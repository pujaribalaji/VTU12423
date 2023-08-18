const express = require('express');
const cors = require('cors');
const db =require('./models/db');
const company =require('./models/company.js')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());


app.use(express.json());

function generateClientSecret() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 16;
    let secret = '';
    for (let i = 0; i < length; i++) {
        secret += characters[Math.floor(Math.random() * characters.length)];
    }
    return secret;
}

app.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const clientSecret = generateClientSecret();
        const newUser = new User({ ...userData, clientSecret });
        await newUser.save();

        res.status(200).json({ message: 'Registration successful', clientSecret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering' });
    }
});

app.get("/api/train-schedule", async (req, res) => {
    try {
        const authorizationToken = "NdeLDCieuyOJRClX";
        const trainsResponse = await axios.get(
            "http://20.244.56.144/train/trains",
            {
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            }
        );

        const currentTimestamp = Date.now();
        const twelveHoursInMillis = 12 * 60 * 60 * 1000;

        const filteredTrains = trainsResponse.data.filter((train) => {
            const departureTimestamp =
                currentTimestamp +
                train.departureTime.Hours * 60 * 60 * 1000 +
                train.departureTime.Minutes * 60 * 1000;
            return (
                departureTimestamp >= currentTimestamp &&
                departureTimestamp <= currentTimestamp + twelveHoursInMillis
            );
        });

        const sortedTrains = filteredTrains.sort((a, b) => {
            if (a.price.AC === b.price.AC) {
                if (a.price.sleeper === b.price.sleeper) {
                    return (
                        (b.seatsAvailable.AC + b.seatsAvailable.sleeper) -
                        (a.seatsAvailable.AC + a.seatsAvailable.sleeper)
                    );
                }
                return a.price.sleeper - b.price.sleeper;
            }
            return a.price.AC - b.price.AC;
        });

        const response = sortedTrains.map((train) => ({
            trainName: train.trainName,
            trainNumber: train.trainNumber,
            departureTime: `${train.departureTime.Hours}:${train.departureTime.Minutes}`,
            seatsAvailable: {
                sleeper: train.seatsAvailable.sleeper,
                AC: train.seatsAvailable.AC,
            },
            price: {
                sleeper: train.price.sleeper,
                AC: train.price.AC,
            },
        }));

        res.json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});