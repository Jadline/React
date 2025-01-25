 export const LineChartsData = {
    labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ],
    datasets : [
        {
            label : 'steps by Jad',
            data : [3000,4500,6000,8000,7000,9000],
            borderColor : 'rgb(75,192,192)'
        },
        {
            label : 'steps by Jad\'s boyfriend',
            data : [3000,5000,5500,8000,1200,11000,15000],
            borderColor : 'red',
            
        }
    ]
}
export const barChartData = {
    labels : [
        'Rent',
        'Groceries',
        'Utilities',
        'Entertainment',
        'Transportation',
    ],
    datasets : [
        {
            label : 'Expenses',
            data : [1200,300,150,100,100],
            backgroundColor : 'rgba(255,90,132,0.2)',
            borderColor : 'rgba(54,162,235,1)',
            borderWidth: 1,
        }
    ]
}
export const PieGraphData = {
    labels : ['Facebook','Instagram','Twitter','Youtube','LinkedIn'],
    datasets : [
        {
            label : 'Time spent',
            data : [120,60,30,90,45],
            backgroundColor : ['red','orange','purple','yellow','green'],
            hoverOffset : 5
        }
    ]
}