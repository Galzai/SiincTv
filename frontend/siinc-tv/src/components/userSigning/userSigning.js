/*
 * This components will be used to hold the signIn/signup components
 */
import React, {useState} from 'react';
import SignIn from './signin'
import Signup from './signup'
import userActions from "../../user/userActions"

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
        if(userName == 'admin') {
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
            setUser(userDataResponse);
        }
        userFetcher();
    }

    // This function handles sign up attempts
    const handleSignup = () => {
        // Extremly important
        if(userName == 'admin') {
            window.open('https://hacker-simulator.com/');
            return;
        }

        const userFetcher = async()=>{
            clearErrors();
            const createResponse = await userActions.createNewUser(userName, email, password);
            console.log(createResponse);
            if(createResponse === "auth/email_exists"){

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

    return (
        <div>
            <h1>
                <button name='signInBtn' onClick={setSignIn}>Login</button>
                <button name='signupBtn' onClick={setSignup}>Sign-up</button>
            </h1>
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