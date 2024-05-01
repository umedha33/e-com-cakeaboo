import React, { useState, useEffect } from 'react';
import './Customers.css'
import dummyChats from '../Assets/dummyChats'
import io from 'socket.io-client'

// ===========================================================
const ENDPOINT = 'http://localhost:4000';
var socket, selectedChatCompare;
// ===========================================================


const Customers = () => {
    const [chats, setChats] = useState([]);
    const [slcted, setSlcted] = useState(false);
    const [chatId, setChatId] = useState('');
    const [msgContent, setMsgContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const token = localStorage.getItem('auth-token');
    const [userData, setUserData] = useState([])
    const [theChat, setTheChat] = useState([])

    const selectChat = chatId => {
        let selectedChatId = '';
        selectedChatId = chatId
        setChatId(selectedChatId);

        if (selectedChatId === chatId) {
            setSlcted(true);
        }
    };

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = theChat;

    }, [chatId])

    useEffect(() => {
        socket = io(ENDPOINT, { auth: { token: localStorage.getItem('auth-token') } });

        socket.on('connected', () => {
            console.log("Socket Connected!");
            setSocketConnected(true);
        });

        socket.on('message received', (newMessageReceived) => {
            if (newMessageReceived.chat._id === chatId) {
                setMessages(prevMessages => [...prevMessages, newMessageReceived]);
            }
        });

        return () => {
            socket.off('connected');
            socket.off('message received');
        };
    }, [chatId]);



    const fetchChats = async () => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await fetch('http://localhost:4000/api/chat', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setChats(data);
            setTheChat({ data }.data);

            // console.log(`Chat List: `, data);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    const getTime = (time) => {
        const dateObj = new Date(time);
        const now = new Date();

        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const formattedTime = dateObj.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const currentDate = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        if (formattedDate === currentDate) {
            return formattedTime;
        } else {
            return formattedDate;
        }
    };

    const createMsg = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/message', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: msgContent,
                    chatId: chatId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            socket.emit('new message', { result });
            // console.log('Result:', { result }.result.messageContent);
        } catch (error) {
            console.error('Failed to create chat:', error);
        }
    };

    const sendBtn = () => {
        console.log(`Msg Content:`, msgContent);
        console.log(`chat id: `, chatId);
        createMsg();
        setMsgContent('');
        fetchMessages();
    }

    const fetchMessages = async () => {
        if (!chatId) return;
        try {
            const response = await fetch(`http://localhost:4000/api/message/${chatId}`, {
                headers: {
                    Accept: 'application/json',
                    'auth-token': token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessages(data);

            socket.emit('join chat', chatId);

        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/user`, {
                headers: {
                    Accept: 'application/json',
                    'auth-token': token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserData({ data });
            // console.log(`user data: `, userData);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    useEffect(() => {
        fetchChats();
        fetchUserData();
    }, [])

    return (
        <div className='customers-container'>
            <div className="chats-nav">
                <h1>CHAT LIST</h1>
                <h1>MESSAGE</h1>
            </div>
            <div className="cht-portal">
                <div className="chat-lst">

                    <div className="chat-lst-body">
                        {chats.length > 0 ? (<>
                            {chats.map((chat, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectChat(chat._id)}
                                    className={`cht-lstcard ${chat._id === chatId ? 'active-chat' : ''}`}
                                >
                                    <div className='card-dtls'>
                                        <h2>{chat.chatName}</h2>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p id='ltst-msg'>{chat.latestMessage.messageContent}</p>
                                            <p>{getTime(chat.date)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>) : (
                            <>
                                <h3>Loading...</h3>
                            </>
                        )}
                    </div>
                </div>
                <div className="cht-body">
                    <div className="msg-body">
                        {slcted ? (
                            <>
                                <div className="chat-threads">
                                    {messages.length > 0 ? (
                                        <>
                                            {messages.map((msg, index) => {
                                                const isSender = msg.sender.username === "Admin";
                                                return (
                                                    <div key={index} className={isSender ? "user-side" : "sender-side"}>
                                                        <p id={isSender ? "sender-msg" : "user-msg"}>{msg.messageContent}</p>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                </div>
                                <div className="text-sender">
                                    <input type="text"
                                        name="message-txt"
                                        id="message-txt"
                                        placeholder='Enter message'
                                        value={msgContent}
                                        onChange={(e) => setMsgContent(e.target.value)} />
                                    <input
                                        type="file"
                                        id="file-input"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="file-input" className="file-label">
                                        <i className="fa-solid fa-file"></i>
                                    </label>
                                    <i className="fa-solid fa-paper-plane"
                                        onClick={() => { sendBtn() }}
                                    ></i>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 id='slct-chat-lbl'>Select a chat</h2>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Customers
