import OptionsBox from "js/infrastructure/options-box";

import Button from "js/infrastructure/button";

class ProjectOptionsBox extends OptionsBox {
    constructor(props) {
        super(props);

        this.restore_defaults = this.restore_defaults.bind(this);
    }

    // multiple by this scale so that a zoom of "1.0" looks good to the user
    display_scale = 0.96;

    project_display_zoom_slider() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return ( 
            <div
            key="project_display_zoom_slider"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.project_settings.disable_project_display_movement? this.props.settings.background_color : this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
              <div>
                Project zoom:
                </div>
                <input 
                type="range"
                min={0.0}
                max={this.props.project_settings.max_project_display_zoom}
                step={0.00001}
                value={this.props.project_settings.project_display_zoom/this.display_scale}
                onChange={(event) => {this.props.update_project_settings_element("project_display_zoom", this.display_scale*event.target.value)}}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
                disabled={this.props.project_settings.disable_project_display_movement}
            />  
            </div>
        );  
    }

    project_display_zoom() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="project_display_zoom" name="project_display_zoom"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min={0.0}
                value={this.props.project_settings.project_display_zoom/this.display_scale}
                onChange={(event) => {this.props.update_project_settings_element("project_display_zoom", this.display_scale*event.target.value)}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
                disabled={this.props.project_settings.disable_project_display_movement}
            />
            <label htmlFor={"project_display_zoom"}
                style={{
                    fontSize: font_size
                }}
            >
                Project zoom
            </label>
        </div>
        );
    }

    max_project_display_zoom() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="max_project_display_zoom" name="max_project_display_zoom"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min={0.0}
                value={this.props.project_settings.max_project_display_zoom}
                onChange={(event) => {this.props.update_project_settings_element("max_project_display_zoom", event.target.value)}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"max_project_display_zoom"}
                style={{
                    fontSize: font_size
                }}
            >
                Max zoom
            </label>
        </div>
        );
    }

    project_x_translate() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="project_x_translate" name="project_x_translate"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="1"
                value={this.props.project_settings.project_display_translation.x}
                onChange={(event) => {this.props.update_project_settings_element("project_display_translation", {x: event.target.value, y: this.props.project_settings.project_display_translation.y})}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
                disabled={this.props.project_settings.disable_project_display_movement}
            />
            <label htmlFor={"project_x_translate"}
                style={{
                    fontSize: font_size
                }}
            >
                Project x translation
            </label>
        </div>
        );
    }

    project_y_translate() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="project_y_translate" name="project_y_translate"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="1"
                value={this.props.project_settings.project_display_translation.y}
                onChange={(event) => {this.props.update_project_settings_element("project_display_translation", {x: this.props.project_settings.project_display_translation.x, y: event.target.value})}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
                disabled={this.props.project_settings.disable_project_display_movement}
            />
            <label htmlFor={"project_y_translate"}
                style={{
                    fontSize: font_size
                }}
            >
                Project y translation
            </label>
        </div>
        );
    }

    disable_projet_display_movement() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return ( 
            <div key="disable_projet_display_movement"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                    type="checkbox"
                    defaultChecked={!this.props.project_settings.disable_project_display_movement}
                    onChange={() => {this.props.update_project_settings_element("disable_project_display_movement", !this.props.project_settings.disable_project_display_movement)}}
                />
                <label htmlFor={"disable_projet_display_movement"}
                style={{
                    fontSize: font_size
                }}
            >
                Enable project movement
            </label>
            </div>
        );
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
                // multiply by 1e4 so that the default display is O(1)
                value={1e4*this.props.project_settings.project_display_zoom_wheel_sensitivity}
                onChange={(event) => {this.props.update_project_settings_element("project_display_zoom_wheel_sensitivity", event.target.value/1e4)}}
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

    restore_defaults() {
        if( this.props.project_settings.disable_project_display_movement ) { return; }

        this.props.project_settings.project_display_zoom = this.display_scale;
        this.props.project_settings.project_display_translation = { x: 0.0, y: 0.0 }
        this.props.set_project_settings(this.props.project_settings);
    }

    defaults() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <Button
                key="restore_default"
                settings={this.props.settings}
                background_color={this.props.project_settings.disable_project_display_movement? this.props.settings.background_color : this.props.settings.dark_background_color}
                font_size={font_size}
                on_click={this.restore_defaults}
                disabled={this.props.project_settings.disable_project_display_movement}
            >
                Restore defaults
            </Button>
        );
    }

    content() { 
        return [this.project_display_zoom_slider(),
            this.project_display_zoom(),
            this.max_project_display_zoom(),
            this.zoom_sensitivity(),
            this.line("line1"), 
            this.project_x_translate(),
            this.project_y_translate(),
            this.line("line2"), 
            this.disable_projet_display_movement(),
            this.line("line3"), 
            this.defaults()]
    }
}

export default ProjectOptionsBox;