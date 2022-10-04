import { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SmallCard } from '../../components';
import { getAllRecipes, getRecipes, getRecipesError, getRecipesStatus } from '../../store/recipesSlice';
import { AppDispatch } from '../../store/store';

const RecipeView: FunctionComponent = () => {
    const recipes: any[] = useSelector(getAllRecipes)
    const recipesStatus = useSelector(getRecipesStatus)
    const recipesError = useSelector(getRecipesError)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (recipesStatus === 'idle') {
            dispatch(getRecipes())
        }
    }, [recipesStatus, dispatch])
    
    return(
        <section>
            <h1 className='text-center'>Les recettes</h1>
            {
                (recipesStatus === 'succeeded') ?
                <ul>
                    { recipes.map((recipe:any) => 
                        <SmallCard key={ recipe.id } {...recipe}/>
                    )}
                </ul>
                :
                <p>Chargement</p>
            }
            <Link to='/recettes/ajout' className='btn btn-warning'>Ajouter une recette</Link>
        </section>
    )
}

export default RecipeView