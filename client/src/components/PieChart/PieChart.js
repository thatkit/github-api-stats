import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PieChart.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useContext } from 'react';
import { UserContext, LangsAndReposContext } from '../Layout/Layout';
import { externalTooltipHandler } from './externalTooltip';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
    const user = useContext(UserContext);
    const langsAndRepos = useContext(LangsAndReposContext);

    const data = {
        labels: Object.entries(langsAndRepos.langs).map(lang => lang[0]),
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
                enabled: false,
                external: externalTooltipHandler
            },
            callbacks: {
                beforeLabel: chart => ` ${chart.label}`,
                label: chart => ` ${chart.raw} lines of code`
            },
            legend: {
                display: false
            }
        },
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