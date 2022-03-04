import {
    InputGroup,
    Input,
    Button
} from 'reactstrap';

export const Search = () => {
    return (
        <InputGroup>
            <Input placeholder="Github username" />
            <Button>
                Search
            </Button>
        </InputGroup>
    )
}