import React, { Component } from "react";
import { connect } from "react-redux";
import {Button, Row, Col, Form, Input} from "antd";
import { Link } from "react-router-dom";
import ChangePassword from "../../components/changePasswordModal";
const FormItem = Form.Item;


const mapDispatchToProps = ({ user }) => {
    return {
        ...user
    };
};

const mapStateToProps = ({ user }) => {
    return {
        ...user
    };
};

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(ev) {
        ev.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err){
                values._id = this.props.user._id
                return this.props.updateProfile(values);
            }
        });
    }
    async showChangepasswordModal(){
        try {
            const result = await this.changePassword.open();
            console.log(result);
            result._id = this.props.user._id
            this.props.updateProfile(result)
        } catch (e) {
            console.error(e);
        }
    } 
    render() {
  
        const { user } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <main className="main-inner-wrapper my-profile-section">
                <div className="container">
                    <div className="my-profile-content">
                        <div className="mobile-secondary-header d-block">
                            <Link to="#" className="header-title mb-0 d-inline-block">
                                <i className="icon-arrow-left back-btn"></i>Edit Account
                            </Link> 
                        </div>
                        <Row gutter={20} className="grid-wrapper">
                            <Col xs={24} md={16} lg={18} xl={19} className="right-content-block my-profile-content-wrapper">

                                <div className="block-wrapper">
                                    <div className="title-block">
                                        <h3 className="header-title mb-0">Edit Account</h3> 
                                        <Button className="popup-btn" type="link" onClick={this.showChangepasswordModal.bind(this)}>Change Password</Button>
                                    </div>
                                    <div className="card-widget-content">
                                        <Form layout="vertical" onSubmit={this.handleSubmit} className="content-form-block">
                                            <Row type="flex">
                                                <Col xs={24} md={14} xl={12} className="form-space-wrapper">
                                                    <Col xs={24}>
                                                        <FormItem className="form-group field-wrap pb-0"  label="">
                                                            {getFieldDecorator("name", {
                                                                initialValue: user.name,rules: [{ required: true, message: "Please input your name!" }],
                                                            })(
                                                                <Input className="input-field pl-0 mb-0" placeholder="First Name" type="text"  name="name"/>
                                                            )}
                                                        </FormItem>
                                                    </Col> 
                                                    <Col xs={24}>
                                                        <FormItem className="form-group field-wrap pb-0"  label="">
                                                            {getFieldDecorator("phoneNumber", {
                                                                initialValue: user.phoneNumber
                                                            })(
                                                                <Input className="input-field pl-0 mb-0" placeholder="Phone Number" type="text"  name="phone" />
                                                            )}
                                                        </FormItem>
                                                    </Col>

                                                </Col>
                                            </Row> 
                                            <footer className="form-footer">
                                                <Button disabled={this.props.loading} loading={this.props.loading}  type="primary" htmlType="submit" className="submit-btn submit-fill-button">Save</Button>
                                            </footer>
                                        </Form> 
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <ChangePassword ref={ref => (this.changePassword = ref)} user={this.props.user} />
                    </div>
                </div>
            </main>
        );
    }
}
const MyProfile = Form.create()(EditProfile);

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
