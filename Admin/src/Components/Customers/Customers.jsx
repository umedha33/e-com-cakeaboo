import React, { useState, useEffect } from 'react';
import './Customers.css'
import dummyChats from '../Assets/dummyChats'

const Customers = () => {
    const [currentChatIndex, setCurrentChatIndex] = useState(null);
    const [chats, setChats] = useState([]);

    const selectChat = index => {
        setCurrentChatIndex(index);
    };
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
            // console.log(`Chat List: `, chats);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    useEffect(() => {
        fetchChats();
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
                                    className={`cht-lstcard ${index === currentChatIndex ? 'active-chat' : ''}`}
                                    onClick={() => selectChat(index)}
                                >
                                    <div className='card-dtls'>
                                        <h2>{chat.chatName}</h2>
                                        <p>{chat.date}</p>
                                        {/* <p>{chat.conversation[chat.conversation.length - 1].message}</p> */}
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
                    {/* <h1>Message</h1> */}
                    <div className="msg-body">
                        {currentChatIndex === null && <h2 id='slct-chat-lbl'>Select a chat</h2>}
                        <div className="chat-threads">
                            {currentChatIndex !== null && dummyChats[currentChatIndex].conversation.map((msg, index) => (
                                <div key={index} className={msg.sender !== "Me" ? "sender-side" : "user-side"}>
                                    <p id={msg.sender !== "Me" ? "user-msg" : "sender-msg"}>{msg.message}</p>
                                </div>
                            ))}

                        </div>

                        <div className="text-sender">
                            <input type="text" name="message-txt" id="message-txt" placeholder='Enter message' />
                            <input
                                type="file"
                                id="file-input"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-input" className="file-label">
                                <i className="fa-solid fa-file"></i>
                            </label>
                            <i className="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Customers
