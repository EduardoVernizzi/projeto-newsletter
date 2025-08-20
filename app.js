const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

//API KEY Mailchimp: e5fdb6761433b94fec90f03a46c4c2cd-us9
//Audience List ID: f556647c67


const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: 'e5fdb6761433b94fec90f03a46c4c2cd-us9',
  server: 'us9',
});


app.get('/', (req, res) => {
res.sendFile(__dirname + './signup.html')
})

app.post('/', (req,res) =>{

const name = req.body.name;
const lastName = req.body.lastName;
const email = req.body.email;

//API MailChimp - Add member 

const addMember = async () => {

  try {

      const data = await mailchimp.lists.addListMember("f556647c67", {


    email_address: email,
    status: 'subscribed',
    merge_fields: {
    FNAME: name,
    LNAME: lastName,

    }

  });
  res.sendFile(__dirname + '/sucess.html')
    
  } catch (error) {

  res.sendFile(__dirname + '/failute.html')
    
  }

};

addMember();


})


app.listen(port, () => {

  console.log(`Servidor está rodando na porta ${port}`)
})

