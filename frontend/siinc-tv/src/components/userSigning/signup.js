import React, {useState} from "react";

function Signup(props) {

    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const {
        userName,
        setUserName,
        email,
        emailError,
        setEmail,
        password,
        setPassword,
        passwordError,
        handleSignup
    } = props;

    const IsPasswordConfirmed=()=>{
        return passwordConfirmation === password;
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
                {(!IsPasswordConfirmed()) &&<p className="errorMsg">Passwords dont match.</p>}
                <div className="btnContainer">
                    <div className="btnContainer">
                        <button disabled={!IsPasswordConfirmed()} onClick={handleSignup}>Sign up</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;