import React, {useState} from "react";

function Signup(props) {

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const {
        userName,
        setUserName,
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

    const checkFormEmail=()=>{
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(email)){
            setEmailError('Invalid Email');
            return false;
        }
        setEmailError('');
        return true;
    }

    return (
        <section className={"signup"}>
            <div className="signupContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={userName}
                       onChange={e => setUserName(e.target.value)}
                />
                <p></p>
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
                {(!(checkFormEmail() && isPasswordConfirmed())) &&<p className="errorMsg">{passwordError}</p>}
                <div className="btnContainer">
                    <div className="btnContainer">
                        <button disabled={!isPasswordConfirmed()} onClick={handleSignup}>Sign up</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;