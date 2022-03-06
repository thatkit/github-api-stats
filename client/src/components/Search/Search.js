import {
    InputGroup,
    Input,
    Button
} from 'reactstrap';

export const Search = ({ handleOnChange, handleOnClick }) => {

    return (
        <InputGroup>
            <Input
                placeholder="Github username"
                onChange={handleOnChange}
            />
            <Button
                onClick={handleOnClick}
            >Search</Button>
        </InputGroup>
    )
}