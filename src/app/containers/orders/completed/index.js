import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col, Button, Timeline, Icon } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../../components/loader";
import { Link } from "react-router-dom";
import { history } from "../../../store";

const TimelineItem = Timeline.Item
const mapDispatchToProps = ({ orders, user }) => {
    return {
        ...orders,
        ...user
    };
};

const mapStateToProps = ({ orders, user }) => {
    return {
        ...orders,
        ...user
    };
};

class CompletedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            hasMore: true,
        };
    }
    componentDidMount() {
        this.list();
    }
    list() {
        this.props.deliveredOrders({ limit: this.state.limit });
    }

    fetchMoreData = () => {
        if (this.props.orders.data.length >= this.props.orders.total) {
            this.setState({ hasMore: false });
            return;
        }
        this.setState((prevState, props) => ({
            limit: prevState.limit + 10
        }));
        this.list();
    };
    render() {
        const { loading, user } = this.props;
        if (loading) return <Loader />;
        console.log(this.props.orders.data)
        return (
            <main className="main-inner-wrapper my-profile-section">
                <div className="container">
                    <div className="my-profile-content">
                        <Row gutter={20} className="grid-wrapper">
                            <Col span={24} className="right-content-block order-history-section">

                                <div className="dark-banner-wrapper">
                                    <div className="dark-banner-section">
                                        <div className="content-block">
                                            <h3 className="title-text d-block">{user.name}</h3>
                                            <a href={`mailto:${user.email}`} className="sub-text"><span className="icon-mail icon-block"></span>{user.email}</a>
                                        </div>
                                        <div className="edit-block">
                                            <Button className="edit-btn" onClick={() => history.push("/my-profile")}><span className="icon-pencil edit-icon"></span>Edit</Button>
                                        </div>
                                    </div>
                                    <div className="order-status-block">
                                        <h3 className="title-text d-inline-block v-align-middle">Order History</h3>
                                        <small className="sub-text d-inline-block v-align-middle">{this.props.orders && this.props.orders.data && this.props.orders.data.length ? this.props.orders.data.length : 0}  orders</small>
                                    </div>
                                </div>

                                <div className="block-wrapper">
                                    <div className="title-xs-hidden-block">
                                        <h3 className="header-title mb-0">Order History</h3>
                                    </div>
                                    {this.props.orders && this.props.orders.data && this.props.orders.data.length ? (
                                        <InfiniteScroll
                                            dataLength={this.props.orders.data.length}
                                            next={this.fetchMoreData}
                                            hasMore={this.state.hasMore}
                                            loader={<div className="listing-loading"><Loader /></div>}
                                        >
                                            {this.props.orders.data.map((item, index) => (
                                                <div className="order-history-list" key={index}>
                                                    <div className="title-text-block">
                                                        <div className="left-block">
                                                            <h3 className="title-text d-block">{item.restaurants && item.restaurants.name ? item.restaurants.name : null}</h3>
                                                            <p className="title-text d-block">{item.orders &&  item.orders.orderId ? item.orders.orderId : null}</p>
                                                            <small className="sub-text d-block">{moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</small>
                                                        </div>
                                                        <div className="highlight">Total: ${item.orders && item.orders.totalPrice ? item.orders.totalPrice : 0}</div>
                                                    </div>
                                                    {item.orders &&  item.orders.items && item.orders.items.map((data, index) => (
                                                        <div className="food-dishes-list" key={`menu-${index}`}>
                                                            <div className="food-dishe-block">
                                                                <span className="dish">{data.name}</span>
                                                                <span className="rate">${data.price}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="btn-block d-block">
                                                        <Timeline>
                                                            <TimelineItem dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}><h3>Pick up</h3><p>{item.restaurants && item.restaurants.formattedAddress ? item.restaurants.formattedAddress : null}</p></TimelineItem>
                                                            <TimelineItem dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}><h3>Delivery Address</h3><p>{item.consumer ? item.consumer.name : null}</p><p>{item.address.formattedAddress}</p></TimelineItem>
                                                        </Timeline>
                                                    </div>
                                                    <div className="item-btn-block d-block">
                                                        <Link to={`/order/tracking/${item.orderId}`} className="filled-btn" type="primary">View more details</Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </InfiniteScroll>
                                    ) : <section className="no-data-block" style={{ minHeight: "60vh" }}>
                                        <div className="no-wrap">
                                            <div className="media-block"><img src="/../images/logo.svg" alt="" /></div>
                                            <h3 className="no-data-title uppercase">No  orders found!</h3>
                                            <p className="no-data-para">Not yet completed any orders</p>
                                        </div>
                                    </section>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedOrders);