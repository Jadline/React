import Avatar from "./Components/avatar.jsx"
import Skill from "./Components/Skill.jsx"
import "./index.css"
function App() {
  return (
    <div className = "container">
      <div className = "avatar">
        <Avatar/>
      </div>
      <div className = "skillset">
        <Skill/>
      </div>
    </div>
  )

}

export default App
