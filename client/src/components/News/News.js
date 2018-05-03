import React, { Component } from 'react';
import axios from 'axios';
import './News.css';
import { Segment, Grid, Header } from 'semantic-ui-react'
import NavBar from '../NavBar';



class News extends Component {

  state ={
    "newsNCI" : [],
    "newsWHO" : [],
    "newsCRUK": []
  }

  componentDidMount(){
    axios.get('/api/news/nci')
      .then(newsNCI => {
        console.log("got news NCI", newsNCI.data);
        this.setState({'newsNCI': newsNCI.data});        
      })
      .catch(err => console.log(err));  

    axios.get('/api/news/who')
        .then(newsWHO => {
          console.log("got news WHO", newsWHO.data);
          this.setState({'newsWHO': newsWHO.data});        
        })
        .catch(err => console.log(err));  

     axios.get('/api/news/cruk')
        .then(newsCRUK => {
          console.log("got news CRUK", newsCRUK.data);
          this.setState({'newsCRUK': newsCRUK.data});        
        })
        .catch(err => console.log(err));           
  }

  render() {
    return (
      <div>
        <NavBar />
        <Grid columns='equal'>
        <Grid.Row>
          <Grid.Column>
          <Header as='h3' dividing>
            National Cancer Institute
          </Header>
          <Segment.Group className="news-segment">
           {this.state.newsNCI.map(nci => ( 
            <Segment>            
              <a href={nci.link} target="_blank">{nci.title}</a>            
            </Segment>
            ))} 
          </Segment.Group> 
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' dividing>
              World Health Organization
            </Header>
            <Segment.Group className="news-segment">
             {this.state.newsWHO.map(who => ( 
              <Segment>            
                <a href={who.link} target="_blank">{who.title}</a>            
              </Segment>
              ))} 
            </Segment.Group> 
          </Grid.Column>
          <Grid.Column>
            <Header as='h3' dividing>
              Cancer Research-UK
            </Header>
            <Segment.Group className="news-segment">
             {this.state.newsCRUK.map(cruk => ( 
              <Segment>            
                <a href={cruk.link} target="_blank">{cruk.title}</a>            
              </Segment>
              ))} 
            </Segment.Group> 
          </Grid.Column>
        </Grid.Row>
        </Grid>
     
      </div>
    );
  }
}

export default News;
