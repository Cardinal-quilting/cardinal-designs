import OptionsBox from "js/infrastructure/options-box";

class TreeSettingsOptionsBox extends OptionsBox {
    adjust_tree_node_size() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div
            key="tree_node_size"
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
                min={this.props.recursive_piecing_settings.min_tree_node_size}
                max={this.props.recursive_piecing_settings.max_tree_node_size}
                step={0.00001}
                value={this.props.recursive_piecing_settings.tree_node_size}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("tree_node_size", event.target.value)}}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
            />
            </div>
        );
    }

    max_tree_node_size() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="tree_node_size_max" name="tree_node_size_max"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min={String(1.01*this.props.recursive_piecing_settings.min_tree_node_size)}
                max="1.0"
                value={this.props.recursive_piecing_settings.max_tree_node_size}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("max_tree_node_size", Math.max(event.target.value, this.props.recursive_piecing_settings.min_tree_node_size))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"tree_node_size_max"}
                style={{
                    fontSize: font_size
                }}
            >
                Max size
            </label>
        </div>
        );
    }

    min_tree_node_size() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="tree_node_size_min" name="tree_node_size_min"
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
                max={String(0.99*this.props.recursive_piecing_settings.max_tree_node_size)}
                value={this.props.recursive_piecing_settings.min_tree_node_size}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("min_tree_node_size", Math.min(event.target.value, this.props.recursive_piecing_settings.max_tree_node_size))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"tree_node_size_min"}
                style={{
                    fontSize: font_size
                }}
            >
                Min size
            </label>
        </div>
        );
    }

    adjust_tree_line_thickness() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div
            key="tree_line_thickness"
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
                min={this.props.recursive_piecing_settings.min_tree_line_thickness}
                max={this.props.recursive_piecing_settings.max_tree_line_thickness}
                step={0.00001}
                value={this.props.recursive_piecing_settings.tree_line_thickness}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("tree_line_thickness", event.target.value)}}
                style={{
                    width: String(0.9*this.props.width)+"vw"
                }}
            />
            </div>
        );
    }

    max_tree_line_thickness() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="max_tree_line_thickness" name="max_tree_line_thickness"
            style={{
                color: this.props.settings.font_color,
                accentColor: this.props.settings.accent_background_color,
                fontSize: font_size,
            }}
            >
                <input
                type="number"
                step="0.001"
                min={String(1.01*this.props.recursive_piecing_settings.max_tree_line_thickness)}
                max="1.0"
                value={this.props.recursive_piecing_settings.max_tree_line_thickness}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("max_tree_line_thickness", Math.max(event.target.value, this.props.recursive_piecing_settings.min_line_thickness))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"max_tree_line_thickness"}
                style={{
                    fontSize: font_size
                }}
            >
                Max thickness
            </label>
        </div>
        );
    }

    min_tree_line_thickness() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="min_tree_line_thickness" name="min_tree_line_thickness"
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
                value={this.props.recursive_piecing_settings.min_tree_line_thickness}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("min_tree_line_thickness", Math.min(event.target.value, this.props.recursive_piecing_settings.max_tree_line_thickness))}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"min_tree_line_thickness"}
                style={{
                    fontSize: font_size
                }}
            >
                Min thickness
            </label>
        </div>
        );
    }

    selected_tree_node_scale() {
        const font_size = String(this.props.settings.small_font_size)+"vmin";

        return (
            <div key="selected_tree_node_scale" name="selected_tree_node_scale"
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
                value={this.props.recursive_piecing_settings.selected_tree_node_scale}
                onChange={(event) => {this.props.update_recursive_piecing_settings_element("selected_tree_node_scale", event.target.value)}}
                style={{
                width: String(2.25*Number(this.props.settings.font_size))+"vmin",
                fontSize: font_size,
                color: this.props.settings.font_color,
                backgroundColor: this.props.settings.background_color,
                }}
            />
            <label htmlFor={"selected_tree_node_scale"}
                style={{
                    fontSize: font_size
                }}
            >
                Selected node scale
            </label>
        </div>
        );
    }

    content() {
        return [
            this.adjust_tree_node_size(),
            this.max_tree_node_size(),
            this.min_tree_node_size(),
            this.line("line1"),
            this.selected_tree_node_scale(),
            this.line("line2"),
            this.adjust_tree_line_thickness(),
            this.max_tree_line_thickness(),
            this.min_tree_line_thickness()
        ];
    }
}

export default TreeSettingsOptionsBox;