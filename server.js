// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// app.use(express.static('public'));

// app.get('/images', (req, res) => {
//     const imagesDir = path.join(__dirname, 'public', 'REMAINING WALLS');
//     fs.readdir(imagesDir, (err, files) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to read images directory' });
//         }
//         const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
//         res.json(images);
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
