import OptionsBox from "js/infrastructure/options-box";

import Button from "js/infrastructure/button";

class RecursivePiecingOptionsBox extends OptionsBox {

    test() {
        return ( 
            <div>
            </div>
        );
    }

initialize() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <Button
                key="restore_zoom_default"
                settings={this.props.settings}
                background_color={this.props.settings.dark_background_color}
                font_size={font_size}
                on_click={() => {this.props.initialize_recursive_piecing()}}
            >
                Initialize
            </Button>
        );
    }
    
    content() {
        if( this.props.project_settings.has_recursive_piecing ) {
            return [
                this.test()
            ];
        } else {
            return [
                this.initialize()
            ];
        }
    }
}

export default RecursivePiecingOptionsBox;