// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './PieChart.module.css';
import './externalTooltip.css';
// Chart setup
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { externalTooltipHandler } from './externalTooltip';

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
        // maintainAspectRatio: false,
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
            <img
                className={styles.icon}
                alt="profile icon"
                src={user.avatar_url}
            />
            <Doughnut
                data={data}
                options={options}
                className={styles.doughnut}
            />
            <div className="tooltipEl"></div>
        </main>
    )
}