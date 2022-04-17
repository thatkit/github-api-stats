import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
                className={styles.link}
                href="https://github.com/thatkit"
                target="_blank"
                rel="noreferrer"
            >Github</a>
        </footer>
    )
}