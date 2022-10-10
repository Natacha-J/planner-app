import { FunctionComponent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AsideCard, Loader, SmallCard } from '../../components';
import { addRecipe, getAllRecipes, getRecipes, getRecipesError, getRecipesStatus } from '../../store/recipesSlice';
import { AppDispatch } from '../../store/store';

const RecipeView: FunctionComponent = () => {
    const dispatch: AppDispatch = useDispatch()
    //load recipes
    const recipes: any[] = useSelector(getAllRecipes)
    const recipesStatus = useSelector(getRecipesStatus)
    const recipesError = useSelector(getRecipesError)

    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
    const [needRefresh, setNeedRefresh ] = useState<boolean>(false)

    useEffect(() => {
        if (recipesStatus === 'idle' || needRefresh) {
            dispatch(getRecipes())
            setNeedRefresh(false)
        }
        if(recipesStatus === 'succeeded'){
            setIsFirstLoad(false)
        }  
    }, [recipesStatus, needRefresh])
    
    const getChanging = (res:boolean) => {
        setNeedRefresh(res)
    }

    const addNewRecipe = (datas:any) => {
        dispatch(addRecipe(datas))
        .then(() => setNeedRefresh(true))
        
    }

    return(
        <section className='row'>
            <h1 className='col-10 text-center m-5'>Les recettes</h1>
            <main className='col-9'>
            {(isFirstLoad === true)
                     ?
                     <Loader/>
                     :
                    <ul className='list-unstyled inline-block list-inline mx-auto'>
                        { recipes.map((recipe:any) => 
                            <li key={ recipe.id } className='list-inline-item'><SmallCard {...recipe} getChanging={getChanging}/></li>
                        )}
                    </ul>
            }
            </main>
            <AsideCard sendDatas={addNewRecipe} component='Recipe'/>
        </section>
    )
}

export default RecipeView