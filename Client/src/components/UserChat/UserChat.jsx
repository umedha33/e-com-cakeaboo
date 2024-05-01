import React, { useState, useEffect } from 'react'
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

            socket.emit('join chat', chatId);
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
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sapiente cupiditate aliquid veniam vero perspiciatis, libero possimus laudantium impedit explicabo dignissimos, minus obcaecati earum beatae, in quia error cumque! Quas.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sapiente cupiditate aliquid veniam vero perspiciatis, libero possimus laudantium impedit explicabo dignissimos, minus obcaecati earum beatae, in quia error cumque! Quas.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit sapiente cupiditate aliquid veniam vero perspiciatis, libero possimus laudantium impedit explicabo dignissimos, minus obcaecati earum beatae, in quia error cumque! Quas.</p>
            </div>
            <div className="cht-body">
                <h1>Chat with Cake A Boo</h1>
                <div className="msg-body">
                    <>
                        {canChat ? (
                            <>
                                <div className="chat-threads">
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
