import React, { Component } from "react";

import "css/infrastructure/pop-up.css";

class PopUp extends Component {
    constructor(props) {
        super(props);

        this.box = React.createRef();
        this.handle_outside_click = this.handle_outside_click.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.handle_outside_click, true);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handle_outside_click, true);
    }

    handle_outside_click(event) {
        if( this.box.current && !this.box.current.contains(event.target) ) {
            this.props.close_popup();
        }
    }

    render() { 
        return (
            <div className="pop-up"
            ref={this.box}
            style={{
                backgroundColor: this.props.background_color,
                color: this.props.settings.font_color,
            }}
            >
                {this.props.children}
            </div>
        );
    }
}

export default PopUp;