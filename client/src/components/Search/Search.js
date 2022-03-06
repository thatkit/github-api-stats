import { useState } from 'react';
import {
    InputGroup,
    Input,
    Button
} from 'reactstrap';
import { useGetUserByLoginQuery } from '../../redux/apiService';

export const Search = () => {
    const [login, setLogin] = useState('');
    const { data, error, isLoading } = useGetUserByLoginQuery('thatkit');
    console.log(data)
    console.log(error)
    console.log(isLoading)
    
    
    const handleOnChange = ({ target }) => setLogin(target.value);
    const handleOnClick = () => {
        // const { data, error, isLoading } = getUser(login);
    }

    return (
        <InputGroup>
            <Input
                placeholder="Github username"
                onChange={handleOnChange}
            />
            <Button
                onClick={handleOnChange}
            >Search</Button>
        </InputGroup>
    )
}