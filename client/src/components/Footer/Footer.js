import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Made by</p>
            &nbsp;
            <a
                className={styles.link}
                href="https://github.com/thatkit"
                target="_blank"
                rel="noreferrer"
            >thatkit</a>
        </footer>
    )
}