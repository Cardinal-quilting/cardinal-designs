import { Component } from "react";

import ColumnBorder from "./column-border";

class Row extends Component {
    render() {
        const height = String(this.props.height)+"vh";

        return ( 
            <div
            style={{
                minHeight: height,
                maxHeight: height,
                display: "flex",
            }}
            >
                {this.props.children[0]}
                <ColumnBorder
                color={this.props.left_border_color}
                set_color={this.props.set_left_border_color}
                current_width={this.props.left_width}
                set_width={this.props.set_left_width}
                height={height}
                side="left"
                />
                {this.props.children[1]}
                <ColumnBorder
                color={this.props.right_border_color}
                set_color={this.props.set_right_border_color}
                current_width={this.props.right_width}
                set_width={this.props.set_right_width}
                height={height}
                side="right"
                />
                {this.props.children[2]}
            </div>
        );
    }
}

export default Row;