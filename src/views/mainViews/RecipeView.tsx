import { FunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, SmallCard } from '../../components';
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
        <section className='row'>
            <h1 className='col-10 text-center mt-5'>Les recettes</h1>
            <main className='col-10'>
                {(recipesStatus === 'succeeded')
                    ?
                    <ul className='list-unstyled m-5 d-flex justify-content-around '>
                        { recipes.map((recipe:any) => 
                            <li key={ recipe.id }><SmallCard {...recipe}/></li>
                        )}
                    </ul>
                    :
                    <Loader/>
            }
            </main>
            <aside className='col-2 bg-transparent border-0'>
                <Link to='/recettes/ajout' className='btn text-white m-3'>Ajouter une recette</Link>
            </aside>
        </section>
    )
}

export default RecipeView