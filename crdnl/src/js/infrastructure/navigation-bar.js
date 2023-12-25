import React, { Component } from "react";

import Button from "js/infrastructure/button";

import logo from "logos/CardinalQuiltsSmallLogo.png"

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = { sent_height: undefined };

        this.ref = React.createRef();
    }

    componentDidMount() {
        if( this.ref.current && this.props.set_navbar_height!==undefined ) {
            const height = (this.ref.current.getBoundingClientRect().height/window.innerHeight)*100;
            this.setState({sent_height: height});
            this.props.set_navbar_height(height);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if( this.ref.current & this.props.set_navbar_height!==undefined ) {
            const height = (this.ref.current.getBoundingClientRect().height/window.innerHeight)*100;

            if( Math.abs(height-this.state.sent_height)>1.0e-12 ) { 
                this.setState({sent_height: height});
                this.props.set_navbar_height(height);
            }
        }
    }

    static defaultProps = {
        disabled: false
    }

    render_logo() {
        return (
            <img src={logo} className="logo" alt="logo"
                style={{
                    height: String(this.props.settings.font_size)+"vh",
                    margin: "0.25vh 0.5vw 0.25vh 0.0vw", // top, right, bottom, left
                    opacity: (this.props.disabled? 0.1 : 1.0),
                    borderRadius: "1vmin"                    
            }}/>
        );
    }

    home_button() {
        return (
            <Button 
                settings={this.props.settings}
                on_click={this.props.go_to_launch_page}
                font_color={this.props.settings.font_color}
                font_size={String(this.props.settings.font_size)+"vh"}
                disabled={this.props.disabled}
                >
                    Home
            </Button>
        );
    }

    render_settings_button() {
        return (
            <div
                style={{
                    textAlign: "right",
                    width: "50%"
                }}
                >    
                    {this.props.disabled? null : this.settings_button()}
            </div>
        );
    }

    settings_button() {
        return (
            <Button 
                settings={this.props.settings}
                on_click={this.props.toggle_display_settings_form}
                font_color={this.props.settings.greyed_out_font_color}
                font_size={String(this.props.settings.font_size)+"vh"}
                disabled={this.props.disabled}
                >
                    Settings
            </Button>
        );
    }
}

export default NavigationBar;