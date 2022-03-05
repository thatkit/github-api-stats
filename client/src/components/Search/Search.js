import {
    InputGroup,
    Input,
    Button
} from 'reactstrap';
import { useGetUserByLoginQuery } from '../../redux/apiService';

export const Search = () => {
    const { data, error, isLoading } = useGetUserByLoginQuery('thatkit');

    console.log(error)

    return (
        <InputGroup>
            <Input placeholder="Github username" />
            <Button>
                Search
            </Button>
        </InputGroup>
    )
}