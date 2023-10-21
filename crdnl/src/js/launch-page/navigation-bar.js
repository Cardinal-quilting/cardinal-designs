import NavigationBar from "js/infrastructure/navigation-bar";

class LaunchPageNavigationBar extends NavigationBar {
    render() { 
        return (
            <div
            style={{
                textAlign: "right",
                backgroundColor: this.props.background_color,
                color: this.props.settings.font_color
            }}
            >
                {this.props.disabled? null : this.settings_button()}
            </div>
        );
    }
}

export default LaunchPageNavigationBar;