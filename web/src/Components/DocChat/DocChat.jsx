import React from "react";
import "./DocChat.scss";

const DocChat = () => {
  return (
    <div className="chat">
      <div className="chatHeader">
        <div className="left">
          <button className="back">Wróć</button>
          <button>Ustawienia</button>
        </div>
        <div className="right">
          <span>Konsultant</span>
          <button>Wyjoguj</button>
          <img src="/Logo.png" alt="" />
        </div>
      </div>
      <div className="chatContent">
        <div className="clientList">//MAP\\</div>
        <div className="chatBox"></div>
      </div>
      <div className="chatFooter">
        <button>Wymuś bota</button>
        <input type="text" placeholder="Napisz wiadomość..." />
        <button className="send">Wyślij</button>
      </div>
    </div>
  );
};

export default DocChat;
