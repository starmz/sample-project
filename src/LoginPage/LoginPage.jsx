import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { userActions } from '../_actions';
import "../assets/component-login.scss"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <article className="component-login d-flex justify-content-center my-5 mx-auto">
                <Card className="col-sm-11 col-md-6 col-lg-4 px-0">
                    <Card.Header>ورود به سامانه</Card.Header>
                    <Card.Body>
                        <Form name="form" onSubmit={this.handleSubmit}>

                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <Form.Group>
                                    <Form.Label htmlFor="username">پست الکترونیک / شماره همراه</Form.Label>
                                    <Form.Control dir="ltr" type="text" name="username" value={username} onChange={this.handleChange} />
                                </Form.Group>
                                {submitted && !username &&
                                    <div className="help-block text-danger">پست الکترونیک / شماره همراه اجباری است</div>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <Form.Group>
                                    <Form.Label htmlFor="password">کلمه عبور</Form.Label>
                                    <Form.Control dir="ltr" type="password" name="password" value={password} onChange={this.handleChange} />
                                </Form.Group>
                                {submitted && !password &&
                                    <div className="help-block text-danger">کلمه عبور اجباری است</div>
                                }
                            </div>
                            <footer>
                                <Button type="submit" variant="success" className="px-4">ورود</Button>
                                {loggingIn &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <Link to="/register" className="btn btn-link mx-2 px-4">حساب کاربری ندارید؟ ثبت نام کنید</Link>
                            </footer>
                        </Form>
                    </Card.Body>
                </Card>
            </article>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };