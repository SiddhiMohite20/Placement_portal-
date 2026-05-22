import { useState } from "react";
import axios from "axios";

function Chatbot() {

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const sendMessage = async () => {

    if (!message) return;

    const userMessage = {
      role: "user",
      text: message
    };

    setChat((prev) => [
      ...prev,
      userMessage
    ]);

    setLoading(true);

    try {

      const res = await axios.post(
        "https://placement-portal-kqxq.onrender.com/api/chatbot",
        {
          message
        }
      );

      const botMessage = {
        role: "bot",
        text: res.data.reply
      };

      setChat((prev) => [
        ...prev,
        botMessage
      ]);

      setMessage("");

    } catch (error) {

      console.log(error);

      alert("Chatbot Failed");
    }

    setLoading(false);
  };

  return (

    <div
      className={`min-h-screen flex justify-center items-center p-5 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-r from-slate-900 to-blue-900"
          : "bg-gradient-to-r from-gray-100 to-blue-100"
      }`}
    >

      <div
        className={`w-full max-w-3xl rounded-3xl shadow-2xl p-6 transition-all duration-500 ${
          darkMode
            ? "bg-white"
            : "bg-slate-900 text-white"
        }`}
      >

        <h1
          className="
            text-4xl
            font-bold
            text-center
            text-blue-600
            mb-2
          "
        >
          AI Placement Chatbot
        </h1>

        <p
          className={`
            text-center
            mb-6
            ${
              darkMode
                ? "text-gray-500"
                : "text-gray-300"
            }
          `}
        >
          Ask placement and interview questions
        </p>

        {/* DARK MODE BUTTON */}

        <div className="flex justify-end mb-4">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-4
              py-2
              rounded-xl
            "
          >

            {darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}

          </button>

        </div>

        {/* CHAT AREA */}

        <div
          className={`
            border
            rounded-xl
            h-[450px]
            overflow-y-auto
            p-4
            mb-4
            ${
              darkMode
                ? "bg-gray-50"
                : "bg-slate-800"
            }
          `}
        >

          {chat.map((msg, index) => (

            <div
              key={index}
              className={`mb-4 flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-gray-200 text-black"
                    : "bg-slate-700 text-white"
                }`}
              >

                {msg.text}

              </div>

            </div>
          ))}

          {loading && (

            <p
              className={
                darkMode
                  ? "text-gray-500"
                  : "text-gray-300"
              }
            >
              AI is typing...
            </p>
          )}

        </div>

        {/* INPUT AREA */}

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            className={`
              flex-1
              border
              p-3
              rounded-xl
              outline-none
              ${
                darkMode
                  ? "bg-white text-black"
                  : "bg-slate-800 text-white border-gray-600"
              }
            `}
          />

          <button
            onClick={sendMessage}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              rounded-xl
            "
          >
            Send
          </button>

        </div>

        {/* QUICK BUTTONS */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-3
          "
        >

          <button
            onClick={() =>
              setMessage(
                "How to prepare for TCS?"
              )
            }
            className={`
              px-4
              py-2
              rounded-lg
              ${
                darkMode
                  ? "bg-gray-200"
                  : "bg-slate-700 text-white"
              }
            `}
          >
            Prepare for TCS
          </button>

          <button
            onClick={() =>
              setMessage(
                "React roadmap for placements"
              )
            }
            className={`
              px-4
              py-2
              rounded-lg
              ${
                darkMode
                  ? "bg-gray-200"
                  : "bg-slate-700 text-white"
              }
            `}
          >
            React Roadmap
          </button>

          <button
            onClick={() =>
              setMessage(
                "Generate HR interview questions"
              )
            }
            className={`
              px-4
              py-2
              rounded-lg
              ${
                darkMode
                  ? "bg-gray-200"
                  : "bg-slate-700 text-white"
              }
            `}
          >
            HR Questions
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chatbot;