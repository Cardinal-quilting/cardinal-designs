import { Component } from "react";

import "styles/infrastructure/form.css";

/**
 * A form for the user to fill out
 */
class Form extends Component {
    render() {
        return (
            <div className="form">
                {this.props.children}
            </div>
        );
    }
}

export default Form;