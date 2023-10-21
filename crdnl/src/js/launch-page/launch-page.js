import React, { Component } from "react";

import SettingsForm from "js/infrastructure/settings-form";

import logo from "logos/CardinalQuiltsLogo.png"

import NavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import Button from "js/infrastructure/button";

import "css/styles.css";
import "css/launch-page/launch-page.css"

class LaunchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display_settings_form: false,
        }

        this.toggle_display_settings_form = this.toggle_display_settings_form.bind(this);
    }

    toggle_display_settings_form(form_status=undefined) {
        this.setState({
            display_settings_form: form_status===undefined? !this.state.display_settings_form : form_status
        })
    }

    render() {
        const background_color = this.state.display_settings_form? this.props.settings.dark_background_color : this.props.settings.background_color;
        const font_color = this.state.display_settings_form? this.props.settings.greyed_out_font_color : this.props.settings.font_color;

        return (
            <div>
            <NavigationBar 
            settings={this.props.settings}
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

                <p style={{fontSize: "5vh"}}>Welcome to Cardinal Designs!</p>
                
                {this.state.display_settings_form? 
                /* the pop window to change the settings */
                <PopUp
                settings={this.props.settings}
                background_color={this.props.settings.background_color}
                close_popup={() => this.toggle_display_settings_form(false)}
                >
                    <SettingsForm 
                    settings={this.props.settings}
                    update_setting_element={this.props.update_setting_element}
                    />
                </PopUp> 
                : 
                <div>
                    <Button 
                    settings={this.props.settings} 
                    margin_right="5vw"
                    font_size="5vh"
                    background_color={this.props.settings.accent_background_color}
                    disabled={this.state.display_settings_form}
                    on_click={this.props.start_new_project}
                    >
                        New project
                    </Button>
                    <Button 
                    settings={this.props.settings} 
                    margin_left="5vw"
                    font_size="5vh"
                    background_color={this.props.settings.accent_background_color}
                    disabled={this.state.display_settings_form}
                    >
                        Load project
                    </Button>
                </div>
                }
            </div>
        </div>
        );
    }
}

export default LaunchPage;