import React from "react";

import "./sideBlueDiv.scss";
import LOGO from "../../../assets/whiteLogo.png";

const SideBlueDiv = () => (
    <div className="sidebluediv">
        <div className="bg-color">
            <img src={LOGO} alt="logo" className="center-vertically" />
        </div>
    </div>
);

export default SideBlueDiv;
