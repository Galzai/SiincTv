/*
 * This components will be used to hold the signIn/signup components
 */
import React, {useState} from 'react';
import firebaseAuth from '../../firebase'
import SignIn from './signin'
import Signup from './signup'
import firebaseApp from "../../firebase";

function UserSigning(props){
{
    // Our hooks
    const [type, setType] = useState(props.type);
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, SetHasAccount] = useState(false);

    // Sets type of form to display

    const showLogin =() => {
        return type === 'signIn';
    }

    const clearEmail= ()=>{
        setEmail('');
    }

    const clearPassword = ()=>{
       setPassword('');
    }

    const clearInputs=()=>{
        setPassword('');
        setEmail('');
    }
    const clearErrors=()=>{
        setEmailError('');
        setPasswordError('');
    }

    // This function handles sign in attempts
    const handleSignIn = ()=>{
        clearErrors();
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found" :
                        setEmailError(err.message)
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message)
                        break
                }
            });
    }

    // This function handles sign up attempts
    const handleSignup =()=>{
        clearErrors();
        clearInputs();
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message)
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message)
                        break
                }
            });
    }
    
        return(
            <div>
                <h1>
                <button name='signInBtn' onClick={()=>setType('signIn')}>Login</button>
                <button name='signupBtn' onClick={()=>setType('signup')}>Sign-up</button>
                </h1>
                <h2>
                    {showLogin() && <SignIn
                        email={email}
                        emailError={emailError}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        passwordError={passwordError}
                        handleSignIn={handleSignIn}
                    />}
                    {(!showLogin()) && <Signup
                        email={email}
                        emailError={emailError}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        passwordError={passwordError}
                        handleSignup={handleSignup}
                    />}
                </h2>
            </div>

        );
    }
}

export default UserSigning;