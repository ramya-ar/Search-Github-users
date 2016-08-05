import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: 'peter',
			userData: [],
			userRepos: [],
			perPage: 10
		}

	}

	//get user data from github

	getUserData(){
		$.ajax({
			url: 'https://api.github.com/users/'+ this.state.username+'?client_id='+this.props.clientId+'&clinet_secret='+this.props.clinetSecret,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userData: data});
				console.log(data);
			}.bind(this),
			error: function(xhr, status, err){
				this.setState({username: null});
				alert(err);
			}.bind(this)
		});
	}

	//get user repos from github

	getUserRepos(){
		$.ajax({
			url: 'https://api.github.com/users/'+ this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&clinet_secret='+this.props.clinetSecret+'&sort=created',
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userRepos: data});
			}.bind(this),
			error: function(xhr, status, err){
				this.setState({username: null});
				alert(err);
			}.bind(this)
		});
	}

	handleFormSubmit(username){
		this.setState({username: username},function(){
			this.getUserData();
		    this.getUserRepos();
		});
	}

	componentDidMount(){
		this.getUserData();
		this.getUserRepos();
	}

render(){
	return(
		<div>
		<Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
		<Profile {...this.state} />
		</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clinetSecret: React.PropTypes.string
};
App.defaultProps = {
	clientId: 'dfee87e20b9bc58b48ec',
	clinetSecret: '409d34e2626299627219786b4e4f53056cf1059e'
}
export default App