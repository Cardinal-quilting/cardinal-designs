import { Component } from "react";

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left_border_color: this.props.settings.background_color,
            right_border_color: this.props.settings.background_color,
        }

        this.set_left_border_color = this.set_left_border_color.bind(this);
        this.set_right_border_color = this.set_right_border_color.bind(this);

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

    center_width() {
        return 99.5-this.props.left_width-this.props.right_width;
    }
}

export default Grid;