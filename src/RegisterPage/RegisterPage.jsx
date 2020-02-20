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
                username: '',
                password: ''
            },
            submitted: false,
            isPinForm: false,
            pinCode: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSendOtp = this.handleSendOtp.bind(this);
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
        if (user.username && user.password) {
            this.props.register(user);
        }
    }

    handleSendOtp(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.username && user.password) {
            this.props.register(user);
            this.setState({ isPinForm: true });
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted, isPinForm, pinCode } = this.state;
        return (
            <article className="component-login d-flex justify-content-center my-5 mx-auto">
                <Card className="col-sm-12 col-md-6 col-lg-4 px-0">
                    <Card.Header>ثبت‌نام در سامانه</Card.Header>
                    <Card.Body>
                        {isPinForm &&
                            <PinForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} submitted={submitted} pinCode={pinCode}/>
                        }
                        {!isPinForm &&
                           <PhoneNmberForm handleChange={this.handleChange} handleSendOtp={this.handleSendOtp} submitted={submitted} user={user}/>
                        }
                    </Card.Body>
                </Card>
            </article>
        );
    }
}

function PinForm(props) {
    const { handleChange, handleSubmit, submitted, pinCode } = props
    return <Form name="form" onSubmit={handleSubmit}>
        <div className={'form-group' + (submitted && !pinCode ? ' has-error' : '')}>
            <Form.Group>
                <Form.Label htmlFor="username">کد ارسال شده را وارد کنید</Form.Label>
                <Form.Control type="text" name="username" value={pinCode} onChange={handleChange} />
                {submitted && !pinCode &&
                    <div className="help-block text-danger">وارد کردن کد اجباری است</div>
                }
            </Form.Group>
        </div>
    </Form>
}

function PhoneNmberForm(props) {
    const { handleChange, handleSendOtp, submitted, user } = props
    return <Form name="form" onSubmit={handleSendOtp}>
        <div className={'form-group' + (!user.username ? ' has-error' : '')}>
            <Form.Group>
                <Form.Label htmlFor="username">پست الکترونیک / شماره همراه</Form.Label>
                <Form.Control type="text" name="username" value={user.username} onChange={handleChange} />
                {submitted && !user.username &&
                    <div className="help-block text-danger">پست الکترونیک / شماره همراه اجباری است</div>
                }
            </Form.Group>
        </div>
        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
            <Form.Group>
                <Form.Label htmlFor="password">کلمه عبور</Form.Label>
                <Form.Control type="password" name="password" value={user.password} onChange={handleChange} />
                {submitted && !user.password &&
                    <div className="help-block text-danger">کلمه عبور تکراری است</div>
                }
            </Form.Group>
        </div>
        <div className="form-group">
            <button className="btn btn-success px-4">ثبت‌نام</button>
            <Link to="/login" className="btn btn-link mx-2 px-4">حساب کاربری دارید؟ وارد شوید</Link>
        </div>
    </Form>
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