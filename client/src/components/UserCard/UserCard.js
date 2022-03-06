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

export const UserCard = ({ user }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">
                    {user.login}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {user.location}
                </CardSubtitle>
                <img
                    className={styles.icon}
                    alt="profile icon"
                    src={user.avatar_url}
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