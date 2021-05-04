const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const subscribers = {};
const messages = [];

app.post('/messages', (req, res)=>{
  messages.push(req.body);
  res.status(204).end();
})

app.get('/messages', (req, res)=>{
  console.log(+req.headers['previous-datetime']);
  if(+req.headers['previous-datetime']===0){
    res.json(messages);
  }else{
    if(messages.length > 0){
      let previousTime = +req.headers['previous-datetime']
      let newMessages = [];
      newMessages = messages.filter((message)=>message.currentDateTime > (previousTime));
      res.json(newMessages);
    }else{
      res.json([]);
    }
  }
})

app.get('/messages/subscribe', (req, res)=>{
  const id = Math.ceil(Math.random()*1000);
  subscribers[id] = res;
  req.on('close', ()=>{
    delete subscribers[id];
  })
});

app.post('/message',(req, res)=>{
  // console.log(req.body);
  Object.entries(subscribers).forEach(([id, response])=>{
    response.json(req.body);
    delete subscribers[id];
  });
  res.status(204).end();
})

app.listen(3002, ()=>{
  console.log('server is listening on port 3002');
})