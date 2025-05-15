import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const now = new Date();
    const day = now.getDay();

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const dayOfWeek = dayNames[day];

    var dayType = "a weekday";
    var msg = "back to the grind";

    if (day === 0 || day === 6) {
        dayType = "the weekend";
        msg = "relax while you can";
    }

    res.render("index.ejs", {
        dayType: dayType,
        advice: msg,
        dayOfWeek: dayOfWeek,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});