import {Bar} from 'react-chartjs-2'
import { barChartData } from '../fake_data'
import {Chart as ChartJS,
    CategoryScale,
    LinearScale,
    // PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
ChartJS.register(
    CategoryScale,
    LinearScale,
    // PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)
function BarGraph(){
    return(
   <Bar  data={barChartData}/>
    )
}
export default BarGraph