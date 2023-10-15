import React, { Component } from "react";

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
        return (
            <div key={name}>
                <input
                type="color"
                name={name}
                value={this.props.settings[name]}
                onChange={(event) => this.props.update_setting_element(name, event.target.value)}
                />
                <label htmlFor={name}> {name[0].toUpperCase() + name.replace(/_/g, " ").slice(1)} </label>
                <Button 
                settings={this.props.settings}
                on_click={() => this.props.update_setting_element(name, this.state.default_settings[name])}
                >Default</Button>
            </div>
        )
    }    

    render() {
        const background_colors = ["background_color", "dark_background_color", "accent_background_color"] 
        const font_colors = ["font_color", "greyed_out_font_color"];

        return ( 
        <div className="settings-form">
            <div style={{color: this.props.settings.greyed_out_font_color}}>Background colors</div>
            {background_colors.map((c) => this.color_component(c))}
            <p></p> {/* this puts in a blank space */}
            <div style={{color: this.props.settings.greyed_out_font_color}}>Font colors</div>
            {font_colors.map((c) => this.color_component(c))}
        </div>
        );
    }
}

export default SettingsForm;