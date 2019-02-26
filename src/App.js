import React, { Component } from 'react';
import SearchBar from './Components/SearchBar';
import VideoList from './Components/VideoList';
import VideoDetail from './Components/VideoDetail';
import YTSearch from 'youtube-api-search';
import { Icon, notification } from 'antd';
import dotenv from 'dotenv';
import logo from './logo.svg';
import './App.css';
dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      videos: [],
      search: true,
      selectedVideo: {}
     };
      this.welcome();
}
    welcome = () => {

	notification.open({
	   message: 'Hey, there, buddy!',
	   description: 'Let us search',
           icon: <Icon type="smile" style={{ color: '#108ee9' }} />
	})
     };

videoSearch( term ) {
	if(this.state.search) {
	  YTSearch({ key: API_KEY, term}, (data) => {
	    try {
		if( data && data.data && data.data.error.message) {
		   console.log(data);
		   throw('error')
		}
	        this.setState({ videos: data, selectedVideo: data[0] });
                console.log(this.state.videos);
	     } catch(err){
		 notification['error']({
		    message: "Daily Limit Exceeded",
		    description: "Youtube data API daily limit exceeded. Wait until quota recharged",
	})
	}
	});
	}
	}

handleChange = (value) => {
  setTimeout(() => {
	if(value === ''){
	   this.setState({videos: [], selectedVideo: null});
	   return;
}

	if (this.state.search) {
	   this.videoSearch(value);
	}

	setTimeout( () => {
	   this.setState({ search: true });
	}, 5000);
	}, 2000);
	};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
