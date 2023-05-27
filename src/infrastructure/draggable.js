import { Component } from 'react';

/** 
 * Provides an interface to click on a parent object and drag the mouse.
 * @prop {float} props.pos.x - The current x position of the object
 * @prop {float} props.pos.y - The current y position of the object
 * @prop {function} props.get_display_info - Get information about the project display window
 * @prop {function} props.set_position - Pass the new position to the object being dragged
 * @prop {bool} props.enabled=true - The dragging feature is enabled
 * @prop {bool} state.dragging - Are we currently dragging the object?
 * @prop {float} state.start_move.pixel.x - The x pixel location where we started dragging (relative to the bottom left of the project display window)
 * @prop {float} state.start_move.pixel.y - The y pixel location where we started dragging (relative to the bottom left of the project display window)
 * @prop {float} state.start_move.pos.x - The x position of the object when we started dragging (0, 0) is the bottom left of the project display window)
 * @prop {float} state.start_move.pos.y - The y position of the object when we started dragging (0, 0) is the bottom left of the project display window)
*/
class Draggable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false
        }

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    static defaultProps = {
        enabled: true
    }

    /**
     * When we start dragging the object, add listeners for mouse movement and mouse up. When we stop dragging, remove the listeners.
     * @param prevProps The props before updating.
     * @param prevState The state before updating.
     */
    componentDidUpdate(prevProps, prevState) {
        if( this.state.dragging && !prevState.dragging ) {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        } else if( !this.state.dragging && prevState.dragging ) {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
    }

    /**
     * When we click the object, store the click position (in pixels) and the start position of the object.
     * @param event The click event.
     */
    onMouseDown(event) {
        // only left mouse
        if( event.button!==0 | !this.props.enabled ) { return; }

        // get information about the project display (importantly, location)
        const display = this.props.get_display_info();

        // set the state to dragging with the initial position information
        this.setState({
           dragging: true, 
           start_move: {
                pixel: {
                    x: event.screenX - display.left,
                    y: event.screenY - display.top
                },
                pos: {
                    x: this.props.pos.x,
                    y: this.props.pos.y
                }
           }
        });

        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Drag the object when the user moves their mouse.
     * @param {*} event The mouse click event.
     */
    onMouseMove(event) {
        // only left mouse
        if( event.button!==0 ) { return; }

        // get information about the project display (importantly, location)
        const display = this.props.get_display_info();

        // figure out how far we have moved our mouse 
        var xmove = (event.screenX - display.left - this.state.start_move.pixel.x)/(display.right-display.left);
        var ymove = (event.screenY - display.top - this.state.start_move.pixel.y)/(display.top-display.bottom);

        // deterine the new location of the object
        xmove += this.state.start_move.pos.x;
        ymove += this.state.start_move.pos.y;

        // keep the object in bounds
        xmove = Math.min(1.0, Math.max(0.0, xmove));
        ymove = Math.min(1.0, Math.max(0.0, ymove));
        
        // set the position of the parent object
        this.props.set_position(xmove, ymove);

        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * When the user unclicks, set dragging to false.
     * @param event The mouse click event.
     */
    onMouseUp(event) {
        // only left mouse
        if( event.button!==0 ) { return; }

        this.setState({
            dragging: false
        });

        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * @returns A wrapper around the child object that allows it to be dragged
     */
    render() {
        return (
            <div
                onMouseDown = {this.onMouseDown}
            >
            {this.props.children}
            </div>
        );
    }
}

export default Draggable;