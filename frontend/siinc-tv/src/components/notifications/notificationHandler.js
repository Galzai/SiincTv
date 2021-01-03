import { useContext, useEffect, useRef, useState } from "react";
import userActions from "../../user/userActions";
import SocketContext from "../../socketContext";
import UserContext from "../../userContext";

const NEW_NOTIFICATON = "newNotification";

const NotificationHandler = () => {
  const [newNotification, setNewNotifications] = useState(false);
  const socketContext = useContext(SocketContext);
  const userContext = useContext(UserContext);
  
  useEffect(() => {
        // Triggers a refresh when a new notifications occurs
        socketContext.socket.on(NEW_NOTIFICATON, () => {
        userContext.refreshUserData();
        setNewNotifications(true);
      });

      socketContext.socket.on('error', function (err) {
        console.log(err);
    });
  }, []);
  return {newNotification};
};

export default NotificationHandler;