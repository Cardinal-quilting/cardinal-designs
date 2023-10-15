import React, { Component } from "react";

import Settings from "js/infrastructure/settings";
import SettingsForm from "js/infrastructure/settings-form";

import logo from "logos/CardinalQuiltsLogo.png"

import NavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import "css/styles.css";
import "css/launch-page/launch-page.css"

class LaunchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settings: new Settings(),
            display_settings_form: false
        }

        this.toggle_display_settings_form = this.toggle_display_settings_form.bind(this);
        this.update_setting_element = this.update_setting_element.bind(this);
    }

    toggle_display_settings_form(form_status=undefined) {
        this.setState({
            display_settings_form: form_status===undefined? !this.state.display_settings_form : form_status
        })
    }

    update_setting_element(element_name, value) {
        var new_settings = this.state.settings;
        new_settings[element_name] = value;

        this.setState({
            settings: new_settings
        });
    }

    render() {
        const background_color = this.state.display_settings_form? this.state.settings.dark_background_color : this.state.settings.background_color;
        const font_color = this.state.display_settings_form? this.state.settings.greyed_out_font_color : this.state.settings.font_color;

        return (
            <div>
            <NavigationBar 
            settings={this.state.settings}
            background_color={background_color}
            toggle_display_settings_form={this.toggle_display_settings_form}
            disabled={this.state.display_settings_form}
            />
            <div className="launch-page"
            style={{
                backgroundColor: background_color,
                color: font_color,
            }}
            >
                <img 
                src={logo} 
                className="logo" 
                alt="logo"
                style={{
                    opacity: this.state.display_settings_form? 0.1: 1.0,
                    borderRadius: "1vmin"
                }}/>

                <p>Welcome to Cardinal Designs!</p>
                {this.state.display_settings_form? 
                <PopUp
                settings={this.state.settings}
                background_color={this.state.settings.background_color}
                close_popup={() => this.toggle_display_settings_form(false)}
                >
                    <SettingsForm 
                    settings={this.state.settings}
                    update_setting_element={this.update_setting_element}
                    />
                </PopUp> 
                : null}
            </div>
        </div>
        );
    }
}

export default LaunchPage;