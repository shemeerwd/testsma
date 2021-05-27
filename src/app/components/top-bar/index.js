import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCookie } from "../../helpers/utility";
import { history } from "../../store";
import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";


const mapDispatchToProps = ({ user}) => {
    return {
	  ...user
    };
};
  
const mapStateToProps = ({ user}) => {
    return {
        ...user
    };
};

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: false,
        };
    }
  	async logout() {
        await this.props.logout();
        history.push("/login");
    }
    toggleOrders(){
        this.props.toggleCurrentOrders()
    }
    restCurrentOrders(){
        this.props.resetCurrentOrders()
    }
	
    toggleMenu(){
        this.setState({mobile:!this.state.mobile})
    }
    redirect(){
        this.setState({mobile:false})
    }
    handleRedirect(url) {
        history.push(url);
    }

	

	
    render() {
        const user  = this.props.user || getCookie();
	  

	    return (
	        <header className="main-header">
	            <section className="header-top-block">
	                <div className="container">
	                    <Link to={"/"} className="logo-block">
	                        <img style={{width:"100%", height:"100%"}} src="/images/logo.svg" alt=""/>
	                    </Link>  
	                    <div className="right-block">
    						{user && user._id ? 
	                        <div className="user-profile icon-block">
	                            <span className="icon-user menu-item-icon"></span>
								
	                            <div className="menu-dropdown menu-dropdown-web-only profile-dropdown-wrapper">
	                                <div className="menu-dropdown-item">

	                                    <div className="dropdown-header">
	                                        <div className="name-block">
	                                            <span className="short-name">{user && user.name.length ? `${user.name.match(/\b(\w)/g).join("")}` : "J"}</span>
	                                        </div>
	                                        <div className="info-block">
	                                            <h4 className="drop-title">{user.name}</h4>
	                                            <small className="sub-text">{user.email}</small>
	                                        </div>
	                                        <div className="dropdown-header-icon-block" onClick={this.handleRedirect.bind(this,"/my-profile")}>
	                                            <span className="icon-pencil"></span>
	                                        </div>
	                                    </div>

	                                    <div className="dropdown-body-wrapper">
                                                <Link to={"/new-orders"} className="link-item">
	                                            <span className="icon-home link-icon"></span> New Orders
	                                        </Link>
	                                        <Link to={"/assigned-orders"} className="link-item">
	                                            <span className="icon-food link-icon"></span> Assigned Orders
	                                        </Link>
	                                        <Link to={"/past-orders"} className="link-item">
	                                            <span className="icon-order-history link-icon"></span> Order History
	                                        </Link>
                                                <Link to={"/reports"} className="link-item">
                                                    <span className="icon-time link-icon"></span> Reports
                                                </Link>
                                                <Link to={""} onClick={this.logout.bind(this)} className="link-item">
	                                            <span className="icon-shut-down link-icon"></span> Signout
	                                        </Link>
	                                    </div>

	                                </div>
	                            </div>
	                        </div> : null }
	                    </div>
	                </div>
	            </section>
	            <section className="header-bottom-block">
	                <div className="container">
	                    <nav className="main-nav">
                            <NavLink to={"/new-orders"} className="nav-item" activeClassName="active">
                                <Tooltip title="NEW ORDERS">
                                    <span className="icon-home icon-block"></span>
                                    <span className="text-block">NEW ORDERS</span>
                                </Tooltip>	
	                        </NavLink>
	                        <NavLink to={"/assigned-orders"} className="nav-item" activeClassName="active">
                                <Tooltip title="CURRENT ORDERS">
                                    <span className="icon-food icon-block"></span>
                                    <span className="text-block">CURRENT ORDERS</span>
                                </Tooltip>			
	                        </NavLink>
                            <NavLink to={"/past-orders"} className="nav-item" activeClassName="active">
                                <Tooltip title="ORDERS HISTORY">
	                            	<span className="icon-order-history icon-block"></span>
                                    <span className="text-block">ORDERS HISTORY</span>
                                </Tooltip>
	                        </NavLink>
                            <NavLink to={"/reports"} className="nav-item" activeClassName="active">
                                <Tooltip title="REPORTS">
	                            	<span className="icon-time icon-block"></span>
                                    <span className="text-block">REPORTS</span>
                                </Tooltip>
	                        </NavLink>
	                        <NavLink to={"/navigation"} className="nav-item" activeClassName="active">
                                <Tooltip title="MY ACCOUNT">
	                           		<span className="icon-user icon-block"></span>
                                    <span className="text-block">MY ACCOUNT</span>
                                </Tooltip>
	                        </NavLink>
	                    </nav>
	                </div>
	            </section>
	        </header>
	    );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TopBar);




