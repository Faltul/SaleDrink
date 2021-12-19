import * as React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ContentLoader from "react-content-loader";
import { Loader } from '../../generic/component/Loader';
import { IconButton, Icon, List } from 'rsuite';
import { map } from 'lodash';
import DrinkForm from './form/DrinkForm'
import { Drink, DrinkUpdateCommand, DrinkCreateCommand } from '../../../models/DrinkModels'
import { ActionTypeEnum } from '../../../models/ComponentStateMode';
import { NotificationTypeEnum, NotificationToast } from '../../../models/NotificationModels'
import { ToastNotificationManager } from '../../../infrastructure/ToastNotificationManager'
import { ApiResponseHelper } from '../../../infrastructure/utils/ApiResponseHelper'
import { DrinkRequests } from '../../../apiRequests/DrinkRequests';


interface DrinkManagmentProps {

}

interface DrinkManagmentState {
    isLoading: boolean;
    isProcessing: boolean;
    drinks: Drink[],
    selectDrink: Drink | null,
    actionType: ActionTypeEnum;
}

export default class DrinkManagment extends React.PureComponent<DrinkManagmentProps, DrinkManagmentState> {
    constructor(props: DrinkManagmentProps) {
        super(props)

        this.state = {
            isLoading: false,
            isProcessing: false,
            drinks: [],
            selectDrink: null,
            actionType: ActionTypeEnum.view,
        }
        this.EditOject = this.EditOject.bind(this);
        this.UpdateObject = this.UpdateObject.bind(this);
        this.CreateObject = this.CreateObject.bind(this);
        this.DeleteObject = this.DeleteObject.bind(this);
        this.CloseOperation = this.CloseOperation.bind(this);
        this.GetListOject = this.GetListOject.bind(this);

        this.apiDrinkRequest = new DrinkRequests();
    }

    private apiDrinkRequest: DrinkRequests;


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



    EditOject(drink: Drink | null) {
        this.setState({
            selectDrink: drink,
            actionType: ActionTypeEnum.edit
        });
    }

    CreateNewObject() {
        this.setState({
            selectDrink: null,
            actionType: ActionTypeEnum.create
        });
    }

    CloseOperation() {

        this.setState({
            actionType: ActionTypeEnum.view,
            selectDrink: null
        });
    }

    async GetListOject() {
        this.setState({
            isLoading: true
        })
        let resultGetDrinksInformations = await this.apiDrinkRequest.GetDrinks();

        if (resultGetDrinksInformations.result) {
            this.setState({
                drinks: resultGetDrinksInformations.data,
                isLoading: false
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Получение тематик. ${ApiResponseHelper.GetErrorMessage(resultGetDrinksInformations.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultGetDrinksInformations.error)
            }
            ToastNotificationManager.SendToast(notificationError);

            this.setState({
                isLoading: false
            })
        }

    }

    async UpdateObject(drink: DrinkUpdateCommand): Promise<void> {
        this.setState({
            isProcessing: true
        })
        let resultUpdateDrink = await this.apiDrinkRequest.UpdateDrink(drink);

        if (resultUpdateDrink.result) {
            let drinks = this.state.drinks.slice();
            let index = drinks.findIndex(item => item.id === drink.id);
            if (index >= 0) {
                drinks[index] = {
                    ...drinks[index],
                    label: drink.label,
                    price: drink.price,
                    quantity: drink.quantity,
                    isActive: drink.isActive,
                }
            }
            this.setState({
                drinks: drinks,
                isProcessing: false,
                selectDrink: null,
                actionType: ActionTypeEnum.view
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Редактирование напитка. ${ApiResponseHelper.GetErrorMessage(resultUpdateDrink.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultUpdateDrink.error)
            }
            ToastNotificationManager.SendToast(notificationError);

            this.setState({
                isProcessing: false
            })
        }
    }

    async CreateObject(drink: DrinkCreateCommand): Promise<void> {
        this.setState({
            isProcessing: true
        })
        let resultCreateDrink = await this.apiDrinkRequest.CreateDrink(drink);

        if (resultCreateDrink.result && resultCreateDrink.data) {
            let drinks = this.state.drinks;
            let newDrink: Drink = {
                id: resultCreateDrink.data,
                label: drink.label,
                price: drink.price,
                quantity: drink.quantity,
                isActive: drink.isActive,
            }
            drinks.push(newDrink);
            this.setState({
                drinks: drinks,
                isProcessing: false,
                selectDrink: null,
                actionType: ActionTypeEnum.view
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Создание напитка. ${ApiResponseHelper.GetErrorMessage(resultCreateDrink.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultCreateDrink.error)
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
        let resultDeleteDrink = await this.apiDrinkRequest.DeleteDrink(id);

        if (resultDeleteDrink.result) {
            let drinks = this.state.drinks.slice();

            this.setState({
                drinks: drinks.filter(item => item.id !== id),
                isProcessing: false,
                selectDrink: null,
                actionType: ActionTypeEnum.view
            });

        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Удаление напитка. ${ApiResponseHelper.GetErrorMessage(resultDeleteDrink.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultDeleteDrink.error)
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
                                }}>Напитки</span>
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
                                        <span style={{ textAlign: "center" }}>Цена</span>
                                    </Col>
                                    <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                        <span style={{ textAlign: "center" }}>Колличество</span>
                                    </Col>
                                    <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                        <span style={{ textAlign: "center" }}>Активен</span>
                                    </Col>
                                    <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex justify-content-center justify-content-md-start align-items-center">

                                    </Col>
                                </Row>
                            </List.Item>
                            {this.state.actionType === ActionTypeEnum.create &&
                                <DrinkForm
                                    editDrink={null}
                                    actionType={this.state.actionType}
                                    UpdateOject={this.UpdateObject}
                                    CreateOject={this.CreateObject}
                                    CloseOperation={this.CloseOperation}
                                />
                            }
                            {map(this.state.drinks, (item, key) => {
                                return (
                                    this.state.actionType == ActionTypeEnum.edit &&
                                    this.state.selectDrink !== null &&
                                    this.state.selectDrink.id == item.id)
                                    ? <DrinkForm
                                        key={key}
                                        editDrink={item}
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
                                                <span style={{ color: "#6c757d", fontSize: "0.9rem", textAlign: "center" }}>{item.price}</span>
                                            </Col>
                                            <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex justify-content-center justify-content-md-start align-items-center">
                                                <span style={{ color: "#6c757d", fontSize: "0.9rem", textAlign: "center" }}>{item.quantity}</span>
                                            </Col>
                                            <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex justify-content-center justify-content-md-start align-items-center">
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
                                                        this.state.selectDrink !== null &&
                                                        this.state.selectDrink.id == item.id
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

