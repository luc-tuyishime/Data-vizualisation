import React, { Component } from 'react';
import { connect } from 'react-redux';
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ussdActionsTypes } from './redux/actions-types';
// import UssdPerformanceWebsocket from './components/websocket/ussdPerformance';
import store from './redux/store';

import routes from './routes';
import NotFoundPage from './pages/NotFoundPage';
import { serviceDistribution } from './redux/actions/USSD';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/actions/user/get';

const { REACT_APP_IREMBO_USSD_WEB_SOCKET } = process.env;

class App extends Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
      const { setCurrentUser, serviceDistribution } = this.props;
      serviceDistribution();

      this.onMessageReceive = (msg) => {
        store.dispatch({
          type: ussdActionsTypes.GET_SERVICE_DISTRIBUTION,
          payload: msg
        });
      };

      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot((Snapshot) => {
            setCurrentUser({
              id: Snapshot.id,
              ...Snapshot.data() // to get the data from the user property.
            });
          });
        }
        setCurrentUser(userAuth);
      });
    }

    // close subscription when unmount
    componentWillUnmount() {
      this.unsubscribeFromAuth();
    }

    sendMessage = (msg) => {
      this.clientRef.sendMessage('/topic/services', msg);
    };

    render() {
      const { currentUser } = this.props;
      return (
            <div>
                <div>
                    <SockJsClient
                        url={REACT_APP_IREMBO_USSD_WEB_SOCKET}
                        // onConnect={console.log('Connection established.!')}
                        subscribeHeader={null}
                        topics={['/topic/services']}
                        onMessage={(msg) => this.onMessageReceive(msg)}
                        ref={(client) => {
                          this.clientRef = client;
                        }}
                    />
                </div>
                <Router>
                    {/* <UssdPerformanceWebsocket /> */}
                    <Switch>
                        {routes.map((route) => (
                            <Route
                                key={route.name}
                                exact
                                path={route.path}
                                protected={route.protected}
                                render={(props) => {
                                  document.title = route.name;
                                  return (
                                    (route.protected && !currentUser && (
                                            <Redirect to="/" />
                                    )) || (
                                            <route.component
                                                location={props.location}
                                                history={props.history}
                                                match={props.match}
                                            />
                                    )
                                  );
                                }}></Route>
                        ))}
                        <Route path="*" exact component={NotFoundPage} />
                    </Switch>
                </Router>
            </div>
      );
    }
}

App.propTypes = {
  currentUser: PropTypes.object,
  serviceDistribution: PropTypes.func,
  setCurrentUser: PropTypes.func
};

export const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  serviceDistribution: () => dispatch(serviceDistribution)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
