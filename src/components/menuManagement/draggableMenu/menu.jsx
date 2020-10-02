import React, { Component } from "react";
import Card from "./card";
import { connect } from "react-redux";
import { Spin } from "antd";
import { getMenu, sortMenu, postMenu } from "../../../redux/actions/menuManagement";

import "../menu.scss";

const update = require("immutability-helper");

let updatedState;

class Grid extends Component {
    state = {
        cards: [],
        movedCard: {},
        loading: false,
        loadingMenu: false,
        messageMenu: "",
        visibility: false,
        disabled: false
    };

    componentDidMount = () => {
        const { getMenu } = this.props;
        getMenu();
    };

    handleClose = () => {
        this.setState({
            visibility: false
        });
    };

    static getDerivedStateFromProps(props) {
        return {
            cards: props && props.listOfMenu,
            loading: props && props.loading,
            loadingMenu: props && props.loadingMenu,
            messageMenu: props && props.messageMenu
        };
    }

    moveCard = (dragIndex, hoverIndex) => {
        const { cards, movedCard } = this.state;
        const { sortMenu, postMenu, getMenu } = this.props;

        const dragCard = cards[dragIndex];

        updatedState = update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        });

        console.log("updatedState :>> ", updatedState.cards[dragIndex]);
        console.log("dragCard", dragCard);

        let index = dragIndex;
        updatedState.cards.find((value, i) => {
            return value.title === dragCard.title ? (index = i + 1) : "";
        });

        sortMenu(updatedState.cards);
        this.setState((prevState) => ({
            ...prevState,
            movedCard: { positionTo: index, positionFrom: dragCard.position }
        }));

        console.log("Position from :>> ", movedCard.positionFrom);
        console.log("Position to :>> ", movedCard.positionTo);

        const { ...formData } = movedCard;

        if (postMenu(formData)) {
            setTimeout(() => getMenu(), 3000);
        }
    };

    componentDidUpdate = (prevProps) => {
        console.log("prevProps :>> ", prevProps);
        console.log("this.state :>> ", this.state);
    };

    render() {
        const { cards, loading } = this.state;

        return (
            <div className="card-container menu-manaagement">
                <p className="text-drag-drop">
                    Drag and Drop to change the order of the menus
                </p>

                {loading ? (
                    <div className="spin-menu-container">
                        <Spin size="large" />
                    </div>
                ) : (
                    cards.map((card, i) => {
                        return (
                            <Card
                                key={card.position}
                                index={i}
                                position={i + 1}
                                text={card.title}
                                moveCard={this.moveCard}
                            />
                        );
                    })
                )}
            </div>
        );
    }
}

const mapStateToProps = ({
    ussd: {
        listOfMenu,
        fetchMenu: { loading, message, errors },
        postMenu: { loading: loadingMenu, message: messageMenu, errors: errorsMenu }
    }
}) => ({
    listOfMenu,
    loading,
    message,
    errors,
    loadingMenu,
    messageMenu,
    errorsMenu
});

export default connect(mapStateToProps, { getMenu, sortMenu, postMenu })(Grid);
