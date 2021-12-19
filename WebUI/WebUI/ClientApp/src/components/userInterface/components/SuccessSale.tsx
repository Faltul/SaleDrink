import * as React from 'react';
import { Row, Col, Container, } from 'react-bootstrap';
import {
    Modal, List
} from 'rsuite';
import { SaleDrinkRefund } from '../../../models/DrinkModels'
import { map } from 'lodash';


interface SuccessSaleProps {
    isOpen: boolean;
    refund: SaleDrinkRefund;
    CloseSuccessSaleModal(): void

}


export default class SuccessSale extends React.PureComponent<SuccessSaleProps> {





    render() {
        return (
            <div className="modal-container">

                <Modal show={this.props.isOpen} onHide={this.props.CloseSuccessSaleModal}>
                    <Modal.Header>
                        <Modal.Title>Покупка</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <span className="text-nowrap" style={{ color: "#6c757d", fontSize: "1rem", textAlign: "left" }}>Сдача:</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <span style={{ fontSize: "1.2rem", textAlign: "center" }}><strong style={{ fontSize: "1.2rem" }}>{this.props.refund.amount}</strong>₽</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div style={{ margin: "1rem 0" }}></div>
                            <Row>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <span className="text-nowrap" style={{ color: "#6c757d", fontSize: "1rem", textAlign: "left" }}>Купюры:</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <List>
                                {map(this.props.refund.refundBanknotes, (banknote, key) => (
                                    <List.Item key={key} index={key}>

                                        <Row>
                                            <Col className="ms-2" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                <Row>
                                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                        <Row>
                                                            <Col className="d-flex mr-auto justify-content-start ">
                                                                <span><strong>{banknote.banknote.label}</strong></span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                                                        <span><strong>{banknote.quantity}</strong>шт.</span>
                                                        {'; '}
                                                        <span><strong>{banknote.quantity * banknote.banknote.nominalValue}</strong>₽</span>

                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </List.Item>
                                ))}
                            </List>
                        </Container>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

