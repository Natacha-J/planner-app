import { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AsideCard, Loader, SmallCard } from '../../components';
import { getAllRecipes, getRecipes, getRecipesError, getRecipesStatus } from '../../store/recipesSlice';
import { AppDispatch } from '../../store/store';

const RecipeView: FunctionComponent = () => {
    const dispatch: AppDispatch = useDispatch()
    //load recipes
    const recipes: any[] = useSelector(getAllRecipes)
    const recipesStatus = useSelector(getRecipesStatus)
    const recipesError = useSelector(getRecipesError)

    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false)
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const [needRefresh, setNeedRefresh ] = useState<boolean>(false)

    useEffect(() => {
        if (recipesStatus === 'idle' || needRefresh) {
            dispatch(getRecipes())
            setNeedRefresh(false)
        }
    }, [recipesStatus, needRefresh])
    
    const getChanging = (res:boolean) => {
        setNeedRefresh(res)
    }

    const addNewRecipe = (datas:any) => {
        console.log(datas);
        
    }

    return(
        <section className='row'>
            <h1 className='col-10 text-center mt-5'>Les recettes</h1>
            <main className='col-9'>
                {(recipesStatus === 'succeeded')
                    ?
                    <ul className='list-unstyled m-5 d-flex justify-content-around '>
                        { recipes.map((recipe:any) => 
                            <li key={ recipe.id }><SmallCard {...recipe} getChanging={getChanging}/></li>
                        )}
                    </ul>
                    :
                    <Loader/>
            }
            </main>
            <AsideCard sendDatas={addNewRecipe} component='Recipe'/>
        </section>
    )
}

export default RecipeView