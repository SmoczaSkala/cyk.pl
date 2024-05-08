import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chat.scss";

const Chat = () => {
  const navigate = useNavigate();
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [history, setHistory] = useState(" ");

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3008/chat/new",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newChatId = response.data.data.chat.id;
        console.log(`Created new chat with ID: ${newChatId}`);
        await setChatId(newChatId);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    };

    fetchChatId();
  }, []);

  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:3000/chat/${chatId}`);

    websocket.onopen = () => {
      console.log("Connected to WebSocket");

      websocket.send(
        JSON.stringify({
          type: "open",
          url: `ws://localhost:3000/chat/${chatId}`,
          auth: {
            token: localStorage.getItem("token"),
          },
        })
      );
    };

    websocket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === "error") {
        console.log(`Error: ${payload.message}`);
      }

      if (payload.type === "message" && payload.chatId === chatId.toString()) {
        console.log(`Received message: ${payload.content}`);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            username: "konsultant",
            message: payload.content,
          },
        ]);
      }

      if (payload.type === "received" && payload.chatId === chatId.toString()) {
        console.log(`Message sent! Awaiting AI response...`);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            username: "SYSTEM",
            message: "awaiting AI response...",
          },
        ]);
      }

      if (payload.type === "response" && payload.chatId === chatId.toString()) {
        console.log(`AI Response: ${payload.message}`);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            username: "AI",
            message: payload.message,
          },
        ]);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };
    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (ws && message) {
      console.log(history)
      console.log(message)

      ws.send(
        JSON.stringify({
          type: "message",
          content: history + message,
          message,
          chatId,
          auth: {
            token: localStorage.getItem("token"),
          },
        })
      );
      
      await setHistory((prevHistory) => prevHistory + message + "\n")


      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: localStorage.getItem("username"),
          message,
        },
      ]);

      setMessage(""); // clear the message input after sending
    }
  };

  const back = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/LogIn");
  };

  const username = localStorage.getItem("username");

  return (
    <div className="chat">
      id: {chatId}
      <div className="chatHeader">
        <div className="left">
          <button onClick={back} className="back">
            wróć
          </button>
          <button>ustawienia</button>
        </div>
        <div className="right">
          <p>{username}</p>
          <button onClick={handleLogout}>wyloguj</button>
          <img src="/Logo.png" alt="" />
        </div>
      </div>
      <div className="chatWindow">
        <div className="chatBox">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.username}:</strong> {msg.message}
            </p>
          ))}
        </div>
      </div>
      <div className="chatFooter">
        {/* <button>Historia</button> */}
        <button onClick={() => navigate(0)}>Nowy</button>
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send" onClick={sendMessage}>
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default Chat;
