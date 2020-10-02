import React from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { Row, Col } from "antd";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";

import "../menu.scss";

import BURGERICON from "../../../assets/burger.svg";
import "../../../pages/authentication/authentication.scss";
import "../../userGuide/profile.scss";

const style = {
    border: "1px solid #f5f5f5",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: ".5rem",
    backgroundColor: "#fafafa",
    cursor: "move",
    width: "65%"
};

const cardSource = {
    beginDrag(props) {
        return {
            position: props.position,
            index: props.index
        };
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

class Card extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        position: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired
    };

    render() {
        const {
            text,
            position,
            isDragging,
            connectDragSource,
            connectDropTarget
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(
                    <div className="center-draggable-cards" style={{ ...style, opacity }}>
                        <Row>
                            <Col span={15}>
                                <div>
                                    <Row>
                                        <Col span={4}>
                                            <div className="bg-rounded-profile">
                                                {position}
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <div className="password-container">
                                                <p className="profile-text-setting-ussd">
                                                    {text}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={3} offset={6}>
                                <div style={{ float: "right" }}>
                                    <img className="" src={BURGERICON} alt="logo" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            )
        );
    }
}

export default flow(
    DragSource("card", cardSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    })),
    DropTarget("card", cardTarget, (connect) => ({
        connectDropTarget: connect.dropTarget()
    }))
)(Card);
