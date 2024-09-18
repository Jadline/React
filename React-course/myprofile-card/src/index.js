import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"

const mySkills = [
  {
    skill: "HTML + CSS",
    level: "Advanced",
    color: "blue" // HTML color
  },
  {
    skill: "JavaScript",
    level: "Intermediate",
    color: "yellow" // JavaScript color
  },
  {
    skill: "React",
    level: "Beginner",
    color: "skyblue" // React color
  },
  {
    skill: "Git and Github",
    level: "Intermediate",
    color: "green" // Node.js color
  },
  {
    skill: "Python",
    level: "Advanced",
    color: "red" // Python color
  }
];

const colors = mySkills.map((skil) => skil.color)
console.log(colors)




function App(){
  return(
  <div className="container">
    <div className ="image-container">
      <Avatar/>
    </div>
    <div className="skillset">
      <h1>Jadline Njeri</h1>
      <p>Passionate full-stack developer with a strong background in JavaScript, React, and Node.js. Skilled in building dynamic web applications, solving complex problems, and delivering clean, efficient code.</p>
      <SkilLset/>
      </div>
    </div>
  
  )
}
function Avatar(){
  return(
    <img src="/profile.jpg" alt="profile" className="avatar"/>
  )

}

function SkilLset(){
  return(
    <div>
      {mySkills.map((skil,index) => <Skill skilObj={skil} key ={index}/>)}
      
    </div>
  )
  
  
}
function Skill({skilObj}){
  

  return(
    <div className="skills" style={{backgroundColor : skilObj.color}}>
      <span>{skilObj.skill}</span>
      <span>
        {skilObj.level === "Advanced" ? "💪" : skilObj.level === "Intermediate"  ? "🤙" : skilObj.level === "Beginner" ? "👨‍🦲" : "✍"}
      </span>
  </div>
  )
  
}




//second challenge instructions
//skill level and color
//skill could be html + css,js,react ect
//level = beginner,advanced ,intermediate
//colors in hex-codes

//conditions 
//based on the level ,,display the following emohjis
//muscle for advanced,thumb-intermediate,and ka person for beginner















const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


