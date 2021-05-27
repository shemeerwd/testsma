

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { options,filters,days ,months} from "./chart";
import { Row, Col, Button, Select } from "antd";
import Loader from "../../components/loader";
const { Option } = Select;

const mapDispatchToProps = ({ reports, user }) => {
    return {
        ...reports,
        ...user
    };
};

const mapStateToProps = ({ reports, user }) => {
    return {
        ...reports,
        ...user
    };
};

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: "thisweek" };
    }
    componentDidMount() {
        this.list();
    }
    async list() {
        await this.props.getReport({ filter: this.state.filter })
    }

    async handleChange(value) {
        await this.props.getReport({ filter: value })
        this.setState({ filter: value })
    }
    generateGraph(reports){
        let sales = reports.data.map(x => parseInt(x.total))
        let curr = new Date()
        let week = []
        if (this.state.filter === "thisweek" || this.state.filter === "lastweek") {
            for (let i = 0; i < 7; i++) {
                let first = curr.getDate() - curr.getDay() + i
                let day = new Date(curr.setDate(first))
                week.push(days[day.getDay()])
            }
        }
        else if (this.state.filter === "thismonth" || this.state.filter === "lastmonth")
            week = reports.data.map(x => (`${new Date(x.day).getDate().toString()}`))
        else if (this.state.filter === "thisyear" || this.state.filter === "last3month" || this.state.filter === "last6month" || this.state.filter === "lastyear")
            week = reports.data.map(x => months[new Date(x.day).getMonth()])
      
        const data = {
            labels: week,
            datasets: [
                {
                    label: "Delivery",
                    backgroundColor: "red",
                    data: sales
                }
            ]
        }
        return (<div><Bar data={data} width={100} options={options} /></div>);
    }
   
    render() {
        const { saleReports, user,loading} = this.props;
        if(loading && !saleReports.data) return <Loader/>
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
                                            <Button className="edit-btn"><span className="icon-pencil edit-icon"></span>Edit</Button>
                                        </div>
                                    </div>
                                    <div className="order-status-block">
                                        <h3 className="title-text d-inline-block v-align-middle">Reports</h3>
                                    </div>
                                </div>

                                <div className="block-wrapper">
                                    <div className="title-xs-hidden-block">
                                        <h3 className="header-title mb-0">Reports</h3>
                                    </div>
                                    <div className="btn-block d-block">
                                        <Select defaultValue={this.state.filter} onChange={this.handleChange.bind(this)}>
                                            {filters.map((state, i) =>
                                                <Option value={state.value} key={i}>{state.label}</Option>
                                            )}
                                        </Select>
                                    </div>
                                    {saleReports && saleReports.data && saleReports.data.length ? this.generateGraph(saleReports) : null }
                                </div>
                                <div style={{padding: "30px"}}>
                                    <Row>
                                        <Col xs={{ span: 7, offset: 3 }} lg={{ span: 9, offset: 3 }}>
                                            <center><h2>Total Delivery</h2></center>    
                                            <center><b>{ this.props.saleReports && this.props.saleReports.totalSales ?  this.props.saleReports.totalSales : 0}</b></center>
                                        </Col>
                                        <Col xs={{ span: 7, offset: 3 }} lg={{ span: 9, offset: 3 }}>
                                            <center><h2>Total Monthly Delivery</h2></center>
                                            <center><b>{ this.props.saleReports && this.props.saleReports.monthlySales ?  this.props.saleReports.monthlySales : 0}</b></center>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </main>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Reports);