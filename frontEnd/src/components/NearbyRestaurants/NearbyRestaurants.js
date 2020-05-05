import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
 import Pagination from "./pagination";
 import { paginate } from "../../utils/paginate";

class Home extends Component {
    //call the constructor method
    constructor(props) {
        // Call the constructor of Super class i.e The Component
        super(props);

        // maintain the state required for this component
        this.state = {
            foodName: '',
            restaurantList: [],
            currentPage: 1,
            pageSize: 2
        };
        // Bind the handlers to this class
    }
    handlePageChange = page => {
        this.setState({ currentPage : page });
    }

    async componentDidMount () {
        // https://developers.zomato.com/api/v2.1/categories
        let data = {

        }
// https://developers.zomato.com/api/v2.1/search?entity_id=10883&entity_type=city&count=10&radius=2&cuisines=Indian&sort=rating&order=desc
// https://developers.zomato.com/api/v2.1/search?entity_id=10883&entity_type=city&q=burger&count=5
        let q = "";
        // q = "burger";
        // if (this.state.food)
        // if (this.state.foodName)
        let foodName = localStorage.getItem('foodName');
        await axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=10883&entity_type=city&q='+foodName+'&count=10&order=desc&sort=rating', {
        headers: {
            'X-Zomato-API-Key': '325c24f9017a3f8559d862d2a75105c0'
        },
            dataType: 'json',
             processData: true,
        }
            ) 
        .then(async (response) => {
            // access results...
           console.log(response);
           this.setState({
            restaurantList : response.data.restaurants
           })
          })
          .catch ( err => {
              window.location.reload();
          })
          console.log(this.state.restaurantList);

    }

   

   

    render = () => {
        const {length : count} = this.state.restaurantList
        const { pageSize, currentPage } = this.state;

        let restaurantList = this.state.restaurantList

        const paginatedItems = paginate(restaurantList, currentPage, pageSize)

        let listOfRestaurants = paginatedItems.map(restaurantList => {
            return (
            <div class="col-xs-10 individualPropertyDesc">
        <div>
            <img src = {restaurantList.restaurant.thumb} width="650" height="200" class="col-lg-4"/>
            {/* <img src = {properties.imageFiles} width="650" height="200" class="col-lg-4"/> */}
            <div class="col-lg-6">
           <span>
            <h2>{restaurantList.restaurant.name}</h2>
            <h4>Overall Rating: {restaurantList.restaurant.user_rating.aggregate_rating}</h4>
            <h2>{restaurantList.restaurant.phone_numbers}</h2>
            <h4><a href = {restaurantList.restaurant.events_url}>View restaurant</a></h4>
            {/* phone_numbers */}
            <h3>Estimated wait time: {Math.round((((Math.random() * 120) + 30)/10))  *10} minutes</h3>
            </span>
            <br/>
            </div>
            <br/></div>
            </div>
            
            )
        })

       
        
            
        return(
           <div>
               <div className="navbar navbar-inverse mb-0 container">

<div class="navbar-header">
    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <a href="#" class="navbar-brand">SeeFood</a>
</div>
<div id="navbarCollapse" class="collapse navbar-collapse">
    <ul class="nav navbar-nav">
        <li class="active"><a href="/Home">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle" href="#">Messages <b class="caret"></b></a>
            <ul class="dropdown-menu">
                <li><a href="#">Inbox</a></li>
                <li><a href="#">Drafts</a></li>
                <li><a href="#">Sent Items</a></li>
                <li class="divider"></li>
                <li><a href="#">Trash</a></li>
            </ul>
        </li>
    </ul>
    <form class="navbar-form navbar-left">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search"/>
            <span class="input-group-btn">
                <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
            </span>
        </div>
    </form>
</div>
</div>
<br/>
               <h2>Nearby restaurants</h2>
               <div>
               {listOfRestaurants}
               </div>
               <br/>
               <div className="pagination">
               <Pagination itemsCount={count} pageSize={pageSize} 
                        currentPage = {this.state.currentPage}
                        onPageChange={this.handlePageChange} /> 
                        </div>
           </div>
                    
        )
    }
}

export default Home;