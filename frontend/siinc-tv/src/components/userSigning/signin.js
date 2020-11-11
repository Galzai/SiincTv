const { default: userActions } = require("../../user/userActions");

/*
 * This components will be used for user login
 */
function SignIn(props) {
    const {
        userName,
        emailError,
        setUserName,
        password,
        setPassword,
        passwordError,
        handleSignIn
    } = props;


    return (
        <section className={"signIn"}>
            <div className="signinContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={userName}
                       onChange={e => setUserName(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input type="text" autoFocus required value={password}
                       onChange={e => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    <button onClick={handleSignIn}>Sign in</button>
                </div>
            </div>
            <div className="authContainer">
                <button onClick={userActions.authenicateTwitch}>Sign in with twitch</button>
            </div>
        </section>
    );
}

export default SignIn;