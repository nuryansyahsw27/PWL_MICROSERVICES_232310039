require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Berhasil terhubung ke MongoDB'))
    .catch((err) => console.error('❌ Koneksi MongoDB gagal:', err));

// Routing Utama
app.use('/api/users', userRoutes);

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server User Service berjalan di http://localhost:${PORT}`);
});