import React from 'react';
import { Button, Input } from '../Utils/Utils';
import AuthApiService from '../../API-Service';
import config from '../../config';
import './Search.css';

export default class Search extends React.Component {

    state = {
        ingredientItem: "",
        selectIngredients: [],
        ingredientList: [],
        recipes: [],
        recipeUrl: "",
        loading: true
    };

    handleChange = event => {
        event.preventDefault();
        //"d270212a1e834015b6c14390454993c9"
        const apiKey = config.API_KEY;
        const apiEndpoint = config.API_ENDPOINT
        console.log(apiKey)
        console.log(apiEndpoint)

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

        console.log(recipeId)

        fetch(recipeInfo)
            .then(res => res.json())
            .then((data) => {
                this.setState({ recipeUrl: data.sourceUrl }, () => {
                    this.openRecipeLinkWindow()
                })
            })

        console.log(this.state.recipeUrl)

    }

    removeIngredient = (name) => {

        let newSelectedIngredients = this.state.selectIngredients.filter(ingredient => ingredient !== name);

        console.log(newSelectedIngredients)

        this.setState({
            selectIngredients: newSelectedIngredients
        })

        return this.state.selectIngredients;
    }

    addToFavorites = (event) => {

        const idNumber = event.currentTarget.dataset.id;

        console.log(idNumber)

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

        this.setState ({
            recipes: newRecipeList
        })
        
    }

    render() {
        return (
            <div className="allElements">
                <div className="ingredientOptions">
                    <form onSubmit={this.handleSubmit}>
                        <div className="ingredientInput">
                            <Input
                                name="ingredientItem"
                                placeholder="add ingredient"
                                value={this.state.ingredientItem}
                                required
                                autoComplete="off"
                                onChange={this.handleChange}
                                id="ingredientOptions"
                            />
                            <ul>
                                {this.state.ingredientList.map((item) => <li onClick={() => this.addSelectIngredients(item)}>{item}</li>)}
                            </ul>
                        </div>
                    </form>
                    <div className="ingredientButton">
                        <button onClick={this.addToList}>add ingredient</button>
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

                <Button type="submit" onClick={this.handleSubmit}>search recipes</Button>

                <div className="recipeTitle">
                    <ul>
                        {this.state.recipes.map((recipe, idx) =>
                            <li key={idx}>
                                <img src={recipe.image} />
                                <h3 onClick={this.handleRecipeLink} id={recipe.id}>
                                    {recipe.title}
                                </h3>
                                <button type="button" onClick={this.addToFavorites} data-id={idx}>Save this recipe</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );
    }
}



{/* <div className="recipeSearchButton">
<Button type="submit">search recipes</Button>
</div> */}


{/* <a onClick={this.handleRecipeLink}href={this.state.recipeUrl} data-id={idx}> */ }