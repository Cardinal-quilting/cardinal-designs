import { Component } from "react";

class TreeNode extends Component {
    render() {
        return (
            <div
                style={{
                    borderRadius: "100%",
                    width: `${this.props.size}px`,
                    height: `${this.props.size}px`,
                    backgroundColor: this.props.color,
                    position: "absolute",
                    transform: `translate(${this.props.x*this.props.project_width-this.props.size/2}px, 
                            ${this.props.y*this.props.project_height-this.props.size/2}px)`, 
                }}
            />
        );
    }
}

export default TreeNode;