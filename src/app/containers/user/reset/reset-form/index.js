import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import notification from "../../../../components/notification";
const FormItem = Form.Item;

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err){
                if(values.password !== values.confirmPassword) {
                    notification("error", "Your New Password and Confirm Password do not match");
                    return;
                }
                this.props.onSubmit(values);
            }
            else
                console.error(err);
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="common-form wrap-auth-form"  onSubmit={this.handleSubmit}>   
                <FormItem>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your new password!" }],
                    })(
                        <Input placeholder="Enter new password" type="password"/>
                    )}
                </FormItem>    
                <FormItem>
                    {getFieldDecorator("confirmPassword", {
                        rules: [{ required: true, message: "Please confirm your new password!" }],
                    })(
                        <Input placeholder="Enter confirm password" type="password"/>
                    )}
                </FormItem>     
                <Button type="primary" disabled={this.props.loading} loading={this.props.loading}   className="form-submit-btn"  htmlType="submit">RESET PASSWORD</Button>
            </Form> 
        );
    }
}
const resetPassword = Form.create()(ResetPasswordForm);
export default resetPassword;







