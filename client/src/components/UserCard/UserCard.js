import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Row,
    Col,
    Container
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserCard.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { PieChart } from './PieChart/PieChart';

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
        labels: Object.keys(langs),
        datasets: [
            {
                data: Object.entries(langs).map(lang => lang[1]),
                backgroundColor: [
                    '#0d6efd',
                    '#6c757d',
                    '#198754',
                    '#dc3545',
                    '#ffc107'
                ],
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
        // <Card className={styles.card}>
        //     <CardBody>
        //     <Row>
        //         <Col xs="6" sm="3" lg="2">
        //             <img
        //                 className={styles.icon}
        //                 alt="profile icon"
        //                 src={user.avatar_url}
        //             />
        //         </Col>
        //         <Col xs="6" sm="9" lg="10">
        //             <CardTitle tag="h1">
        //                 {user.login}
        //             </CardTitle>
        //             <CardSubtitle
        //                 className="mb-4 text-muted"
        //                 tag="h2"
        //             >
        //                 {user.location}
        //             </CardSubtitle>

        //         </Col>
        //     </Row>
        //         <div style={{width: '75%'}}>
        //             <Doughnut
        //                 data={data}
        //                 options={options}
        //             />
        //         </div>
        //         {/* <Button>
        //             Check In
        //         </Button> # unable for now */}
        //     </CardBody>
        // </Card>
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

            <div className={styles.container}>
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
                <PieChart />
            </div>
        </Container>
    )
}