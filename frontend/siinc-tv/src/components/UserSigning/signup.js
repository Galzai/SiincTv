import React from "react";

function Signup(props) {
    const {
        email,
        emailError,
        setEmail,
        password,
        setPassword,
        passwordError,
        handleSignup
    } = props;


    return (
        <section className={"signup"}>
            <div className="signinContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email}
                       onChange={e => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="text" autoFocus required value={password}
                       onChange={e => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    <button onClick={handleSignup}>Sign up</button>
                </div>
            </div>
        </section>
    );
}

export default Signup;