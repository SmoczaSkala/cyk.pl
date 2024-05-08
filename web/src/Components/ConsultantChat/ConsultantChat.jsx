import "./ConsultantChat.scss";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ConsultantChat = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };

  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  console.log(id);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        if (id) {
          const storedToken = localStorage.getItem("token");
          if (storedToken) {
            const response = await fetch(
              `http://localhost:3008/chat/${id}/history`,
              {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              }
            );
            if (response.ok) {
              const data = await response.json();

              if (data.data.messages) {
                const usersData = await Promise.all(
                  data.data.messages.map(async (message) => {
                    const userResponse = await fetch(
                      `http://localhost:3008/user/${message.author_id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${storedToken}`,
                        },
                      }
                    );
                    if (userResponse.ok) {
                      const userData = await userResponse.json();
                      return {
                        ...message,
                        user: userData.data.user,
                      };
                    } else {
                      throw new Error("Failed to fetch user data");
                    }
                  })
                );

                setMessages(usersData);
              } else {
                throw new Error("Messages data is undefined");
              }
            } else {
              throw new Error("Failed to fetch chat history");
            }
          } else {
            throw new Error("Token not found in localStorage");
          }
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [id]);

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
              const modifiedUsersData = usersData.map((user, index) => ({
                ...user,
                chat_id: data.data.queue[index].chat_id,
              }));
              setUsers(modifiedUsersData);
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

  const sendMessage = async () => {
    const storedToken = localStorage.getItem("token");
    console.log(message);
    const userResponse = await fetch(
      `http://localhost:3008/chat/${id}/message`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      }
    );

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        user: { username: localStorage.getItem("username") },
        content: message,
      },
    ]);

    setMessage("");
  };

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
            <button
              key={user.user_id}
              onClick={() => navigate(`?id=${user.chat_id}`)}
            >
              {user.username}
            </button>
          ))}
        </div>
      </div>
      <div className="chatWindow">
        <div className="chatBox">
          {id &&
            messages.map((msg, index) => {
              const messageStyle = {
                backgroundColor:
                  msg.user.username === "AI" ? "#add8e6" : "white",
                color: msg.user.username === "AI" ? "black" : "black",
                borderRadius:
                  msg.user.username === "AI"
                    ? "10px 10px 0 10px"
                    : "0 10px 10px 10px",
                border: msg.user.username !== "AI" ? "1px solid black" : "none",
                marginBottom: "10px",
                width: "calc(100% - 20px)",
                float: msg.user.username === "AI" ? "left" : "right",
                clear: "both",
                textAlign: msg.user.username === "AI" ? "left" : "right",
                padding: "10px",
                boxSizing: "border-box",
              };
              if (msg.systemMessage) {
                return (
                  <div key={index} className="systemMessage">
                    <p style={{ color: "grey" }}>{msg.content}</p>
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={
                    msg.user.username === "AI" ? "aiMessage" : "userMessage"
                  }
                >
                  <p style={messageStyle}>
                    <strong>{msg.user.username}:</strong> {msg.content}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="chatFooter">
        <button>Nowy</button>
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

export default ConsultantChat;
