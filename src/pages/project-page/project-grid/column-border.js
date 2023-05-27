import React, { Component } from "react";

import "styles/pages/project-page/project-grid/column-border.css";

class ColumnBorder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            default_color: "--grey-background-color",
            mouseover_color: "--dark-red-theme",
            dragging: false
        }

        this.mouse_enter = this.mouse_enter.bind(this);
        this.mouse_leave = this.mouse_leave.bind(this);
        this.on_mouse_down = this.on_mouse_down.bind(this);
        this.on_mouse_move = this.on_mouse_move.bind(this);
        this.on_mouse_up = this.on_mouse_up.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if( this.state.dragging && !prevState.dragging ) {
            document.addEventListener('mousemove', this.on_mouse_move);
            document.addEventListener('mouseup', this.on_mouse_up);
        } else if( !this.state.dragging && prevState.dragging ) {
            document.removeEventListener('mousemove', this.on_mouse_move);
            document.removeEventListener('mouseup', this.on_mouse_up);
        }
    }

    mouse_enter() {
        this.props.set_hover(this.state.mouseover_color);
    }

    mouse_leave() {
        this.props.set_hover(this.state.default_color);
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
            dragging: false
        });

        event.stopPropagation();
        event.preventDefault();
    }

    render() {
        return (
        <div
            onMouseDown={this.on_mouse_down}
            onMouseEnter={this.mouse_enter}
            onMouseLeave={this.mouse_leave}
            className="column-border"
            style={{
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(this.props.color),
            }}
        />
        );
    }
}

export default ColumnBorder;