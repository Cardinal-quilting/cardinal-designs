import { Component } from "react";

class RecursivePiecingNode extends Component {
    has_clicked_node(clickX, clickY) {
        const diffx = this.props.x - clickX, diffy = this.props.y - clickY;
        const scale = Math.min(this.props.project_height, this.props.project_width);
        return Math.sqrt(diffx*diffx + diffy*diffy)<this.props.size/(2.0*scale);
    }

    render() {
        const size = String(this.props.size) + "px"

        return (
            <div
                style={{
                    borderRadius: "100%",
                    width: size, 
                    height: size,
                    backgroundColor: this.props.color,
                    position: "absolute",
                    transform: `translate(${this.props.x*this.props.project_width-this.props.size/2}px, 
                            ${this.props.y*this.props.project_height-this.props.size/2}px)`,                                            
                }}
                onMouseDown={this.props.on_mouse_down}
            />
        );
    }
}

export default RecursivePiecingNode;