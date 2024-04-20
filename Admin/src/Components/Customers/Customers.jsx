import React, { useState } from 'react';
import './Customers.css'
import dummyChats from '../Assets/dummyChats'

const Customers = () => {
    const [currentChatIndex, setCurrentChatIndex] = useState(null);

    const selectChat = index => {
        setCurrentChatIndex(index);
    };

    return (
        <div className='customers-container'>
            <div className="chats-nav">
                <h1>CHAT LIST</h1>
                <h1>MESSAGE</h1>
            </div>
            <div className="cht-portal">
                <div className="chat-lst">
                    {/* <div className="chat-hdr">
                        <h1>Chat List</h1>
                    </div> */}
                    <div className="chat-lst-body">
                        {dummyChats.map((chat, index) => (
                            <div
                                key={index}
                                className={`cht-lstcard ${index === currentChatIndex ? 'active-chat' : ''}`}
                                onClick={() => selectChat(index)}
                            >
                                <div className='card-dtls'>
                                    <h2>{chat.customerName}</h2>
                                    <p>{chat.conversation[chat.conversation.length - 1].message}</p>
                                </div>
                            </div>
                        ))}
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
                            <i class="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Customers