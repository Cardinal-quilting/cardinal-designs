import React, { Component } from "react";

import Button from "infrastructure/button";

import "styles/infrastructure/dropdown-menu.css";

/**
 * Defines a drop down menu button.
 * 
 * @prop {string} props.name - The name of the dropdown menu (displayed as text).
 * @prop {string} props.unselected_background_color - The color of the background with the dropdown is not selected; must be a property value.
 * @prop {float} props.font_size=1.5vmin - The font size for the button's text.
 * @prop {string} props.font_weight - Set to "bold" to have a button with bold font
 * @prop {bool} props.enabled=true - True: the dropdown menu is enabled, False: the dropdown menu is disabled
 * @prop {bool} state.display - True: the dropdown menu is open, False: the dropdown menu is closed
 * @prop {string} state.top_button_background={var(--dark-red-theme)} - The color of the dropdown button
 * @prop {string} state.announce_state - Pass true into this function when the dropdown is opened and false when the dropdown is closed.
 */
class DropdownMenu extends Component {
    /**
     * @param {*} props The props for this object
     */
    constructor(props) {
        super(props);

        const background = getComputedStyle(document.documentElement).getPropertyValue(this.props.unselected_background_color);
        this.state = {
            display: false,
            outside_click_closed: false,
            top_button_background: background
        };

        this.box = React.createRef();
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    static defaultProps = {
        unselected_background_color: "--black-theme",
        enabled: true,
        zIndex: 0
    }

    /**
     * When the component is mounted, add a listener that handles when we click outside of the mune.
     */
    componentDidMount() {
        document.addEventListener("click", this.handleOutsideClick, true);    
    }

    /**
     * Remove the event listener that handles outside click with the component unmounts.
     */
    componentWillUnmount(){
        document.removeEventListener("click", this.handleOutsideClick, true);
    }

    /**
     * Close the dropdown menu if it is open and the user clicks outside
     * @param {*} event Information about the click.
     */
    handleOutsideClick(event) {
        if( this.box.current && !this.box.current.contains(event.target) ) {
            this.closeDropdown();
        }
    }

    /**
     * Close the dropdown menu
     */
    closeDropdown() {
        this.props.announce_state(false);

        const background = getComputedStyle(document.documentElement).getPropertyValue(this.props.unselected_background_color);
        this.setState({
            display: false,
            top_button_background: background
        });
    }

    /**
     * Open the dropdown menu
     */
    openDropdown() {
        this.props.announce_state(true);

        const background = getComputedStyle(document.documentElement).getPropertyValue("--dark-red-theme");
        
        this.setState({
            display: true,
            top_button_background: background
        });
    }

    /**
     * Must be overriden by children
     * @returns A list containing the content of the dropdown menu
     */
    content() {
        return []
    }
    
    /**
     * @returns The definition of the dropdown menu
     */
    render() {
        return (
            <div
                style={{zIndex: this.props.zIndex}}
            >
                <Button 
                    background_color={this.state.top_button_background} 
                    on_click={() => this.openDropdown()} 
                    enabled={!this.state.display & this.props.enabled} 
                    name={this.props.name+(this.state.display? "\u25BE":"\u25B8")}
                    font_size={this.props.font_size}
                    font_weight={this.props.font_weight}
                    />
                {this.state.display? 
                    <div className="dropdown-menu" ref={this.box}>
                        {this.content().map((d) => <li key={d.key} style={{listStyle: "none"}}>{d}</li>)}
                        <hr/>
                        <Button 
                            on_click={() => this.closeDropdown()} 
                            name={"Close".concat(" ", this.props.name)}
                        /> 
                    </div>
                : null}
            </div>
        )
    }
}

export default DropdownMenu;