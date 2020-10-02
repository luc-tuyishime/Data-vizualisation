import 'dotenv/config';

const { REACT_APP_URL_BACKEND } = process.env;

export function memoryURL(startDate, endDate) {
  return `${REACT_APP_URL_BACKEND}/api/v1/query_range?query=sum(container_memory_working_set_bytes{pod=~".*irembo-ussd-agent.*",container!=""})&start=${startDate}&end=${endDate}&step=1m`;
}

export function applicationCPU(startDate, endDate) {
  return `${REACT_APP_URL_BACKEND}/api/v1/query_range?query=sum(node_namespace_pod_container:container_cpu_usage_seconds_total:sum_rate{container!="",pod=~".*irembo-ussd-agent.*"})&start=${startDate}&end=${endDate}&step=1m`;
}

export function latencyInSeconde(startDate, endDate) {
  return `${REACT_APP_URL_BACKEND}/api/v1/query_range?query=sum(rate(http_server_requests_seconds_sum{app=~".*irembo-ussd-agent.*",env="dev",status!~"5.."}[1m])/rate(http_server_requests_seconds_count{status!~"5..",app=~".*irembo-ussd-agent.*",env="dev"}[1m])>0)&start=${startDate}&end=${endDate}&step=1m`;
}

export function requestPerMinutes(startDate, endDate) {
  return `${REACT_APP_URL_BACKEND}/api/v1/query_range?query=sum((rate(http_server_requests_seconds_count{app=~".*irembo-ussd-agent.*",env="dev"}[1m])>0)*60)&start=${startDate}&end=${endDate}&step=1m`;
}
