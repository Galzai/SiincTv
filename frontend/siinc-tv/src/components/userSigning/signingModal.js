import React, {useEffect, useState} from 'react'
import Modal from 'react-modal'
import UserSigning from './userSigning';
import UserContext from "../../userContext";
import userActions from "../../user/userActions"
import style from "../NavigationBar/navbar.module.css"

// React modal doesn't play nice with css modules
const customStyles = {
    overlay:{
        backgroundColor: 'rgba(17, 17, 17, 0.7)'
    },
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
        backgroundColor       : '#0B001E',
        borderRadius          : '10px',
        padding               : '0px',
        border                : 'none',
        boxShadow             : '0px 0px 20px 5px #1C0D36',
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
                            <div onClick={()=>{setSigninType('signIn');openRegistration()}} className={style.signInButton}>Log In</div>
                            <div className={style.navBarSeperator} style={{right:"140px"}}></div>
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
