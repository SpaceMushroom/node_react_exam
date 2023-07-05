const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('users').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/register', async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { username, password, passwordConfirmation, email } = req.body;

    const user = {
      username,
      password,
      email,
    };

    const con = await client.connect();

    if (!username || !password || !passwordConfirmation || !email) {
      res.status(400).send({
        error:
          'Username, password, password confirmation, and email are required.',
      });
      return;
    }

    if (username.length < 5) {
      res.status(400).send({
        error: 'Username must be at least 5 characters long.',
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).send({
        error: 'Password must be at least 6 characters long.',
      });
      return;
    }

    if (password !== passwordConfirmation) {
      res
        .status(400)
        .send({ error: 'Password and password confirmation do not match.' });
      return;
    }

    const existingUser = await con
      .db(dbName)
      .collection('users')
      .findOne({ username });

    if (existingUser) {
      res.status(400).send({ error: 'Username already exists.' });
      return;
    }

    const data = await con.db(dbName).collection('users').insertOne(user);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const con = await client.connect();
    const user = await con
      .db(dbName)
      .collection('users')
      .findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
      res.status(200).json({
        message: 'Successfully connected!',
        loggedIn: true,
        user,
      });
    } else {
      res
        .status(401)
        .json({ message: 'Wrong password or username!', loggedIn: false });
    }
    await con.close();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('questions').find().toArray();
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const objectId = new ObjectId(id);

    const con = await client.connect();
    const data = await con.db(dbName).collection('questions').findOne(objectId);

    await con.close();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/questions', async (req, res) => {
  try {
    const con = await client.connect();
    const { question, userId } = req.body;
    const userIdObject = new ObjectId(userId);
    const createdDate = new Date();

    const quest = {
      question,
      date: createdDate,
      userId: userIdObject,
      updated: false,
      answers: [],
    };

    const data = await con.db(dbName).collection('questions').insertOne(quest);
    res.status(200).json(data);
    await con.close();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/questions/:id', async (req, res) => {
  try {
    const con = await client.connect();

    const { id } = req.params;
    const userIdObject = new ObjectId(id);

    const data = await con
      .db(dbName)
      .collection('questions')
      .updateOne(
        { _id: userIdObject },
        { $set: { question: req.body.question, updated: true } },
      );
    await con.close();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/questions/:id', async (req, res) => {
  try {
    const con = await client.connect();

    const { id } = req.params;

    const data = await con
      .db(dbName)
      .collection('questions')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// /questions?sort=asc
// /questions?sort=dsc
// app.get('/questions', async (req, res) => {
//   try {
//     const { sort } = req.query;
//     const sortType = sort === 'asc' ? 1 : -1;

//     const con = await client.connect();
//     const data = await con
//       .db(dbName)
//       .collection('questions')
//       .find()
//       .sort({ question: sortType }) // 1 didejimo -1 mazejimo
//       .toArray();
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
