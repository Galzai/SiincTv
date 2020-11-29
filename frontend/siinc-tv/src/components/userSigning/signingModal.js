import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import UserSigning from './userSigning';
import UserContext from "../../userContext";
import userActions from "../../user/userActions"

// React modal doesn't play nice with css modules
const customStyles = {
    content : {
        overflowX             : 'hidden',
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        width                 : 'fit-content',
        height                : 'fit-content',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : '#3C096C',
        borderRadius          : '20px',
        padding               : '0px'
    }
};

function SigningModal(props){
    // Example for a hook , we now also have a setter function
    // const context = React.useContext(UserContext)
    const user = props.user;
    const setUser = props.setUser;
    const refreshUserData = props.refreshUserData;
    const [showRegistration, setShowRegistration] = useState(false);

    // We set the app element to root
    Modal.setAppElement('#root');
    // These two functions handle showing/hiding modal
    function openRegistration(){
        setShowRegistration(true);
    }
    function closeRequest(){
        setShowRegistration(false);
    }

    function signOut(){
        userActions.signOut();
        setUser(null);
    }

    // occurs after every render
    useEffect(() =>{
        const userfetcher = async()=>{
            const userDataResponse = await userActions.getUser();
            setUser(userDataResponse);
        };
        userfetcher();
    },[]);

    return(
        <UserContext.Consumer>
            {context => (
                <div>
                    {context.user && <><h1>{context.user.username}</h1>
                        <h2>{context.user.email}</h2>
                        <h2>{context.user._id}</h2></>
                    }
                    {!context.user && <button onClick={openRegistration} style={props.styles}>Signup/login</button>}
                    {context.user && <button onClick={signOut} style={props.styles}>Signout</button>}
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
