import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeAuthToken } from '../../redux/authSlice';
import { useGetAuthTokenMutation } from '../../redux/apiService';
// Placeholder component
import { Placeholder } from '../Placeholder/Placeholder';

export const AuthHOC = ({ children }) => {
    const storedToken = useSelector(({ authSlice }) => authSlice.authToken);
    
    const [getAuth, auth] = useGetAuthTokenMutation();
    useEffect(() => !storedToken && getAuth(), []);

    const dispatch = useDispatch();
    useEffect(() => {
      !storedToken && auth.status === 'fulfilled' && dispatch(storeAuthToken(auth.data.token));
    }, [auth]);
    
    if (auth.status === 'fulfilled') {
      return <>{children}</>;
    }
    return <Placeholder />;
}

// # logic for no token or expired/invalid token
// # set and get Cookies maybe?