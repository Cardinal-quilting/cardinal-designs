import NavigationBar from "js/infrastructure/navigation-bar";

class LaunchPageNavigationBar extends NavigationBar {
    render() { 
        return (
            <div
            ref = {this.ref}
            style={{
                textAlign: "right",
                backgroundColor: this.props.background_color,
                color: this.props.settings.font_color,
                minWidth: "100vw",
                maxWidth: "100vw"
            }}
            >
                {this.props.disabled? null : this.settings_button()}
            </div>
        );
    }
}

export default LaunchPageNavigationBar;