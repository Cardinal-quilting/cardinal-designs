import { Component } from "react";

import './../styles/infrastructure/tooltip.css';

/**
 * Wraps around an object to create a tooltip.
 * 
 * @prop {string} props.xloc="0vmin" - The x-location of the tool time relative to the bottom left of the parent object. 
 * @prop {string} props.yloc="0vmin" - The y-location of the tool time relative to the bottom left of the parent object. 
 * @prop {float} props.hover=500.0 - The time the mouse has to hover before the tooltip appears (in milliseconds).
 * @prop {string} props.message="" - The message that is displayed when the tooltip appears.
 * @prop {string} props.font_size="1vmin" - The font size of the message text.
 */
class Tooltip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }

        this.showTip = this.showTip.bind(this);
        this.hideTip = this.hideTip.bind(this);
    }

    /**
     * The default props for the tooltip.
     */
    static defaultProps = {
        xloc: "0vmin",
        yloc: "0vmin",
        hover: 500.0,
        message: "",
        font_size: "1vmin"
    }

    /**
     * Show the tooltip after the mouse hovers for this.props.hover milliseconds.
     */
    showTip() {
        setTimeout(() => {
            this.setState({
                active: true
            });
        }, this.props.hover);
    }

    /**
     * Hide the tool tip when the mouse moves out of the parent object.
     */
    hideTip() {
        //clearInterval(this.timeout);
        this.setState({
            active: false
        });
    }

    /**
     * @returns Display the parent object the add a tool tip that displays when the user hovers thier mouse over it.
     */
    render() {
        return (
            <div 
                className="tooltip-wrapper"
                onMouseEnter={this.showTip}
                onMouseLeave={this.hideTip}
            >
            <div>
                {this.props.children}
                {this.state.active && (
                <div 
                className="tooltip"
                style={{
                    left: this.props.xloc,
                    bottom: this.props.yloc,
                    fontSize: this.props.font_size
                }}
                >
                    {this.props.message}
                </div>
                )}
            </div>
            </div>
        )
    }
}

export default Tooltip;