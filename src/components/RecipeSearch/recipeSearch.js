import React from 'react'
class Recipes extends React.Component {


    handleClick() {
        fetch(`https://api.edamam.com/search?q=chicken&app_id=4863ac07&app_key=6e58a756abe12ad9122ba4525c78f6b9&from=0&to=3&calories=59`)
            .then(res => res.json())
            .then(json => this.setState({ data: json.hits }));
    }

    render() {
        return(
            <div className="search">   
                <div className='button__container'>
                <button className='button' onClick={this.handleClick}>
                Search
                </button>
                </div>
                <div className="searchResults">
                    <ul className="results">
                    {/*this.state.data.recipes.map(el => (*/}              
                    {this.state.data.map(function(item, i){
                        return <li key={i}>
                            <div className="entire-div">
                            <a>{item.recipe.label}</a>
                            <div className="left-div" title="Description">
                                <ul className="recipe-description">
                                <li> {item.recipe.source}</li>
                                {item.recipe.ingredients.map(function(ingredient, i){
                                    return(
                                    <li>
                                        {ingredient.text}
                                    </li>
                                    )
                                })}
                                </ul>
                            </div>
                            <div className="right-div">
                                <img src={item.recipe.image}></img>
                            </div>
                            </div>
                        </li>
                    })
                    }
                    </ul>
                </div>
            </div>
        );
    }
}
export default Recipes