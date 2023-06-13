/* eslint-disable require-jsdoc */
const bcrypt = require('bcrypt');
const connection = require('./connect');

class User {
  static async registrasiUser(username, email, password) {
    // Banyaknya Garam buat password menjadi hashed password
    const saltRounds = 15;

    try {
      // validasi password
      if (password.length < 8) {
        throw new Error('Password harus memiliki minimal 8 karakter');
      }
      
      // Penggunaan Garam pada password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      // eslint-disable-next-line max-len
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      // Yang dimasukkan ke database adalah password dengan garam
      const params = [username, email, hashedPassword];

      await connection.query(query, params);
    } catch (error) {
      console.error('Pembuatan user error', error);
      throw error;
    }
  }

  // Agar bisa login dengan username yang telah diregistrasikan
  static async loginUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const params = [username];
    try {
      const results = await connection.query(query, params);
      if (results.length === 0) {
        return null;
      }
      return results[0];
    } catch (error) {
      console.error('Error gagal menemukan User', error);
      throw error;
    }
  }

  // Agar bisa login dengan username yang telah diregistrasikan
  static async loginEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const params = [email];
    try {
      const results = await connection.query(query, params);
      if (results.length === 0) {
        return null;
      }
      return results[0];
    } catch (error) {
      console.error('Error gagal menemukan User', error);
      throw error;
    }
  }

  // Simpan PublicUrl yang ada di Cloud Storage ke Database CloudSQL
  static async updateGambarUser(userId, imageUrl) {
    const query = 'UPDATE users SET image_url = ? WHERE id = ?';
    const params = [imageUrl, userId];
    try {
      await connection.query(query, params);
    } catch (error) {
      console.error('Error update user image', error);
      throw error;
    }
  }
}

module.exports = User;
