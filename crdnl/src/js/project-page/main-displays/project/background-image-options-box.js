import OptionsBox from "js/infrastructure/options-box";

import Button from "js/infrastructure/button";

class BackgroundImageOptionsBox extends OptionsBox {
    constructor(props) {
        super(props);

        this.update_zoom = this.update_zoom.bind(this);
        this.update_zoom_max = this.update_zoom_max.bind(this);
        this.update_zoom_sensitivity = this.update_zoom_sensitivity.bind(this);
        this.defaults = this.defaults.bind(this);
        this.restore_defaults = this.restore_defaults.bind(this);
        this.disabled = this.disabled.bind(this);
        this.toggle_disable_movment = this.toggle_disable_movment.bind(this);
        this.display_image = this.display_image.bind(this);
        this.toggle_display_image = this.toggle_display_image.bind(this);
        this.update_opacity = this.update_opacity.bind(this);
    }

    update_zoom(value) {
        this.props.project_settings.background_image_zoom = parseFloat(value);
        this.props.set_project_settings(this.props.project_settings);
    }

    zoom() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";
        const max_zoom = Math.max(this.props.project_settings.background_image_max_zoom, 1.01*this.props.project_settings.background_image_zoom);

        return (
            <div
            key="zoom"
            style={{
                color: this.props.settings.font_color,
                accentColor: (this.props.project_settings.background_image_disable_movement? this.props.settings.background_color : this.props.settings.accent_background_color),
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
                onChange={(event) => this.update_zoom(event.target.value)}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
                disabled={this.props.project_settings.background_image_disable_movement}
            />
            </div>
        );
    }

    update_zoom_max(event) {
        this.props.project_settings.background_image_max_zoom = event.target.value
        this.props.set_project_settings(this.props.project_settings);
    }

    zoom_max() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="zoom_max" name="zoom_max"
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
                value={this.props.project_settings.background_image_max_zoom}
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

    update_zoom_sensitivity(event) {
        // divide by 1e4 to transform from the display sensitivity to the actual unit we care about
        this.props.project_settings.background_image_wheel_sensitivity = event.target.value/1e4;
        this.props.set_project_settings(this.props.project_settings);
    }

    zoom_sensitivity() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="zoom_sensitivity" name="zoom_sensitvity"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.1"
                min="0.0"
                // multiply by 1e4 so that the default display is 1
                value={1e4*this.props.project_settings.background_image_wheel_sensitivity}
                onChange={this.update_zoom_sensitivity}
                style={{
                width: String(2*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"zoom_sensitivity"}
                style={{
                    fontSize: font_size
                }}
            >
                Wheel sens.
            </label>
        </div>
        );
    }

    restore_zoom() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <Button
                key="restore_zoom_default"
                settings={this.props.settings}
                background_color={this.props.project_settings.background_image_disable_movement? this.props.settings.background_color : this.props.settings.dark_background_color}
                font_size={font_size}
                on_click={() => this.update_zoom(1.0)}
                disabled={this.props.project_settings.background_image_disable_movement}
            >
                Zoom default
            </Button>
        );
    }

    restore_defaults() {
        if( this.props.project_settings.background_image_disable_movement ) { return; }

        this.props.project_settings.background_image_zoom = 1.0;
        this.props.project_settings.background_image_translation = { x: 0.0, y: 0.0 }
        this.props.set_project_settings(this.props.project_settings);
    }

    defaults() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <Button
                key="restore_default"
                settings={this.props.settings}
                background_color={this.props.project_settings.background_image_disable_movement? this.props.settings.background_color : this.props.settings.dark_background_color}
                font_size={font_size}
                on_click={this.restore_defaults}
                disabled={this.props.project_settings.background_image_disable_movement}
            >
                Restore defaults
            </Button>
        );
    }

    toggle_disable_movment() {
        this.props.project_settings.background_image_disable_movement = !this.props.project_settings.background_image_disable_movement;
        this.props.set_project_settings(this.props.project_settings);
    }

    disabled() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return ( 
            <div key="disabled"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                    type="checkbox"
                    defaultChecked={!this.props.project_settings.background_image_disable_movement}
                    onChange={this.toggle_disable_movment}
                />
                <label htmlFor={"disabled"}
                style={{
                    fontSize: font_size
                }}
            >
                Enable movement
            </label>
            </div>
        );
    }
    
    toggle_display_image() {
        this.props.project_settings.background_image_display = !this.props.project_settings.background_image_display;
        this.props.set_project_settings(this.props.project_settings);
    }

    update_opacity(value) {
        this.props.project_settings.background_image_opacity = parseFloat(value);
        this.props.set_project_settings(this.props.project_settings);
    }

    opacity() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div
            key="opacity"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >   
            <div>
                Opacity:
                </div>
                <input 
                type="range"
                min={0.0}
                max={1.0}
                step={0.0001}
                value={this.props.project_settings.background_image_opacity}
                onChange={(event) => this.update_opacity(event.target.value)}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
            />
            </div>
        );
    }

    display_image() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return ( 
            <div key="display"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                    type="checkbox"
                    defaultChecked={this.props.project_settings.background_image_display}
                    onChange={this.toggle_display_image}
                />
                <label htmlFor={"display"}
                style={{
                    fontSize: font_size
                }}
            >
                Display
            </label>
            </div>
        );
    }

    content() {
        return [
            this.display_image(), 
            this.line("line1"), 
            this.opacity(),
            this.line("line2"), 
            this.disabled(), 
            this.line("line3"), 
            this.zoom(), this.zoom_max(), this.zoom_sensitivity(), this.restore_zoom(), 
            this.line("line4"), 
            this.defaults()
        ];
    }

}

export default BackgroundImageOptionsBox;