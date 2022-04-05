import { useGetAuthTokenQuery } from '../../redux/apiService';
import { ProgressBar } from '../ProgressBar/ProgressBar';

export const AuthHOC = ({ children }) => {
    const { isSuccess } = useGetAuthTokenQuery();

    if (isSuccess) {
      return <>{children}</>;
    }
    return <ProgressBar />;
}

// # logic for no token or expired/invalid token