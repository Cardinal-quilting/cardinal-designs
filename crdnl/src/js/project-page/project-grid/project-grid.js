import { Component } from "react";

import Row from "./row";

import "css/project-page/project-grid/row.css"

class ProjectGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left_width: 10, // units should be in vw
            right_width: 10, // units should be in vw
            left_border_color: this.props.settings.background_color,
            right_border_color: this.props.settings.background_color
        }

        this.set_left_border_color = this.set_left_border_color.bind(this);
        this.set_right_border_color = this.set_right_border_color.bind(this);
        this.set_left_width = this.set_left_width.bind(this);
        this.set_right_width = this.set_right_width.bind(this);
    }

    set_left_width(width) {
        this.setState({
            left_width: width
        });
    }

    set_right_width(width) {
        this.setState({
            right_width: width
        });
    }

    set_left_border_color(mouse_is_hovering) {
        this.setState({
            left_border_color: mouse_is_hovering? this.props.settings.accent_background_color : this.props.settings.background_color
        })
    }

    set_right_border_color(mouse_is_hovering) {
        this.setState({
            right_border_color: mouse_is_hovering? this.props.settings.accent_background_color : this.props.settings.background_color
        })
    }

    render() {
        // compute the widths of each column
        const left_width = String(this.state.left_width) + "vw";
        // subtract an extra 0.5 to account for the column borders in each row
        const center_width = String(99.5-this.state.left_width-this.state.right_width) + "vw";
        const right_width = String(this.state.right_width) + "vw";


        return ( 
            <div className="project-grid"
            style={{
                backgroundColor: "white"}}
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
                >
                <div 
                style={{
                    minWidth: left_width, 
                    maxWidth: left_width,
                }}
                >
                    left top
                </div>
                <div
                style={{ 
                    minWidth: center_width, 
                    maxWidth: center_width 
                }}
                >
                    center top
                </div>
                <div
                style={{ 
                    minWidth: right_width, 
                    maxWidth: right_width 
                }}
                >
                    right top
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
                    maxWidth: center_width 
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