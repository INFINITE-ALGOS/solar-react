
  // const express = require('express');
  // const cors = require('cors');
  // const mysql = require('mysql2/promise');
  // const bcrypt = require('bcryptjs');

  // const app = express();
  // app.use(express.json());
  // app.use(cors());  
  // async function connectToMySQL() {
  //     const connection = await mysql.createConnection({
  //       host: 'localhost',
  //       user: 'root',
  //       password: 'root',
  //       database: 'mydatabase', // Replace with your database name
  //       auth_plugin: 'mysql_native_password', // or 'mysql_native_password' depending on your setup
  //       insecureAuth: true,
  //       port: 3306,
    
      
  //     });
    
  //     console.log('Connected to MySQL database');
  //     return connection;
  //   }


  //   // Usage
  // (async () => {
  //     try {
  //       var conn = await connectToMySQL();
  //       // Your query here
  //       await conn.query('SELECT * FROM users LIMIT 1');
  //     } catch (error) {
  //       console.error('Error:', error);
  //     } finally {
  //       if (conn) {
  //         await conn.end();
  //       }
  //     }
  //   })();

    

  //   async function registerUser(name, email, password,type,phone_number) {
  //     const conn = await connectToMySQL();
  //     try {
  //       // Check if any parameter is undefined
  //       if (!name || !email || !password || !type || !phone_number) {
  //         throw new Error('Username, email, password,type,phone are required');
  //       }
    
  //       const [results] = await conn.execute(
  //         'INSERT INTO users (name, email, password,type,phone_number) VALUES (?, ?, ?,?,?)',
  //         [name, email, await bcrypt.hash(password, 10),type,phone_number]
  //       );
  //       return { success: true, userId: results.insertId };
  //     } catch (error) {
  //       console.error('Error registering user:', error);
  //       throw error;
  //     } finally {
  //       await conn.end();
  //     }
  //   }
    
  // async function loginUser(email, password) {
  //   const conn = await connectToMySQL();
  //   try {
  //     const [results] = await conn.execute(
  //       'SELECT * FROM users WHERE email = ?',
  //       [email]
  //     );
  //     if (results.length === 0) {
  //       return null; // User not found
  //     }
  //     const user = results[0];
  //     const isValidPassword = await bcrypt.compare(password, user.password);
  //     if (!isValidPassword) {
  //       return null; // Invalid password
  //     }
  //     return user;
  //   } catch (error) {
  //     console.error('Error logging in user:', error);
  //     throw error;
  //   } finally {
  //     await conn.end();
  //   }
  // }

  // app.post('/api/signup', async (req, res) => {
  //   const { name, email, password,type,phone} = req.body;
  //   try {
  //     const result = await registerUser(name, email, password,type,phone);
  //     res.status(201).json(result);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Registration failed' });
  //   }
  // });

  // app.post('/api/login', async (req, res) => { // /login
  //   const { email, password} = req.body;
  //   const user = await loginUser(email, password);
  //   if (!user) {
  //     res.status(401).json({ error: 'Invalid   credentials' });
  //   } else {
  //     res.json(user);
  //   }
  // });

  // app.listen(5000, () => console.log('Server running on port    5000  '));

  // // // Create a connection pool
  // // const connectionPool = mysql.createConnection({
  // //   host: 'localhost', // Replace with your MySQL Workbench host
  // //   port: 3306,    
  // //   user: 'root', // Replace with your MySQL username
  // //   password: 'root', // Replace with your MySQL password
  // //   database: 'mydatabase', // Replace with your database name
  // //   auth_plugin: 'caching_sha2_password', // or 'mysql_native_password' depending on your setup
  // //   insecureAuth: true,


  // // });

  // // // Connect to the database
  // // connectionPool.connect((err) => {
  // //   if (err) {
  // //     console.error('Error connecting to MySQL database:', err);
  // //     return;
  // //   }
  // //   console.log('Connected to MySQL database');
  // // });


  // // // Test the connection
  // // connectionPool.query('SELECT * FROM users LIMIT 1', (err, results) => {
  // //   if (err) {
  // //     console.error('Error running query:', err);
  // //     return;
  // //   }
  // //   console.log('Query result:', results[0]);
  // // });

  // // // Handle SIGINT signal (Ctrl+C)
  // // process.on('SIGINT', () => {
  // //   connectionPool.end(() => {
  // //     console.log('Database connection closed');
  // //     process.exit(0);
  // //   });
  // // });







  const express = require('express');
  const cors = require('cors');
  const mysql = require('mysql2/promise');
  const bcrypt = require('bcryptjs');
  const nodemailer = require('nodemailer');
  const crypto = require('crypto');
  
  const app = express();
  app.use(express.json());
  app.use(cors());  
  
  async function connectToMySQL() {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydatabase',
        auth_plugin: 'mysql_native_password',
        insecureAuth: true,
        port: 3306,
      });
      console.log('Connected to MySQL database');
      return connection;
  }
  
  const transporter = nodemailer.createTransport({
      service: 'smtp.office365.com',
      auth: {
          user: process.env.emai, // replace with your email
          pass: process.env.pass  // replace with your email password
      }
  });
  
  // Function to send confirmation email
  async function sendConfirmationEmail(email, token) {
      const url = `http://localhost:5000/api/confirm/${token}`;
      await transporter.sendMail({
          to: email,
          subject: 'Confirm your email',
          html: `<h3>Please confirm your email by clicking the link below:</h3><a href="${url}">Confirm Email</a>`
      });
  }
  
  // Register user and generate a confirmation token
  async function registerUser(name, email, password, type, phone_number) {
      const conn = await connectToMySQL();
      try {
          if (!name || !email || !password || !type || !phone_number) {
              throw new Error('Username, email, password, type, and phone are required');
          }
  
          // Generate email confirmation token
          const token = crypto.randomBytes(32).toString('hex');
          
          const [results] = await conn.execute(
              'INSERT INTO users (name, email, password, type, phone_number) VALUES (?, ?, ?, ?, ?)',//, confirmation_token, confirmed, ?, ?
              [name, email, await bcrypt.hash(password, 10), type, phone_number]  //, token, 0  0 indicates email is not confirmed
          );
  
          // Send confirmation email
 //         await sendConfirmationEmail(email, token);
  
 //         return { success: true, message: 'User registered. Please confirm your email.' };
//      } catch (error) {
 //         console.error('Error registering user:', error);
  //        throw error;
      } finally {
          await conn.end();
      }
  }
  
  // Confirm user email
  async function confirmEmail(token) {
      const conn = await connectToMySQL();
      try {
          const [results] = await conn.execute(
              'UPDATE users SET confirmed = 1 WHERE confirmation_token = ?',
              [token]
          );
          if (results.affectedRows === 0) {
              throw new Error('Invalid token');
          }
          return { success: true, message: 'Email confirmed' };
      } catch (error) {
          console.error('Error confirming email:', error);
          throw error;
      } finally {
          await conn.end();
      }
  }
  
  // Endpoint to register user
  app.post('/api/signup', async (req, res) => {
      const { name, email, password, type, phone } = req.body;
      try {
          const result = await registerUser(name, email, password, type, phone);
          res.status(201).json(result);
      } catch (error) {
          res.status(500).json({ error: 'Registration failed' });
      }
  });
  
  // Endpoint to confirm email
  app.get('/api/confirm/:token', async (req, res) => {
      const { token } = req.params;
      try {
          const result = await confirmEmail(token);
          res.status(200).json(result);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  });
  
  // Login user
  async function loginUser(email, password) {
      const conn = await connectToMySQL();
      try {
          const [results] = await conn.execute(
              'SELECT * FROM users WHERE email = ?',
              [email]
          );
          if (results.length === 0) {
              return null; // User not found
          }
          const user = results[0];
          
 //         if (!user.confirmed) {
 //             throw new Error('Email not confirmed');
//          }
  
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
              return null; // Invalid password
          }
          return user;
      } catch (error) {
          console.error('Error logging in user:', error);
          throw error;
      } finally {
          await conn.end();
      }
  }
  
  // Endpoint to login
  app.post('/api/login', async (req, res) => {
      const { email, password } = req.body;
      try {
          const user = await loginUser(email, password);
          if (!user) {
              res.status(401).json({ error: 'Invalid credentials' });
          } else {
              res.json(user);
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  });
  
  app.listen(5000, () => console.log('Server running on port 5000'));
  





