import React, { Component, PropTypes } from 'react';

export default class ChatForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
           shouldDisable: true,
           message: ''
        }

        this.onSubmitChat = this.onSubmitChat.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.shouldDisableSend ) {
            this.messageInput.focus()

            this.setState({
                shouldDisable: nextProps.shouldDisableSend,
                message: ''
            })
        }
    }

    onSubmitChat(event) {
        event.preventDefault();

        if (this.state.message !== '') {
            this.props.saveMessage(this.state.message);
        }
    }

    onChange(event) {
        this.setState({
            shouldDisable: event.target.value.trim() === '',
            message: event.target.value
        })
    }

    render() {
        return (
            <form
                id="message-form"
                onSubmit={this.onSubmitChat}
            >
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input
                        className="mdl-textfield__input"
                        type="text"
                        id="message"
                        value={this.state.message}
                        onChange={this.onChange}
                        ref={(node) => this.messageInput = node}
                    />
                    <label className="mdl-textfield__label">Message...</label>
                </div>
                <button
                    id="submit"
                    type="submit"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
                    disabled={this.state.shouldDisable}
                >
                    Send
                </button>
            </form>
        )
    }
}