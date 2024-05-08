import "./ConsultantChat.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConsultantChat = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };

  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchConsultantQueue = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const response = await fetch(
            "http://localhost:3008/consultant/queue",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data.data.queue) {
              const usersData = await Promise.all(
                data.data.queue.map(async (user) => {
                  const userResponse = await fetch(
                    `http://localhost:3008/user/${user.user_id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  if (userResponse.ok) {
                    return (await userResponse.json()).data.user;
                  } else {
                    throw new Error("Failed to fetch user data");
                  }
                })
              );
              console.log(usersData);
              setUsers(usersData);
            } else {
              throw new Error("Data queue is undefined");
            }
          } else {
            throw new Error("Failed to fetch consultant queue");
          }
        } else {
          throw new Error("Token not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchConsultantQueue();
  }, []);

  return (
    <div className="consultantChat">
      <div className="chatHeader">
        <div className="left">
          <button onClick={back} className="back">
            wróć
          </button>
          <button>ustawienia</button>
        </div>
        <div className="right">
          <p>Konsultant</p>
          <button>wyloguj</button>
          <img src="/Logo.png" alt="" />
        </div>
      </div>
      <div className="user-list">
        <div className="Users">
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
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

export default ConsultantChat;
