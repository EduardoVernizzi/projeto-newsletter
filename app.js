const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Vercel fornece a porta

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mailchimp config direto no código
mailchimp.setConfig({
  apiKey: 'e5fdb6761433b94fec90f03a46c4c2cd-us9',
  server: 'us9'
});

const LIST_ID = 'f556647c67';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/', async (req, res) => {
  const { name, lastName, email } = req.body;

  try {
    await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: { FNAME: name, LNAME: lastName },
    });

    res.sendFile(path.join(__dirname, 'success.html'));
  } catch (error) {
    console.error(error);
    res.sendFile(path.join(__dirname, 'failure.html'));
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
