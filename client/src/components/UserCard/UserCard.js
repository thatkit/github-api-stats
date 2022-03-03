import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserCard.module.css';

export const UserCard = () => {
    const staticUser = {
        login: 'thatkit',
        icon: 'https://avatars.githubusercontent.com/u/47465581?v=4',
        langs: {
            html: 0.2,
            css: 0.2,
            sass: 0.15,
            js: 0.4,
            others: 0.1
        }
    }

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">
                    {staticUser.login}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Card subtitle
                </CardSubtitle>
                <img
                    className={styles.icon}
                    alt="profile icon"
                    src={staticUser.icon}
                />
                <CardText>
                    List of languages
                </CardText>
                {/* <Button>
                    Check In
                </Button> # unable for now */}
            </CardBody>
        </Card>
    )
}