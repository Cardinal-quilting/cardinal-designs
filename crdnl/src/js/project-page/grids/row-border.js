import { Component } from "react";

import "css/project-page/grids/row-border.css"

class RowBorder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            left_width: 15, // units are in vw
            dragging: false
        };

        this.on_mouse_down = this.on_mouse_down.bind(this);
        this.on_mouse_move = this.on_mouse_move.bind(this);
        this.on_mouse_up = this.on_mouse_up.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if( this.state.dragging && !prevState.dragging ) {
            document.addEventListener("mousemove", this.on_mouse_move);
            document.addEventListener("mouseup", this.on_mouse_up);
        } else if( !this.state.dragging && prevState.dragging ) {
            document.removeEventListener("mousemove", this.on_mouse_move);
            document.removeEventListener("mouseup", this.on_mouse_up);
        }
    }

    on_mouse_down(event) {
        // only left mouse
        if( event.button!==0 ) { return; }

        this.setState({
            dragging: true,
            start_height: this.props.current_height,
            start_page_y: event.clientY
        });

        event.stopPropagation();
        event.preventDefault();
    }

    on_mouse_move(event) {
        this.props.set_height(Math.max(6, this.state.start_height + 100.0*(this.state.start_page_y-event.clientY)/window.innerHeight));

        event.stopPropagation();
        event.preventDefault();
    }

    on_mouse_up(event) {
        this.props.set_color(false);

        this.setState({
            dragging: false,
            start_width: undefined,
            start_page_x: undefined
        });

        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        return (
            <div className="row-border"
            style={{
                backgroundColor: this.props.color
            }}
            onMouseEnter={() => this.props.set_color(true)}
            onMouseLeave={() => this.props.set_color(false)}
            onMouseDown={this.on_mouse_down}
            >
                &nbsp;
            </div>
        )
    }
}

export default RowBorder;