import ReactDOM from 'react-dom';
import React from 'react'
import Modal from 'react-modal'
import UserSigning from './components/UserSigning/user_signing';
import reportWebVitals from './reportWebVitals';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

function ModalTest(){
    // Example for a hook , we now also have a setter function
    const [showRegistration, setShowRegistration] = React.useState(false);


    // These three functions handle modal related stuff
    function openRegistration(){
        setShowRegistration(true);
    }
    function closeRequest(){
        setShowRegistration(false);
    }

    return(
        <div>
            <button onClick={openRegistration}>Test registration</button>
            <Modal
                isOpen={showRegistration}
                onRequestClose={closeRequest}
                style = {customStyles}
                contentLabel={"example"}
                >
                <UserSigning type={'sign-in'}></UserSigning>
            </Modal>
        </div>
    )

}
ReactDOM.render(
<ModalTest test />,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
