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
        plugins: {
            tooltip: {
                callbacks: {
                    label: () => 'hi bois'
                }
            }
        }
    }
        
    return (
        <main className={styles.pieChart}>
            <div className={styles.top}>
                <img
                    className={styles.icon}
                    alt="profile icon"
                    src={user.avatar_url}
                />
            </div>
            <div className={styles.bot}>
                <Doughnut
                    data={data}
                    options={options}
                    className={styles.doughnut}
                />
            </div>
        </main>
    )
}