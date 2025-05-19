// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/saldo', async (req, res) => {
  const { numeroBip } = req.body;

  if (!numeroBip) {
    return res.status(400).json({ error: 'Falta el número de tarjeta BIP' });
  }

  try {
    const response = await axios.post(
      'https://www.metro.cl/api/bip/getSaldoBip',
      { numeroBip },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Origin': 'https://www.metro.cl',
          'Referer': 'https://www.metro.cl/',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error en la consulta:', error.message);
    res.status(500).json({
      error: 'Error al consultar el saldo',
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
