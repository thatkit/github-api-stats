import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PieChart.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext } from 'react';
import { UserContext, LangsAndReposContext } from '../Layout/Layout';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
    const user = useContext(UserContext);
    const langsAndRepos = useContext(LangsAndReposContext);

    console.log(user)
    console.log(langsAndRepos)

    const data = {
        datasets: [
            {
                data: Object.entries(langsAndRepos.langs).map(lang => lang[1]),
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
        </Container>
    )
}