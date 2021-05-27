export const options = {
    // responsive: true,
    maintainAspectRatio: false,
    //animation: false,
    // legend: { display: false },
    cornerRadius: 20,
    tooltips: {
        enabled: true,
        mode: "index",
        intersect: false,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "white",
        titleFontColor: "red",
        bodyFontColor: "green",
        footerFontColor: "green"
    },
    layout: { padding: 0 },
    // scales: {
    //   xAxes: [
    //     {
    //       barThickness: 12,
    //       maxBarThickness: 10,
    //       barPercentage: 0.5,
    //       categoryPercentage: 0.5,
    //       ticks: {
    //         fontColor: "green"
    //       },
    //       gridLines: {
    //         display: false,
    //         drawBorder: false
    //       }
    //     }
    //   ],
    //   yAxes: [
    //     {
    //       ticks: {
    //         fontColor: "green",
    //         beginAtZero: true,
    //         min: 0
    //       },
    //       gridLines: {
    //         borderDash: [2],
    //         borderDashOffset: [2],
    //         color: "black",
    //         drawBorder: false,
    //         zeroLineBorderDash: [2],
    //         zeroLineBorderDashOffset: [2],
    //         zeroLineColor: "black"
    //       }
    //     }
    //   ]
    // }
};
 
export const filters =  [
    {
        label: "This Week",
        value: "thisweek"
    },
    {
        label: "Last Week",
        value: "lastweek"
    },
    {
        label: "This Month",
        value: "thismonth"
    },
    {
        label: "Last Month",
        value: "lastmonth"
    },
    {
        label: "Last 3 Months",
        value: "last3month"
    },
    {
        label: "Last 6 Months",
        value: "last6month"
    },
    {
        label: "This Year",
        value: "thisyear"
    }
]
export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

