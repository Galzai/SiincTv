/**
 * This module is in charge of the chats with a give room id
 */
import React, { useEffect, useState } from "react";
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import ChatHandler from "./chatHandler";
import style from "./chat.module.css";
import Textarea from "react-expanding-textarea";
import LoggedViewers from "./loggedViewers";
import ScrollToBottom from "react-scroll-to-bottom";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

/**
 * @brief This is a small clickable stream window used to select current streamer in "single main" view
 *
 * @prop {String} roomId id of the room the chat is in
 * @prop {String} username name of the user in the chat
 * @prop {Boolean} isOwner true if the user is the owner of the stream
 * @category Frontend
 * @component
 */
function Chat(props) {
  const { messages, sendMessage, loggedViewers, banUnban } = ChatHandler(
    props.roomId
  ); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [anchorEl, setAnchorEl] = useState(null);
  const username = props.username;
  const isOwner = props.isOwner;

  useEffect(() => {}, [props.roomId]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSendMessage = () => {
    if (username) sendMessage(username + ": " + newMessage);
    setNewMessage("");
  };
  const addEmoji = (emojiObj) => {
    setNewMessage(newMessage + emojiObj.native);
  };
  function handleKeypress(e) {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSendMessage();
      e.preventDefault();
    }
  }
  const emojiSelector = () => {
    return (
      <div className={style.emojiSelector}>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SentimentVerySatisfiedIcon className={style.notificationButton} />
        </IconButton>
        <Menu
          classes={{
            root: style.menuRootEmoji,
            paper: style.menuPaperEmoji,
            list: style.menuListEmoji,
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Picker showSkinTones={false} showPreview={false} native={true} emoji={""} theme={'dark'} onSelect={addEmoji} />
        </Menu>
      </div>
    );
  };
  return (
    <div className={style.chatContainer}>
      {loggedViewers && (
        <LoggedViewers
          loggedViewers={loggedViewers}
          banUnban={banUnban}
          isOwner={isOwner}
        />
      )}
      <ScrollToBottom className={style.messagesContainer}>
        <ol className={style.messageList}>
          {messages.map((message, i) => (
            <li
              key={i}
              className={` ${
                message.ownedByCurrentUser
                  ? style.myMessage
                  : style.otherMessage
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </ScrollToBottom>
      <div>
        <Textarea
          className={style.messageTextArea}
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Click enter to send message..."
          maxLength="200"
          onKeyDown={handleKeypress}
        />
        {emojiSelector()}
      </div>
    </div>
  );
}
export default Chat;
