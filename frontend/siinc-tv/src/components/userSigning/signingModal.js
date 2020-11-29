import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import UserSigning from './userSigning';
import UserContext from "../../userContext";
import userActions from "../../user/userActions"
import style from "../NavigationBar/navbar.module.css"

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
    const [signinType, setSigninType] = useState('signIn');

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
                    {!context.user && 
                        <div>
                            <div onClick={()=>{setSigninType('signIn');openRegistration()}} className={style.signInButton}>Sign In</div>
                            <div className={style.navBarSeperator} style={{right:"140px"}}></div>
                            <div onClick={()=>{setSigninType('signUp');openRegistration()}} className={style.signUpButton}>Sign Up</div>
                            <Modal
                                isOpen={showRegistration}
                                onRequestClose={closeRequest}
                                style = {customStyles}
                                contentLabel={"example"}
                            >
                                <UserSigning
                                    user={context.user}
                                    setUser={context.setUser}
                                    type={signinType}>
                                </UserSigning>
                            </Modal>
                        </div>
                    }
                </div>
            )}

        </UserContext.Consumer>

    )
}

export default SigningModal;
