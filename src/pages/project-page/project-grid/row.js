import React, { Component } from "react";

import ColumnBorder from "./column-border";

import "styles/pages/project-page/project-grid/row.css";

class Row extends Component {
    render() {
        console.assert(this.props.children.length===3);

        return (
            <div
                className="row"
            >
                {this.props.children[0]}
                <ColumnBorder
                    set_hover={this.props.set_left_hover}
                    set_width={this.props.set_left_width}
                    current_width={this.props.left_width}
                    color={this.props.left_border_color}
                    side="left"
                />
                {this.props.children[1]}
                <ColumnBorder
                    set_hover={this.props.set_right_hover}
                    set_width={this.props.set_right_width}
                    current_width={this.props.right_width}
                    color={this.props.right_border_color}
                    side="right"
                />
                {this.props.children[2]}
            </div>
        );
    }
}

export default Row;