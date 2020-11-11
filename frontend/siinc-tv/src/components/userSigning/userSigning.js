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
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, SetHasAccount] = useState(false);

    // Sets type of form to display
    const showLogin = () => {
        return type === 'signIn';
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
    }
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    // This function handles sign in attempts
    const handleSignIn = () => {
        clearErrors();

        const userFetcher = async()=>{
            const response = await  userActions.signinWithUsernameAndPassword(userName, password);
            const userDataResponse = await userActions.getUser();
            setUser(userDataResponse);
        }
        userFetcher();

    }

    // This function handles sign up attempts
    const handleSignup = () => {
        clearErrors();
        clearInputs();
        const userFetcher = async()=>{
            const createResponse = await userActions.createNewUser(userName, email, password);
            const loginResponse = await  userActions.signinWithUsernameAndPassword(userName, password);
            const userDataResponse = await userActions.getUser();
            setUser(userDataResponse);
        }
        userFetcher();

    }

    return (
        <div>
            <h1>
                <button name='signInBtn' onClick={() => setType('signIn')}>Login</button>
                <button name='signupBtn' onClick={() => setType('signup')}>Sign-up</button>
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