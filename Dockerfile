FROM nginx:1.15.2-alpine	

COPY ./build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENV REACT_APP_PROMETHEUS_BASE_URL=https://irembo-monitoring.oltranz.com \
    REACT_APP_USSD_BASE_URL=https://irembo-ussd-app.oltranz.com \
    REACT_APP_PROMETHEUS_DURATION_GRAPH_QUERY=(sum(rate(http_server_requests_seconds_sum{app="irembo-ussd-app",  status!~"5.."}[1m]))/sum(rate(http_server_requests_seconds_count{app="irembo-ussd-app",status!~"5.."}[1m])))*1000 \
    REACT_APP_PROMETHEUS_ERRORS_GRAPH_QUERY=sum(rate(http_server_requests_seconds_count{app="irembo-ussd-app",status=~"5.."}[1m])) \
    REACT_APP_PROMETHEUS_HEAP_USED_GRAPH_QUERY=sum(jvm_memory_used_bytes{app="irembo-ussd-app",area="heap"})*100/sum(jvm_memory_max_bytes{app="irembo-ussd-app", area="heap"}) \
    REACT_APP_PROMETHEUS_NON_HEAP_USED_GRAPH_QUERY=sum(jvm_memory_used_bytes{app="irembo-ussd-app",area="nonheap"})*100/sum(jvm_memory_max_bytes{app="irembo-ussd-app", area="nonheap"}) \
    REACT_APP_PROMETHEUS_RATE_GRAPH_QUERY=sum(rate(http_server_requests_seconds_count{app="irembo-ussd-app"}[1m])) \
    REACT_APP_PROMETHEUS_START_TIME_QUERY=process_start_time_seconds{app="irembo-ussd-app"}*1000 \
    REACT_APP_PROMETHEUS_UPTIME_QUERY=process_uptime_seconds{app="irembo-ussd-app"} \
    REACT_APP_IREMBO_USSD_WEB_SOCKET=https://irembo-ussd-app.oltranz.com/irembo/ussdapp/ws

ENTRYPOINT ["nginx","-g","daemon off;"]