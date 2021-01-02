import { useContext, useEffect, useRef, useState } from "react";
import userActions from "../../user/userActions";
import SocketContext from "../../userContext";

const NEW_NOTIFICATON = "newNotification";

const NotificationHandler = () => {
  const [newNotification, setNewNotifications] = useState(false);
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    if(socketContext && (socketContext.socket !== undefined)){
       const socket = socketContext.socket;

        // Triggers a refresh when a new notifications occurs
        socket.on(NEW_NOTIFICATON, () => {
        setNewNotifications(true);
      });
        
    }
  }, []);
  return {newNotification};
};

export default NotificationHandler;