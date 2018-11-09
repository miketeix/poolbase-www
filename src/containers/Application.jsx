import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Switch } from 'react-router-dom';
import localforage from 'localforage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Sweetalert from 'sweetalert';

import { history } from '../lib/helpers';

// views
import EditProfile from '../components/views/EditProfile';
import SignIn from '../components/views/SignIn';
import SignUp from '../components/views/SignUp';
import Home from '../components/views/Home';
import Template from '../components/views/Template';

import ViewPool from '../components/views/ViewPool';
import CreatePool from '../components/views/CreatePool';
import EditPool from '../components/views/EditPool';
import Update from '../components/views/Update';
import ClosePool from '../components/views/ClosePool';
import Contribute from '../components/views/Contribute';
import Dashboard from '../components/views/Dashboard';
import Deploy from '../components/views/Deploy';
import ConfirmTokenBatch from '../components/views/ConfirmTokenBatch';

import NotFound from '../components/views/NotFound';

// components
import MainMenu from '../components/MainMenu';
import Loader from '../components/Loader';
import PrivateRoute from '../components/PrivateRoute';
import CurrentUserProtectedRoute from '../components/CurrentUserProtectedRoute';

// context providers
import UserProvider, { Consumer as UserConsumer } from '../contextProviders/UserProvider';

import '../lib/validators';

/* global document */
/**
 * Here we hack to make stuff globally available
 */
// Make sweet alert global
React.swal = Sweetalert;

// Construct a dom node to be used as content for sweet alert
React.swal.msg = reactNode => {
  const wrapper = document.createElement('span');
  ReactDOM.render(reactNode, wrapper);
  return wrapper.firstChild;
};

// make toast globally available
React.toast = toast;

/**
 * This container holds the application and its routes.
 * It is also responsible for loading application persistent data.
 * As long as this component is mounted, the data will be persistent,
 * if passed as props to children.
 */
class Application extends Component {
  constructor() {
    super();

    localforage.config({
      name: 'poolbase',
    });
  }

  render() {
    return (
      <Router history={history}>
        <UserProvider>
          <UserConsumer>
            {({
              state: { currentUser, isLoading, hasError },
              actions: { onSignIn, onSignOut },
            }) => (
              <div className="full-height">
                {isLoading && <Loader className="fixed" />}
                {!isLoading && !hasError && (
                  <div className="full-height">
                    <MainMenu onSignOut={onSignOut} currentUser={currentUser} />
                    <section className="page-layout">
                      <Switch>
                        {/* Routes are defined here. Persistent data is set as props on components
                    NOTE order matters, wrong order breaks routes!
                 */}
                        <Route
                          exact
                          path="/pools/create"
                          render={props => <CreatePool currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/pools/:poolId"
                          render={props => <ViewPool currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/pools/:poolId/edit"
                          render={props => <EditPool currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/pools/:poolId/update"
                          render={props => <Update currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/pools/:poolId/payout"
                          render={props => <ClosePool currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/pools/:poolId/contribute"
                          render={props => <Contribute currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/pools/:poolId/confirmTokenBatch"
                          render={props => (
                            <ConfirmTokenBatch currentUser={currentUser} {...props} />
                          )}
                        />
                        <Route
                          exact
                          path="/pools/:poolId/pendingTx"
                          render={props => <Deploy currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/contributions/:contributionId/pendingTx"
                          render={props => <Deploy currentUser={currentUser} {...props} />}
                        />
                        <Route
                          exact
                          path="/dashboard"
                          render={props => <Dashboard currentUser={currentUser} {...props} />}
                        />
                        <Route exact path="/template" render={props => <Template {...props} />} />
                        <CurrentUserProtectedRoute
                          exact
                          path="/signin"
                          currentUser={currentUser}
                          render={props => <SignIn onSignIn={onSignIn} {...props} />}
                        />
                        <CurrentUserProtectedRoute
                          exact
                          path="/signup"
                          currentUser={currentUser}
                          render={props => <SignUp onSignIn={onSignIn} {...props} />}
                        />
                        <PrivateRoute
                          exact
                          path="/profile"
                          currentUser={currentUser}
                          render={props => (
                            <EditProfile currentUser={currentUser} onSignIn={onSignIn} {...props} />
                          )}
                        />
                        <Route
                          exact
                          path="/"
                          render={props => <Home currentUser={currentUser} {...props} />}
                        />

                        <Route component={NotFound} />
                      </Switch>
                    </section>
                  </div>
                )}

                {!isLoading && hasError && (
                  <center>
                    <h2>Oops, something went wrong...</h2>
                    <p>Poolbase could not load for some reason. Please try again...</p>
                  </center>
                )}

                <ToastContainer
                  position="top-right"
                  type="default"
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  pauseOnHover
                />
              </div>
            )}
          </UserConsumer>
        </UserProvider>
      </Router>
    );
  }
}

export default Application;
