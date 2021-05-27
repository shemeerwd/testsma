import React,{Component} from "react";
import { connect } from "react-redux";
import TopBar from "../top-bar";
import Footer from "../footer";
import ScrollToTop from "react-scroll-up";

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

class Layout extends Component {
 
    render() {
        const { children, settings } = this.props;
        return (
            <React.Fragment>
                {settings.topbar ?  <TopBar page={settings.title} hideSearch={settings.hideSearch}/> : null}
                <div className="app-body">
                    {children}
                </div>
                <ScrollToTop showUnder={160} style={{bottom : 70, zIndex: "1052"}}>
                    <span className="scroll-top-button icon-arrow-up"></span>
                </ScrollToTop>
                <Footer/>  
            </React.Fragment>
        )
    }
}
export default connect( mapStateToProps,mapDispatchToProps)(Layout);

