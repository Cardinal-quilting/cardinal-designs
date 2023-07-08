import React from "react";

import OptionsBox from "infrastructure/options-box";

import Button from "infrastructure/button";

import "styles/pages/project-page/project-grid/background-image-options.css";

class BackgroundImageOptions extends OptionsBox {
    constructor(props) {
        super(props);

        this.change_display_image = this.change_display_image.bind(this);
        this.update_zoom = this.update_zoom.bind(this);
        this.update_opacity = this.update_opacity.bind(this);
        this.update_restore_position = this.update_restore_position.bind(this);
        this.handle_image_upload_button = this.handle_image_upload_button.bind(this)
        this.handle_image_upload = this.handle_image_upload.bind(this)

        this.upload_image_ref = React.createRef();
    }

    change_display_image() {
        this.props.background_image.display_image = !this.props.background_image.display_image;
        this.props.update_background_image(this.props.background_image);
    }

    display_image() {    
        return (
            <div className="component">
            <label className="display">
            <input
                type="checkbox"
                onChange={this.change_display_image}
                defaultChecked={this.props.background_image.display_image}
                key="display"
            />
            <span 
                className="display"
                style={{
                    fontSize: this.props.font_size
                }}
            >
                Display image
            </span>
            </label>
            </div>
        );
    }

    update_zoom(event) {
        this.props.background_image.zoom_scale = parseFloat(event.target.value);
        this.props.update_background_image(this.props.background_image);
    }

    zoom() {
        const max_zoom = Math.min(1.0+Math.pow(this.props.background_image.zoom_scale, 1.0), this.props.background_image.max_zoom_scale)

        return (
            <div className="component" key="zoom">
                <p
                    style={{
                        fontSize: this.props.font_size,
                        marginTop: 0,
                        marginBottom: 0
                    }}
                >
                    Zoom:
                </p>
                <input
                    style={{
                        width: String(0.95*this.props.width)+"vw"
                    }}
                    type="range"
                    onInput={this.update_zoom}
                    min="0"
                    step="0.001"
                    max={String(max_zoom)}
                    value={String(this.props.background_image.zoom_scale)}
                    name="zoom"
                    id="zoom"
                />
            </div>
        );
    }

    update_opacity(event) {
        this.props.background_image.opacity = parseFloat(event.target.value);
        this.props.update_background_image(this.props.background_image);
    }

    opacity() {
        return (
            <div className="component" key="opacity">
                <p
                    style={{
                        fontSize: this.props.font_size,
                        marginTop: 0,
                        marginBottom: 0
                    }}
                >
                    Opacity:
                </p>
                <input
                    style={{
                        width: String(0.95*this.props.width)+"vw"
                    }}
                    type="range"
                    onInput={this.update_opacity}
                    min="0"
                    step="0.001"
                    max="1"
                    value={String(this.props.background_image.opacity)}
                    name="opacity"
                    id="opacity"
                />
            </div>
        );
    }

    update_restore_position() {
        this.props.background_image.zoom_scale = 1.0;
        this.props.background_image.pos = {
            x: 0.0,
            y: 0.0
        };
        this.props.update_background_image(this.props.background_image);
    }

    restore_position() {
        return (
        <div
            key="restore_position"
        >
            <Button
                    on_click={this.update_restore_position}
                    enabled={this.props.enabled}
                >
                    Default position
                </Button>
        </div>)
    }

    handle_image_upload(event) {
        const reader = new FileReader();

        reader.onload = () => {
            this.props.background_image.file = reader.result;
            this.props.update_background_image(this.props.background_image);
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    handle_image_upload_button() {
        this.upload_image_ref.current.click();
    }

    upload_image() {
        return (
        <div
            key="upload_image"
        >
            <input 
                type="file" 
                ref={this.upload_image_ref}
                style={{ display: "none" }}
                onChange={this.handle_image_upload}
            />
            <Button
                    on_click={this.handle_image_upload_button}
                    enabled={this.props.enabled}
                >
                    Upload image
            </Button>
        </div>
        );
    }

    content() {
        return [this.display_image(), this.upload_image(), this.zoom(), this.opacity(), this.restore_position()];
    }
}

export default BackgroundImageOptions;