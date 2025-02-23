import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchUser();

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) console.error(error);
      else setMessages(data);
    };

    fetchMessages();

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const { error } = await supabase.from("messages").insert([
      {
        sender_id: user.id,
        content: newMessage,
      },
    ]);

    if (error) console.error(error);
    else setNewMessage("");
  };

  if (!user) return <p className="text-center text-lg mt-10">Loading chat...</p>;

  return (
    <div className="h-screen flex flex-col bg-pink-100">
      {/* Messages Container */}
      <div className="flex-1 overflow-auto p-4 bg-white shadow-md rounded-lg mt-20">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="p-2 border-b text-black">
              <strong className="text-pink-700">{msg.sender_id.substring(0, 6)}</strong>: {msg.content}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center p-2 bg-pink-200 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg outline-none border input-field"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};
