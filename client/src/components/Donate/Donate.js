import React, { Component } from 'react';
import './Donate.css';
import { Card, Image, Grid } from 'semantic-ui-react'
import Checkout from './Checkout';
import NavBar from '../NavBar';
import image1 from "./image1.png";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";

class Donate extends Component {
  render() {
    return (
      <div>
      <NavBar />
      <div className="donate-container">
      <Grid>
      <Grid.Row columns={3}>
        <Grid.Column>
            <Card className="donate-card">
              <Image src={image2} className="donate-image"/>
              <Card.Content>
                <Card.Header>
                  Help cancer research
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    Saving lives through research
                  </span>
                </Card.Meta>
                <Card.Description>
                   Time is running short, do your bit to find a cure for cancer.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                 <div className="App">
                    <p className="App-intro">
                      <Checkout
                        name={'Donate Now'}
                        description={'Creditcards only'}
                        amount={1}
                      />
                    </p>
                </div>
              </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column>
           <Card className="donate-card">
              <Image src={image3} className="donate-image" />
              <Card.Content>
                <Card.Header>
                  Help Pediatric cancer research
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                    Saving lives through research
                  </span>
                </Card.Meta>
                <Card.Description>
                   Time is running short, do your bit to find a cure for cancer.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                 <div className="App">
                    <p className="App-intro">
                      <Checkout
                        name={'Donate Now'}
                        description={'Creditcards only'}
                        amount={1}
                      />
                    </p>
                </div>
              </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column>
            <Card className="donate-card">
              <Image src={image1} className="donate-image"/>
              <Card.Content>
                <Card.Header>
                   Help a cancer patient for a ride
                </Card.Header>
                <Card.Meta>
                  <span className='date'>
                     $10 = 1 ride to and from treatment for a cancer patient.
                  </span>
                </Card.Meta>
                <Card.Description>
                   Cancer patients cite transportation to and from medical treatment as a critical need.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                 <div className="App">
                    <p className="App-intro">
                      <Checkout
                        name={'Donate Now'}
                        description={'Creditcards only'}
                        amount={1}
                      />
                    </p>
                </div>
              </Card.Content>
            </Card>
        </Grid.Column>
      </Grid.Row>
     </Grid>
     </div>  
     </div>
    );
  }
}

export default Donate;
