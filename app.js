const express=require('express');
const port=process.env.PORT|| 3000;
var app=express();
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
  res.redirect('/start.html');
});

app.get('/game.html',(req,res)=>{
  res.redirect('/game.html');
});

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
