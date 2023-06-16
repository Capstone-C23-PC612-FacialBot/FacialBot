const express = require('express');
const {Storage} = require('@google-cloud/storage');
const pool = require('./models/connect');
const multer = require('multer');

// Create a new instance of the Storage class
// with the necessary credentials for uploading to Google Cloud Storage
const storage = new Storage({
  projectId: 'YOUR_PROJECT_ID',
  credentials: {
    type: 'YOUR_SERVICE_ACCOUNT_NAME',
    private_key: 'YOUR_PRIVATE_KEY',
    client_email: 'YOUR_SERVICE_ACCOUNT_EMAIL',
  },
});

// Bucket name (replace with your own bucket name)
const bucketName = 'YOUR_CLOUD_STORAGE_BUCKET';

// Set up Multer as the image upload middleware
const multerStorage = multer.memoryStorage();
const multerUpload = multer({
  storage: multerStorage,
  fileFilter: (req, file, callback) => {
    // eslint-disable-next-line max-len
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
      return callback(new Error('Error: Only image files are allowed!'));
    }
    callback(null, true);
  },
});

// eslint-disable-next-line new-cap
const uploadRouter = express.Router();

// Endpoint for uploading an image
uploadRouter.post('/upload', multerUpload.single('image'), async (req, res) => {
  try {
    const bucket = storage.bucket(bucketName);
    const originalName = req.file.originalname;
    const blob = bucket.file('userimage/' + originalName);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      console.error(err);
      // eslint-disable-next-line max-len
      return res.status(500).json({error: 'Server error. Please try again later.'});
    });

    blobStream.on('finish', async () => {
      // Construct the public URL of the uploaded image
      const publicUrl = `https://storage.googleapis.com/${bucketName}/userimage/${originalName}`;

      // Insert the public URL into the Cloud SQL database
      const query = 'INSERT INTO images (url) VALUES (?)';
      const params = [publicUrl];
      await pool.query(query, params);

      // Get the user ID from the authenticated session
      const userId = req.session.userId;

      // Update the user's image URL in the users table
      const updateUserImageQuery = 'UPDATE users SET image_id = ? WHERE id = ?';
      const updateUserImageParams = [publicUrl, userId];
      await pool.query(updateUserImageQuery, updateUserImageParams);

      const response = {
        statusCode: 200,
        data: {
          message: 'Upload successful!',
          file: publicUrl,
        },
      };

      return res.status(200).json(response);
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Server error. Please try again later.'});
  }
});

module.exports = uploadRouter;
