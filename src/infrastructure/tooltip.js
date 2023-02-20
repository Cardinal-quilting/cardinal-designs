import { Component } from "react";

import 'styles/infrastructure/tooltip.css';

/**
 * Wraps around an object to create a tooltip.
 * 
 * @prop {string} props.pos.x="0vmin" - The x-location of the tool time relative to the bottom left of the parent object. 
 * @prop {string} props.pos.y="0vmin" - The y-location of the tool time relative to the bottom left of the parent object. 
 * @prop {float} props.hover=500.0 - The time the mouse has to hover before the tooltip appears (in milliseconds).
 * @prop {string} props.message="" - The message that is displayed when the tooltip appears.
 * @prop {string} props.font_size="1vmin" - The font size of the message text.
 * @prop {bool} props.enabled=true - If false, the tooltip will no longer appear.
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
     * @param prevProps The props before updating.
     * @param prevState The state before updating.
     */
    componentDidUpdate(prevProps, prevState) {
        // make sure the tooltip stays hidden if the previous state was disabled
        if( !prevProps.enabled && prevState.active ) {
            this.hideTip();
        }
    }

    /**
     * The default props for the tooltip.
     */
    static defaultProps = {
        xloc: "0vmin",
        yloc: "0vmin",
        hover: 500.0,
        message: "",
        font_size: "1vmin",
        enabled: true
    }

    /**
     * Show the tooltip after the mouse hovers for this.props.hover milliseconds.
     */
    showTip() {
        this.timeout = setTimeout(() => {
            this.setState({
                active: true
            });
        }, this.props.hover);
    }

    /**
     * Hide the tool tip when the mouse moves out of the parent object.
     */
    hideTip() {
        clearInterval(this.timeout);
        this.setState({
            active: false
        });
    }

    /**
     * @returns Display the parent object the add a tool tip that displays when the user hovers thier mouse over it.
     */
    render() {
        // show the tool tip if the tool tip is enabled and the user has hovered long enough
        const show_tool_tip = this.props.enabled && this.state.active;
                
        return (
            <div 
                className="tooltip-wrapper"
                onMouseEnter={this.showTip}
                onMouseLeave={this.hideTip}
            >
            <div>
                {this.props.children}
                {show_tool_tip && (
                <div 
                className="tooltip"
                style={{
                    left: this.props.pos.x,
                    bottom: this.props.pos.y,
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