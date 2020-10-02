import moment from "moment";

export const mapArrayToObject = (prop) => ({
    pv: prop && moment.unix(prop[0]).format("HH:mm:ss"),
    uv: prop && prop[1],
    name: prop && prop[0]
});

export const mapArrayPerformance = (prop) => ({
    pv: prop && prop.count,
    uv: prop && prop.count,
    name: prop && prop.hour
});

export const mapSuccessAndFailure = (prop) => ({
    pv: prop && prop.failure,
    uv: prop && prop.success,
    name: prop && prop.name
});

export const mapServiceCount = (prop) => prop && prop.count;

export const mapServiceName = (prop) => prop && prop.name;
