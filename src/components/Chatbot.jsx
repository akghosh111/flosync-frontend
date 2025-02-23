import React, { useState, useEffect, useRef } from 'react';
import { Plus, Send, Pencil, Trash2, Check, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

//gemini ai
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const Chatbot = ({ supabase }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat.id);
    }
  }, [currentChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChats(data);
      if (data.length > 0 && !currentChat) {
        setCurrentChat(data[0]);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const { data, error } = await supabase
        .from('gmessages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const createNewChat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('chats')
        .insert([
          { user_id: user.id, title: 'New Chat' }
        ])
        .select()
        .single();

      if (error) throw error;
      setChats([data, ...chats]);
      setCurrentChat(data);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId);

      if (error) throw error;
      setChats(chats.filter(chat => chat.id !== chatId));
      if (currentChat?.id === chatId) {
        setCurrentChat(chats[0] || null);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const startEditingChat = (chat) => {
    setEditingChatId(chat.id);
    setEditingTitle(chat.title);
  };

  const saveEditedChat = async () => {
    try {
      const { error } = await supabase
        .from('chats')
        .update({ title: editingTitle })
        .eq('id', editingChatId);

      if (error) throw error;
      setChats(chats.map(chat => 
        chat.id === editingChatId ? { ...chat, title: editingTitle } : chat
      ));
      if (currentChat?.id === editingChatId) {
        setCurrentChat({ ...currentChat, title: editingTitle });
      }
      setEditingChatId(null);
    } catch (error) {
      console.error('Error updating chat:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentChat) return;

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      // Save user message
      const { error: messageError } = await supabase
        .from('gmessages')
        .insert([
          {
            chat_id: currentChat.id,
            user_id: user.id,
            content: newMessage,
            role: 'user'
          }
        ]);

      if (messageError) throw messageError;

      // Get response from Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `You are Riva, a knowledgeable and empathetic menstrual health advisor. 
        Your role is to provide accurate, helpful information about menstrual health, cycle tracking, 
        and related topics in a friendly and supportive way. Please help the user with their question: ${newMessage}`;

      const result = await model.generateContent(prompt);
      const assistantMessage = result.response.text();

      // Save assistant's response
      const { error: assistantError } = await supabase
        .from('gmessages')
        .insert([
          {
            chat_id: currentChat.id,
            user_id: user.id,
            content: assistantMessage,
            role: 'assistant'
          }
        ]);

      if (assistantError) throw assistantError;

      setNewMessage('');
      await fetchMessages(currentChat.id);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-rose-50">
     
      <div className="w-64 bg-white border-r border-rose-200 flex flex-col pt-16">
        <div className="p-4 border-b border-rose-200">
          <button
            onClick={createNewChat}
            className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`p-3 cursor-pointer hover:bg-rose-50 flex justify-between items-center ${
                currentChat?.id === chat.id ? 'bg-rose-100' : ''
              }`}
            >
              {editingChatId === chat.id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="flex-1 px-2 py-1 border border-rose-300 rounded"
                  />
                  <button onClick={saveEditedChat} className="text-green-600">
                    <Check size={16} />
                  </button>
                  <button onClick={() => setEditingChatId(null)} className="text-red-600">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => setCurrentChat(chat)}
                    className="flex-1 truncate"
                  >
                    {chat.title}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditingChat(chat)}
                      className="text-rose-600 hover:text-rose-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteChat(chat.id)}
                      className="text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      
      <div className="flex-1 flex flex-col pt-16">
        {currentChat ? (
          <>
           
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-rose-600 text-white'
                        : 'bg-white border border-rose-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

           
            <div className="border-t border-rose-200 p-4 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-rose-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !newMessage.trim()}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    loading || !newMessage.trim()
                      ? 'bg-rose-300 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-700'
                  } text-white transition-colors`}
                >
                  <Send size={20} />
                  {loading ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-rose-600">
            Select or create a chat to start
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;