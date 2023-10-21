import Grid from "./grid";

import Row from "./row";

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
        const [left_width, center_width, right_width] = this.column_widths();
        const height = String(this.props.height)+"vh"

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
                left_width={this.state.left_width}
                right_width={this.state.right_width}
                set_left_width={this.set_left_width}
                set_right_width={this.set_right_width}
                height={this.props.top_height}                
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
                left_width={this.state.left_width}
                right_width={this.state.right_width}
                set_left_width={this.set_left_width}
                set_right_width={this.set_right_width}
                height={this.props.height-this.props.top_height} 
                >
                <div 
                style={{
                    minWidth: left_width, 
                    maxWidth: left_width,
                }}
                >
                    left menu
                </div>
                <div
                style={{ 
                    minWidth: center_width, 
                    maxWidth: center_width,
                }}
                >
                    PROJECT
                </div>
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