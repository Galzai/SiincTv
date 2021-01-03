import { useContext, useEffect, useRef, useState } from "react";
import userActions from "../../user/userActions";
import SocketContext from "../../socketContext";
import UserContext from "../../userContext";
import {toast } from 'react-toastify';

const NEW_NOTIFICATON = "newNotification";

const NotificationHandler = () => {
  const [newNotification, setNewNotifications] = useState(false);
  const socketContext = useContext(SocketContext);
  const userContext = useContext(UserContext);
  let lastNot = 0;
  
  useEffect(() => {
        // Triggers a refresh when a new notifications occurs
        socketContext.socket.on(NEW_NOTIFICATON, (popUpText) => {
          userContext.refreshUserData();
          if(popUpText && popUpText != "")
          {
            toast.dark(popUpText, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: lastNot
              });
            lastNot++;
          }
          setNewNotifications(true);
      });

      socketContext.socket.on('error', function (err) {
        console.log(err);
    });
  }, []);
  return {newNotification};
};

export default NotificationHandler;