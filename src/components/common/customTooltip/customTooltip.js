import React from "react";
import moment from "moment";
import { round } from "../../../helpers/roundNumber";

import "./customizeTooltip.scss";

export const CustomTooltip = ({ active, payload, label, text, labelText, textRight }) => {
    if (active) {
        return (
            <div className="bg-tooltip">
                <p className="subscribers-by-channel-tooltip-label">
                    {labelText} {`${moment.unix(label).format("YYYY-MM-DD HH:mm:ss  ")}`}
                </p>
                <p className="subscribers-by-channel-tooltip-value">
                    {text} : {` ${payload && round(payload[0].value, 2)}`} {textRight}
                </p>
            </div>
        );
    }

    return null;
};

export const CustomTooltipPerformance = ({ active, payload, label, text, textLabel }) => {
    if (active) {
        return (
            <div className="bg-tooltip">
                <p className="subscribers-by-channel-tooltip-label">
                    {textLabel} : {label}
                </p>
                <p className="subscribers-by-channel-tooltip-value">
                    {text} : {payload}
                </p>
            </div>
        );
    }

    return null;
};
