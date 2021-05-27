import React from "react";
import {Modal, Form, Input} from "antd";
const FormItem = Form.Item;
const CreateFormWrapper = Form.create()(ChangePasswordForm);

export default class ChangePassword extends React.Component {
  state = {
      visible: false
  }
  open() {
      this.showModal();
      return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
      });
  }
  showModal() {
      this.setState({visible: true});
  }

  cancelModal() {
      this.setState({visible: false});
      const form = this.form;
      form.resetFields();
  }
  handleSubmit() {
      const form = this.form;
      form.validateFields((err, values) => {
          if(err) return;
          form.resetFields();
          this.setState({visible: false});
          this.resolve(values);
      });
  }
  compareToFirstPassword(rule, value, callback){
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
          callback("Your new passwords do not match");
      } else {
          callback();
      }
  }
 
  render() {
      return (
          <Modal
              className="modal-wrapper free-access-code-modal change-password-modal-wrapper"
              visible={this.state.visible}
              okText="SAVE"
              width={370}
              onOk={this.handleSubmit.bind(this)} 
              okButtonProps={{className: "submit-btn"}}
              onCancel={this.cancelModal.bind(this)} 
              cancelButtonProps={{className: "cancel-btn"}}>
              <CreateFormWrapper ref = {ref => (this.form = ref)} self={this} compareToFirstPassword={this.compareToFirstPassword.bind(this)}/>
          </Modal>
      );
  }
}
function ChangePasswordForm(props) {
    const {getFieldDecorator} = props.form;
    const {compareToFirstPassword} = props;
    return (
        <div className="content-block d-block">
            <h3 className="title-text d-block">Change Password</h3>
    
            <Form layout="vertical"  className="content-form-block"> 
                <FormItem className="form-group field-wrap"  label="">
                    {getFieldDecorator("oldPassword", {
                        rules: [{ required: true, message: "Please input your existing password!" }]
                    })(
                        <Input className="input-field pl-0 mb-0" placeholder="Current Password"  autoComplete="off" type="password"  name="currentPassword"/>
                    )}
                </FormItem>
                <FormItem className="form-group field-wrap"  label="">
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your new password!" }]
                    })(
                        <Input className="input-field pl-0 mb-0" placeholder="New Password"  autoComplete="off" type="password"  name="password"/>
                    )}
                </FormItem>
                <FormItem className="form-group field-wrap"  label="">
                    {getFieldDecorator("confirmPassword", {
                        validateTrigger:["onBlur","onChange"],
                        rules: [{ required: true, message: "Please input your confirm password!" },{validator: compareToFirstPassword,validateTrigger:"onBlur"}],
            
                    })(
                        <Input className="input-field pl-0 mb-0" placeholder="Confirm password" autoComplete="off" type="password" name="confirmPassword"/>
                    )}
                </FormItem>
            </Form>
        </div>
    );
}


