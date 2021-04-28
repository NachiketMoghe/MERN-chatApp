import { SearchOutlined } from '@ant-design/icons'
import { MoreVert } from '@material-ui/icons'
import { AttachFile } from '@material-ui/icons'
import React, { useEffect, useState}  from 'react'
import {IconButton, Avatar} from "@material-ui/core"
import "./Chat.css"
import axios from "./axios"

function Chat({ messages }) {
    const [input, setInput]= useState("");

    const sendMessage = async (e) => {

        e.preventDefault(); // doesn't refresh the page

        await axios.post("/messages/new", {
            message: input,
            name: "You",
            timestamp: new Date().toLocaleString(),
            sent: true,
        });

        setInput("");
    }
    return (
        <div className="Chat">
            <div className="chat_header">
            <IconButton><Avatar src="https://www.99images.com/photos/wallpapers/anime/one-piece-chopperandroid-iphone-desktop-hd-backgrounds-wallpapers-1080p-4k-lf1uk.jpg?v=1614406509"/></IconButton> 
            <div className="chat_headerInfo">
                <h3>Room Name</h3>
                <p>Last seen at...</p>
            </div>
            <div className="chat_headerRight">
            <IconButton><SearchOutlined /></IconButton> 
            <IconButton><AttachFile /></IconButton> 
            <IconButton><MoreVert /></IconButton> 

            </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <p className={`chat_text ${message.sent && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                    </p>
                ))}
                
                    
            </div>
            <form>
            <div className="chat_search">
                <div className="chat_searchContainer">
                    <input 
                    value={input} 
                    onChange={ (e) => setInput(e.target.value) } 
                    placeholder="Type a message" 
                    type="text"
                    />
                    <button onClick={sendMessage} type="submit">
                    </button>
                </div>
            </div> 
            
            </form>
        </div>
    )
}

export default Chat
