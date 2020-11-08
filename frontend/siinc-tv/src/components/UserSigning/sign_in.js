/*
 * This components will be used for user login
 */
import React from 'react';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getEmail:props.getEmail,
            setEmail: props.setEmail,
            getEmailError: props.getEmailError,
            setPassword: props.setPassword,
            getPassword: props.getPassword,
            getPasswordError: props.getPasswordError,
            handleSignIn: props.handleSignIn
        };
    }

    render() {
        let password = this.state.getPassword();
        let email = this.state.getEmail();
        let passwordError = this.state.getPasswordError();
        let emailError = this.state.getEmailError();

        return (
            <section className={"signIn"}>
                <div className="signinContainer">
                    <label>Username</label>
                    <input type="text" autoFocus required value={email}
                           onChange={e => this.state.setEmail(e.target.value)}
                           />
                    <p className="errorMsg">{emailError}</p>
                    <label>Password</label>
                    <input type="text" autoFocus required value={password}
                           onChange={e => this.state.setPassword(e.target.value)}
                    />
                    <p className="errorMsg">{passwordError}</p>
                    <div className="btnContainer">
                        <button onClick={this.state.handleSignIn}>Sign in</button>
                    </div>
                </div>
            </section>
        );
    }
}