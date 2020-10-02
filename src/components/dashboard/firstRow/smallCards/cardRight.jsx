import React, { Component } from "react";
import CustomCard from "../../../card/card";
import moment from "moment";
import { connect } from "react-redux";

import { heapUsage } from "../../../../redux/actions/USSD";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { round } from "../../../../helpers/roundNumber";

import "../../dashboard.scss";

const startDate = moment().subtract(1, "days").unix();

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

class CardRight extends Component {
    state = {
        heapUsage: [],
        loading: false
    };

    componentDidMount = () => {
        const { heapUsage } = this.props;
        heapUsage(startDate, moment().unix());
    };

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    static getDerivedStateFromProps(props) {
        return {
            heapUsage: props && props.listOfHeapRate,
            loading: props && props.loading
        };
    }

    render() {
        const { handleChange } = this.props;
        const { heapUsage, loading } = this.state;

        const mapIt = heapUsage.map((v) => v.values);

        const val = mapIt.slice(-1)[0];

        const valueOutputed = val && val[val.length - 1];

        const getValue = valueOutputed && valueOutputed.slice(1);

        return (
            <div onChange={handleChange} className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "95%", height: "95px" }}>
                    {loading && <Spin className="spin-position" indicator={antIcon} />}
                    <div className="text-ussd-center">
                        <div>
                            <p className="text-title">Heap used</p>
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
        listOfHeapRate,
        fetchHeapRate: { loading, message, errors }
    }
}) => ({
    listOfHeapRate,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { heapUsage })(CardRight);
