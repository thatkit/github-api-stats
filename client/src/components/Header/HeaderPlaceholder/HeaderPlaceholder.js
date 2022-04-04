import { Header } from '../Header';
import { exampleUser } from '../../../helpers/exampleData';

export const HeaderPlaceholder = () => {
    return (
        <Header user={exampleUser} />
    )
}