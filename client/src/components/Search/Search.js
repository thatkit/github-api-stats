// Styles
import {
    InputGroup,
    Input,
    Button,
    FormFeedback
} from 'reactstrap';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateLogin } from '../../redux/inputSlice';

export const Search = ({ handleOnClick }) => {
    // Search field event handlers
    const dispatch = useDispatch();
    const handleOnChange = ({ target }) => dispatch(updateLogin(target.value.toLowerCase()));
    const handleOnKeyDownEnter = ({ code }) => code === 'Enter' && handleOnClick();

    // Error displaying
    const errorMes = useSelector(({ inputSlice }) => inputSlice.errorMes);

    return (
        <InputGroup>
            <Input
                placeholder="Github username"
                autoComplete="username"
                spellCheck="false"
                autoCorrect="off"
                autoCapitalize="off"
                autoFocus={true}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDownEnter}
                invalid={Boolean(errorMes)}
            />
            <Button onClick={handleOnClick}>
                Search
            </Button>
            <FormFeedback tooltip>
                {errorMes}
            </FormFeedback>
        </InputGroup>
    )
}