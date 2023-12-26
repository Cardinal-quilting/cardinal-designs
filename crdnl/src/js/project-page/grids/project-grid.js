import Grid from "./grid";

import Row from "./row";

import MainDisplay from "./main-display";

import LeftMenu from "./left-menu";

import ProjectNameDisplay from "./project-name-display";

class ProjectGrid extends Grid {
    constructor(props) {
        super(props);

        this.state = Object.assign(this.state, {
            bottom_height: this.props.height-5, // units are in vh 
        });
    }

    render() {
        // compute the widths of each column
        const left_width = String(this.props.left_width) + "vw";
        const numerical_center_width = this.center_width()
        const center_width = String(numerical_center_width) + "vw";
        const right_width = String(this.props.right_width) + "vw";

        const height = String(this.props.height)+"vh"
        const display_height = this.props.height-this.props.views_height

        return ( 
            <div className="project-grid"
            style={{
                minHeight: height,
                maxHeight: height,
            }}
            >
                <Row
                left_border_color={this.state.left_border_color}
                right_border_color={this.state.right_border_color}
                set_left_border_color={this.set_left_border_color}
                set_right_border_color={this.set_right_border_color}
                left_width={this.props.left_width}
                right_width={this.props.right_width}
                set_left_width={this.props.set_left_width}
                set_right_width={this.props.set_right_width}
                height={this.props.views_height}                
                >
                <ProjectNameDisplay
                settings={this.props.settings}
                width={left_width}
                height={String(this.props.views_height)+"vh"}
                project_name={this.props.project_settings.project_name}
                />
                <div
                style={{ 
                    minWidth: center_width, 
                    maxWidth: center_width 
                }}
                >
                    center views
                </div>
                <div
                style={{ 
                    minWidth: right_width, 
                    maxWidth: right_width 
                }}
                >
                    right views
                </div>
                </Row>
                <Row
                left_border_color={this.state.left_border_color}
                right_border_color={this.state.right_border_color}   
                set_left_border_color={this.set_left_border_color}
                set_right_border_color={this.set_right_border_color}
                left_width={this.props.left_width}
                right_width={this.props.right_width}
                set_left_width={this.props.set_left_width}
                set_right_width={this.props.set_right_width}
                height={display_height} 
                >
                <LeftMenu 
                settings={this.props.settings}
                width={this.props.left_width}
                project_settings={this.props.project_settings}
                set_project_settings={this.props.set_project_settings}
                update_project_settings_element={this.props.update_project_settings_element}
                initialize_recursive_piecing={this.props.initialize_recursive_piecing}
                recursive_piecing_settings={this.props.recursive_piecing_settings}
                set_recursive_piecing_settings={this.props.set_recursive_piecing_settings}
                update_recursive_piecing_settings_element={this.props.update_recursive_piecing_settings_element}
                />
                <MainDisplay 
                settings={this.props.settings}
                width={numerical_center_width}
                height={String(display_height)+"vh"}
                project_settings={this.props.project_settings}
                set_project_settings={this.props.set_project_settings}
                recursive_piecing_settings={this.props.recursive_piecing_settings}
                />
                <div
                style={{ 
                    minWidth: right_width, 
                    maxWidth: right_width, 
                }}
                >
                    right menu
                </div>
                </Row>
            </div>
        );
    }
}

export default ProjectGrid;