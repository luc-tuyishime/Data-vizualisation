import React, { Component } from "react";
import CustomCard from "../../../card/card";
import moment from "moment";
import { connect } from "react-redux";

import { getStartTime } from "../../../../redux/actions/USSD";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "../../dashboard.scss";

const startDate = moment().subtract(1, "days").unix();

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

class CardCenter extends Component {
    state = {
        startTime: [],
        loading: false
    };

    componentDidMount = () => {
        const { getStartTime } = this.props;
        getStartTime(startDate, moment().unix());
    };

    static getDerivedStateFromProps(props) {
        return {
            startTime: props && props.listOfStartTime,
            loading: props && props.loading
        };
    }

    render() {
        const { handleChange } = this.props;
        const { startTime, loading } = this.state;

        const mapIt = startTime.map((v) => v.values);

        const val = mapIt && mapIt[0];

        const firstArray = val && val[0];

        const startTimeValue = firstArray && firstArray[0];

        return (
            <div onChange={handleChange} className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "95%", height: "95px" }}>
                    <div className="text-ussd-center">
                        {loading && (
                            <Spin className="spin-position" indicator={antIcon} />
                        )}

                        <div>
                            <p className="text-title">Start time</p>
                            <p className="text-minute">
                                {moment
                                    .unix(startTimeValue)
                                    .format("YYYY-MM-DD HH:mm:ss")}
                            </p>
                        </div>
                    </div>
                </CustomCard>
            </div>
        );
    }
}

const mapStateToProps = ({
    ussd: {
        listOfStartTime,
        fetchStartTime: { loading, message, errors }
    }
}) => ({
    listOfStartTime,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { getStartTime })(CardCenter);
