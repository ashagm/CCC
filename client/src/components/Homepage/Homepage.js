import React from 'react';

import { Card, CardTitle } from 'material-ui';


const Homepage = () => (

	<Card className="container">
    	<CardTitle title="React Application"
    	 subtitle="This is the home page." />
  	</Card>
);

export default Homepage;

// import logo from "./ccc.png";
// import "./App.css";
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



// class App extends Component {
//   render() {
//     return (
//       <MuiThemeProvider>
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} alt="logo" className="logo"/>
//             <h2>Care! Connect! Conquer!</h2>
//           }
//         <div><a href="/login">Login</a></div>
//         <div><a href="/register">Register</a></div> 
//         </div>
//         <p className="App-intro">
//           content here
//         </p>
//       </div>
//       </MuiThemeProvider>
//     );
//   }
// }
