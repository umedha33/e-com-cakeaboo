import React, { useState, useEffect, useRef } from 'react'
import './UserChats.css'
import dummyOrders from '../Assets/dummy-orders'
import io from 'socket.io-client'

// ===========================================================
const ENDPOINT = 'http://localhost:4000';
var socket, selectedChatCompare;
// ===========================================================

const UserChat = () => {
    const [canChat, setCanChat] = useState(false);
    const [chatId, setChatId] = useState('');
    const [usersId, setUsersId] = useState('');
    const [msgContent, setMsgContent] = useState('');
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('auth-token');
    const [socketConnected, setSocketConnected] = useState(false);
    const [userData, setUserData] = useState([])
    const [theChat, setTheChat] = useState([])
    const chatContainerRef = useRef(null);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', usersId)
        socket.on('connection', () => setSocketConnected(true))
    }, [])

    const createChat = async () => {
        const userId = "662faa8da7a1f72bb979229a";
        // const token = localStorage.getItem('auth-token');

        try {
            const response = await fetch('http://localhost:4000/api/chat', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            // console.log('Chat Created:', result);
            fetchChats();
        } catch (error) {
            console.error('Failed to create chat:', error);
        }
    };

    const fetchChats = async () => {
        // const token = localStorage.getItem('auth-token');
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
            setChatId({ data }.data[0]._id);
            setUsersId({ data }.data[0].chatUsers[0]._id);
            setTheChat({ data }.data);
            if (data.length > 0) {
                setCanChat(true);
            }

        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    const fetchMessages = async () => {
        if (!chatId) return;  // Don't fetch if chatId is not set

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

            // socket.emit('join chat', chatId);
            // console.log(`msgs: `, data);
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
        fetchMessages();
    }, [])

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = theChat;
        // console.log(`the chat: `, theChat);
    }, [chatId]);


    useEffect(() => {
        const interval = setInterval(() => {
            fetchMessages();
        }, 500);

        return () => clearInterval(interval);
    }, [chatId]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

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

        } catch (error) {
            console.error('Failed to create chat:', error);
        }
    };

    const sendBtn = () => {
        console.log(`Msg Content:`, msgContent);
        createMsg();
        fetchMessages();
        setMsgContent('');
    }

    return (
        <div className="user-chat-container">
            <div className="chat-instructions">
                <h1>Chat instructions and policies</h1>
                <p>Welcome to our chat platform! Here are some important instructions and policies for you to keep in mind while using our service:
                    <br /><br />
                    <span>Respectful Communication: </span>Please engage with others in a courteous and respectful manner. Avoid offensive language, harassment, or any form of discrimination.
                    <br />
                    <br />
                    <span>Privacy and Security: </span>Protect your personal information and avoid sharing sensitive data in public chat rooms. Be cautious of sharing contact details or financial information with strangers.
                    <br />
                    <br />
                    <span>Content Guidelines: </span>Ensure that your messages comply with our community guidelines. Avoid sharing inappropriate or harmful content, including spam, misleading information, or illegal activities.
                    <br />
                    <br />
                    <span>Feedback and Support: </span>If you encounter any issues or have suggestions for improvement, feel free to reach out to our support team. We're here to help and enhance your experience on our platform.
                    <br />
                    <br />
                    By adhering to these guidelines, you contribute to creating a positive and enjoyable environment for everyone. Thank you for being a part of our community!</p>
            </div>
            <div className="cht-body">
                <h1>Chat with Cake A Boo</h1>
                <div className="msg-body">
                    <>
                        {canChat ? (
                            <>
                                <div className="chat-threads" ref={chatContainerRef}>
                                    {messages.length > 0 ? (
                                        <>
                                            {messages.map((msg, index) => {
                                                const isSender = msg.sender._id === usersId;
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
                                <div className="cht-now-body">
                                    <button onClick={() => { createChat() }}>CHAT NOW</button>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

export default UserChat
