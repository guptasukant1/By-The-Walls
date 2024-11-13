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


const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://guptasukant9:cXkfHNPnlXwRobbf@cluster0.bspqpnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const imageSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  mimetype: String,
  size: Number,
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('wallpaper'), async (req, res) => {
    try {
      const newImage = new Image({
        filename: req.file.filename,
        filepath: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });
  
      const savedImage = await newImage.save();
      res.status(200).json({ message: 'Image uploaded successfully', image: savedImage });
    } catch (err) {
      res.status(500).json({ error: 'Error saving image to database' });
    }
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error('Error fetching images:', err);
    res.status(500).json({ error: 'Error fetching images from database' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
