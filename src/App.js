import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/usericon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";
import { useState, useRef, useEffect } from "react";
// import { chat } from "openai/resources";

function App() {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hi, i am Chatgpt, a state-of-the-art language model developed by openAI",
      isBot: true,
    },
  ]);
  const handleSend = async () => {
    const text = input;
    setInput("");
    setLoading(true);
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
    setLoading(false);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuery = async (e) => {
    const text = e.target.value;

    setLoading(true);
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>

          <button
            className="midBtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button
              className="query"
              onClick={handleQuery}
              value={" What is Programming?"}
            >
              <img src={msgIcon} alt="query" />
              What is Programming?
            </button>

            <button
              className="query"
              onClick={handleQuery}
              value={" How to use an API? "}
            >
              <img src={msgIcon} alt="query" />
              How to use an API?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="home" className="listItemsImg" />
            Home
          </div>

          <div className="listItems">
            <img src={saved} alt="saved" className="listItemsImg" />
            Saved
          </div>

          <div className="listItems">
            <img src={rocket} alt="upgrade" className="listItemsImg" />
            Upgrade
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {messages.map((message, i) => (
            <div
              ref={scrollRef}
              key={i}
              className={message.isBot ? "Chat bot" : "chat"}
            >
              <img
                className="chatImg"
                src={message.isBot ? gptImgLogo : userIcon}
                alt="ChatGPT "
              />
              <p className="txt"> {message.text}</p>
            </div>
          ))}
          {loading && <>Loading...</>}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.keyCode === 13) {
                  handleSend();
                }
              }}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaacurate information about people, places or
            facts
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
