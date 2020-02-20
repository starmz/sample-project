import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Home, HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert, authentication } = this.props;
        return (
            <div className="app">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Navbar bg="light" variant="dark">
                        <Navbar.Brand href="#home">
                            {/* <img
                                alt=""
                                src="/logo.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            /> */}
                            <h4 className="text-dark">Core Trading System</h4>
                        </Navbar.Brand>
                        <Nav className="mr-auto">
                            {!authentication.loggedIn &&
                                <Link className="text-dark" to="/register">
                                    ثبت نام
                            </Link>
                            }
                            {!authentication.loggedIn &&
                                <Link className="text-dark mx-4" to="/login">
                                    ورود
                            </Link>
                            }
                              {authentication.loggedIn &&
                                <Link className="text-dark" to="/register">
                                    درباره ما
                            </Link>
                            }
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute exact path="/homepage" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    const { alert, authentication } = state;
    return { alert, authentication };
}

const actionCreators = {
    clearAlerts: alertActions.clear
}

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };