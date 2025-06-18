
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files (CSS, JS, images)
app.use('/styles.css', express.static(path.join(__dirname, 'styles.css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve the main HTML file for all routes (SPA behavior)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎮 QuickLife Simulator running on http://0.0.0.0:${PORT}`);
    console.log(`📱 Mobile-optimized and ready to play!`);
});
