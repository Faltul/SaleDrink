import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { FaTimes, FaCheck } from 'react-icons/fa';
import { NotificationToast } from '../../../models/NotificationModels'


type ToastNotificationContentProps = NotificationToast

export class ToastNotificationContentDefault extends React.PureComponent<ToastNotificationContentProps>
{

    render() {

        return (

            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                    <div style={{ fontSize: "1.3rem", textAlign: "center", color: "black" }}>
                        {this.props.message}
                    </div>
                </Col>
                {this.props.content &&
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                        {this.props.content}
                    </Col>
                }
                {this.props.additionalMessage &&
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                        <div style={{ fontSize: "0.8rem", textAlign: "center", color: "gray" }}>
                            {this.props.additionalMessage}
                        </div>
                    </Col>
                }
            </Row>

        )
    }
}

export class ToastNotificationContentError extends React.PureComponent<ToastNotificationContentProps>
{

    render() {

        return (
            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                    <IconContext.Provider value={{ size: "2rem", style: { color: "red" } }}>
                        <FaTimes />
                    </IconContext.Provider>
                </Col>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                    <div style={{ fontSize: "1.3rem", textAlign: "center", color: "black" }}>
                        {this.props.message}
                    </div>
                </Col>
                {this.props.content &&
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                        {this.props.content}
                    </Col>
                }
                {this.props.additionalMessage &&
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                        <div style={{ fontSize: "0.8rem", textAlign: "center", color: "gray" }}>
                            {this.props.additionalMessage}
                        </div>
                    </Col>
                }
            </Row>
        )
    }
}

export class ToastNotificationContentSuccess extends React.PureComponent<ToastNotificationContentProps>
{

    render() {

        return (
            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                    <IconContext.Provider value={{ size: "2rem", style: { color: "green" } }}>
                        <FaCheck />
                    </IconContext.Provider>
                </Col>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                    <div style={{ fontSize: "1.3rem", textAlign: "center", color: "black" }}>
                        {this.props.message}
                    </div>
                </Col>
                {this.props.content &&
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                        {this.props.content}
                    </Col>
                }
                {this.props.additionalMessage &&
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-center">
                        <div style={{ fontSize: "0.8rem", textAlign: "center", color: "gray" }}>
                            {this.props.additionalMessage}
                        </div>
                    </Col>
                }
            </Row>
        )
    }
}