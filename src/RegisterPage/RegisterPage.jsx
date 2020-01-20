import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../assets/component-login.scss"

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <article className="component-login d-flex justify-content-center my-5 mx-auto">
                <Card className="col-sm-12 col-md-6 col-lg-4 px-0">
                    <Card.Header>ثبت‌نام در سامانه</Card.Header>
                    <Card.Body>
                        <Form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                <Form.Group>
                                    <Form.Label htmlFor="firstName">نام</Form.Label>
                                    <Form.Control type="text" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                    {submitted && !user.firstName &&
                                        <div className="help-block text-danger">نام اجباری است</div>
                                    }
                                </Form.Group>
                            </div>
                            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                <Form.Group>
                                    <Form.Label htmlFor="lastName">نام خانوادگی</Form.Label>
                                    <Form.Control type="text" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                    {submitted && !user.lastName &&
                                        <div className="help-block text-danger">نام خانوادگی اجباری است</div>
                                    }
                                </Form.Group>
                            </div>
                            <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                <Form.Group>
                                    <Form.Label htmlFor="username">پست الکترونیک / شماره همراه</Form.Label>
                                    <Form.Control type="text" name="username" value={user.username} onChange={this.handleChange} />
                                    {submitted && !user.username &&
                                        <div className="help-block text-danger">پست الکترونیک / شماره همراه اجباری است</div>
                                    }
                                </Form.Group>
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <Form.Group>
                                    <Form.Label htmlFor="password">کلمه عبور</Form.Label>
                                    <Form.Control type="password" name="password" value={user.password} onChange={this.handleChange} />
                                    {submitted && !user.password &&
                                        <div className="help-block text-danger">کلمه عبور تکراری است</div>
                                    }
                                </Form.Group>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success px-4">ثبت‌نام</button>
                                {registering &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <Link to="/login" className="btn btn-link mx-2 px-4">حساب کاربری دارید؟ وارد شوید</Link>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </article>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };