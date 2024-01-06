import OptionsBox from "js/infrastructure/options-box";

import Button from "js/infrastructure/button";

class RecursivePiecingOptionsBox extends OptionsBox {

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

    adjust_node_size() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div
            key="node_size"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >   
            <div>
                Node size:
                </div>
                <input 
                type="range"
                min={this.props.recursive_piecing_settings.min_node_size}
                max={this.props.recursive_piecing_settings.max_node_size}
                step={0.00001}
                value={this.props.recursive_piecing_settings.node_size}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("node_size", event.target.value)}}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
            />
            </div>
        );
    }

    max_node_size() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="node_size_max" name="node_size_max"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min={String(1.01*this.props.recursive_piecing_settings.min_node_size)}
                max="1.0"
                value={this.props.recursive_piecing_settings.max_node_size}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("max_node_size", Math.max(event.target.value, this.props.recursive_piecing_settings.min_node_size))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"node_size_max"}
                style={{
                    fontSize: font_size
                }}
            >
                Max size
            </label>
        </div>
        );
    }

    min_node_size() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="node_size_min" name="node_size_min"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min="0.0"
                max={String(0.99*this.props.recursive_piecing_settings.max_node_size)}
                value={this.props.recursive_piecing_settings.min_node_size}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("min_node_size", Math.min(event.target.value, this.props.recursive_piecing_settings.max_node_size))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"node_size_min"}
                style={{
                    fontSize: font_size
                }}
            >
                Min size
            </label>
        </div>
        );
    }

    node_color() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return ( 
            <div key={"node color"}
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="color"
                name="node color"
                value={this.props.recursive_piecing_settings.node_color}
                onChange={(event) => this.props.update_recursive_piecing_settings_element("node_color", event.target.value)}
                style={{
                    width: String(1.5*Number(this.props.settings.font_size))+"vmin",
                    height: String(Number(this.props.settings.font_size))+"vmin",
                    backgroundColor: this.props.settings.background_color,
                    border: "none"
                }}
                />
                <label htmlFor={"node color"}
                    style={{
                        fontSize: font_size,
                    }}
                > Node color </label>
                <Button 
                font_size={font_size}
                settings={this.props.settings}
                on_click={() => this.props.update_recursive_piecing_settings_element("node_color", getComputedStyle(document.documentElement).getPropertyValue("--black"))}
                >Default</Button>
            </div>
        );
    }

    line_color() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return ( 
            <div key={"line color"}
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="color"
                name="line color"
                value={this.props.recursive_piecing_settings.line_color}
                onChange={(event) => this.props.update_recursive_piecing_settings_element("line_color", event.target.value)}
                style={{
                    width: String(1.5*Number(this.props.settings.font_size))+"vmin",
                    height: String(Number(this.props.settings.font_size))+"vmin",
                    backgroundColor: this.props.settings.background_color,
                    border: "none"
                }}
                />
                <label htmlFor={"line color"}
                    style={{
                        fontSize: font_size,
                    }}
                > Line color </label>
                <Button 
                font_size={font_size}
                settings={this.props.settings}
                on_click={() => this.props.update_recursive_piecing_settings_element("line_color", getComputedStyle(document.documentElement).getPropertyValue("--black"))}
                >Default</Button>
            </div>
        );
    }

    max_line_thickness() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="max_line_thickness" name="max_line_thickness"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min={String(1.01*this.props.recursive_piecing_settings.max_line_thickness)}
                max="1.0"
                value={this.props.recursive_piecing_settings.max_line_thickness}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("max_line_thickness", Math.max(event.target.value, this.props.recursive_piecing_settings.max_line_thickness))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"max_line_thickness"}
                style={{
                    fontSize: font_size
                }}
            >
                Max thickness
            </label>
        </div>
        );
    }

    min_line_thickness() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="min_line_thickness" name="min_line_thickness"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min="0.0"
                max={String(0.99*this.props.recursive_piecing_settings.max_line_thickness)}
                value={this.props.recursive_piecing_settings.min_line_thickness}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("min_line_thickness", Math.min(event.target.value, this.props.recursive_piecing_settings.max_line_thickness))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"min_line_thickness"}
                style={{
                    fontSize: font_size
                }}
            >
                Min thickness
            </label>
        </div>
        );
    }

    adjust_line_thickness() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div
            key="line_thickness"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >   
            <div>
                Line thickness:
                </div>
                <input 
                type="range"
                min={this.props.recursive_piecing_settings.min_line_thickness}
                max={this.props.recursive_piecing_settings.max_line_thickness}
                step={0.00001}
                value={this.props.recursive_piecing_settings.line_thickness}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("line_thickness", event.target.value)}}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
            />
            </div>
        );
    }
    
    content() {
        if( this.props.project_settings.has_recursive_piecing ) {
            return [
                this.node_color(),
                this.line("line1"), 
                this.adjust_node_size(),
                this.min_node_size(),
                this.max_node_size(),
                this.line("line2"), 
                this.line_color(),
                this.line("line3"),
                this.adjust_line_thickness(),
                this.min_line_thickness(),
                this.max_line_thickness()
            ];
        } else {
            return [
                this.initialize()
            ];
        }
    }
}

export default RecursivePiecingOptionsBox;