import React, {useState} from "react";
import userActions from "../../user/userActions"

function Signup(props) {

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const {
        userName,
        setUserName,
        userNameError,
        setUserNameError,
        email,
        setEmailError,
        emailError,
        setEmail,
        password,
        setPassword,
        passwordError,
        setPasswordError,
        handleSignup
    } = props;

    const [availableUserName,setAvailableUserName]=useState(false);

    // Validates the password and updates it's errors
    const isPasswordConfirmed=()=>{
        if(!(passwordConfirmation === password)){
            setPasswordError("Passwords dont match");
            return false;
        }
        if(password.length < 6 ){
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        setPasswordError('');
        return true;
    }

    // Validates the email and updates it's errors
    const checkFormEmail=()=>{
        // We check the email is valid by regular expression
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(email)){
            setEmailError('Invalid Email');
            return false;
        }
        setEmailError('');
        return true;
    }

    // Validates the user name and updates it's errors
    const checkUsername=()=>
    {
        if(userName.length < 3 ){
            setUserNameError("Username must be at least 3 characters long.");
            setAvailableUserName(false);
            return
        }

        const usernameChecker = async()=>{
            const response = await  userActions.checkUsernameExists(userName);
            console.log(response);
            setAvailableUserName(response);
            if(response) setUserNameError("Username already taken.")
            else(setUserNameError(""));
        }
        usernameChecker();
    }

    // Validates the user form and updates the errors acordingly
    const formValid=()=>{
        checkUsername();
        // Note this is bitwise on purpose, we want all the functions to be called
        return (availableUserName & checkFormEmail() & isPasswordConfirmed());
    }

    return (
        <section className={"signup"}>
            <div className="signupContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={userName}
                       onChange={e => setUserName(e.target.value)}
                />
                <p>{userNameError}</p>
                <label>Email</label>
                <input type="text" autoFocus required value={email}
                       onChange={e => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="text" autoFocus required value={password}
                       onChange={e => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <label>Confirm Password</label>
                <input type="text" autoFocus required value={passwordConfirmation}
                       onChange={e => setPasswordConfirmation(e.target.value)}
                />
                {<p className="errorMsg">{passwordError}</p>}
                <div className="btnContainer">
                    <div className="btnContainer">
                        <button disabled={!formValid()} onClick={handleSignup}>Sign up</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;