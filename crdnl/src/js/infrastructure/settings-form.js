import { Component } from "react";

import Settings from "js/infrastructure/settings";

import Button from "js/infrastructure/button";

import "css/infrastructure/settings-form.css";

class SettingsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            default_settings: new Settings()
        }
    }

    color_component(name) {
        const font_size = String(this.props.settings.font_size)+"vmin";

        return (
            <div key={name}
            >
                <input
                type="color"
                name={name}
                value={this.props.settings[name]}
                onChange={(event) => this.props.update_setting_element(name, event.target.value)}
                style={{
                    width: String(3*Number(this.props.settings.font_size))+"vmin",
                    backgroundColor: this.props.settings.background_color,
                    border: "none"
                }}
                />
                <label htmlFor={name}
                    style={{
                        fontSize: font_size
                    }}
                > {name[0].toUpperCase() + name.replace(/_/g, " ").slice(1)} </label>
                <Button 
                font_size={font_size}
                settings={this.props.settings}
                on_click={() => this.props.update_setting_element(name, this.state.default_settings[name])}
                >Default</Button>
            </div>
        )
    }    

    font_size(name) {
        const font_size = String(this.props.settings.font_size)+"vmin";

        return (
          <div key={name}>
            <input
            type="number"
            step="0.01"
            min="0.0"
            value={this.props.settings[name]}
            onChange={(event) => this.props.update_setting_element(name, event.target.value)}
            style={{
                width: String(3*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
            }}
            />
            <label htmlFor={name}
                style={{
                    fontSize: font_size
                }}
            > {name[0].toUpperCase() + name.replace(/_/g, " ").slice(1)}</label>
            <Button 
                settings={this.props.settings}
                font_size={font_size}
                on_click={() => this.props.update_setting_element(name, this.state.default_settings[name])}
                >Default
            </Button>
          </div>  
        );
    }

    render() {
        const background_colors = ["background_color", "dark_background_color", "accent_background_color", "project_display_background_color"] 
        const font_colors = ["font_color", "greyed_out_font_color"];
        const font_sizes = ["small_font_size", "font_size", "large_font_size"];
        const heading_font_size = String(this.props.settings.font_size)+"vmin";

        return ( 
        <div className="settings-form">
            <div 
                style={{
                    fontSize: heading_font_size,
                    color: this.props.settings.greyed_out_font_color
                }}
            >
                Background colors
            </div>
            {background_colors.map((c) => this.color_component(c))}
            <p></p> {/* this puts in a blank space */}
            <div 
                style={{
                    fontSize: heading_font_size,
                    color: this.props.settings.greyed_out_font_color
                }}
            >
                Font style
            </div>
            {font_colors.map((c) => this.color_component(c))}
            {font_sizes.map((c) => this.font_size(c))}
        </div>
        );
    }
}

export default SettingsForm;