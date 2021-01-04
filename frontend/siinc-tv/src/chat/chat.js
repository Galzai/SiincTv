import React, {useState, useRef} from "react";
import ChatHandler from './chatHandler'
import style from './chat.module.css'
import Textarea from 'react-expanding-textarea'

function Chat(props){

    const { roomId } = props.roomId; // Gets roomId from URL
    const { messages, sendMessage } = ChatHandler(props.roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = useState(""); // Message to be sent
    const userId = props.userId;

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
      };
    
      const handleSendMessage = () => {
        if(userId) sendMessage(userId + ": " + newMessage);
        setNewMessage("");
      };
    
    function handleKeypress(e) {
    //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleSendMessage();
        e.preventDefault();
      }
    };

    return (
        <div className={style.chatContainer}>  
           <Textarea  className={style.messageTextArea}
              value={newMessage}
              onChange={handleNewMessageChange}
              placeholder="Click enter to send message..."
              maxLength="200"
              onKeyDown={handleKeypress}
            />
            <div className={style.messagesContainer}>
            <ol className={style.messageList}>
              {messages.map((message, i) => (
                <li
                  key={i}
                  className={` ${message.ownedByCurrentUser ? style.myMessage : style.otherMessage
                  }`}
                >
                  {message.body}
                </li>
              ))}
            </ol>
          </div>           

          </div>
      );
}
export default Chat;

