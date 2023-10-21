import ProjectPageNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import SettingsForm from "js/infrastructure/settings-form";

import Page from "js/page";

import "css/project-page/project-page.css"

class ProjectPage extends Page {
    render_navigation_bar() {
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

    render() {
        const background_color = this.background_color();

        return (
            <div>
                <ProjectPageNavigationBar
                settings={this.props.settings}
                background_color={this.props.settings.dark_background_color}
                toggle_display_settings_form={this.toggle_display_settings_form}
                disabled={this.state.display_settings_form}
                go_to_launch_page={this.props.go_to_launch_page}
                />
            <div className="project-page"
            style={{
                backgroundColor: background_color
            }}
            >
                { // the pop window to change the settings
                this.state.display_settings_form? this.render_navigation_bar() : null 
                }
            </div>
            </div>

        )
    }
}

export default ProjectPage;