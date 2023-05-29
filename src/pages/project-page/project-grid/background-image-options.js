import OptionsBox from "infrastructure/options-box";

import "styles/pages/project-page/project-grid/background-image-options.css";

class BackgroundImageOptions extends OptionsBox {
    constructor(props) {
        super(props);

        this.change_display_image = this.change_display_image.bind(this);
        this.update_zoom = this.update_zoom.bind(this);
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
        )
    }

    content() {
        return [this.display_image(), this.zoom()];
    }
}

export default BackgroundImageOptions;