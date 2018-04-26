import React from 'react'
import { Container, Image} from "semantic-ui-react";
import logo from "../../ccc.png";
import './NavBar.css';


const NavBar = () => {
  return(
   	<Container fluid className="Nav-header">
      <h1 className="work-sans header-text">
        	LOGO
      </h1>
    </Container>  
    )
}

export default NavBar;