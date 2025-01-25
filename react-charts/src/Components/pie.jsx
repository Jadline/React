import { Pie } from "react-chartjs-2"
import { PieGraphData } from "../fake_data"
import {Chart as ChartJS ,
   
    
    Legend,
    Tooltip,
    ArcElement

} from 'chart.js'
ChartJS.register( Legend,
    Tooltip,
    ArcElement)
function PieGraph(){
    const options = {}
    return(
        <Pie options={options} data={PieGraphData} />
    )
}
export default PieGraph