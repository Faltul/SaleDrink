import * as React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';


interface LoaderProps {
    isViewSpiner: boolean,
    isAbsolutePosition?: boolean,
    size?: number,
    paddingTop?: string,
    possition?: "top" | "center",
    message?: string,
}


export class Loader extends React.PureComponent<LoaderProps> {

    public render() {
        return (
            <div style={{ background: "RGBA(255,255,255,0.5)", zIndex: 999999, height: "100%", width: "100%", position: this.props.isAbsolutePosition || this.props.isAbsolutePosition === undefined ? "absolute" : "unset" }}>
                {this.props.isViewSpiner &&
                    <Row style={{ height: "80%", paddingTop: this.props.paddingTop ? this.props.paddingTop : undefined }} className={`d-flex align-items-${this.props.possition ? this.props.possition : 'top'}`}>
                        <Col className="text-center" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12" >
                            <Spinner className="align-middle" animation="grow" style={{ backgroundColor: "#0172db", width: this.props.size !== undefined ? (this.props.size - 1) + 'rem' : '2rem', height: this.props.size !== undefined ? (this.props.size - 1) + 'rem' : '2rem', marginRight: "0.5rem" }} />
                            <Spinner className="align-middle" animation="grow" style={{ backgroundColor: "#0066c5", width: this.props.size !== undefined ? (this.props.size - 0.5) + 'rem' : '2.5rem', height: this.props.size !== undefined ? (this.props.size - 0.5) + 'rem' : '2.5rem', marginRight: "0.5rem" }} />
                            <Spinner className="align-middle" animation="grow" style={{ backgroundColor: "#004C92", width: this.props.size !== undefined ? this.props.size + 'rem' : '3rem', height: this.props.size !== undefined ? this.props.size + 'rem' : '3rem', marginRight: "0.5rem" }} />
                            {this.props.message &&
                                <Row>
                                    <Col>
                                        <span className="text-break" style={{fontSize: "1.2rem", textAlign: "center" }}><strong>{this.props.message}</strong></span>
                                    </Col>
                                </Row>
                            }
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}