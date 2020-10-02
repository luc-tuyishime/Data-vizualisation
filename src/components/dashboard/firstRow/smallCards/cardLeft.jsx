import React, { Component } from "react";
import CustomCard from "../../../card/card";
import moment from "moment";
import { connect } from "react-redux";
import { getUptime } from "../../../../redux/actions/USSD";
import { convertSecondsTodaysOrMinutes } from "../../../../helpers/convertSecondToDaysOrMinutes";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "../../dashboard.scss";

const startDate = moment().subtract(1, "days").unix();

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

let outputedUptime;

class CardLeft extends Component {
    state = {
        uptime: [],
        loading: false
    };

    componentDidMount = () => {
        const { getUptime } = this.props;
        getUptime(startDate, moment().unix());
    };

    static getDerivedStateFromProps(props) {
        return {
            uptime: props && props.listOfUptime,
            loading: props && props.loading
        };
    }

    render() {
        const { handleChange } = this.props;
        const { uptime, loading } = this.state;

        const mapIt = uptime.map((v) => v.values);

        const valueOutputed = mapIt && mapIt[mapIt.length - 1];

        const getValue = valueOutputed && valueOutputed.shift();

        if (getValue) {
            outputedUptime = getValue && getValue[1];
        }

        return (
            <div onChange={handleChange} className="dashboard">
                <CustomCard
                    className="card-style padding-small-card"
                    style={{ width: "95%", height: "95px" }}>
                    {loading && <Spin className="spin-position" indicator={antIcon} />}
                    <div className="text-ussd-center">
                        <div>
                            <p className="text-title">Uptime</p>
                            <p className="text-minute">
                                {convertSecondsTodaysOrMinutes(outputedUptime)}
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
        listOfUptime,
        fetchUptime: { loading, message, errors }
    }
}) => ({
    listOfUptime,
    loading,
    message,
    errors
});

export default connect(mapStateToProps, { getUptime })(CardLeft);
