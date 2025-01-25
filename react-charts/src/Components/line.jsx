
import {Line} from 'react-chartjs-2'
import { LineChartsData } from '../fake_data'
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
function LineGraph(){
    const options = {
        responsive : true,
        plugins : {
            legend : {
               
                position : 'top'
            },
            title : {
                display : true,
                text: 'My daily steps graph'
            },
            scales: {
                x: {
                  ticks: {
                    color: 'green',  // Customizes the color of the x-axis tick labels
                    font: {
                      size: 14,  // Adjusts the font size of the tick labels
                    },
                  },
                },
           

        }
    }
}
  
    return(
        <Line options = {options}  data={LineChartsData}/>
    )
}
export default LineGraph