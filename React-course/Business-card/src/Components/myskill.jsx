import "../index.css"
import PropTypes from "prop-types"
function MySkill (props){
    return (
        <div>
           <span className="skill skill1">{props.skill1}</span>
           <span className="skill skill2">{props.skill2}</span>
           <span className="skill skill3">{props.skill3}</span>
           <span className="skill skill4">{props.skill4}</span>
           <span className="skill skill5">{props.skill5}</span>
           <span className="skill skill6">{props.skill6}</span>
        </div>
    )
}
MySkill.propTypes = {
    skill1: PropTypes.string.isRequired,
    skill2: PropTypes.string.isRequired,
    skill3: PropTypes.string.isRequired,
    skill4: PropTypes.string.isRequired,
    skill5: PropTypes.string.isRequired,
    skill6: PropTypes.string.isRequired,
};
export default MySkill