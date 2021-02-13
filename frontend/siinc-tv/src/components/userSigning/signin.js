import style from './auth.module.css'
import React, {useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
const { default: userActions } = require("../../user/userActions");

/** 
 * This components will be used for user login (with custom user or authentication)
 * 
 * @prop {String} userName
 * @prop {String} emailError
 * @prop {Function} setUserName
 * @prop {String} password
 * @prop {Function} setPassword
 * @prop {String} passwordError
 * @component
 * @category Frontend
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

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const handleButtonClick = () => {
        if (!loading) {
          setSuccess(false);
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 2000);
        }
      };  

    return (
        <section>
            <div className={style.signInDiv} >
            <div onClick = {handleButtonClick}>
                <button className={style.facebookAuth} onClick={userActions.authenicateFacebook}>Facebook</button>
                <button className={style.twitchAuth} onClick={userActions.authenicateTwitch}>Twitch</button>
                <button className={style.googleAuth} onClick={userActions.authenicateGoogle}>Google</button>
                {(loading) && <CircularProgress className={style.placeCircularProgressLogin}/>}
            </div>
                
                 <div className={style.logInDiv}>
                  <h2 className={style.line}><span className={style.lineClear}>or</span></h2>
                  <div className={style.usernameDiv}>
                    <div className={style.formText}></div>
                    <div className={style.inputDiv}>
                        <input className={style.inputBox} type="text" autoFocus required value={userName}
                            placeholder={"Username"} onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <p className={style.errorMessage}>{emailError}</p>
                </div>

                <div className={style.passwordDiv}>
                    <div className={style.formText}></div>
                    <div className={style.inputDiv}>
                        <input className={style.secretInputBox}type="text" autoFocus required value={password}
                            placeholder={"Password"} onChange={e => setPassword(e.target.value)}
                        />
                            <p className={style.errorMessage}>{passwordError}</p>
                    </div>
                </div>

                <div className={style.signInButtonDiv} onClick = {handleButtonClick}>
                    <button className={style.signInButton} onClick={handleSignIn}>Log In</button>
                </div>
                </div>
             </div> 
        </section>
    );
}

export default SignIn;