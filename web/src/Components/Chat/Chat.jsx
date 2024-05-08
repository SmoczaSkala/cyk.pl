import React from "react";
import "./Chat.scss";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };
  return (
    <div className="chat">
      <div className="chatHeader">
        <div className="left">
          <button onClick={back} className="back">
            wróć
          </button>
          <button>ustawienia</button>
        </div>
        <div className="right">
          <p>Username</p> {/*//tutaj zróbcie sprawdzanie użytkownika */}
          <button>wyloguj</button>
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
