import { Header } from '../Header';
import { exampleUser } from '../../exampleData';

export const HeaderPlaceholder = () => {
    return (
        <Header user={exampleUser} />
    )
}