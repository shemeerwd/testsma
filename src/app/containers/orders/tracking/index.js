import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { format } from "timeago.js";
import { history } from "../../../store"
import moment from "moment";

const mapDispatchToProps = ({ user, orders }) => {
    return {
        ...user,
        ...orders
    };
};

const mapStateToProps = ({ user, orders }) => {
    return {
        ...user,
        ...orders
    };
};

class OrderStatus extends Component {
    componentDidMount() {
        this.get(this.props.match.params.id)
    }
    get(id) {
        this.props.getOrderStatus({})
        this.props.getOrder(id)
    }
    getOrderStaus(slug) {
        let getSlug = this.props.orderStatus.find(x => x.slug === slug)
        if (this.props.order.previousStaus && this.props.order.previousStaus.length && getSlug) {
            let getOrder = this.props.order.previousStaus.find(x => x._id === getSlug._id)
            if (getOrder)
                return true
            else
                return false
        }
        return false;
    }
    handleChange(value) {
        history.push(`/order/tracking/${value}`)
        this.get(value)
    }
    getTime(slug) {
        let getSlug = this.props.orderStatus.find(x => x.slug === slug)
        if (this.props.order.previousStaus && this.props.order.previousStaus.length && getSlug) {
            let getOrder = this.props.order.previousStaus.find(x => x._id === getSlug._id)
            if (getOrder) {
                return format(getOrder.time)
            }
            else
                return false
        } else {
            return false
        }
    }
    getDeliveredTime() {
        let getSlug = this.props.orderStatus.find(x => x.slug === "delivered")
        if (this.props.order.previousStaus && this.props.order.previousStaus.length && getSlug) {
            let getOrder = this.props.order.previousStaus.find(x => x._id === getSlug._id)
            if (getOrder) {
                return moment(getOrder.time).format("LT")
            }
            else
                return false
        } else {
            return false
        }
    }
    getStatusName(slug) {
        let getSlug = this.props.orderStatus.find(x => x.slug === slug)
        return getSlug && getSlug.name ? getSlug.name : ""
    }

    render() {
        return (
            <main className="main-inner-wrapper my-profile-section">
                <div className="container">
                    <div className="my-profile-content">
                        <Row gutter={20} className="grid-wrapper">
                            <Col span={24} className="right-content-block order-status-section">
                                <div className="dark-header-section">
                                    <div className="content-form-block">
                                        <div className="field-wrap">
                                            {/* {this.props.orders.docs && this.props.orders.docs.length ? 
                                                <Select className="select-field" defaultValue={this.props.order.orderId} onChange={this.handleChange.bind(this)}>
                                                    {this.props.orders.docs.map((item, index) => (
                                                        <Option value={item._id} key={`options-${index}`}>{item.orderId}</Option>
                                                    ))} 
                                                </Select>
                                                : null } */}
                                        </div>
                                    </div>
                                    <div className="header-info-wrapper">
                                        <div className="details-block">
                                            <div className="item-details">Order ID: {this.props.order.orderId}</div>
                                            <div className="item-details thin-text">Total: ${this.props.order.totalPrice} ({this.props.order.totalItems} item)</div>
                                        </div>
                                        <div className="info-block">
                                            <div className="item-info"><small className="sub-text">Order Placed:</small>{this.props.order && this.props.order.createdAt ? moment(this.props.order.createdAt).format("LT") : null} </div>
                                            <div className="item-info"><small className="sub-text">Delivery Time:</small>{this.getDeliveredTime()}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-wrapper">
                                    <div className="title-block">
                                        <h3 className="header-title mb-0">Order Status</h3>
                                    </div>
                                    <div className="steps-track-wrapper">
                                        <ol className="track-progress">
                                            <li className={this.getOrderStaus("orderPlaced") ? "done" : "todo"}>
                                                {this.getOrderStaus("orderPlaced") ?
                                                    <small className="time-block">{this.getTime("orderPlaced")}</small>
                                                    : null}
                                                <div className="status-info-block">
                                                    <div className="icon-block">
                                                        <img src="/images/order-placed.svg" alt="" />
                                                    </div>
                                                    <div className="status-content-block">
                                                        <h5 className="status-title-text">{this.getStatusName("orderPlaced")}</h5>
                                                        <small className="sub-text">We have receive-your order</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={this.getOrderStaus("orderApproved") ? "done" : "todo"}>
                                                {this.getOrderStaus("orderApproved") ?
                                                    <small className="time-block">{this.getTime("orderApproved")}</small>
                                                    : null}
                                                <div className="status-info-block">
                                                    <div className="icon-block">
                                                        <img src="/images/like.svg" alt="" />
                                                    </div>
                                                    <div className="status-content-block">
                                                        <h5 className="status-title-text">{this.getStatusName("orderApproved")}</h5>
                                                        <small className="sub-text">We have receive-your order</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={this.getOrderStaus("orderReady") ? "done" : "todo"}>
                                                {this.getOrderStaus("orderReady") ?
                                                    <small className="time-block">{this.getTime("orderReady")}</small>
                                                    : null}
                                                <div className="status-info-block">
                                                    <div className="icon-block">
                                                        <img src="/images/order-ready.svg" alt="" />
                                                    </div>
                                                    <div className="status-content-block">
                                                        <h5 className="status-title-text">{this.getStatusName("orderReady")}</h5>
                                                        <small className="sub-text">Your order is ready for picked up</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={this.getOrderStaus("orderPickedUp") ? "done" : "todo"}>
                                                {this.getOrderStaus("orderPickedUp") ?
                                                    <small className="time-block">{this.getTime("orderPickedUp")}</small>
                                                    : null}
                                                <div className="status-info-block">
                                                    <div className="icon-block">
                                                        <img src="/images/picked-up.svg" alt="" />
                                                    </div>
                                                    <div className="status-content-block">
                                                        <h5 className="status-title-text">{this.getStatusName("orderPickedUp")}</h5>
                                                        <small className="sub-text">Your order is on the way</small>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className={this.getOrderStaus("delivered") ? "done" : "todo"}>
                                                {this.getOrderStaus("delivered") ?
                                                    <small className="time-block">{this.getTime("delivered")}</small>
                                                    : null}
                                                <div className="status-info-block">
                                                    <div className="icon-block">
                                                        <img src="/images/delivered.svg" alt="" />
                                                    </div>
                                                    <div className="status-content-block">
                                                        <h5 className="status-title-text">{this.getStatusName("delivered")}</h5>
                                                        <small className="sub-text">your order is delivered</small>
                                                    </div>
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
                                    {!this.getOrderStaus("delivered") ?
                                        <Fragment>
                                            {this.props.order.consumer && this.props.order.consumer.name ?
                                                <div className="footer-section">
                                                    <div className="profile-block">
                                                        <div className="profile-image">
                                                            <img className="image" src="" alt="" />
                                                        </div>
                                                        <div className="content-block">
                                                            <h3 className="title-text">{this.props.order.consumer.name}</h3>
                                                            <small className="sub-text">{this.props.order.consumer.email}</small>
                                                        </div>
                                                    </div>
                                                    {this.props.order.consumer.phoneNumber ?
                                                        <a href={`callto:${this.props.order.consumer.phoneNumber}`} className="contact-block">
                                                            <div className="call-icon-block">
                                                                <span className="icon-phone call-icon"></span>
                                                            </div>
                                                            <div className="content-block">
                                                                <small className="sub-text">Phone Number</small>
                                                                <h3 className="title-text">{this.props.order.consumer.phoneNumber}</h3>
                                                            </div>
                                                        </a>
                                                        : null}
                                                </div>
                                                : null}
                                        </Fragment>
                                        : null}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);