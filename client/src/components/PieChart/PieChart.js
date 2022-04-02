import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PieChart.module.css';
import './externalTooltip.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { externalTooltipHandler } from './externalTooltip';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({ user, langs, repos }) => {    
    const data = {
        labels: Object.entries(langs).map(lang => lang[0]),
        datasets: [
            {
                data: Object.entries(langs).map(lang => lang[1]),
                repos: Object.entries(repos).map(repo => repo[1]),
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
        events: ['mousemove', 'click', 'touchstart', 'touchmove'],
        plugins: {
            tooltip: {
                enabled: false,
                external: externalTooltipHandler
            },
            legend: {
                display: false
            }
        },
    }

    return (
        <main className={`${styles.pieChart} doughnutCnt`}>
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