import { useEffect, useRef, useState } from 'react';
import PostData from './helpers/fetch';

const ShortPolling = (props)=>{
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessages, setnewMessages] = useState([]);
  let previousRequest = useRef(0);

  const handleSubmit= (e)=>{
    let currentDateTime = Date.now()
    e.preventDefault();
    PostData('http://localhost:3002/messages', {message, currentDateTime}).then(()=>setMessage(''));
  };

  useEffect(()=>{
    setInterval(async()=>{
      let currentDateTime = Date.now();
      const data = await fetch('http://localhost:3002/messages',{
        method:'GET',


        headers: {

          'Content-Type': 'application/json',
          'Previous-DateTime': previousRequest.current
        }
      }).then((res)=>res.json());
      previousRequest.current = currentDateTime;
      setnewMessages(data);
      
    }, 5000)
  }, []);

  useEffect(()=>{
    setMessages(messages.concat(newMessages))
  },[newMessages]);
  
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input className="form-control form-control-lg" type="text" placeholder="Enter your message" 
          name="message" id="message" required onChange={((e)=>setMessage(e.target.value))} value={message}></input>
      </form>
      <h2>chat</h2>
      <ul className="list-group">
        { 
          messages.map((m)=><li key={m.currentDateTime} className="list-group-item">{m.message}</li>)
        }
      </ul>
    </div>
  )
}

export default ShortPolling;