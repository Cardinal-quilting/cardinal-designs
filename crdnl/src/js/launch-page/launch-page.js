import SettingsForm from "js/infrastructure/settings-form";

import logo from "logos/CardinalQuiltsLogo.png"

import LaunchPageNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import Button from "js/infrastructure/button";

import Page from "js/infrastructure/page";

class LaunchPage extends Page {
    constructor(props) {
        super(props);

        this.render_buttons = this.render_buttons.bind(this);
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
                update_settings_element={this.props.update_settings_element}
                />
            </PopUp>
        );
    }

    render_buttons() {
        return (
        <div key={this.props.key===undefined? "Button" : this.props.key}>
        <Button 
        settings={this.props.settings} 
        margin_right="5vw"
        font_size={String(this.props.settings.large_font_size)+"vmin"}
        background_color={this.props.settings.accent_background_color}
        disabled={this.state.display_settings_form}
        on_click={() => this.props.start_new_project()}
        >
            New project
        </Button>
        <Button 
        settings={this.props.settings} 
        margin_left="5vw"
        font_size={String(this.props.settings.large_font_size)+"vmin"}
        background_color={this.props.settings.accent_background_color}
        disabled={this.state.display_settings_form}
        on_click={this.props.load_project}
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
            <div
            style={{
                backgroundColor: background_color,
                minHeight: "100vh",
                maxHeight: "100vh",
                minWidth: "100vw",
                maxWidth: "100vw",
            }}
            >
            <LaunchPageNavigationBar 
            settings={this.props.settings}
            background_color={background_color}
            toggle_display_settings_form={this.toggle_display_settings_form}
            disabled={this.state.display_settings_form}
            />
            <div
            style={{
                backgroundColor: background_color,
                color: font_color,
                display: "flex", 
                flexDirection: "column", 
                textAlign: "center",
                alignItems: "center",
                minWidth: "100vw",
                maxWidth: "100vw",
            }}
            >
            { this.state.display_settings_form? this.render_settings_form() :
                <div style={{ justifyContent: "center" }}>
                <img 
                src={logo} 
                alt="logo"
                style={{
                    height: "40vmin",
                    pointerEvents: "none",
                    opacity: this.state.display_settings_form? 0.1 : 1.0,
                    borderRadius: "1vmin"
                }}/>

                <p style={{fontSize: String(this.props.settings.large_font_size)+"vmin"}}>Welcome to Cardinal Designs!</p>

                {this.render_buttons()}
                </div>

                
                
            }
            </div>
                {/*
                this.state.display_settings_form? 
                // the pop window to change the settings
                this.render_settings_form()
                : // the start and load buttons (only display if we are not editting the settings)
                this.render_buttons()
            */}
            
        </div>
        );
    }
}

export default LaunchPage;