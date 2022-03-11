import styles from './PieChart.module.scss';

export const PieChart = () => {
    const langs = {
        HTML: 25,
        CSS: 30,
        JavaScript: 45,
        Ruby: 11,
        Sass: 15
    }
    
    return (
        <div className={styles.pie}>
            {Object
                .entries(langs)
                .map((lang, i) => (
                    <div className={`${styles.piece}__${i}`} key={i}>
                        {`${lang[0]}: ${lang[1]}`}
                    </div>
                ))}
        </div>
    )
}