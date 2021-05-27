import urls from "./url";


const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);


let isSafari;
try {
  isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
      (typeof window.safari !== "undefined" && window.safari.pushNotification)
    );
} catch (e) {
  console.log(e);
}


console.log("env : ", process.env.REACT_APP_ENV || "development");

const serverPath = {
  development: "http://192.168.2.75:5000",
  staging: "https://eatin.twlide.com",
  production: "https://prodapi.twlide.com",
}

const googlePlacesKey = {
  development: "AIzaSyAj_CbYlY34wmT5Pep4MdXpVbh_xqv5Czw",
  staging: "AIzaSyAj_CbYlY34wmT5Pep4MdXpVbh_xqv5Czw",
  production: "AIzaSyAj_CbYlY34wmT5Pep4MdXpVbh_xqv5Czw",
}


const server = serverPath[process.env.REACT_APP_ENV || "development"]
console.log("server : ", server);


let all = {
  routes : {
    authentication: '/authentication',
    resetPassword:'/reset-password',
    forgotPassword:'/forgot-password',
    orders:'/orders',
    orderStatus:"/order-status",
    users: '/users',
    delivery:"/delivery",
    notification:"/notifications",
    reports:"/delivery/report"
  },
  logoURL:"https://tblr-eatin.s3.ap-southeast-1.amazonaws.com/uploads/default/059f0eac-6ef6-4edb-94f7-68822a21dc68.png",
  AllowPushNotification: (window.location.protocol === "https:" || isLocalhost) && !isSafari,
  cloudFront:urls[process.env.REACT_APP_ENV || "development"],
  placesAPI: googlePlacesKey[process.env.REACT_APP_ENV || "development"],
  defaultLimit:10,
  api: `${server}/api/v1`,
  memberCount:3,
  maxLimit:100,
  firebase: {
    appConf: {
      apiKey: "AIzaSyANxf250zcAfz_Eko9Y9NsuR68eMxuu1Xg",
      authDomain: "eat-in-1566276002399.firebaseapp.com",
      databaseURL: "https://eat-in-1566276002399.firebaseio.com",
      projectId: "eat-in-1566276002399",
      storageBucket: "",
      messagingSenderId: "1010256886052",
      appId: "1:1010256886052:web:4c18255d1bdbf74f"
    },
    usePublicVapidKey: "BDqWtty5cWfOXmRyxYnnw0zNtngQ8jNGbunitx1V8SxIP0uuSEAQAB0bt1UP64yYtXCOGwcE9fA6VrUlRay6k_U"
  },
} 


let env = {
  development: {
     cookies:{
      name: 'eatitin-delivery',
      expiry: 7,
      domain: ""
    }
  },
  staging: {
    cookies: {
      name: 'eatitin-delivery',
      expiry: 7,
      domain: ""
    }
  },
  production: {
    cookies: {
      name: 'eatitin-delivery',
      expiry: 7,
      domain: ""
    }
  }
};

export default {
  ...all,
  ...env[process.env.REACT_APP_ENV || "development"]
};
