import React, { Component } from 'react';
import { connect } from 'react-redux';
import data from '../data/fakeIdeas';
import '../styling/ideas.css';
import IdeaDetails from './IdeaDetails';
import axios from 'axios';

import Card, { CardTitle, CardMedia } from 'material-ui/Card';
import { Paper } from 'material-ui';

class Idea extends Component {
  render() {
    const cardTitle = (
<<<<<<< HEAD
      <CardTitle title={this.props.idea.title} titleColor="white" subtitleColor="red" style={{color:"white", display: 'flex', justifyContent: 'space-between'}}>
=======
      <CardTitle title={this.props.idea.title} titleColor="white" subtitleColor="red" style={{display: 'flex', justifyContent: 'space-between'}}>
>>>>>>> 00b7a349fc57237ac1109708da0fef451ce87889
        <Paper style={{backgroundColor: 'orange', padding: '8px', width: 'fit-content'}} zDepth={1}>
          ${this.props.idea.price}
        </Paper>
      </CardTitle>
    );
    return (
      <div key={this.props.idea.contractAddress} className="ideas-item" onClick={this.props.callback}>
        <Card className="idea-box">
<<<<<<< HEAD

          <CardMedia overlay={<CardTitle title={cardTitle}/>}>
          <img src={this.props.idea.imageURL} alt=""/>
=======
          <CardMedia overlay={cardTitle}>
          <img src={this.props.idea.imageURL} alt="" />
>>>>>>> 00b7a349fc57237ac1109708da0fef451ce87889
            <div style={{width: '100%', backgroundColor: '#004893'}}></div>
          </CardMedia>
        </Card>
      </div>
    )
  }
}
class Ideas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ideas: []
    };
    this.goToIdea = this.goToIdea.bind(this);
  }

  componentDidMount() {
    axios.get('/proposals')
      .then(proposals => {
        const ideas = [];
        const data = proposals.data;
        for(let field in data) {
          data[field].contractAddress = field;
          ideas.push(data[field])
        }
        console.log(ideas);
        this.props.gotIdeas(ideas);
        this.setState({
          ideas: ideas,
        })
      })
  }

  goToIdea(idea) {
    this.props.goToIdea(idea);
  }

  render() {
    const _this = this;
    const IdeasList = (
      <div className="ideas-grid">
        {this.state.ideas.map(idea => {
          return <Idea key={idea.contractAddress} idea={idea} callback={_this.goToIdea.bind(this, idea)} />
        })}
      </div>
    );
    return (
      <div className="page">
        { this.props.showDetails ? <IdeaDetails idea={this.props.idea} address={this.props.address} /> : IdeasList }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    showDetails: state.showDetails,
    address: state.address,
    idea: state.idea,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToIdea: (idea) => {
      dispatch({
        type: 'CLICK_IDEA',
        payload: {
          idea: idea,
        }
      });
    },
    gotIdeas: (ideas) => {
      dispatch({
        type: 'GOT_IDEAS',
        payload: {
          ideas: ideas,
        }
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ideas);
