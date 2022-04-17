import { useGetAuthTokenQuery } from '../../redux/apiService';
import { LoadingBar } from '../LoadingBar/LoadingBar';

export const AuthHOC = ({ children }) => {
    const { isSuccess } = useGetAuthTokenQuery();

    if (isSuccess) {
      return <>{children}</>;
    }
    return <LoadingBar />;
}