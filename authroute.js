/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const secretKey = 'example';


// User model, untuk memyimpan kredensial ke database
function authRoutes(pool) {
  const User = require('./models/user');

  // Register Endpoint
  router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    try {
    // Cek Username atau Email di Database
      const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
      const params = [username, email];
      const [cekUser] = await pool.query(query, params);
      const rows = cekUser ? cekUser : [];

      console.log(cekUser);

      if (rows.length > 0) {
      // Jika Username telah ada
        res.status(400).json({error: 'Username atau email telah ada, silahkan login'});
      } else {
        const id = uuid.v4();

        // Panggil register logic dari user.js
        await User.registrasiUser(username, email, password);

        // Generate token
        const token = jwt.sign({id, username}, secretKey, {expiresIn: '1h'});

        // Response berhasil
        res.status(201).json({
          statusCode: 201,
          data: [
            {
              id: id,
              access_token: token,
            },
          ],
        });

        // Response berhasil
        // res.status(200).json({message: 'Registrasi Berhasil!'});
      }
    } catch (error) {
      console.error('Terdapat error registrasi:', error);
      // Error Handling dengan Message
      res.status(500).json({error: 'Server Internal Error, silahkan coba dalam beberapa saat lagi'});
    }
  });


  // Login Endpoint
  router.post('/login', async (req, res) => {
    const {identifier, password} = req.body;

    try {
      // Cek Email atau Username ada di database
      const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
      const params = [identifier, identifier];
      const [cekUser] = await pool.query(query, params);
      const user = cekUser ? cekUser[0] : null;

      if (!user) {
        res.status(400).json({message: 'Akun tidak ditemukan, silahkan registrasi'});
        return;
      }

      // Cek Password
      const CekPassword = await bcrypt.compare(password, user.password);
      if (!CekPassword) {
        res.status(401).json({message: 'Username atau Password salah'});
        return;
      }

      // Generate Unique ID
      const id = uuid.v4();

      // generate token
      const token = jwt.sign({username: user.username}, secretKey, {expiresIn: '1h'});

      // Set token dalam cookie
      res.cookie('token', token, {httpOnly: true});

      // // Respon token ke user
      // return res.json({token: token});

      // Respon token ke user
      res.status(200).json({
        statusCode: 200,
        data: [
          {
            id,
            access_token: token,
          },
        ],
      });

      // Set user saat sesi saat ini
      // req.session.user = user;

      // Endpoints redirect ke URL root saat login berhasil
      // res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Server internal sedang bermasalah, coba lagi dalam beberapa saat'});
    }
  });
  return router;
}

module.exports = authRoutes;
