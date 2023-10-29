import ProjectPageNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import SettingsForm from "js/infrastructure/settings-form";

import ProjectGrid from "./grids/project-grid";
import SupportGrid from "./grids/support-grid";

import RowBorder from "./grids/row-border";

import Page from "js/page";

import "css/project-page/project-page.css"

class ProjectPage extends Page {
    constructor(props) {
        super(props);

        this.state = {
            grid_border_color: this.props.settings.background_color,
            views_height: 5, // units are in vh
            support_grid_height: 25, // units are in vh
            project_grid_right_width: 10, // units are in vw
            project_grid_left_width: 10, // units are in vw
            support_grid_right_width: 15, // units are in vw
            support_grid_left_width: 10, // units are in vw
        }

        this.set_grid_border_color = this.set_grid_border_color.bind(this);
        this.set_support_grid_height = this.set_support_grid_height.bind(this);
        this.set_project_grid_left_width = this.set_project_grid_left_width.bind(this);
        this.set_project_grid_right_width = this.set_project_grid_right_width.bind(this);
        this.set_support_grid_left_width = this.set_support_grid_left_width.bind(this);
        this.set_support_grid_right_width = this.set_support_grid_right_width.bind(this);
    }

    set_project_grid_left_width(width) {
        this.setState({
            project_grid_left_width: width
        });
    }

    set_project_grid_right_width(width) {
        this.setState({
            project_grid_right_width: width
        });
    }

    set_support_grid_left_width(width) {
        this.setState({
            support_grid_left_width: width
        });
    }

    set_support_grid_right_width(width) {
        this.setState({
            support_grid_right_width: width
        });
    }

    set_grid_border_color(mouse_is_hovering) {
        this.setState({
            grid_border_color: (mouse_is_hovering? this.props.settings.accent_background_color : this.props.settings.background_color)
        })
    }

    set_support_grid_height(height) {
        this.setState({
            support_grid_height: Math.min(100-3.9-this.state.views_height, height)
        });
    }

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
        const project_grid_height = 100-3.9-this.state.support_grid_height;

        return (
            <div>
            <ProjectPageNavigationBar
                settings={this.props.settings}
                background_color={this.props.settings.dark_background_color}
                toggle_display_settings_form={this.toggle_display_settings_form}
                disabled={this.state.display_settings_form}
                go_to_launch_page={this.props.go_to_launch_page}
                height={"3.5vh"}
            />
            <div className="project-page"
            style={{
                backgroundColor: background_color
            }}
            >
                { this.state.display_settings_form? null :
                <ProjectGrid
                    settings={this.props.settings}
                    height={project_grid_height}
                    views_height={this.state.views_height} // units are in vh
                    left_width={this.state.project_grid_left_width} // units are in vw
                    right_width={this.state.project_grid_right_width} // units are in vw
                    set_left_width={this.set_project_grid_left_width}
                    set_right_width={this.set_project_grid_right_width}
                />
                }
                { this.state.display_settings_form? null :
                <RowBorder
                    color={this.state.grid_border_color}
                    set_color={this.set_grid_border_color}
                    current_height={this.state.support_grid_height}
                    set_height={this.set_support_grid_height}
                />
                }
                { this.state.display_settings_form? null :
                <SupportGrid
                    settings={this.props.settings}
                    height={this.state.support_grid_height}
                    left_width={this.state.support_grid_left_width} // units are in vw
                    right_width={this.state.support_grid_right_width} // units are in vw
                    set_left_width={this.set_support_grid_left_width}
                    set_right_width={this.set_support_grid_right_width}
                    project_display_width={99.5-this.state.project_grid_left_width-this.state.project_grid_right_width}
                    project_display_height={project_grid_height}
                />
                }
                { // the pop window to change the settings
                this.state.display_settings_form? this.render_navigation_bar() : null 
                }
            </div>
            </div>

        )
    }
}

export default ProjectPage;