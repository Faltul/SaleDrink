import * as React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ContentLoader from "react-content-loader";
import { Loader } from '../../generic/component/Loader';
import {
    IconButton, Icon, List
} from 'rsuite';
import { map } from 'lodash';
import BanknoteForm from './forms/BanknoteForm';
import { Banknote, BanknoteUpdateCommand, BanknoteCreateCommand } from '../../../models/BanknoteModels'
import { ActionTypeEnum } from '../../../models/ComponentStateMode';
import { NotificationTypeEnum, NotificationToast } from '../../../models/NotificationModels'
import { ToastNotificationManager } from '../../../infrastructure/ToastNotificationManager'
import { ApiResponseHelper } from '../../../infrastructure/utils/ApiResponseHelper'
import { BanknoteRequests } from '../../../apiRequests/BanknoteRequests';


interface BanknoteManagmentProps {
}

interface BanknoteManagmentState {
    isLoading: boolean;
    isProcessing: boolean;
    banknotes: Banknote[],
    selectBanknote: Banknote | null,
    actionType: ActionTypeEnum;
}

export default class BanknoteManagment extends React.PureComponent<BanknoteManagmentProps, BanknoteManagmentState> {
    constructor(props: BanknoteManagmentProps) {
        super(props)

        this.state = {
            isLoading: false,
            isProcessing: false,
            banknotes: [],
            selectBanknote: null,
            actionType: ActionTypeEnum.view,
        }
        this.EditOject = this.EditOject.bind(this);
        this.UpdateObject = this.UpdateObject.bind(this);
        this.CreateObject = this.CreateObject.bind(this);
        this.DeleteObject = this.DeleteObject.bind(this);
        this.CloseOperation = this.CloseOperation.bind(this);
        this.GetListOject = this.GetListOject.bind(this);

        this.apiBanknoteRequest = new BanknoteRequests();
    }

    private apiBanknoteRequest: BanknoteRequests;


    private GetContentLoaderClientInformation(): React.ReactNode {
        return (
            <Container fluid={true}>
                <ContentLoader speed={2} width='100%' height='13rem' >
                    <rect x="0" y="1rem" rx="5" ry="5" width="100%" height="2rem" />
                    <rect x="0" y="4rem" rx="5" ry="5" width="100%" height="2rem" />
                    <rect x="0" y="7rem" rx="5" ry="5" width="100%" height="2rem" />
                    <rect x="0" y="10rem" rx="5" ry="5" width="100%" height="2rem" />
                </ContentLoader>
                <div style={{ margin: "1rem 0" }}></div>
                <Row className="d-flex justify-content-center">
                    <Col className="d-flex justify-content-center">
                        <Loader
                            isViewSpiner={true}
                            isAbsolutePosition={false}
                            size={1.5}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }

    async componentDidMount() {
        await this.GetListOject();
    }



    EditOject(banknote: Banknote | null) {
        this.setState({
            selectBanknote: banknote,
            actionType: ActionTypeEnum.edit
        });
    }

    CreateNewObject() {
        this.setState({
            selectBanknote: null,
            actionType: ActionTypeEnum.create
        });
    }

    CloseOperation() {

        this.setState({
            actionType: ActionTypeEnum.view,
            selectBanknote: null
        });
    }

    async GetListOject() {
        this.setState({
            isLoading: true
        })
        let resultGetBanknotesInformation = await this.apiBanknoteRequest.GetBanknotes();

        if (resultGetBanknotesInformation.result) {
            this.setState({
                banknotes: resultGetBanknotesInformation.data,
                isLoading: false
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Получение тематик. ${ApiResponseHelper.GetErrorMessage(resultGetBanknotesInformation.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultGetBanknotesInformation.error)
            }
            ToastNotificationManager.SendToast(notificationError);

            this.setState({
                isLoading: false
            })
        }

    }

    async UpdateObject(banknote: BanknoteUpdateCommand): Promise<void> {
        this.setState({
            isProcessing: true
        })
        let resultUpdateBanknotek = await this.apiBanknoteRequest.UpdateBanknote(banknote);

        if (resultUpdateBanknotek.result) {
            let banknotes = this.state.banknotes.slice();
            let index = banknotes.findIndex(item => item.id === banknote.id);
            if (index >= 0) {
                banknotes[index] = {
                    ...banknotes[index],
                    label: banknote.label,
                    nominalValue: banknote.nominalValue,
                    isActive: banknote.isActive,
                }
            }
            this.setState({
                banknotes: banknotes,
                isProcessing: false,
                selectBanknote: null,
                actionType: ActionTypeEnum.view
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Редактирование купюры. ${ApiResponseHelper.GetErrorMessage(resultUpdateBanknotek.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultUpdateBanknotek.error)
            }
            ToastNotificationManager.SendToast(notificationError);

            this.setState({
                isProcessing: false
            })
        }
    }

    async CreateObject(banknote: BanknoteCreateCommand): Promise<void> {
        this.setState({
            isProcessing: true
        })
        let resultCreateBanknote = await this.apiBanknoteRequest.CreateBanknote(banknote);

        if (resultCreateBanknote.result && resultCreateBanknote.data) {
            let banknotes = this.state.banknotes;
            let newBanknote: Banknote = {
                id: resultCreateBanknote.data,
                label: banknote.label,
                nominalValue: banknote.nominalValue,
                isActive: banknote.isActive,
            }
            banknotes.push(newBanknote);
            this.setState({
                banknotes: banknotes,
                isProcessing: false,
                selectBanknote: null,
                actionType: ActionTypeEnum.view
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Создание банкноты. ${ApiResponseHelper.GetErrorMessage(resultCreateBanknote.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultCreateBanknote.error)
            }
            ToastNotificationManager.SendToast(notificationError);

            this.setState({
                isProcessing: false

            })
        }

    }

    async DeleteObject(id: string): Promise<void> {
        this.setState({
            isProcessing: true
        })
        let resultDeleteBanknote = await this.apiBanknoteRequest.DeleteBanknote(id);

        if (resultDeleteBanknote.result) {
            let banknotes = this.state.banknotes.slice();

            this.setState({
                banknotes: banknotes.filter(item => item.id !== id),
                isProcessing: false,
                selectBanknote: null,
                actionType: ActionTypeEnum.view
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Удаление купюры. ${ApiResponseHelper.GetErrorMessage(resultDeleteBanknote.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultDeleteBanknote.error)
            }
            ToastNotificationManager.SendToast(notificationError);

            this.setState({
                isProcessing: false
            })
        }
    }


    render() {
        return (
            <React.Fragment>

                {this.state.isProcessing &&
                    <Loader
                        isViewSpiner={true}
                        isAbsolutePosition={true}
                        size={1.5}
                    />
                }
                {this.state.isLoading
                    ? this.GetContentLoaderClientInformation()
                    :
                    <Container fluid={true}>
                        <div style={{ margin: "0.5rem 0" }}></div>
                        <Row>
                            <Col className="d-flex justify-content-start align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                <span style={{
                                    color: "#6c757d",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold"
                                }}>Банкноты</span>
                            </Col>
                        </Row>
                        <div style={{ margin: "0.5rem 0" }}></div>
                        <Row className="d-flex justify-content-start" >
                            <Col xs="auto" sm="auto" md="6" xl="6" xxl="6" className="d-flex justify-content-start align-items-center">
                                <Row className="d-flex justify-content-start">
                                    <div style={{ margin: "0.2rem 0" }}></div>

                                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="d-flex justify-content-start align-items-center">
                                        <IconButton
                                            onClick={() => {
                                                this.CreateNewObject();
                                            }}
                                            icon={<Icon icon="plus" />}
                                            circle
                                            size="lg" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div style={{ margin: "0.5rem 0" }}></div>
                        <List >
                            <List.Item >
                                <Row className="d-flex justify-content-start align-items-center">
                                    <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex  justify-content-center justify-content-md-start align-items-center">
                                        <span style={{ textAlign: "center" }}>Наименование</span>
                                    </Col>
                                    <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                        <span style={{ textAlign: "center" }}>Номинал</span>
                                    </Col>

                                    <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                        <span style={{ textAlign: "center" }}>Активен</span>
                                    </Col>
                                    <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex justify-content-center justify-content-md-start align-items-center">

                                    </Col>
                                </Row>
                            </List.Item>
                            {this.state.actionType === ActionTypeEnum.create &&
                                <BanknoteForm
                                    editBanknote={null}
                                    actionType={this.state.actionType}
                                    UpdateOject={this.UpdateObject}
                                    CreateOject={this.CreateObject}
                                    CloseOperation={this.CloseOperation}
                                />
                            }
                            {map(this.state.banknotes, (item, key) => {
                                return (
                                    this.state.actionType == ActionTypeEnum.edit &&
                                    this.state.selectBanknote !== null &&
                                    this.state.selectBanknote.id == item.id)
                                    ? <BanknoteForm
                                        key={key}
                                        editBanknote={item}
                                        actionType={this.state.actionType}
                                        UpdateOject={this.UpdateObject}
                                        CreateOject={this.CreateObject}
                                        CloseOperation={this.CloseOperation}
                                    />
                                    : <List.Item key={key}>
                                        <Row className="d-flex justify-content-start align-items-center">
                                            <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex  justify-content-center justify-content-md-start align-items-center">



                                                <span style={{ color: "black", fontSize: "1rem", textAlign: "center" }}>{item.label || '--'}</span>
                                            </Col>
                                            <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                                <span style={{ color: "#6c757d", fontSize: "0.9rem", textAlign: "center" }}>{item.nominalValue}</span>
                                            </Col>
                                            <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                                {item.isActive
                                                    ? <Icon icon="check" style={{ color: "green" }} />
                                                    : <Icon icon="close" style={{ color: "red" }} />}
                                            </Col>
                                            <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                                <IconButton
                                                    onClick={() => {
                                                        this.EditOject(item)

                                                    }}
                                                    icon={<Icon icon="edit" />}
                                                    disabled={
                                                        this.state.selectBanknote !== null &&
                                                        this.state.selectBanknote.id == item.id
                                                    }
                                                    circle
                                                />
                                                <IconButton
                                                    onClick={async () => {
                                                        await this.DeleteObject(item.id)

                                                    }}
                                                    icon={<Icon icon="minus" size="2x" style={{ verticalAlign: 0, color: "red" }} />}
                                                    circle
                                                />
                                            </Col>
                                        </Row>
                                    </List.Item>
                            })
                            }
                        </List>
                    </Container>
                }
            </React.Fragment>
        )
    }
}

