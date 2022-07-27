const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){

  const firstName = req.body.fname;
  const secondName = req.body.sname;
  const emailid = req.body.email;

  const data = {
    members: [
      {
      email_address:emailid,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: secondName,
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);

const url = "https://us8.api.mailchimp.com/3.0/lists/b284cbffe0";

const option = {
  method: "POST",
  auth: "sanchit:39627ad249ed7eb297e190a4c41ac097-us8"
}

const request = https.request(url, option, function(response){

  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server running on port 3000");
})


// api key
// 39627ad249ed7eb297e190a4c41ac097-us8


// id
//

// list id
//
