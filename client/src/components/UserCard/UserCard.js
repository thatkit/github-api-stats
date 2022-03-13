import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserCard.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserCard = ({ langsAndRepos }) => {

    const user = {
        login: 'thatkit',
        avatar_url: 'https://avatars.githubusercontent.com/u/47465581?v=4',
        location: 'Vladivostok, Russia'
    }

    const langs = {
        HTML: 25,
        CSS: 30,
        JavaScript: 45,
        Ruby: 11,
        Sass: 15
    }

    const data = {
        datasets: [
            {
                data: Object.entries(langs).map(lang => lang[1]),
                backgroundColor: [
                    '#0d6efd',
                    '#6c757d',
                    '#198754',
                    '#dc3545',
                    '#ffc107'
                ]
            }
        ],
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    label: () => 'hi bois'
                }
            }
        }
    }

    return (
        <Container>
            <h1 tag="h1">
                {user.login}
            </h1>
            <h2
                className="mb-4 text-muted"
                tag="h2"
            >
                {user.location}
            </h2>

            <Container className={styles.cnt}>
                <div className={styles.topContainer}>
                    <img
                        className={styles.icon}
                        alt="profile icon"
                        src={user.avatar_url}
                    />
                </div>
                <div className={styles.botContainer}>
                    <Doughnut
                        data={data}
                        options={options}
                        className={styles.doughnut}
                    />
                </div>
                {/* <PieChart /> */}
            </Container>
        </Container>
    )
}