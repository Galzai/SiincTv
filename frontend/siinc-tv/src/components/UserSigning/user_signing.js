/*
 * This components will be used to hold the signin/signup components
 */
import React from 'react';
import firebaseAuth from '../../firebase'
import SignIn from './sign_in'
import Signup from './signup'
import firebaseApp from "../../firebase";

export default class UserSigning extends React.Component
{
    constructor(props){
        super(props);
        this.state ={
            type : props.type,
            user : '',
            email : '',
            emailError : '',
            password :'',
            passwordError :'',
            hasAccount : false
        };

        // Set our bindings
        this.setType = this.setType.bind(this);
        this.showType = this.showType.bind(this);
        this.clearEmail = this.clearEmail.bind(this);
        this.clearPassword = this.clearPassword.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getEmailError = this.getEmailError .bind(this);
        this.getPasswordError = this.getPasswordError .bind(this);
    }

    // Sets type of form to display
    setType(type){
        this.setState({type : type})
    }

    showType() {
        return this.state.type === 'sign-in';
    }

    getEmail(){
        return this.state.email;
    }
    getPassword(){
        return this.state.password;
    }

    getEmailError(){
        return this.state.emailError;
    }
    getPasswordError(){
        return this.state.passwordError;
    }
    clearEmail(){
        this.setState({email : ''});
    }

    clearPassword(){
        this.setState({password : ''});
    }

    clearInputs(){
        this.setState({email : '',password : ''});
    }
    clearErrors(){
        this.setState({emailError :'', passwordError:''});
    }

    setEmail(email){
        this.setState({email : email});
    }

    setPassword(password){
        this.setState({password : password});
    }

    // This function handles sign in attempts
    handleSignIn(){
        this.clearErrors();
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => {
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found" :
                        this.setState({emailError:err.message});
                        break;
                    case "auth/wrong-password":
                        this.setState({passwordError : err.message});
                        break
                }
            });
    }

    // This function handles sign up attempts
    handleSignup(){
        this.clearErrors();
        this.clearInputs();
        firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        this.setState({emailError:err.message});
                        break;
                    case "auth/weak-password":
                        this.setState({passwordError : err.message});
                        break
                }
            });
    }

    render() {
        const  showLogin = this.showType();
        return(
            <div>
                <h1>
                <button name='loginBtn' onClick={()=>this.setType('sign-in')}>Login</button>
                <button name='signupBtn' onClick={()=>this.setType('signup')}>Sign-up</button>
                </h1>
                <h2>
                    {showLogin && <SignIn
                        email={this.state.email}
                        getEmail={this.getEmail}
                        setEmail={this.setEmail}
                        getEmailError={this.getEmailError}
                        getPasswordError={this.getPasswordError}
                        getPassword={this.getPassword}
                        setPassword={this.setPassword}
                        passwordError={this.state.passwordError}
                        handleSignIn={this.handleSignIn}
                    />}
                    {!showLogin && <Signup/>}
                </h2>
            </div>

        );
    }
}