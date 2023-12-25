import Page from "js/infrastructure/page";

import LaunchProjectNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import Button from "js/infrastructure/button";

class StartNewProjectPage extends Page {
    render_new_project_popup() {
        return (
            <PopUp
            settings={this.props.settings}
            background_color={this.props.settings.dark_background_color}
            close_popup={() => {}}
            >   
                <div
                    style={{
                        textAlign: "left",
                        fontSize: String(this.props.settings.font_size)+"vmin",
                        color: this.props.settings.font_color
                    }}
                >
                    Create new project
                </div>
                
                <div key="aspect">
                <input
                    type="number"
                    step="0.01"
                    min="0.0"
                    value={this.props.project_settings.aspect_ratio}
                    onChange={(event) => this.props.update_project_settings_element("aspect_ratio", event.target.value)}
                    style={{
                        width: String(3*Number(this.props.settings.font_size))+"vmin",
                        fontSize: String(this.props.settings.font_size)+"vmin",
                        color: this.props.settings.font_color,
                        backgroundColor: this.props.settings.background_color,
                    }}
                />
                <label htmlFor="aspect"
                style={{
                    fontSize: String(this.props.settings.font_size)+"vmin",
                    color: this.props.settings.font_color
                }}
                > Aspect ratio</label>
                </div>
                <div
                style={{
                    textAlign: "center",
                }}
                >                    
                    <Button
                        margin_top="2vh"
                        margin_right="1vw"
                        settings={this.props.settings}
                        on_click={this.props.start_new_project}
                    >
                        Start
                    </Button>
                    <Button
                        margin_top="2vh"
                        margin_left="1vw"
                        settings={this.props.settings}
                        on_click={this.props.go_to_launch_page}
                    >
                        Home
                    </Button>
            </div>
            </PopUp>
        );
    }

    render() {
        const background_color = this.background_color();

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
            <LaunchProjectNavigationBar
                settings={this.props.settings}
                background_color={this.props.settings.dark_background_color}
                toggle_display_settings_form={this.toggle_display_settings_form}
                disabled={this.state.display_settings_form}
                go_to_launch_page={this.props.go_to_launch_page}
            />
            <div
            style={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
            }}
            >
            { // the pop window to start new project or change the settings
                this.state.display_settings_form? this.render_settings() : this.render_new_project_popup()
            }
            </div>
            </div>
        );
    }
    
}

export default StartNewProjectPage;