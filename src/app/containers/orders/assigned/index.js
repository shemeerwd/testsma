import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Timeline, Icon, Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserDetatils } from "../../../helpers/utility";
import Loader from "../../../components/loader";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import moment from "moment";
import { history } from "../../../store";

const TimelineItem = Timeline.Item
const { Option } = Select;

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

class AssignedOrders extends Component {
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
        if(getUserDetatils() && getUserDetatils()._id){
            this.props.getOrderStatus({"isDelivery" : true})
            this.props.aceeptedOrders({ limit: this.state.limit });
        }    
    }
    fetchMoreData = () => {
        if (this.props.acceptedorders.data.length >= this.props.acceptedorders.total) {
            this.setState({ hasMore: false });
            return;
        }
        this.setState((prevState, props) => ({
            limit: prevState.limit + 10
        }));
        this.list();
    };
    async handleChange(id, value) {
        let data = {}
        data._id = id
        data.status = value
        data.userId = getUserDetatils()._id
        await this.props.handleOrders(data)
    }
    openMap(address){
        if(address.addressComponents && address.addressComponents.geometry && address.addressComponents.geometry.location){
            window.open(`https://maps.google.com/?q=${address.addressComponents.geometry.location.lat},${address.addressComponents.geometry.location.lng}`);
        }else if(address && address.location && address.location.coordinates && address.location.coordinates.length){
            window.open(`https://maps.google.com/?q=${address.location.coordinates[1]},${address.location.coordinates[0]}`);
        }    
    }

    render() {
        const { loading, user } = this.props;
        if (loading) return <Loader />;
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
                                            <Button className="edit-btn" onClick={() => history.push("/my-profile")} ><span className="icon-pencil edit-icon"></span>Edit</Button>
                                        </div>
                                    </div>
                                    <div className="order-status-block">
                                        <h3 className="title-text d-inline-block v-align-middle">Assigned Orders</h3>
                                        <small className="sub-text d-inline-block v-align-middle">{this.props.acceptedorders && this.props.acceptedorders.data && this.props.acceptedorders.data.length ? this.props.acceptedorders.data.length : 0}  orders</small>
                                    </div>
                                </div>

                                <div className="block-wrapper">
                                    <div className="title-xs-hidden-block">
                                        <h3 className="header-title mb-0">Assigned Orders</h3>
                                    </div>
                                    {this.props.acceptedorders && this.props.acceptedorders.data && this.props.acceptedorders.data.length ? (
                                        <InfiniteScroll
                                            dataLength={this.props.acceptedorders.data.length}
                                            next={this.fetchMoreData}
                                            hasMore={this.state.hasMore}
                                            loader={<div className="listing-loading"><Loader /></div>}
                                        >
                                            {this.props.acceptedorders.data.map((item, index) => (
                                                <div className="order-history-list" key={index}>
                                                    <div className="title-text-block">
                                                        <div className="left-block">
                                                            <h3 className="title-text d-block">{item.restaurants && item.restaurants.name ? item.restaurants.name : null}</h3>
                                                            <p className="title-text d-block">{item.orders &&  item.orders.orderId ? item.orders.orderId : null}</p>
                                                            <small className="sub-text d-block">{format(item.updatedAt)}</small>
                                                        </div>
                                                        <div className="highlight">Total: ${item.orders.totalPrice}</div>
                                                    </div>
                                                    <div className="info-block">
                                                        <div className="item-info"><small className="sub-text">Order Placed:</small>{ item.orders && item.orders.createdAt ? moment(item.orders.createdAt).format("LT") : null} </div>
                                                        <div className="item-info"><small className="sub-text">Expected Delivery Time:</small><b>{item.orders && item.orders.expectedDelivery ? moment(item.orders.expectedDelivery).format("LT") : null }</b></div>
                                                    </div>
                                                    {item.orders.items.map((data, index) => (
                                                        <div className="food-dishes-list" key={`menu-${index}`}>
                                                            <div className="food-dishe-block">
                                                                <span className="dish">{data.name}</span>
                                                                <span className="rate">${data.price}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="btn-block d-block">
                                                        <Timeline>
                                                            <TimelineItem dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}>
                                                                <h3>Pick up</h3>
                                                                <p style={{cursor:"pointer"}} onClick={this.openMap.bind(this,item.restaurants)} >{item.restaurants && item.restaurants.formattedAddress ? item.restaurants.formattedAddress : null} <span  style={{cursor:"pointer"}} onClick={this.openMap.bind(this,item.restaurants)} className="icon-location icon-block"></span></p>
                                                                {item.restaurants &&  item.restaurants.phoneNumber ? 
                                                                    <a href={`tel:${item.restaurants.phoneNumber}`} className="icon-phone call-icon">
                                                                        <h3>{item.restaurants.phoneNumber}</h3>
                                                                    </a>
                                                                    : null }  
                                                            </TimelineItem>
                                                            <TimelineItem>
                                                                <h3>Delivery Address</h3>
                                                                <p>{item.consumer ? item.consumer.name : null}</p>
                                                                <p style={{cursor:"pointer"}} onClick={this.openMap.bind(this,item.address)} >{item.address &&  item.address.formattedAddress ? item.address.formattedAddress : null} <span  style={{cursor:"pointer"}} onClick={this.openMap.bind(this,item.address)} className="icon-location icon-block"></span></p>
                                                                {item.consumer &&  item.consumer.phoneNumber ? 
                                                                    <a href={`tel:${item.consumer.phoneNumber}`} className="icon-phone call-icon">
                                                                        <h3>{item.consumer.phoneNumber}</h3>
                                                                    </a>
                                                                    : null }  
                                                            </TimelineItem>
                                                        </Timeline>
                                                    </div>
                                                    <Row>
                                                        <Col span={12}>
                                                            <div className="btn-block d-block">
                                                                <Select value={item.status} defaultValue={item.status} onChange={this.handleChange.bind(this, item._id)}>
                                                                    {this.props.orderStatus.map((state, i) =>
                                                                        <Option value={state.slug} key={i} disabled={(state.slug === item.status || !state.isDeliverySelectable) ? true : false}>{state.name}</Option>
                                                                    )}
                                                                </Select>
                                                            </div>
                                                        </Col>    
                                                        <Col span={12}> 
                                                            <div className="btn-block d-block">
                                                                <Link to={`/order/tracking/${item.orderId}`} className="filled-btn" type="primary">View more details</Link>
                                                            </div>
                                                        </Col>
                                                    </Row> 
                                                </div>
                                            ))}
                                        </InfiniteScroll>
                                    ) : <section className="no-data-block" style={{ minHeight: "60vh" }}>
                                        <div className="no-wrap">
                                            <div className="media-block"><img src="/../images/logo.svg" alt="" /></div>
                                            <h3 className="no-data-title uppercase">No assigned orders available!</h3>
                                            <p className="no-data-para">Currently no orders assigned for you</p>
                                        </div>
                                    </section>}
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
            </main>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignedOrders);