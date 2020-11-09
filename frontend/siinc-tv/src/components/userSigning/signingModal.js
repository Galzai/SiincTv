import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import UserSigning from './userSigning';
import UserContext from "../../userContext";
import firebaseApp from "../../firebase";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

function SigningModal(props){
    // Example for a hook , we now also have a setter function
    const setUser = props.setUser;

    const [showRegistration, setShowRegistration] = useState(false);
    // These two functions handle showing/hiding modal
    function openRegistration(){
        setShowRegistration(true);
    }
    function closeRequest(){
        setShowRegistration(false);
    }

    // occurs after every render
    useEffect(() =>{
        const listener = firebaseApp.auth().onAuthStateChanged((user)=>{
            setUser(user);
        })
        return ()=>listener();

    },[]);

    return(
        <UserContext.Consumer>
            {context => (
                <div>
                    {context.user && <><h1>{context.user.metadata.lastSignInTime}</h1>
                        <h2>{context.user.email}</h2></>
                    }
                    {!context.user && <button onClick={openRegistration}>Signup/login</button>}
                    {!context.user && <Modal
                        isOpen={showRegistration}
                        onRequestClose={closeRequest}
                        style = {customStyles}
                        contentLabel={"example"}
                    >
                        <UserSigning
                            user={context.user}
                            setUser={context.setUser}
                            type={'signIn'}>
                        </UserSigning>
                    </Modal>}
                </div>
            )}

        </UserContext.Consumer>

    )
}

export default SigningModal;