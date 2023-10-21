import { Component } from "react";

import ColumnBorder from "./column-border";

import "css/project-page/project-grid/row.css"

class Row extends Component {
    render() {
        return ( 
            <div className="row">
                {this.props.children[0]}
                <ColumnBorder
                color={this.props.left_border_color}
                set_color={this.props.set_left_border_color}
                current_width={this.props.left_width}
                set_width={this.props.set_left_width}
                side="left"
                />
                {this.props.children[1]}
                <ColumnBorder
                color={this.props.right_border_color}
                set_color={this.props.set_right_border_color}
                current_width={this.props.right_width}
                set_width={this.props.set_right_width}
                side="right"
                />
                {this.props.children[2]}
            </div>
        );
    }
}

export default Row;