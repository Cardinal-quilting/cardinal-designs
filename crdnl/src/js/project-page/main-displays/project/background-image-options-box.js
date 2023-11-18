import OptionsBox from "js/infrastructure/options-box";

class BackgroundImageOptionsBox extends OptionsBox {
    constructor(props) {
        super(props);

        this.update_zoom = this.update_zoom.bind(this);
        this.update_zoom_max = this.update_zoom_max.bind(this);
    }

    update_zoom(event) {
        this.props.project_settings.background_image_zoom = event.target.value
        this.props.set_project_settings(this.props.project_settings);
    }

    zoom() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";
        const max_zoom = Math.max(this.props.project_settings.max_background_image_zoom, 1.01*Math.pow(this.props.project_settings.background_image_zoom, 1.0));

        return (
            <div
            key="zoom"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >   
            <div>
                Zoom:
                </div>
                <input 
                type="range"
                min={0.0}
                max={max_zoom}
                step={0.0001}
                value={this.props.project_settings.background_image_zoom}
                onChange={this.update_zoom}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
            />
            </div>
        );
    }

    update_zoom_max(event) {
        this.props.project_settings.max_background_image_zoom = event.target.value
        this.props.set_project_settings(this.props.project_settings);
    }

    zoom_max() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div name="zoom_max"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.01"
                min="0.0"
                value={this.props.project_settings.max_background_image_zoom}
                onChange={this.update_zoom_max}
                style={{
                width: String(2*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"zoom_max"}
                style={{
                    fontSize: font_size
                }}
            >
                Zoom max
            </label>
            </div>
        );
    }

    content() {
        return [this.zoom(), this.zoom_max()];
    }

}

export default BackgroundImageOptionsBox;