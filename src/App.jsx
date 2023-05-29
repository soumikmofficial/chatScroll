import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const parentRef = useRef();

  // const prevHeight = useRef();
  console.log(messages);
  const handleSubmit = async () => {
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_start=${2}&_limit=5`
      );

      setMessages((prev) => [...data, ...prev]);
    } catch (error) {
      console.log(error);
    }

    // setMessages((prev) => [
    //   { title: inputVal, id: Math.floor(Math.random() * 1000) },
    //   ...prev,
    // ]);
  };

  const handleAddAbove = async () => {
    try {
      //   let newMessages = [...messages];
      //   const { data } = await axios.get(
      //     `https://jsonplaceholder.typicode.com/photos?_start=${5}&_limit=5`
      //   );
      //   newMessages = [...newMessages, ...data];
      //   setMessages(newMessages);
    } catch (error) {
      console.log(error);
    }

    // setMessages((prev) => [
    //   ...prev,
    //   { title: inputVal, id: Math.floor(Math.random() * 1000) },
    // ]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?_start=${10}&_limit=5`
        );

        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <div
        ref={parentRef}
        style={{
          background: "pink",
          height: "800px",
          width: "500px",
          display: "flex",
          flexDirection: "column-reverse",
          overflow: "auto",
          gap: "2rem",
          touchAction: "none",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{ background: "gray", width: "100px", padding: "15px 50px" }}
          >
            <img src={message.url} style={{ width: "300px" }} />

            <h4 style={{ wordBreak: "break-word" }}>
              {message.id} - {message.title}
            </h4>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          style={{ height: "3rem" }}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={handleSubmit}>submit</button>
        <button onClick={handleAddAbove}>add above</button>
      </div>
    </div>
  );
}

export default App;
