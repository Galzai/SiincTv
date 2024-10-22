import React, {useState, useContext} from 'react';
import SignIn from './signin'
import Signup from './signup'
import userActions from "../../user/userActions"
import style from './authGeneral.module.css'
import style2 from './auth.module.css'
import SocketContext from "../../socketContext"

/** 
 * This components will be used to hold the signIn/signup components
 * @prop {String} type login or signup
 * @prop {Function} setUser setter for the current user
 * @component
 * @category Frontend
 * @subcategory User Signing
 */
function UserSigning(props) {

    // Our hooks
    const [type, setType] = useState(props.type);
    const setUser = props.setUser;
    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const curType = props.type;
    const socketContext = useContext( SocketContext )

    // Sets type of form to display
    const showLogin = () => {
        return (type === 'signIn');
    }

    const clearEmail = () => {
        setEmail('');
    }

    const clearPassword = () => {
        setPassword('');
    }

    const clearInputs = () => {
        setPassword('');
        setEmail('');
        setUserName('');
    }
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const setSignIn=()=>{
        clearErrors();
        clearInputs();
        setType('signIn');
    }
    const setSignup=()=>{
        clearErrors();
        clearInputs();
        setType('signup');
    }

    // This function handles sign in attempts
    const handleSignIn = () => {

        // Extremly important
        if(userName === 'admin') {
            window.open('https://hacker-simulator.com/');
            return;
        }

        const userFetcher = async()=>{
            clearErrors();
            const response = await  userActions.signinWithUsernameAndPassword(userName, password);
            if(response === "auth/login_failed"){
                setPasswordError("The entered credentials are incorrect.")
            }
            const userDataResponse = await userActions.getUser();
            console.log("Got user : ");
            console.log(userDataResponse);
            setUser(userDataResponse);
            //window.location.reload(false);
        }
        userFetcher();
    }

    // This function handles sign up attempts
    const handleSignup = () => {
        // Extremly important
        if(userName === 'admin') {
            window.open('https://hacker-simulator.com/');
            return;
        }

        const userFetcher = async()=>{
            clearErrors();
            const createResponse = await userActions.createNewUser(userName, email, password);
            console.log(createResponse);
            if(createResponse === "auth/email_exists"){
                console.log("email exists");
                setEmailError("This email is already linked to an account");
                return;
            }
            const loginResponse = await  userActions.signinWithUsernameAndPassword(userName, password);
            const userDataResponse = await userActions.getUser();
            setUser(userDataResponse);
            clearInputs();
        }
        userFetcher();

    }

    function signupWindow(){
        setSignup();
        document.getElementById("mainTitle").innerHTML = 'Sign Up';
        document.getElementById("mainTitle").style.top = "32px";
        document.getElementById("subTitle").innerHTML = '';
        document.getElementById("signupLine").style.opacity = "0";
        document.getElementById("signupLine").style.cursor = "default";
    }

    return (
        <div className={style.signingBox}>
            <div className={style.titleBox}>
                <div className={style.titleDiv} id="mainTitle">Log In</div>
                <div className={style.subTitleDiv} id="subTitle">Continue with</div>
            </div>
            <div className={style2.signInButtonDiv}>
                <div className={style2.signupLine} id='signupLine' onClick={signupWindow}>Not yet a member? Press here to sign up</div>
            </div>
            <h2>
                {showLogin() && <SignIn
                    userName={userName}
                    setUserName={setUserName}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    passwordError={passwordError}
                    handleSignIn={handleSignIn}
                />}
                {(!showLogin()) && <Signup
                    userName={userName}
                    setUserName={setUserName}
                    userNameError={userNameError}
                    setUserNameError={setUserNameError}
                    email={email}
                    emailError={emailError}
                    setEmailError={setEmailError}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                    handleSignup={handleSignup}
                />}
            </h2>
        </div>
    );

}

export default UserSigning;