import { FunctionComponent } from 'react'
import { Card } from 'react-bootstrap'
import IngredientsList from '../lists/IngredientsList'

const SmallCard: FunctionComponent = (props: any) => {

    return (
        <Card style={{ width: '18rem' }} className='m-3 border-0 shadow-lg' >
            <Card.Header className='text-center rounded-top rounded-circle pb-3 pt-2'>{(props.title)? props.title :  props.name }</Card.Header>
            <Card.Body className='rounded'>
                {(props.title)?
                <>
                    <Card.Title>Ingredients : </Card.Title>
                    <IngredientsList {...props.Ingredients} getChanging={props.getChanging}/>
                </>
                 : 
                <IngredientsList {...props}/>
                }
            </Card.Body>
        </Card>
    )
}

export default SmallCard