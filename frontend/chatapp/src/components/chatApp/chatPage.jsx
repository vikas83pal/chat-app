import React, { useContext, useRef, useState, useEffect } from 'react';
import File from "../../assets/file.png";
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatContext from '../context/chatContext';

const chatPage = () => {
    const { user, roomId, connected } = useContext(ChatContext);
    const navigate = useNavigate();

    // Redirect to home page if not connected
    useEffect(() => {
        if (!connected) {
            navigate("/");
        }
    }, [connected, navigate]);

    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const boxRef = useRef(null);

    // WebSocket connection and message subscription
    useEffect(() => {
        const connectWebSocket = () => {
            const sock = new SockJS("http://localhost:8080/chat");
            const client = Stomp.over(sock);

            client.connect({}, () => {
                setStompClient(client);
                toast.success("connected");

                // Subscribe to receive new messages for the room
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    const newMessage = JSON.parse(message.body);
                    setMessage((prevMessages) => [...prevMessages, newMessage]);
                });
            });
        };

        connectWebSocket();
    }, [roomId]);

    // Send a new message
    const sendMessage = async () => {
        if (stompClient && connected && input.trim()) {
            const newMessage = {
                sender: user,
                content: input,
                roomId: roomId
            };

            stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(newMessage));

            setMessage((prevMessages) => [...prevMessages, newMessage]);
            setInput('');
        }
    };

    useEffect(() => {
        const loadMessages = async () => {
            console.log("Room ID:", roomId); // Log the roomId to ensure it's correct
    
            try {
                const response = await fetch(`/api/rooms/${roomId}/messages`);
    
                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`Failed to fetch messages: ${errorDetails}`);
                }
    
                const fetchedMessages = await response.json();
                console.log("Fetched Messages:", fetchedMessages); // Log fetched messages
                setMessage(fetchedMessages); 
    
            } catch (error) {
                toast.error('Error loading messages');
                console.error('Error loading messages:', error);
            }
        };
    
        if (roomId) {
            loadMessages();
        }
    }, [roomId]);
    


    // Scroll to the latest message
    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    return (
        <div>
            <nav className='flex justify-between items-center bg-white/30 p-3 fixed w-full top-0 rounded-lg z-10'>
                <div className='flex items-center'>
                    <span className='font-serif'>Room ID: {roomId}</span>
                </div>
                <div className='flex items-center'>
                    <span className='font-serif'>User: {user}</span>
                </div>
                <button onClick={() => { navigate("/"); toast.success("Successfully Logout!"); }} className='bg-red-500 rounded-md cursor-pointer hover:bg-green-500 px-4 py-2'>Logout</button>
            </nav>

            <div ref={boxRef} className="flex flex-col h-screen pt-[72px] pb-[90px]">
                <main className="h-[90vh] mx-20 overflow-auto p-4 bg-gradient-to-b from-pink-800/20 to-white/30 rounded-lg z-10">
                    {message.map((msg, key) => (
                        <div key={key} className={`flex ${msg.sender === "vikas" ? "justify-end" : "justify-start"}`}>
                            <div className={`border bg-white/30 px-3 py-2 w-fit mb-2 rounded-lg ${msg.sender === user ? "bg-white/30" : "bg-pink-800/20"}`}>
                                <p className='font-serif font-bold'>{msg.sender}</p>
                                <p className='font-serif'>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div/>
                </main>
            </div>

            <footer className="bg-white/30 p-4 fixed bottom-2 inset-x-0 flex items-center rounded-xl mx-auto w-full max-w-screen-md">
                <div className="flex w-full items-center space-x-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a message"
                        className="flex-grow p-2 rounded-full bg-violet-50 font-serif text-black focus:outline-none focus:ring-2 focus:ring-violet-400 focus:shadow-md"
                    />
                    <img src={File} alt="Attach File" className="w-10 bg-transparent cursor-pointer" />
                    <button onClick={sendMessage} className="bg-green-500 rounded-lg px-4 py-2">Send</button>
                </div>
            </footer>
        </div>
    );
};

export default chatPage;
