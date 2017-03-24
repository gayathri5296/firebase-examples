import React, { Component, PropTypes } from 'react';

export default class ImageForm extends Component {
    constructor(props) {
        super(props);

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.triggerFileImage = this.triggerFileImage.bind(this);
    }

    onSubmitForm(event) {
        event.preventDefault();
    }

    triggerFileImage(event) {
        event.preventDefault();
        this.imageMessage.click();
    }

    onChange(event) {
        event.preventDefault();
        const file = event.target.files[0];

        this.props.saveImageMessage(file);
    }

    render() {
        return (
            <form
                id="image-form"
                onSubmit={this.onSubmitForm}
            >
                <input
                    id="mediaCapture"
                    type="file"
                    accept="image/*,capture=camera"
                    onChange={this.onChange}
                    ref={(node) => this.imageMessage = node}
                />
                <button
                    id="submitImage"
                    title="Add an image"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white"
                    onClick={this.triggerFileImage}
                >
                    <i className="material-icons">image</i>
                </button>
            </form>
        )
    }
}