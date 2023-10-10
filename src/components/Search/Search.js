import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../Utils/Utils';
import AuthApiService from '../../API-Service';
import config from '../../config';
import TokenService from '../../token-service';
import './Search.css';

export default class Search extends React.Component {

    state = {
        ingredientItem: "",
        selectIngredients: [],
        ingredientList: [],
        recipes: [],
        recipeUrl: "",
        loading: true,
        loggedIn: null
    };

    componentDidMount() {
        this.setState({
            loggedIn: TokenService.hasAuthToken()
        })
    }

    handleChange = event => {
        event.preventDefault();
        const apiKey = config.API_KEY;

        this.setState({
            [event.target.name]: event.target.value
        })

        let autocompleteUrl = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${this.state.ingredientItem}&number=5`

        fetch(autocompleteUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    ingredientList: data.map(item => {
                        return item.name
                    })
                })
            })
    };

    addSelectIngredients = (ingredient) => {
        this.setState({
            selectIngredients: [ingredient, ...this.state.selectIngredients],
            ingredientItem: "",
            ingredientList: []

        })
    };

    handleSubmit = event => {
        event.preventDefault();

        const apiKey = config.API_KEY;

        let recipeSearchUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${this.state.selectIngredients}&number=5`;

        fetch(recipeSearchUrl)
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    recipes: data
                })
            })
    }

    openRecipeLinkWindow = () => {
        return window.open(this.state.recipeUrl);
    }

    handleRecipeLink = (event) => {

        const recipeId = event.currentTarget.id;
        const apiKey = config.API_KEY;

        let recipeInfo = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

        fetch(recipeInfo)
            .then(res => res.json())
            .then((data) => {
                this.setState({ recipeUrl: data.sourceUrl }, () => {
                    this.openRecipeLinkWindow()
                })
            })
    }

    removeIngredient = (name) => {

        let newSelectedIngredients = this.state.selectIngredients.filter(ingredient => ingredient !== name);

        this.setState({
            selectIngredients: newSelectedIngredients
        })

        return this.state.selectIngredients;
    }

    addToFavorites = (event) => {

        const idNumber = event.currentTarget.dataset.id;

        let recipeIdsMapped = this.state.recipes.map(recipe => {
            return recipe.id
        })

        let recipeImagesMapped = this.state.recipes.map(recipe => {
            return recipe.image
        })

        let recipeTitlesMapped = this.state.recipes.map(recipe => {
            return recipe.title
        })

        const recipeId = recipeIdsMapped[idNumber];
        const recipeImage = recipeImagesMapped[idNumber]
        const recipeTitle = recipeTitlesMapped[idNumber];

        AuthApiService.postRecipe(recipeId, recipeImage, recipeTitle);

        const newRecipeList = this.state.recipes.filter((recipe) => recipe.id !== recipeId);

        this.setState({
            recipes: newRecipeList
        })
    }

    render() {
        return (
            <div className="allElements">
                <form onSubmit={this.handleSubmit}>
                    <div className="ingredientOptions">

                        <div className="ingredientInput">
                            <Input
                                name="ingredientItem"
                                placeholder="Type ingredients here"
                                value={this.state.ingredientItem}
                                required
                                autoComplete="off"
                                onChange={(value) => this.handleChange(value)}
                                id="ingredientOptions"
                            />
                            <ul className="autoCompleteSuggestions">
                                {this.state.ingredientList.map((item) => <li onClick={() => this.addSelectIngredients(item)}>{item}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className="selectedIngredients">
                        <ul>
                            {this.state.selectIngredients.map((ingredient) =>
                                <li key={ingredient}>
                                    {ingredient}
                                    <button className="Note__delete" type="button" onClick={() => this.removeIngredient(ingredient)}>remove</button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="searchRecipeButton">
                        <Button type="submit" onClick={this.handleSubmit}>search recipes</Button>
                    </div>
                </form>

                <div className="recipeTitle">
                    <ul>
                        {this.state.recipes.map((recipe, idx) =>
                            <li key={idx}>
                                <img src={recipe.image} alt='../../../images/Favorites.jpg'/>
                                <div onClick={this.handleRecipeLink} id={recipe.id}>
                                    {recipe.title}
                                </div>
                                <div className="saveFavoritesButton">
                                    {this.state.loggedIn ? (
                                        <Button onClick={this.addToFavorites} data-id={idx}>Save this recipe</Button>
                                    ) : (
                                        <Link to='/signup'>
                                            <Button>Save this recipe</Button>
                                        </Link>
                                    )}

                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}