import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Doughnut } from "react-chartjs-2";
import { mapServiceCount, mapServiceName } from "../../../helpers/changeArrayToObject";
import { serviceDistribution } from "../../../redux/actions/USSD";
import "../../dashboard/dashboard.scss";
import "../menu.scss";

const labelsStatic = ["Traffic fines", "Mutuelles"];
const allDataStatic = [10, 35];

class ServiceDistribution extends Component {
    state = {
        allData: [],
        labels: []
    };

    static getDerivedStateFromProps(props) {
        const finalArray = props && props.listOfServiceDistribution.map(mapServiceCount);
        let finalLabels = props && props.listOfServiceDistribution.map(mapServiceName);
        return {
            allData: finalArray,
            labels: finalLabels
        };
    }

    componentDidUpdate() {
        serviceDistribution(this.state.allData);
    }

    render() {
        const { allData, labels } = this.state;
        console.log("Data ==>>>", allData);
        const data = {
            labels: labels.length > 0 ? labels : labelsStatic,
            datasets: [
                {
                    data: allData.length > 0 ? allData : allDataStatic,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#827717",
                        "#673ab7",
                        "#1a237e",
                        "#ff1744",
                        "#00897b",
                        "#00b8d4",
                        "#c6ff00",
                        "#ffeb3b",
                        "#e65100",
                        "#4e342e",
                        "#9e9e9e"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#827717",
                        "#673ab7",
                        "#1a237e",
                        "#ff1744",
                        "#00897b",
                        "#00b8d4",
                        "#c6ff00",
                        "#ffeb3b",
                        "#e65100",
                        "#4e342e",
                        "#9e9e9e"
                    ]
                }
            ]
        };

        return (
            <div id="chart" className="menu-manaagement">
                <div className="pie-chart">
                    <span className="text-serve-card">Services Distribution</span>
                    <p className="date-text-">Daily</p>
                </div>
                {allData.length > 0 || labels.length > 0 ? (
                    <Doughnut width={200} height={150} data={data} />
                ) : (
                    <div className="data-empty">
                        <Spin tip="Loading...">
                            <Doughnut width={200} height={150} data={data} />
                        </Spin>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ ussd: { listOfServiceDistribution } }) => ({
    listOfServiceDistribution
});

export default connect(mapStateToProps, { serviceDistribution })(ServiceDistribution);
