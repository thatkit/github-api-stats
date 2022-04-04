// Styles
import {
    InputGroup,
    Input,
    Button
} from 'reactstrap';
// Redux
import { useDispatch } from 'react-redux';
import { updateLogin } from '../../redux/inputSlice';

export const Search = ({ handleOnClick }) => {
    // Search field event handlers
    const dispatch = useDispatch();
    const handleOnChange = ({ target }) => dispatch(updateLogin(target.value));
    
    const handleOnKeyDownEnter = ({ code }) => code === 'Enter' && handleOnClick();

    return (
        <InputGroup>
            <Input
                placeholder="Github username"
                onChange={handleOnChange}
                autoFocus={true}
                onKeyDown={handleOnKeyDownEnter}
            />
            <Button
                onClick={handleOnClick}
            >Search</Button>
        </InputGroup>
    )
}