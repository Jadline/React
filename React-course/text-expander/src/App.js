

import { useState } from "react";

import "./index.css";

export default function App() {
  return (
    <div>
      <TextExpander
         collapsedNumWords={64}
          expandButtonText = "display more"
          collapseButtonText = "Collapse text"
          buttonColor = "blue"
      >
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={166}
        buttonColor="#ff6622"
        expandButtonText = "Show text"
        collapseButtonText = "Collapse text"
      >
        Space travel requires some seriously amazing techn                                                               ology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander buttonInline={false} className="box" collapsedNumWords={66} buttonColor = "green">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}


function TextExpander({
  collapsedNumWords = 20,
  buttonColor,
  collapseButtonText="show less",
  expandButtonText ="show more",
  buttonInline,
  className="",
  children
}){

  const ButtonStyle ={
    color : buttonColor,
    display : buttonInline,
    border : "none",
    fontSize : "16px",
   
    
  }

  const[isExpanded,setIsExpanded] = useState(false)
  function handleExpand(){
    setIsExpanded(true)
  }
  function handleCollapse(){
    setIsExpanded(false)
  }

  return(
    <div className={className} buttonInline={buttonInline} >
      { isExpanded ? (<p>{children.split("").slice(0,collapsedNumWords).join("") + "..."}<button onClick={isExpanded ? handleCollapse : handleExpand} style={ButtonStyle}>{isExpanded ? expandButtonText : collapseButtonText }</button></p>) 
      :
       (<p>{children + "..."}<button onClick={isExpanded ? handleCollapse : handleExpand} style={ButtonStyle}>{isExpanded ? expandButtonText : collapseButtonText }</button></p>)}
      
      {/* {isExpanded ? (<p>{children.split("").slice(0,collapsedNumWords).join("") + "..."} <button onClick={handleCollapse} style={ButtonStyle}>{expandButtonText}</button></p>)
       : (<p>{children + "..."}<button onClick={handleExpand} style={ButtonStyle}>{collapseButtonText}</button></p>)}
       */}
    </div>
  )
}