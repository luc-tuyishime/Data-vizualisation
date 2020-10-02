import React, { Component } from "react";
import CustomCard from "../../../card/card";
import { nonHeapUsage } from "../../../../redux/actions/USSD";
import moment from "moment";
import { connect } from "react-redux";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { round } from "../../../../helpers/roundNumber";

import "../../dashboard.scss";

const startDate = moment().subtract(1, "days").unix();

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

class CardRightLast extends Component {
    state = {
        nonHeapUsage: [],
        loading: false
    };

    componentDidMount = () => {
        const { nonHeapUsage } = this.props;
        nonHeapUsage(startDate, moment().unix());
    };

    static getDerivedStateFromProps(props) {
        return {
            nonHeapUsage: props && props.listOfNonHeapRate,
            loading: props && props.loading
        };
    }

    render() {
        const { handleChange } = this.props;
        const { nonHeapUsage, loading } = this.state;

        const mapIt = nonHeapUsage.map((v) => v.values);

        const val = mapIt.slice(-1)[0];

        const valueOutputed = val && val[val.length - 1];

        const getValue = valueOutputed && valueOutputed.slice(1);

        return (
            <div onChange={handleChange} className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "96%", height: "95px" }}>
                    <div className="text-ussd-center">
                        {loading && (
                            <Spin className="spin-position" indicator={antIcon} />
                        )}

                        <div>
                            <p className="text-title">Non-Heap used</p>
                            <p className="text-minute">{round(getValue, 2)}%</p>
                        </div>
                    </div>
                </CustomCard>
            </div>
        );
    }
}

const mapStateToProps = ({
    ussd: {
        listOfNonHeapRate,
        fetchNonHeapRate: { loading, message, errors }
    }
}) => ({
    listOfNonHeapRate,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { nonHeapUsage })(CardRightLast);
