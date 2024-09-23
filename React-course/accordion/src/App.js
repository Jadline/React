import "./index.css"
import {useState} from "react"
const faqs = [

  { title: "What is React?",
     text: "React is a JavaScript library for building user interfaces, maintained by Facebook." },

  { title: "How does useState work?", 
    text: "useState is a Hook in React that allows you to add state to functional components." },
  { title: "What is JSX?",
     text: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML and is used in React to describe UI structure." },
];

function App() {
  return (
    <div>
      <Accordion/>
    </div>
  );
}

export default App;
function Accordion () {
  return(
    <div className="accordion">
      {faqs.map((faq,index) => <AccordionItem title={faq.title} text={faq.text} num={index} />)}
    </div>
  )
}
function AccordionItem ({num,title,text}){
  const[isOpen,setisOpen] = useState(false)
  function handleToggle(){
     setisOpen((isOpen) => !isOpen)
  }
  return (
    <div className={isOpen ? "item additionalstyle" : "item"} onClick={handleToggle} >
      <p className ="number">{num < 10 ? `0${num + 1}` : num}</p>
      <p className={isOpen ? "title title-color" : "title"}>{title}</p>
      <p className = "icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  )
}
