import style from './auth.module.css'
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
            <div className={style.signInDiv} >
                <div className={style.usernameDiv}>
                    <div className={style.formText}>Username</div>
                    <div className={style.inputDiv}>
                        <input className={style.inputBox} type="text" autoFocus required value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <p className={style.errorMessage}>{emailError}</p>
                </div>

                <div className={style.passwordDiv}>
                    <div className={style.formText}>Password</div>
                    <div className={style.inputDiv}>
                        <input className={style.secretInputBox}type="text" autoFocus required value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                            <p className={style.errorMessage}>{passwordError}</p>
                    </div>
                </div>

                <div className={style.signInButtonDiv}>
                    <button className={style.signInButton} onClick={handleSignIn}>Sign in</button>
                </div>
                
                <div className={style.authDiv}>
                  <h2 className={style.line}><span className={style.lineClear}>Or</span></h2>
                    <button className={style.twitchAuth} onClick={userActions.authenicateTwitch}>Sign in with Twitch</button>
                    <button className={style.googleAuth} onClick={userActions.authenicateGoogle}>Sign in with Google</button>
                    <button className={style.facebookAuth} onClick={userActions.authenicateFacebook}>Sign in with Facebook</button>
                </div>
             </div>               

        </section>
    );
}

export default SignIn;