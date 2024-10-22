import React, {useState, useRef} from "react";
import userActions from "../../user/userActions"
import style from './auth.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * This componenet is in charge of custom user sign up
 * 
 * @prop  {String} userName
 * @prop  {Function} setUserName
 * @prop  {String} userNameError
 * @prop  {Function} setUserNameError
 * @prop  {String} email
 * @prop  {Function} setEmailError
 * @prop  {String} emailError
 * @prop  {Function} setEmail
 * @prop  {String} password
 * @prop  {Function} setPassword
 * @prop  {String} passwordError
 * @prop  {Function} setPasswordError
 * 
 * @component
 * @category Frontend
 * @subcategory User Signing
 */
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
    const [firstRender, setFirstRender]=useState(true);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    // Used for getting errors after clicking signup
    let prevEmail = useRef('');
    let prevEmailState = useRef(false);

    // Validates the password and updates it's errors
    const isPasswordConfirmed=()=>{
        if(!(passwordConfirmation === password)){
            const matchError = "Passwords don't match";
            if(passwordError !== matchError){
                setPasswordError(matchError);
            }
            return false;
        }
        if(password.length < 6 ){

            let lengthError = "Passwords are too short";
            if(passwordError !== lengthError){ 
            setPasswordError(lengthError);
            }
            return false;
        }
        if(passwordError !== ''){
            setPasswordError('');
        }
        return true;
    }

    // Validates the email and updates it's errors
    const checkFormEmail=()=>{
        if(email !== prevEmail.current){
            prevEmail.current = email;
            // We check the email is valid by regular expression
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regEmail.test(email)){
                setEmailError('Invalid E-mail');
                return false;
            }
            setEmailError('');
            return true;
            }
        return prevEmailState.current;

    }

    // Validates the user name and updates it's errors
    const checkUsername=()=>
    {
        // We run nake requests that access the server async to make the UI responsive
        const usernameChecker = async()=>{
            // If the username length is too short we dont allow sign up
            if(userName.length < 3 ){
                const curError = "Username must be at least 3 characters long.";
                // Make sure to not update states to identical values
                if(curError !== userNameError){
                    setUserNameError(curError);
                }
                if(availableUserName === true){
                    setAvailableUserName(false);
                }
                return;
            }
            // if user name already exists we dont allow sign up
            const response = await  userActions.checkUsernameExists(userName);
            if(response){
                if(availableUserName !== (!response)){
                    setAvailableUserName(!response);
                    const availableError = "Username already taken.";
                    if(availableError !== userNameError){
                        setUserNameError(availableError);
                    }
                    return;
                }
            }

            // Every other case
            else if(userNameError !== ''){
                setUserNameError('');
                setAvailableUserName(true);
            }
        }
        usernameChecker();

    }

    // Validates the user form and updates the errors acordingly
    const formValid=()=>{
        // Changing states of another object while rendering causes an error, so we wait on the first render
        if(!firstRender){
            checkUsername();
            // let emailValid = checkFormEmail();
            let emailValid = true;
            prevEmailState.current = emailValid;
            let passwordConfirmed = isPasswordConfirmed();
            // Note this is bitwise on purpose, we want all the functions to be called
            return (availableUserName && emailValid && passwordConfirmed);
        }
        setFirstRender(false);
        return false;
    }

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
        <section className={style.signInDiv}>
            <div className="signupContainer">
                <div className={style.usernameDiv}>
                    <label className={style.formText}></label>
                    <div className={style.inputDiv}>
                    <input className={style.inputBox} autoFocus required value={userName}
                        Placeholder={"Username"} onChange={e => setUserName(e.target.value)}
                    />
                        <p className={style.errorMessage}>{userNameError}</p>
                    </div>
                </div>
               
                {/* <div className={style.emailDiv}>
                    <label className={style.formText}></label>
                        <div className={style.inputDiv}>
                        <input className={style.inputBox} type="text" autoFocus required value={email}
                            Placeholder={"E-mail address"} onChange={e => setEmail(e.target.value)}
                        />
                        <p className={style.errorMessage}>{emailError}</p>
                    </div>
                </div> */}

                <div className={style.signUpPasswordDiv}>
                    <label className={style.formText} ></label>
                    <div className={style.inputDiv}>
                    <input className={style.secretInputBox} type="password" autoFocus required value={password}
                        Placeholder={"Password"} onChange={e => setPassword(e.target.value)}
                    />
                    <p className={style.errorMessage}>{passwordError}</p>
                    </div>
                </div>

                <div className={style.confirmPasswordDiv}>
                    <label className={style.formText} ></label>
                    <div className={style.inputDiv}>
                        <input className={style.secretInputBox} type="password" autoFocus required value={passwordConfirmation}
                            Placeholder={"Confirm Password"} onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                        {<p className={style.errorMessage}>{passwordError}</p>}
                    </div>
                </div>

                <div className={style.signInButtonDiv} onClick={handleButtonClick}>
                    <button className={style.signUpButton} disabled={!formValid()} onClick={handleSignup}>Sign Up</button>
                    {(loading) && <CircularProgress className={style.placeCircularProgressSignUp}/>}
                </div>
            </div>
        </section>
    );
}

export default Signup;