import SkilList from "./skillist.jsx"
import "../index.css"
function Skill (){
    return (
        <div>
            <h1 className ="name">Jadline Njeri</h1>
            <p className ="intro-paragraph">Full-stack developer and teacher at Udemy.when not coding or 
                preparinga course,i like to play board games, to cook(and eat) or
                to just enjoy the portugeese sun at the beach
            </p>
            <SkilList/>
        </div>
    )

}
export default Skill