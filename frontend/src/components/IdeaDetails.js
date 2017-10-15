import React, {Component} from 'react';
import { Card, CardTitle, Paper, CardMedia, CardText, FlatButton } from 'material-ui';
import { connect } from 'react-redux';
import axios from 'axios';

class IdeaDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idea: {
        price: '',
        title: '',
        growth: '',
        description: '',
        lastInvestment: '',
      }
    }
  }
  componentDidMount() {
    if (this.props.address && !this.props.idea) {
      console.log('adx: ', this.props.address);
      axios.get('/proposals/address' + this.props.address)
        .then(response => {
          console.log(response);
          this.setState({
            idea: {
              price: '12',
              title: '',
              growth: '',
              description: '',
              lastInvestment: '',
            }
          })
        });
    } else {
      this.setState({
        idea: {...this.props.idea}
      })
    }
  }

  invest = () => {
    if (!this.props.userAddress) {

    }
    axios.post('/proposals/invest', {
      proposalAddress: this.state.address,
      investorAddress: this.state.userAddress,
    })
  };

  render() {
    const priceLabel = 'Price: ' + this.state.idea.price;
    const cardTitle = (
      <CardTitle title={this.state.idea.title} subtitleColor="red" style={{display: 'flex', justifyContent: 'space-between'}}>
        <Paper style={{backgroundColor: 'orange', padding: '8px', width: 'fit-content'}} zDepth={1}>
          ${this.state.idea.price}
        </Paper>
      </CardTitle>
    );
    return (
      <Card className="idea-box">
        <CardMedia overlay={cardTitle}>
          <div style={{width: '100%', backgroundColor: '#004893', height: '360px'}}></div>
        </CardMedia>
        <CardText>
          <p>{this.state.idea.description}</p>
          <FlatButton label="Invest" onClick={this.invest.bind(this)} />
        </CardText>
      </Card>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userAddress: state.userAddress,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(IdeaDetails);