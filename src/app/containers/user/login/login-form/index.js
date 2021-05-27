import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
const FormItem = Form.Item;

class LoginForm extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            type: "password",
            icon: "passowrd-hide"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({type: this.state.type === "text" ? "password" : "text"})
        this.setState({icon: this.state.icon === "passowrd-hide" ? "passowrd-show" : "passowrd-hide"})
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err){ 
                values.strategy = "local"
                values.origin = "delivery"
                this.props.onSubmit(values);
            }
            else
                console.error(err);
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form"   onSubmit={this.handleSubmit}>
                <FormItem >
                    {getFieldDecorator("email", {
                        rules: [{ required: true, message: "Please input your email!" }],
                    })(
                        <Input className="input-field" placeholder="Email Address" type="text"  name="loginMail"/>
                    )}
                </FormItem> 
                <FormItem className="m-large mb-0">
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your password!" }],
                    })(
                        <Input.Password className="input-field" type={this.state.type} placeholder="Password" id="loginPassword" />
                    )}
                </FormItem> 
                <div className="auth-alter">
                    <span className="forgot-text-block">
                        <Link className="light-text" to="/forgot-password">Forgot Password</Link>
                    </span>
                </div>
                <FormItem className="last-item form-btn-block"> 
                    <Button disabled={this.props.loading} loading={this.props.loading}  type="secondary" htmlType="submit" className="form-submit-btn">LOGIN</Button>
                </FormItem>
            </Form> 
        );
    }
}
const Login = Form.create()(LoginForm)

export default Login