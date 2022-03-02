const express = require("express");
const app = express();
const users = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian",
];

// Middlewares
app.use(express.json());
app.use(express.static(__dirname + "/assets"));
app.use("/not-found", express.static(__dirname + "/assets/who.jpeg"));
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const { usuario } = req.params;
    if (!users.find((el) => el === usuario)) return res.redirect("/who.jpeg");

    next();
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/abracadabra/usuarios", (req, res) => {
    res.json({ usuarios: users });
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.send("Existe el usuario");
});

app.get("/abracadabra/conejo/:n", (req, res) => {
    const { n } = req.params;
    const rndInt = Math.floor(Math.random() * 4) + 1;
    if (parseInt(n) === parseInt(rndInt)) return res.redirect("/conejito.jpg");
    res.redirect("/voldemort.jpg");
});

app.get("*", (req, res) => {
    res.send("Ruta no existe");
});

app.listen(3000, () => console.log("servidor andando 🎉🎉🎉"));
