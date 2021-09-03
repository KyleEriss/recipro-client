import React from 'react';
import AuthApiService from '../../API-Service';
import { Button } from '../Utils/Utils';
import config from '../../config';
import './Favorites.css';

export default class Favorites extends React.Component {

    state = {
        recipes: [],
        recipeItem: '',
        loading: true,
        suggestions: []
    }

    componentDidMount() {
        AuthApiService.getRecipes().then((res) => {
            this.setState({ recipes: res, loading: false })
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

    handleRemove = (id) => {

        const recipeId = id;

        AuthApiService.deleteRecipe(recipeId);

        const newRecipeList = this.state.recipes.filter((recipe) => recipe.id !== recipeId);

        this.setState({
            recipes: newRecipeList
        })
    }


    render() {
        return (
            <div className="recipeTitle">
                {this.state.loading || !this.state.recipes ? (
                    <div></div>
                ) : (
                    <ul>
                        {this.state.recipes.map((recipe) =>
                            <li key={recipe.id}>
                                <img src={recipe.recipeimage} alt='../../../images/Favorites.jpg' />
                                <div onClick={this.handleRecipeLink} id={recipe.recipeid}>
                                    {recipe.recipetitle}
                                </div>
                                <div className="deleteButton">
                                    <Button onClick={() => this.handleRemove(recipe.id)}>Delete</Button>
                                </div>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        )

    }
}