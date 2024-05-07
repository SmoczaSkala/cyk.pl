import React from "react";
import "./Chat.scss";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatHeader">
        <div className="left">
          <button className="back">wróć</button>
          <button>ustawienia</button>
          <button>wróć do bota</button>
        </div>
        <div className="right">
          <span>User</span>
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
