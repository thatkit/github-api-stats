import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Header.module.css';

export const Header = ({ user }) => {

    return (
        <header className={styles.header}>
            <h1 tag="h1">
                {user.login}
            </h1>
            <h2
                className="mb-4 text-muted"
                tag="h2"
            >
                {user.location}
            </h2>
        </header>
    )
}