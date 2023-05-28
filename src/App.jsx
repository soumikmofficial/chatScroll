import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const parentRef = useRef();

  const prevHeight = useRef();

  useEffect(() => {
    console.log("old:", prevHeight?.current);
    console.log("new:", parentRef?.current?.scrollHeight);

    // const update = () => {
    //   if (parentRef.current.scrollTop == 0) return;

    //   const newHeight = parentRef.current.scrollHeight;
    //   const diff = newHeight - prevHeight.current;
    //   console.log(parentRef.current.scrollTop, "top");

    //   // parentRef.current.scrollTop = parentRef.current.scrollTop + diff;
    // };

    // requestAnimationFrame((e) => {
    //   update();
    // });
  }, [messages]);

  const handleSubmit = () => {
    prevHeight.current = parentRef?.current?.scrollHeight;

    setMessages((prev) => [
      { title: inputVal, id: Math.floor(Math.random() * 1000) },
      ...prev,
    ]);
  };

  const handleAddAbove = () => {
    prevHeight.current = parentRef?.current?.scrollHeight;

    setMessages((prev) => [
      ...prev,
      { title: inputVal, id: Math.floor(Math.random() * 1000) },
    ]);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=5"
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
