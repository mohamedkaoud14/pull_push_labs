import { useEffect, useState } from "react";
import postData from "./helpers/fetch";

const LongPolling = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    postData("http://localhost:3000/messages", { message }).then(() =>
      setMessage("")
    );
  };

  useEffect(() => {
    fetch("http://localhost:3000/messages/subscribe")
      .then((res) => res.json())
      .then((data) => setMessages(messages.concat(data)));
  }, [messages]);
  return (
    <>
      <div className="form-wrapper">
        <form id="form" className="validate" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Message</label>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="message"
              required
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></input>
          </div>
        </form>
      </div>
      <section>
        <div>
          <h2>Messages</h2>
          <ul className="check-list">
            {messages.map((m, i) => (
              <li key={i}>{m.message}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default LongPolling;