import express from "express";
require('dotenv').config()
import bodyParser from "body-parser";
import { MessengerClient } from "messaging-api-messenger";

const app = express();


// Konfiguracja tokena dostępu i webhooka
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PORT = process.env.PORT;

// Tworzenie klienta Messenger
const client = new MessengerClient({
    accessToken: ACCESS_TOKEN,
    appId: APP_ID,
    appSecret: APP_SECRET,
    version: "6.0", // Upewnij się, że wersja API pasuje do Twojej aplikacji
});

// Middleware do obsługi webhooka
app.use(bodyParser.json());

// Endpoint webhooka (do weryfikacji i odbierania wiadomości)
app.post("/webhook", async (req, res) => {
    const body = req.body;

    // Weryfikacja, czy to wydarzenie jest wiadomością
    if (body.object === "page") {
        body.entry.forEach((entry: any) => {
            const event = entry.messaging[0];

            // Pobranie ID nadawcy
            const senderId = event.sender.id;

            // Sprawdzenie, czy wiadomość zawiera tekst
            if (event.message && event.message.text) {
                const messageText = event.message.text.toLowerCase();

                // Obsługa "ping"
                if (messageText === "ping") {
                    client.sendText(senderId, "pong").catch((err) => {
                        console.error("Błąd wysyłania wiadomości:", err);
                    });
                }
            }
        });

        res.sendStatus(200); // Potwierdzenie odebrania wydarzenia
    } else {
        res.sendStatus(404);
    }
});

// Endpoint do weryfikacji webhooka
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // Sprawdzenie tokena weryfikacyjnego
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("Webhook zweryfikowany!");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
