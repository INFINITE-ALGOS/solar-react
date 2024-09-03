
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());  
async function connectToMySQL() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'mydatabase', // Replace with your database name
      auth_plugin: 'mysql_native_password', // or 'mysql_native_password' depending on your setup
      insecureAuth: true,
      port: 3306,
  
    
    });
  
    console.log('Connected to MySQL database');
    return connection;
  }


  // Usage
(async () => {
    try {
      var conn = await connectToMySQL();
      // Your query here
      await conn.query('SELECT * FROM users LIMIT 1');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      if (conn) {
        await conn.end();
      }
    }
  })();

  

  async function registerUser(name, email, password) {
    const conn = await connectToMySQL();
    try {
      // Check if any parameter is undefined
      if (!name || !email || !password) {
        throw new Error('Username, email, and password are required');
      }
  
      const [results] = await conn.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, await bcrypt.hash(password, 10)]
      );
      return { success: true, userId: results.insertId };
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    } finally {
      await conn.end();
    }
  }
  
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

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await registerUser(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => { // /login
  const { email, password,} = req.body;
  const user = await loginUser(email, password);
  if (!user) {
    res.status(401).json({ error: 'Invalid   credentials' });
  } else {
    res.json(user);
  }
});

app.listen(5000, () => console.log('Server running on port    5000  '));

// // Create a connection pool
// const connectionPool = mysql.createConnection({
//   host: 'localhost', // Replace with your MySQL Workbench host
//   port: 3306,    
//   user: 'root', // Replace with your MySQL username
//   password: 'root', // Replace with your MySQL password
//   database: 'mydatabase', // Replace with your database name
//   auth_plugin: 'caching_sha2_password', // or 'mysql_native_password' depending on your setup
//   insecureAuth: true,


// });

// // Connect to the database
// connectionPool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });


// // Test the connection
// connectionPool.query('SELECT * FROM users LIMIT 1', (err, results) => {
//   if (err) {
//     console.error('Error running query:', err);
//     return;
//   }
//   console.log('Query result:', results[0]);
// });

// // Handle SIGINT signal (Ctrl+C)
// process.on('SIGINT', () => {
//   connectionPool.end(() => {
//     console.log('Database connection closed');
//     process.exit(0);
//   });
// });













