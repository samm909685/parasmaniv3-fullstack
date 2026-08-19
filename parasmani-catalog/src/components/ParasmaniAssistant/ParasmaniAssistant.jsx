import { useState } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

function ParasmaniAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => {
  const savedSession = localStorage.getItem("parasmani_chat_session");

  if (savedSession) {
    return savedSession;
  }

  const newSession = crypto.randomUUID();
  localStorage.setItem("parasmani_chat_session", newSession);

  return newSession;
});

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Namaste! 👋 Welcome to Parasmani Jewellers.",
    },
    {
      id: 2,
      sender: "assistant",
      text: "I'm your Parasmani Assistant. How can I help you explore Parasmani jewellery?",
    },
  ]);

  const suggestions = [
    "Explore collections",
    "Show traditional jewellery",
    "Tell me about Parasmani",
    "How can I contact you?",
  ];

  

  const sendMessage = async (text = message) => {
  const trimmedMessage = text.trim();

  if (!trimmedMessage) return;

  const userMessage = {
    id: Date.now(),
    sender: "user",
    text: trimmedMessage,
  };

  setMessages((previous) => [
    ...previous,
    userMessage,
  ]);

  setMessage("");

  try {
    const response = await fetch(
      "https://sayyamo56.app.n8n.cloud/webhook/5f918827-934f-4eca-9862-72b499b09afb/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId: sessionId,
          chatInput: trimmedMessage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("n8n response:", data);

    const assistantMessage = {
      id: Date.now() + 1,
      sender: "assistant",
      text:
        data.output ||
        data.text ||
        data.response ||
        "Sorry, I couldn't generate a response right now.",
    };

    setMessages((previous) => [
      ...previous,
      assistantMessage,
    ]);
  } catch (error) {
    console.error("Parasmani Assistant error:", error);

    const errorMessage = {
      id: Date.now() + 1,
      sender: "assistant",
      text:
        "Sorry, I'm having trouble connecting right now. Please try again.",
    };

    setMessages((previous) => [
      ...previous,
      errorMessage,
    ]);
  }
};
  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* ==========================
          FLOATING BUTTON
      ========================== */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Parasmani Assistant"
          className="
            fixed
            bottom-6
            right-6
            z-50
            w-14
            h-14
            sm:w-16
            sm:h-16
            rounded-full
            bg-[#18322F]
            text-white
            shadow-xl
            flex
            items-center
            justify-center
            hover:bg-[#294443]
            hover:scale-105
            transition
            duration-300
          "
        >
          <FiMessageCircle className="text-2xl sm:text-3xl" />

          {/* Notification Dot */}

          <span
            className="
              absolute
              top-1
              right-1
              w-3
              h-3
              bg-[#C8A044]
              rounded-full
              border-2
              border-[#18322F]
            "
          />
        </button>
      )}

      {/* ==========================
          CHAT WINDOW
      ========================== */}

      {open && (
        <div
          className="
            fixed
            z-50
            bottom-4
            right-4
            left-4
            sm:left-auto
            sm:right-6
            sm:bottom-6
            w-auto
            sm:w-[390px]
            h-[600px]
            max-h-[calc(100vh-32px)]
            bg-[#F8F0E3]
            rounded-3xl
            shadow-2xl
            border
            border-[#D6C5A3]
            overflow-hidden
            flex
            flex-col
          "
        >

          {/* ==========================
              HEADER
          ========================== */}

          <div
            className="
              bg-[#18322F]
              text-white
              px-5
              py-4
              flex
              items-center
              justify-between
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#C8A044]
                  text-[#18322F]
                  flex
                  items-center
                  justify-center
                  font-semibold
                "
              >
                P
              </div>

              <div>

                <h3
                  className="text-base sm:text-lg"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Parasmani Assistant
                </h3>

                <p className="text-xs text-white/70">
                  Your jewellery guide
                </p>

              </div>

            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                hover:bg-white/10
                transition
              "
            >
              <FiX className="text-xl" />
            </button>

          </div>

          {/* ==========================
              MESSAGES
          ========================== */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-4
              py-5
              space-y-4
            "
          >

            {messages.map((item) => (

              <div
                key={item.id}
                className={`flex ${
                  item.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`
                    max-w-[85%]
                    px-4
                    py-3
                    rounded-2xl
                    text-sm
                    leading-6
                    ${
                      item.sender === "user"
                        ? "bg-[#18322F] text-white rounded-br-md"
                        : "bg-white text-[#333] border border-[#E3D8C5] rounded-bl-md"
                    }
                  `}
                >
                  {item.text}
                </div>

              </div>

            ))}

            {/* Suggestions */}

            {messages.length <= 2 && (

              <div className="pt-2">

                <p className="text-xs text-gray-500 mb-3">
                  You can ask me:
                </p>

                <div className="flex flex-wrap gap-2">

                  {suggestions.map((suggestion) => (

                    <button
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                      className="
                        text-xs
                        px-3
                        py-2
                        rounded-full
                        border
                        border-[#C8A044]
                        text-[#18322F]
                        bg-white/60
                        hover:bg-[#C8A044]
                        hover:text-white
                        transition
                      "
                    >
                      {suggestion}
                    </button>

                  ))}

                </div>

              </div>

            )}

          </div>

          {/* ==========================
              INPUT
          ========================== */}

          <form
            onSubmit={handleSubmit}
            className="
              p-3
              bg-white
              border-t
              border-[#D6C5A3]
            "
          >

            <div className="flex items-center gap-2">

              <input
                type="text"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                placeholder="Ask Parasmani Assistant..."
                className="
                  flex-1
                  min-w-0
                  bg-[#F8F0E3]
                  border
                  border-[#D6C5A3]
                  rounded-full
                  px-4
                  py-3
                  text-sm
                  outline-none
                  focus:border-[#C8A044]
                "
              />

              <button
                type="submit"
                aria-label="Send message"
                className="
                  w-11
                  h-11
                  flex-shrink-0
                  rounded-full
                  bg-[#18322F]
                  text-white
                  flex
                  items-center
                  justify-center
                  hover:bg-[#294443]
                  transition
                "
              >
                <FiSend />
              </button>

            </div>

          </form>

        </div>
      )}
    </>
  );
}

export default ParasmaniAssistant;