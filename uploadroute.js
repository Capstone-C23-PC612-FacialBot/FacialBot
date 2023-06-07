/* eslint-disable max-len */
const express = require('express');
const {Storage} = require('@google-cloud/storage');
const pool = require('./models/connect');
const multer = require('multer');

// Membuat instansi baru dari StorageClass
// dan kredensial yang dibutuhkan agar bisa upload di google storage
const storage = new Storage({
  projectId: 'YOUR_PROJECTID',
  credentials: {
    type: 'YOUR_ACCOUNT_TYPE',
    private_key: 'YOUR_PRIVATE_KEY',
    client_email: 'YOUR_SERVICE_ACCOUNT_EMAIL',
  },
});

// Nama bucket (Dibawah ini bucket testing)
const NamaBucket = 'YOUR_CLOUD_STORAGE_BUCKET';

// Set up Multer sebagai middleware upload gambar
const multerstr = multer.memoryStorage();
const multerupl = multer({
  storage: multerstr,
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
      return callback(new Error('Error: Hanya bisa upload gambar!'));
    }
    callback(null, true);
  },
});

// eslint-disable-next-line new-cap
const router = express.Router();

// Endpoints setelah login
router.get('/', (req, res) => {
  res.render('index', {user: req.session.user});
});

// Endpoints saat Upload gambar
router.post('/upload', multerupl.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.render('index', {
        msg: 'Error: Silahkan pilih file gambar terlebih dahulu!',
      });
    }

    const bucket = storage.bucket(NamaBucket);
    const originalname = req.file.originalname;
    const blob = bucket.file('userimage/' + originalname);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      console.error(err);
      // eslint-disable-next-line max-len
      return res.status(500).json({error: 'Server error. Coba dalam beberapa saat lagi'});
    });

    blobStream.on('finish', async () => {
      // Nama bucket -> userimage(bisa diganti sesuai cloud storage) -> namafile
      const publicUrl = `https://storage.googleapis.com/${NamaBucket}/userimage/${originalname}`;

      // Insert the public URL into the Cloud SQL database
      const query = 'INSERT INTO images (url) VALUES (?)';
      const params = [publicUrl];
      await pool.query(query, params);

      // Get the user ID from the authenticated session
      const userId = req.session.userId;

      // Update the user's image URL in the users table
      // eslint-disable-next-line max-len
      const updateUserImageQuery = 'UPDATE users SET image_id = ? WHERE id = ?';
      const updateUserImageParams = [publicUrl, userId];
      await pool.query(updateUserImageQuery, updateUserImageParams);

      return res.render('index', {
        msg: 'File telah diupload!',
        file: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Server error. Coba dalam beberapa saat lagi'});
  }
});

module.exports = router;
