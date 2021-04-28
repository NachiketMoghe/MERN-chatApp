import React from 'react'
import "./SidebarChat.css";
import {IconButton, Avatar} from "@material-ui/core"

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <div className="avatar"><IconButton><Avatar src="https://www.99images.com/photos/wallpapers/anime/one-piece-chopperandroid-iphone-desktop-hd-backgrounds-wallpapers-1080p-4k-lf1uk.jpg?v=1614406509"/></IconButton></div>
            <div className="sidebarInfo">
            <h3>Room Name</h3>
            <p>Last Text</p>
            </div>
        </div>
    )
}

export default SidebarChat
