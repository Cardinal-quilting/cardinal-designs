import SettingsForm from "js/infrastructure/settings-form";

import logo from "logos/CardinalQuiltsLogo.png"

import LaunchPageNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import Button from "js/infrastructure/button";

import Page from "js/page";

import "css/launch-page/launch-page.css"

class LaunchPage extends Page {
    constructor(props) {
        super(props);

        this.render_start_buttons = this.render_start_buttons.bind(this);
    }

    render_settings_form() {
        return (
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
        );
    }

    render_start_buttons() {
        return (
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
        );
    }

    render() {
        const background_color = this.background_color()
        const font_color = this.state.display_settings_form? this.props.settings.greyed_out_font_color : this.props.settings.font_color;

        return (
            <div>
            <LaunchPageNavigationBar 
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
                    opacity: this.state.display_settings_form? 0.1 : 1.0,
                    borderRadius: "1vmin"
                }}/>

                <p style={{fontSize: "5vh"}}>Welcome to Cardinal Designs!</p>
                
                {
                this.state.display_settings_form? 
                // the pop window to change the settings
                this.render_settings_form()
                : // the start buttons (only display if we are not editting the settings)
                this.render_start_buttons()
                }
            </div>
        </div>
        );
    }
}

export default LaunchPage;