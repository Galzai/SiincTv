import signing from './signing.module.css'
import SigningModal from './signingModal';
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
        <section>
            <div className={signing.signInDiv} >
                <div className={signing.usernameDiv}>
                    <div className={signing.formText}>Username</div>
                    <div className={signing.inputDiv}>
                        <input className={signing.inputBox} type="text" autoFocus required value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <p className="errorMsg">{emailError}</p>
                </div>
                <div className={signing.passwordDiv}>
                    <div className={signing.formText}>Password</div>
                    <div className={signing.inputDiv}>
                        <input className={signing.secretInputBox}type="text" autoFocus required value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                            <p className="errorMsg">{passwordError}</p>
                    </div>
                </div>
                <div className={signing.signInButtonDiv}>
                    <button className={signing.signInButton} onClick={handleSignIn}>Sign in</button>
                </div>

                <div className={signing.authDiv}>
                <h2 className={signing.line}><span className={signing.lineClear}>Or</span></h2>
                    <button className={signing.twitchAuth} onClick={userActions.authenicateTwitch}>Sign in with Twitch</button>
                    <button className={signing.googleAuth} onClick={userActions.authenicateGoogle}>Sign in with Google</button>
                    <button className={signing.facebookAuth} onClick={userActions.authenicateFacebook}>Sign in with Facebook</button>
                </div>
             </div>               

        </section>
    );
}

export default SignIn;