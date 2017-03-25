import React, { Component, PropTypes } from 'react';
import _ from 'lodash'

import ChatForm from './ChatForm'
import ImageForm from './ImageForm'

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editText: ''
        }
    }

    componentDidUpdate() {
        this.messageList.scrollTop = this.messageList.scrollHeight;
    }

    render() {
        let msgDom;
        let msgs = this.props.messages

        if ( _.isEmpty(msgs) ) {
            msgDom = <span id="message-filler"></span>
        } else {
            msgDom = _.map(msgs, (msg, i) => {
                const picStyle = {
                    backgroundImage: `url(${msg.photoUrl})`
                }

                let msgBody;

                if ( msg.text ) {
                    msgBody = (
                        <div className="message">{msg.text}</div>
                    )
                } else if ( msg.imageUrl ) {
                    msgBody = (
                        <div className="message">
                            <img src={msg.imageUrl} />
                        </div>
                    )
                }

                return (
                    <div key={i} className="message-container visible">
                        <div className="spacing">
                            <div className="pic" style={picStyle}></div>
                        </div>
                        {msgBody}
                        <div className="name">{msg.name}</div>
                    </div>
                )
            });
        }

        return (
            <main className="mdl-layout__content mdl-color--grey-100">
                <div id="messages-card-container" className="mdl-cell mdl-cell--12-col mdl-grid">

                    <div id="messages-card" className="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop">
                        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                        <div id="messages" ref={(node) => this.messageList = node}>
                            {msgDom}
                        </div>
                        <ChatForm
                            saveMessage={this.props.saveMessage}
                            shouldDisableSend={this.props.shouldDisableSend}
                        />
                        <ImageForm
                            saveImageMessage={this.props.saveImageMessage}
                        />
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

Main.propTypes = {

}