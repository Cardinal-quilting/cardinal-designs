import Page from "js/infrastructure/page";

import LaunchProjectNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import Button from "js/infrastructure/button";

class SaveProjectAsPage extends Page {
    constructor(props) {
        super(props);

        this.state = {
            project_name: "",
        }

        this.save_project_as = this.save_project_as.bind(this);
    }

    save_project_as() {
        if( this.state.project_name==="" ) { return; }

        var psettings = this.props.project_settings
        psettings["project_name"] = this.state.project_name
        psettings["project_id"] = undefined

        this.props.set_project_settings(psettings);
        this.props.save_project().then(status => {
            status.success? this.props.return_to_project() : this.setState({ message: status.message });
        });
    }
    
    render_save_project_as() {
        const font_size = String(this.props.settings.font_size)+"vmin";

        return (
            <PopUp
            settings={this.props.settings}
            background_color={this.props.settings.dark_background_color}
            close_popup={() => {}}
            >   
                <div key="project_name">
                <label htmlFor="project_name"
                style={{
                    fontSize: font_size,
                    color: this.props.settings.font_color
                }}
                >Project name: </label>
                <input
                    type="text"
                    onChange={(event) => this.setState({project_name: event.target.value.trim()})}
                    style={{
                        width: "35vw",
                        fontSize: font_size,
                        color: this.props.settings.font_color,
                        backgroundColor: this.props.settings.background_color,
                    }}
                />
                </div>
                <p style={{ fontSize: font_size }}>{this.state.message}</p>
                <Button
                        margin_top="1vh"
                        margin_right="1vw"
                        settings={this.props.settings}
                        on_click={this.props.return_to_project}
                >
                    Cancel
                </Button>
                <Button
                        margin_top="1vh"
                        margin_left="1vw"
                        settings={this.props.settings}
                        on_click={this.save_project_as}
                >
                    Save
                </Button>
            </PopUp>
        );
    }

    render() {
        const background_color = this.background_color();

        return (
        <div>
            <LaunchProjectNavigationBar
                settings={this.props.settings}
                background_color={this.props.settings.dark_background_color}
                toggle_display_settings_form={this.toggle_display_settings_form}
                disabled={this.state.display_settings_form}
                go_to_launch_page={this.props.go_to_launch_page}
            />
            <div
            style={{
                minHeight: "100vh",
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: background_color
            }}
            >
            { // the pop window to start new project or change the settings
            this.state.display_settings_form? this.render_settings() : this.render_save_project_as()                    
            }
            </div>
        </div>
        );
    }
}

export default SaveProjectAsPage;