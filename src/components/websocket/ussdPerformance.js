import React, { Component } from 'react';
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import { ussdActionsTypes } from '../../redux/actions-types';
import { performance } from '../../redux/actions/USSD';
import store from '../../redux/store';

const { REACT_APP_IREMBO_USSD_WEB_SOCKET } = process.env;

class UssdPerformanceWebsocket extends Component {
    componentDidMount = () => {
      const { performance } = this.props;
      performance();
      this.onMessageReceive = (msg) => {
        // console.log('SOCKET PERFORMANCE =>>>', msg);
        if (msg) {
          store.dispatch({
            type: ussdActionsTypes.GET_PERFORMANCE,
            payload: msg
          });
        }
      };
    };

    sendMessage = (msg) => {
      this.clientRef.sendMessage('/app/performance', msg);
    };

    render() {
      return (
            <div className="header">
                <SockJsClient
                    url={REACT_APP_IREMBO_USSD_WEB_SOCKET}
                    // onConnect={console.log('Connection established Performance socket!')}
                    topics={['/topic/performance']}
                    onMessage={(msg) => this.onMessageReceive(msg)}
                    ref={(client) => {
                      this.clientRef = client;
                    }}
                />
            </div>
      );
    }
}

UssdPerformanceWebsocket.propTypes = { performance: PropTypes.func };

export default connect(null, { performance })(UssdPerformanceWebsocket);
