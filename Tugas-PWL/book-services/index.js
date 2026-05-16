require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./models");
const rabbitmq = require("./config/rabbitmq");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// ROOT
app.get("/", (req, res) => {
    res.json({
        message: "Server berjalan dengan baik",
        status: "active"
    });
});

// =======================
// START SERVER
// =======================
async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log("✓ Koneksi ke database MySQL berhasil!");

        await rabbitmq.connect();
        console.log("✓ RabbitMQ Connected");

        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ API available at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Startup error:", error);
        process.exit(1);
    }
}

startServer();