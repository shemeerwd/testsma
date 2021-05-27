import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Alert } from "antd";
const FormItem = Form.Item;

class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) 
                this.props.onSubmit(values);
            else
                console.error(err);
        });
    }
    render() {

        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="common-form wrap-auth-form"  onSubmit={this.handleSubmit}>  
                <div className="steps-content">
                    <FormItem>
                        {getFieldDecorator("email", {
                            rules: [
                                { required: true, message: "Please input your Email ID!" },
                                { type: "email", message: "Please input a valid email!" }
                            ],
                            initialValue: this.props.failedUser && this.props.failedUser.email,
                        })(
                            <Input placeholder="Email-ID"/>
                        )}
                    </FormItem>    
                </div>    
                <div className="steps-action">
                    <Button type="primary" disabled={this.props.loading} loading={this.props.loading}  className="form-submit-btn"  htmlType="submit">FORGOT PASSWORD</Button>
                </div>   
                <div>
                    {this.props.resetAlertMsg ? 
                        <Alert type='info' message={this.props.resetAlertMsg} closable onClose={this.props.resetAlertClose} />  
                        : null}
                </div>        
            </Form> 
        );
    }
}

const forgotPassword = Form.create()(ForgotPasswordForm);
export default forgotPassword



