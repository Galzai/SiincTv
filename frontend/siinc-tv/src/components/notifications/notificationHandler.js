import { useContext, useEffect, useRef, useState } from "react";
import userActions from "../../user/userActions";
import SocketContext from "../../userContext";

const NEW_NOTIFICATON = "newNotification";

const NotificationHandler = () => {
  const [newNotification, setNewNotifications] = useState(false);
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    if(socketContext.socket !== null){
       const socket = socketContext.socket;

        // Triggers a refresh when a new notifications occurs
        socketRef.current.on(NEW_NOTIFICATON, () => {
          setNotifications(true);
      });
        
    }
  }, []);
  return {notifications};
};

export default NotificationHandler;