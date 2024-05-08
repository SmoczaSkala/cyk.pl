import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Chat.scss";

const Chat = () => {
  const navigate = useNavigate();
  const [chatId, setChatId] = useState(null);

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
        setChatId(newChatId);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    };

    fetchChatId();
  }, []);

  const redirectToChat = () => {
    if (chatId) {
      navigate(`/chat/${chatId}`);
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
      {redirectToChat()}
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
        <div className="chatBox"></div>
      </div>
      <div className="chatFooter">
        <button>Historia</button>
        <button>Nowy</button>
        <input type="text" placeholder="Napisz wiadomość..." />
        <button className="send">Wyślij</button>
      </div>
    </div>
  );
};

export default Chat;
