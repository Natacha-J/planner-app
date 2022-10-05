import { useEffect, FunctionComponent } from 'react'
import { Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getAllMeasures, getMeasures, getMeasuresError, getMeasuresStatus } from '../../store/measuresSlice';
import { AppDispatch } from '../../store/store';

const MeasuresCombo: FunctionComponent<{getMeasure: Function}> = ({getMeasure}) => {
    const dispatch: AppDispatch = useDispatch()

    //measures load
    const measures = useSelector(getAllMeasures)
    const measuresStatus = useSelector(getMeasuresStatus)
    const measuresError = useSelector(getMeasuresError)

    useEffect(() => {
        if(measuresStatus === 'idle') {
            dispatch(getMeasures())
        }
    }, [measuresStatus, dispatch])
       
    return (
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
            <Form.Select
                onChange={ (e) => getMeasure(e.target.value) }>
                <option value={0}> Veuillez choisir une mesure </option>
            { measures.map((measure:any) => 
                    <option key={ measure.id } value={ measure.id }> 
                     { measure.name }
                    </option>
            )}
            </Form.Select>
        </div>
    )
}

export default MeasuresCombo