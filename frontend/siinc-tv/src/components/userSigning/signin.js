/*
 * This components will be used for user login
 */
function SignIn(props) {
    const {
        email,
        emailError,
        setEmail,
        password,
        setPassword,
        passwordError,
        handleSignIn
    } = props;

    return (
        <section className={"signIn"}>
            <div className="signinContainer">
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
                <div className="btnContainer">
                    <button onClick={handleSignIn}>Sign in</button>
                </div>
            </div>
        </section>
    );
}

export default SignIn;