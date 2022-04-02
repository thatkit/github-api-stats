import { useGetAuthTokenQuery } from '../../redux/apiService';
import { Placeholder } from '../Placeholder/Placeholder';

export const AuthHOC = ({ children }) => {
    const {
      data,
      isSuccess
    } = useGetAuthTokenQuery();

    if (isSuccess) {
      return <>{children}</>;
    }
    return <Placeholder />;
}

// # logic for no token or expired/invalid token