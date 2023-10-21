import { Component } from "react";


import "css/project-page/project-grid/column-border.css"

class ColumnBorder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false
        }

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
            start_width: this.props.current_width,
            start_page_x: event.clientX
        });

        event.stopPropagation();
        event.preventDefault();
    }

    on_mouse_move(event) {
        this.props.set_width(this.state.start_width + (this.props.side==="left"? -1.0 : 1.0)*100.0*(this.state.start_page_x-event.clientX)/window.innerWidth);

        event.stopPropagation();
        event.preventDefault();
    }

    on_mouse_up(event) {
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
            <div className="column-border"
            onMouseEnter={() => this.props.set_color(true)}
            onMouseLeave={() => this.props.set_color(false)}
            onMouseDown={this.on_mouse_down}
            style={{
                backgroundColor: this.props.color,
            }}
            >
                &nbsp;
            </div>
        );
    }
}

export default ColumnBorder;