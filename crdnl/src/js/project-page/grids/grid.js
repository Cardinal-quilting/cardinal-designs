import { Component } from "react";

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left_width: 10, // units are in vw
            right_width: 10, // units are in vw
            left_border_color: this.props.settings.dark_background_color,
            right_border_color: this.props.settings.dark_background_color
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
            left_border_color: mouse_is_hovering? this.props.settings.accent_background_color : this.props.settings.dark_background_color
        })
    }

    set_right_border_color(mouse_is_hovering) {
        this.setState({
            right_border_color: mouse_is_hovering? this.props.settings.accent_background_color : this.props.settings.dark_background_color
        })
    }

    column_widths() {
        const left_width = String(this.state.left_width) + "vw";
        // subtract an extra 0.5 to account for the column borders in each row
        const center_width = String(99.5-this.state.left_width-this.state.right_width) + "vw";
        const right_width = String(this.state.right_width) + "vw";

        return [left_width, center_width, right_width];
    }
}

export default Grid;