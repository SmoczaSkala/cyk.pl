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
  const [awaitngForRes, setAwaitingForRes] = useState(false);

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

        setAwaitingForRes(true);
      }

      if (payload.type === "response" && payload.chatId === chatId.toString()) {
        console.log(`AI Response: ${payload.message}`);
        setAwaitingForRes(false);
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
      console.log(history);
      console.log(message);

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

      await setHistory((prevHistory) => prevHistory + message + "\n");

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: localStorage.getItem("username"),
          message,
        },
      ]);

      setMessage("");
    }
  };

  const getHelp = async () => {
    const storedToken = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3008/chat/${chatId}/consultant`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error("Failed to get help");
    }
  };

  const back = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/LogIn");
  };

  const username = localStorage.getItem("username");

  const role = localStorage.getItem("role");
  console.log(role);

  const Panel = () => {
    navigate("/Panel");
  };

  return (
    <div className="chat">
      <div className="chatHeader">
        <div className="left">
          <button onClick={back} className="back">
            wróć
          </button>
        </div>
        <div className="right">
          <p>Zalogowany jako {username}</p>
          {role >= 1 ? <button onClick={Panel}>Panel</button> : ""}
          <button onClick={handleLogout}>wyloguj</button>
          <img src="/Logo.png" alt="" />
        </div>
      </div>
      <div className="chatWindow">
        <div className="chatBox">
          <div className="messagesContainer">
            {messages.map((msg, index) => {
              const messageStyle = {
                backgroundColor: msg.username === "AI" ? "#add8e6" : "white",
                color: msg.username === "AI" ? "black" : "black",
                borderRadius:
                  msg.username === "AI"
                    ? "10px 10px 0 10px"
                    : "0 10px 10px 10px",
                border: msg.username !== "AI" ? "1px solid black" : "none",
                marginBottom: "10px",
                width: "calc(100% - 20px)",
                float: msg.username === "AI" ? "left" : "right",
                clear: "both",
                textAlign: msg.username === "AI" ? "left" : "right",
                padding: "10px",
                boxSizing: "border-box",
              };
              if (msg.systemMessage) {
                return (
                  <div key={index} className="systemMessage">
                    <p style={{ color: "grey" }}>{msg.message}</p>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={
                    msg.username === "AI" ? "aiMessage" : "userMessage"
                  }
                >
                  <p style={messageStyle}>
                    <strong>{msg.username}:</strong> {msg.message}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="chatFooter">
        <button onClick={() => navigate(0)}>Nowy</button>
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />{" "}
        <button className="send" onClick={getHelp}>
          Konsultant
        </button>
        <button className="send" onClick={sendMessage}>
          Wyślij
        </button>
        <p>{awaitngForRes ? "oczekiwanie na odpowiedź ai..." : ""}</p>
      </div>
    </div>
  );
};

export default Chat;
