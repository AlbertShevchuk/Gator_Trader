import React, {Component} from 'react';
import {Row,Col,CardDeck} from 'reactstrap';
import {browserHistory} from 'react-router';
import '../viewsCSS/ResultsPage.css';
import Listing from '../Listing/Listing';

export default class ResultContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedOption: 'HTL',
      numResults: "5",
      results: "new Array()",
      itemInfo: []
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.itemInfo !== this.state.itemInfo){
      this.setState({
        itemInfo: [],
        itemInfo: this.props.itemInfo
      });
      return false;
    }
    else{
      return true;
    }
  }

  handleOptionChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    return(
      <div>
        {/* <form>
          <div className="radio">
            <label>
              <input type="radio" value="HTL"
                            checked={this.state.selectedOption === 'HTL'}
                            onChange={this.handleOptionChange} />
              Price: High to Low
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="LTH"
                            checked={this.state.selectedOption === 'LTH'}
                            onChange={this.handleOptionChange} />
              Price: Low to High
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="recent"
                            checked={this.state.selectedOption === 'recent'}
                            onChange={this.handleOptionChange} />
              Most Recent
            </label>
          </div>
      </form> */}


      <CardDeck>
      {this.props.itemInfo.map(item =>
      <Listing itemInfo = {item} headerState={this.props.headerState}/>
      )}
      </CardDeck>

      </div>
    );
  }
}
