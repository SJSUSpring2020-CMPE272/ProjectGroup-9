import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Pagination from "../NearbyRestaurants/pagination";
import { paginate } from "../../utils/paginate";



class Home extends Component {
    //call the constructor method
    constructor(props) {
        // Call the constructor of Super class i.e The Component
        super(props);

        // maintain the state required for this component
        this.state = {
            foodName: '',
            time: null,
            ingredientsRequired: [],
            stepsList: [],
        };
        // Bind the handlers to this class
    }
    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    async componentDidMount() {
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
        console.log(foodName);
        await axios.get('http://localhost:3001/getRecipe/?dish=' + encodeURIComponent(foodName))
            .then(async (response) => {
                // access results...
                console.log(response.data[0]);
                this.setState({
                    foodName: foodName,
                    stepsList: response.data[0].steps,
                    time: response.data[0].minutes,
                    ingredientsRequired: response.data[0].ingredients
                })
            })
            .catch(err => {
                this.setState({
                    foodName: foodName,
                    stepsList: 'SORRY, NO DATA',
                    time: 'SORRY, NO DATA',
                    ingredientsRequired: 'SORRY, NO DATA'
                })
            })
        console.log(this.state.stepsList);
    }


    render = () => {
        return (
            <div>
                <div className="navbar navbar-inverse mb-0 container ">

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
                        {/* <form class="navbar-form navbar-left" action="http://localhost:3001/getRecipe/" method="GET" onSubmit={this.findRecipe}>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search Recipes" name="dish" />
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
                                </span>
                            </div>
                        </form> */}
                    </div>
                </div>
                <br />
                <h2>Cook it Yourself!</h2>
                <div class="card">
                    <div class="card-header">
                        Ingredients
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            {this.state.ingredientsRequired}
                            <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                        </blockquote>
                    </div>
                </div>
                <br />
            </div>

        )
    }
}

export default Home;
