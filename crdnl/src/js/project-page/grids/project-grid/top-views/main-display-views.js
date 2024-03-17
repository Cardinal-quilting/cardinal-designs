import Button from "js/infrastructure/button";
import OptionsBox from "js/infrastructure/options-box";

class MainDisplayViews extends OptionsBox {
    display_button(display_name) {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        const currently_selected = display_name===this.props.main_display;

        return (
            <Button
                key={display_name.replace(" ", "_")}
                settings={this.props.settings}
                background_color={currently_selected? this.props.settings.dark_background_color : this.props.settings.background_color}
                font_size={font_size}
                on_click={() => this.props.update_project_settings_element("main_display", display_name)}
                disabled={currently_selected}
            >
                {display_name}
            </Button>
        );
    }

    content() {
        return this.props.display_options.map((display_name) => {
            return this.display_button(display_name);
        });
    }
}

export default MainDisplayViews;