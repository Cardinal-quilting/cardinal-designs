import Grid from "./grid";

import Row from "./row";

import MainDisplay from "./main-display";

import LeftMenu from "./left-menu";

import "css/project-page/grids/row.css"

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
                maxHeight: height
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
                <div 
                style={{
                    minWidth: left_width, 
                    maxWidth: left_width,
                }}
                >
                    left views
                </div>
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
                />
                <MainDisplay 
                settings={this.props.settings}
                width={numerical_center_width}
                height={String(display_height)+"vh"}
                project_info={this.props.project_info}
                project_settings={this.props.project_settings}
                />
                <div
                style={{ 
                    minWidth: right_width, 
                    maxWidth: right_width 
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