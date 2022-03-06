import { useState } from 'react';
import {
    InputGroup,
    Input,
    Button
} from 'reactstrap';
import { useGetUserByLoginQuery } from '../../redux/apiService';

export const Search = () => {
    const [login, setLogin] = useState('');
    const [skipQuery, setSkipQuery] = useState(true);
    
    const { data, error, isLoading } = useGetUserByLoginQuery(login, {
        skip: skipQuery
    });
    console.log(data)
    // console.log(error)
    // console.log(isLoading)
    
    const handleOnChange = ({ target }) => {
        setSkipQuery(true);
        setLogin(target.value);
    }
    const handleOnClick = () => setSkipQuery(false);

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