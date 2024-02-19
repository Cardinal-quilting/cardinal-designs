import OptionsBox from "js/infrastructure/options-box";

import Button from "js/infrastructure/button";

class ActivePanelOptionsBox extends OptionsBox {
    deselect() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <Button key="deselect"
            font_size={font_size}
            settings={this.props.settings}
            on_click={() => {
                this.props.update_recursive_piecing_settings_element("new_start_node", undefined);
                this.props.update_recursive_piecing_settings_element("new_end_node", undefined);
                this.props.update_recursive_piecing_settings_element("active_panel", undefined);
            }}
            >Deselect</Button>
        );
    }

    cancel_new_line() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <Button key="cancel_new_line"
            font_size={font_size}
            settings={this.props.settings}
            on_click={() => {
                this.props.update_recursive_piecing_settings_element("new_start_node", undefined);
                this.props.update_recursive_piecing_settings_element("new_end_node", undefined);
            }}
            >Cancel panel split</Button>
        );
    }

    accept_new_line() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <Button key="accept_new_line"
            font_size={font_size}
            settings={this.props.settings}
            on_click={() => {
                this.props.split_active_recursive_piecing_panel();
            }}
            >Accept panel split</Button>
        );
    }

    content() {
        var options = [
            this.deselect()
        ];

        if( this.props.recursive_piecing_settings.new_start_node!==undefined && this.props.recursive_piecing_settings.new_end_node!==undefined ) {
            options = [this.accept_new_line(), 
                       this.cancel_new_line(), 
                       this.line("panel_splitting_line"), 
                       ...options];
        }

        return options;
    }
}

export default ActivePanelOptionsBox;