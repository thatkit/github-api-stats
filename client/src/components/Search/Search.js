// Styles
import {
    InputGroup,
    Input,
    Button
} from 'reactstrap';

export const Search = ({ handleOnChange, handleOnClick }) => {
    const handleOnKeyDownEnter = ({ code }) => {
        code === 'Enter' && handleOnClick();
    }

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