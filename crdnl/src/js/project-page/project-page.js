import ProjectPageNavigationBar from "./navigation-bar";

import PopUp from "js/infrastructure/pop-up";

import SettingsForm from "js/infrastructure/settings-form";

import ProjectGrid from "./grids/project-grid";
import SupportGrid from "./grids/support-grid";

import RowBorder from "./grids/row-border";

import Page from "js/page";

import Button from "js/infrastructure/button";

import { ProjectInfo, ProjectSettings } from "./main-displays/project/project-info";

import "css/project-page/project-page.css"

class ProjectPage extends Page {
    constructor(props) {
        super(props);

        this.state = Object.assign(this.state, {
            starting_project: true,
            grid_border_color: this.props.settings.background_color,
            views_height: 5, // units are in vh
            support_grid_height: 25, // units are in vh
            project_grid_right_width: 10, // units are in vw
            project_grid_left_width: 10, // units are in vw
            support_grid_right_width: 15, // units are in vw
            support_grid_left_width: 10, // units are in vw
            project_info: new ProjectInfo(),
            project_settings: new ProjectSettings()
        });

        this.set_grid_border_color = this.set_grid_border_color.bind(this);
        this.set_support_grid_height = this.set_support_grid_height.bind(this);
        this.set_project_grid_left_width = this.set_project_grid_left_width.bind(this);
        this.set_project_grid_right_width = this.set_project_grid_right_width.bind(this);
        this.set_support_grid_left_width = this.set_support_grid_left_width.bind(this);
        this.set_support_grid_right_width = this.set_support_grid_right_width.bind(this);
        this.set_project_settings = this.set_project_settings.bind(this);
    }

    set_project_grid_left_width(width) {
        this.setState({
            project_grid_left_width: Math.max(width, 3)
        });
    }

    set_project_grid_right_width(width) {
        this.setState({
            project_grid_right_width: Math.max(width, 3)
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
            support_grid_height: Math.max(Math.min(95-this.state.views_height, height), 3.0)
        });
    }

    set_project_settings(new_settings) {
        this.setState({
            project_settings: new_settings
        });
    }

    render_settings() {
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

    render_launch_popup() {
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
                    value={this.state.project_info.aspect_ratio}
                    onChange={(event) => this.setState({project_info: {aspect_ratio: event.target.value}})}
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
                        on_click={() => this.setState({ starting_project: false })}
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
        const project_grid_height = 100-3.9-this.state.support_grid_height;

        const display_grids = !this.state.display_settings_form & !this.state.starting_project;

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
            { display_grids?
                <div>
                <ProjectGrid
                    settings={this.props.settings}
                    project_info={this.state.project_info}
                    project_settings={this.state.project_settings}
                    set_project_settings={this.set_project_settings}
                    height={project_grid_height}
                    views_height={this.state.views_height} // units are in vh
                    left_width={this.state.project_grid_left_width} // units are in vw
                    right_width={this.state.project_grid_right_width} // units are in vw
                    set_left_width={this.set_project_grid_left_width}
                    set_right_width={this.set_project_grid_right_width}                    
                />
                <RowBorder
                    color={this.state.grid_border_color}
                    set_color={this.set_grid_border_color}
                    current_height={this.state.support_grid_height}
                    set_height={this.set_support_grid_height}
                />
                <SupportGrid
                    settings={this.props.settings}
                    project_info={this.state.project_info}
                    project_settings={this.state.project_settings}
                    height={this.state.support_grid_height}
                    left_width={this.state.support_grid_left_width} // units are in vw
                    right_width={this.state.support_grid_right_width} // units are in vw
                    set_left_width={this.set_support_grid_left_width}
                    set_right_width={this.set_support_grid_right_width}
                    project_display_width={99.5-this.state.project_grid_left_width-this.state.project_grid_right_width}
                    project_display_height={project_grid_height-this.state.views_height}
                />
                </div> : null
            }
            { // the pop window to change the settings
                this.state.starting_project? this.render_launch_popup() : null 
            }
            { // the pop window to change the settings
                this.state.display_settings_form? this.render_settings() : null 
            }
            </div>
            </div>

        )
    }
}

export default ProjectPage;