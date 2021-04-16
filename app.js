const express = require('express');
const cors = require('cors');
const fetch = require("node-fetch")
const fs = require('fs');




const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());
const port = 3000;


app.post('/adduser', async (req, res) => {
    
   let uniquename = req.body.uniquename;
   let image = req.body.image;
   var data = image.replace(/^data:image\/\w+;base64,/, "");
var buf = Buffer.from(data, 'base64');



await fs.appendFile("img/"+uniquename+".jpeg", buf, (err) => { 
    if (err) { 
      console.log(err); 
    } 
  });
   console.log(uniquename)
   await fetch("https://adduser.face-atm.workers.dev/?user="+uniquename)   
  .then(response => response.json())
  .then(data => res.send(data) );
   
});

app.listen(port, () => console.log(`Listening on port ${port}...`));