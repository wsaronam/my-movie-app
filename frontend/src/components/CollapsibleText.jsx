import React, { useState } from "react";

import "./styles/CollapsibleTextButton.css";




function CollapsibleText({ text, maxLength = 150 }) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(!expanded);

  if (!text) {
    return null;
  }

  else if (text.length <= maxLength) {
    return (
    <div className="collapsible-text">
      {text}
    </div>
    );
  }
  
  else {
    return (
      <div className="collapsible-text">
        <p>
          {expanded ? text : text.substring(0, maxLength) + "..."}
        </p>
        <button className="toggle-button" onClick={toggle}>
          {expanded ? "Show less ▲" : "Read more ▼"}
        </button>
      </div>
    );
  }
  
}

export default CollapsibleText;