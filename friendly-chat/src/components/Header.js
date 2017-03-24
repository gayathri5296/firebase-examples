import React, { PropTypes } from 'react';

export default function Header ({
    isLoggedIn,
    userPic,
    userName,
    signIn,
    signOut,
    profilePicUrl
}) {
    const onSignIn = () => {
        signIn()
    }

    const onSignOut = () => {
        signOut()
    }
    
    let signInOut;

    if (isLoggedIn) {
        signInOut = (
            <button
                id="sign-out"
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                onClick={onSignOut}
            >
                Sign-out
            </button>
        )
    } else {
        signInOut = (
            <button
                id="sign-in"
                className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
                onClick={onSignIn}
            >
                <i className="material-icons">account_circle</i>Sign-in with Google
            </button>
        )
    }

    const userImage = profilePicUrl || '/src/images/profile_placeholder.png'
    const userImgStyle = {
        backgroundImage: `url(${userImage})`,
        display: isLoggedIn ? 'block' : 'none'
    }
    const userNameStyle = {
        display: isLoggedIn ? 'block' : 'none'
    }

    return (
        <header className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700">
            <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
                <div className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
                    <h3><i className="material-icons">chat_bubble_outline</i> Friendly Chat</h3>
                </div>
                <div id="user-container">
                    <div
                        id="user-pic"
                        style={userImgStyle}
                    ></div>

                    <div
                        id="user-name"
                        style={userNameStyle}
                    >
                        {userName}
                    </div>

                    {signInOut}
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {

}