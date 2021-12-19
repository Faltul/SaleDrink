import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Row, Col, Container, } from 'react-bootstrap';
import { Nav, Divider} from 'rsuite';
import BanknoteManagment from './banknoteManagment/BanknoteManagment';
import DrinkManagment from './drinkManagment/DrinkManagment';
import { ApplicationState } from '../../store';
import * as ManagmentStore from '../../store/ManagmentStore';




type ManagmentContainerProps =
    RouteComponentProps<{ key: string }> &
    ManagmentStore.ManagmentState &
    typeof ManagmentStore.actionCreators;



interface ManagmentContainerState {
    activeTab: number|null;
}



class ManagmentContainer extends React.PureComponent<ManagmentContainerProps, ManagmentContainerState> {

    constructor(props: ManagmentContainerProps) {
        super(props)
        this.state = {
            activeTab: null
        } 

        this.GetManagmentComponent=this.GetManagmentComponent.bind(this);

    }

    async componentDidMount() {
        if (!this.props.match.params.key) {
            this.props.history.push('/')
            return;
        }
        else
        {
            await this.props.SetKeyAction(this.props.match.params.key);
        }

    }

    private GetManagmentComponent(): React.ReactNode {
        switch (this.state.activeTab) {
            case 1:
                {
                    return <DrinkManagment/>
                }
            case 2:
                {
                    return <BanknoteManagment/>
                }
            default:
                {
                    return <React.Fragment></React.Fragment>
                }
        }
    }

   




    render() {
        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                            <div style={{ overflowX: "auto" }}>
                                <Nav appearance="subtle" activeKey={this.state.activeTab}>
                                    <Nav.Item eventKey={1} onSelect={() => { this.setState({ activeTab: 1 }) }}>Напитки</Nav.Item>
                                    <Nav.Item eventKey={2} onSelect={() => { this.setState({ activeTab: 2 }) }}>Купюры</Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        <Col>
                            {this.GetManagmentComponent()}
                        </Col>
                    </Row>
                </Container>

            </React.Fragment>
        )
    }
}


export default connect(
    (state: ApplicationState) => state.managment,
    ManagmentStore.actionCreators
)(ManagmentContainer as any);


