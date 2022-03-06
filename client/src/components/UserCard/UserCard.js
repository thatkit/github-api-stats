import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Row,
    Col
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserCard.module.css';

export const UserCard = ({ user }) => {
    return (
        <Card className={styles.card}>
            <CardBody>
            <Row>
                <Col xs="6" sm="3" lg="2">
                    <img
                        className={styles.icon}
                        alt="profile icon"
                        src={user.avatar_url}
                    />
                </Col>
                <Col xs="6" sm="9" lg="10">
                    <CardTitle tag="h1">
                        {user.login}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-4 text-muted"
                        tag="h2"
                    >
                        {user.location}
                    </CardSubtitle>

                </Col>
            </Row>
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