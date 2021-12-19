import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, } from 'react-bootstrap';
import {
    Button, Avatar, Rate
} from 'rsuite';
import { map, groupBy, sumBy } from 'lodash';
import ContentLoader from "react-content-loader"
import * as signalR from "@microsoft/signalr";
import { Loader } from '../generic/component/Loader';
import SuccessSale from './components/SuccessSale';
import { ApiUrls } from '../../constants/ApiUrls'
import { Settings } from '../../constants/Settings'
import { Drink, SaleDrinkRefund } from '../../models/DrinkModels'
import { Banknote } from '../../models/BanknoteModels';
import { NotificationTypeEnum, NotificationToast } from '../../models/NotificationModels'
import { ToastNotificationManager } from '../../infrastructure/ToastNotificationManager'
import { ApiResponseHelper } from '../../infrastructure/utils/ApiResponseHelper'
import { ApplicationState } from '../../store';
import * as SaleDrinkStore from '../../store/SaleDrinkStore';
import { DrinkRequests } from '../../apiRequests/DrinkRequests';




type SaleDrinkProps =
    SaleDrinkStore.SaleDrinkState &
    typeof SaleDrinkStore.actionCreators;


interface SaleDrinkState {
    isLoadingProcessing: boolean;
    hubConnection: signalR.HubConnection | null;
    amount: number;
    useBanknotes: Banknote[];
    refund: SaleDrinkRefund | null;


}


class SaleDrink extends React.PureComponent<SaleDrinkProps, SaleDrinkState> {

    constructor(props: SaleDrinkProps) {
        super(props)
        this.state = {
            isLoadingProcessing: false,
            amount: 0,
            useBanknotes: [],
            refund: null,
            hubConnection: null,
        }
        this.ConnectHub = this.ConnectHub.bind(this);
        this.Reconnect = this.Reconnect.bind(this);
        this.GetQuantityRate = this.GetQuantityRate.bind(this);
        this.GetQuantityColor = this.GetQuantityColor.bind(this);
        this.SaleDrinkCommand = this.SaleDrinkCommand.bind(this);
        this.CloseSale = this.CloseSale.bind(this);

        this.apiDrinkRequest = new DrinkRequests();


    }

    private apiDrinkRequest: DrinkRequests;


    async componentDidMount() {
        await this.apiDrinkRequest.Init();
        await this.props.InitSaleDrinkAction();
        await this.props.GetSaleDrinkDataAction();
        await this.ConnectHub();
    }

    async componentWillUnmount() {
        this.state.hubConnection?.stop()
            .finally(() => {
                this.state.hubConnection?.off("ChangeBanknote")
                this.state.hubConnection?.off("ChangeDrink")

            })
        await this.apiDrinkRequest.Abort();
        await this.props.UnMountSaleDrinkAction()
    }

    private async ConnectHub() {
        if (this.state.hubConnection === null) {

            let hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(ApiUrls.SaleDrinkHub)
                .configureLogging(signalR.LogLevel.None)
                .build();
            hubConnection.start().then(a => {

                this.setState({
                    hubConnection: hubConnection
                });
                hubConnection.onclose(() => {
                    setTimeout(() => { this.Reconnect() }, 30000)

                });
                hubConnection.on("ChangeBanknote", async (banknote: Banknote) => {
                    await this.props.ChangeBanknoteAction(banknote);
                });
                hubConnection.on("ChangeDrink", async (drink: Drink) => {
                    await this.props.ChangeDrinkAction(drink);
                });
            })
                .catch(error => {
                    let notificationError: NotificationToast = {
                        type: NotificationTypeEnum.danger,
                        message: `Не удалось подключиться к сервису получения обновленной информации о напитках`,
                    }
                    ToastNotificationManager.SendToast(notificationError);


                });
        }
    }

    private Reconnect() {
        if (this.state.hubConnection) {
            this.state.hubConnection.start().catch(() => {
                setTimeout(() => { this.Reconnect() }, 30000)
            });
        }
    }

    private GetContentLoaderSaleDrink(): React.ReactNode {
        return (
            <Container fluid={true}>
                <ContentLoader speed={2} width='100%' height='17rem' >
                    <rect x="0" y="1rem" rx="5" ry="5" width="100%" height="1rem" />
                    <rect x="0" y="3rem" rx="5" ry="5" width="100%" height="1rem" />
                    <rect x="0" y="5rem" rx="5" ry="5" width="100%" height="1rem" />
                    <rect x="0" y="7rem" rx="5" ry="5" width="100%" height="1rem" />
                    <rect x="0" y="9rem" rx="5" ry="5" width="100%" height="1rem" />
                    <rect x="0" y="11rem" rx="5" ry="5" width="100%" height="1rem" />
                    <rect x="0" y="13rem" rx="5" ry="5" width="100%" height="1rem" />
                    <rect x="0" y="15rem" rx="5" ry="5" width="100%" height="1rem" />
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

    private GetQuantityRate(quantity: number): number {
        if (quantity >= Settings.HighQuantityDrink) {
            return 3;
        }
        else if (quantity >= Settings.MiddleQuantityDrink &&
            quantity < Settings.HighQuantityDrink) {
            return 2;
        }
        else if (quantity >= Settings.LowQuantityDrink &&
            quantity < Settings.MiddleQuantityDrink) {
            return 1;
        }
        else {
            return 0;

        }

    }

    private GetQuantityColor(quantity: number): string {
        if (quantity >= Settings.HighQuantityDrink) {
            return "green";
        }
        else if (quantity >= Settings.MiddleQuantityDrink &&
            quantity < Settings.HighQuantityDrink) {
            return "yellow";
        }
        else if (quantity >= Settings.LowQuantityDrink &&
            quantity < Settings.MiddleQuantityDrink) {
            return "red";
        }
        else {
            return "red";
        }

    }

    private async SaleDrinkCommand(drinkId: string): Promise<void> {
        this.setState({
            isLoadingProcessing: true
        })
        let resultSaleDrink = await this.apiDrinkRequest.SaleDrink({
            drinkId: drinkId,
            banknotesId:  map(this.state.useBanknotes,item=>item.id)
        });
        if (resultSaleDrink.result) {
            this.setState({
                isLoadingProcessing: false,
                amount: 0,
                useBanknotes: [],
                refund: resultSaleDrink.data
            })
            let notificationSuccess: NotificationToast = {
                type: NotificationTypeEnum.success,
                message: `Покупка успешно выполнена`,
            }
            ToastNotificationManager.SendToast(notificationSuccess);
        }
        else {
            let notificationError: NotificationToast = {
                type: NotificationTypeEnum.danger,
                message: `Покупка. ${ApiResponseHelper.GetErrorMessage(resultSaleDrink.error)}`,
                additionalMessage: ApiResponseHelper.GetErrorGuid(resultSaleDrink.error)
            }
            ToastNotificationManager.SendToast(notificationError);

            this.setState({
                isLoadingProcessing: false
            })
        }

    }

    private CloseSale(): void {
        this.setState({
            refund: null
        })
    }



    render() {
        return (
            <React.Fragment>
                {this.state.isLoadingProcessing &&
                    <Loader
                        isAbsolutePosition={true}
                        isViewSpiner={true}
                        paddingTop="2rem"
                        possition="top" />

                }
                {this.props.isLoading
                    ? this.GetContentLoaderSaleDrink()
                    : <Container fluid>

                        {this.state.refund &&
                            <SuccessSale
                                isOpen={this.state.refund !== null}
                                refund={this.state.refund}
                                CloseSuccessSaleModal={this.CloseSale} />

                        }
                        <div className="d-flex flex-wrap justify-content-center">
                            {map(this.props.drinks, (drink, key) => (
                                <Col key={key} className="p-2" style={{ minWidth: "10rem" }}  >
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <span className="text-nowrap" style={{ color: "#6c757d", fontSize: "1rem", textAlign: "left" }}>{drink.label}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <Avatar
                                                size="lg"
                                                circle
                                                src={'TestLogo.png'}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <Rate value={this.GetQuantityRate(drink.quantity)} max={3} readOnly={true} color={this.GetQuantityColor(drink.quantity)} />

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <strong>{drink.price}</strong>₽
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <Button
                                                block
                                                disabled={!drink.isActive || drink.price > this.state.amount ||drink.quantity<=0}
                                                onClick={async () => {
                                                    await this.SaleDrinkCommand(drink.id)
                                                }}>
                                                Выбрать
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </div>
                        <div style={{ margin: "5rem 0" }}></div>
                        <div className="d-flex flex-wrap justify-content-center">
                            {map(this.props.banknotes, (banknote, key) => (
                                <Col key={key} className="p-2" style={{ minWidth: "10rem" }}  >
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <span className="text-nowrap" style={{ color: "#6c757d", fontSize: "1rem", textAlign: "left" }}>{banknote.label}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <span style={{ fontSize: "1.2rem", textAlign: "center" }}><strong>{banknote.nominalValue}₽</strong></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                            <Button
                                                block
                                                color="blue"
                                                disabled={!banknote.isActive}
                                                onClick={() => {
                                                    this.setState({
                                                        amount: this.state.amount + banknote.nominalValue,
                                                        useBanknotes: [...this.state.useBanknotes, banknote]
                                                    })
                                                }}>
                                                Внести
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </div>
                        <div style={{ margin: "5rem 0" }}></div>
                        <Row>
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                        <span className="text-nowrap" style={{ color: "#6c757d", fontSize: "1rem", textAlign: "left" }}>Внесено:</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                        <span style={{ fontSize: "1.2rem", textAlign: "center" }}><strong style={{ fontSize: "1.2rem", color: this.state.amount > 0 ? "green" : "red" }}>{this.state.amount}</strong>₽</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {this.state.useBanknotes.length>0 &&
                            <React.Fragment>
                                <div style={{ margin: "1rem 0" }}></div>
                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                        <Button
                                            color="red"
                                            disabled={!this.state.useBanknotes.length}
                                            onClick={() => {
                                                this.setState({
                                                    amount: 0,
                                                    useBanknotes: []
                                                })
                                            }}>
                                            Отменить
                                        </Button>
                                    </Col>
                                </Row>
                            </React.Fragment>
                        }
                        {this.state.useBanknotes.length>0 &&
                            <React.Fragment>
                                <div style={{ margin: "1rem 0" }}></div>
                                <Row>
                                    <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                        <span className="text-nowrap" style={{ color: "#6c757d", fontSize: "1rem", textAlign: "left" }}>Купюры:</span>
                                    </Col>
                                </Row>
                                <div className="d-flex flex-wrap justify-content-start">
                                    {map(groupBy(this.state.useBanknotes, item => item.id), (banknotes, key) => (
                                        <Col key={key} className="p-2" style={{ minWidth: "10rem" }}  >
                                            <Row>
                                                <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                                    <strong>{banknotes[0].label}</strong>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                                    <span className="text-nowrap" style={{ fontSize: "1rem", textAlign: "left" }}>Колличество: <strong>{banknotes.length}</strong>шт.</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="d-flex justify-content-center align-items-center" xs="12" sm="12" md="12" lg="12" xl="12">
                                                    <span className="text-nowrap" style={{ fontSize: "1rem", textAlign: "left" }}>Сумма: <strong>{sumBy(banknotes, item => item.nominalValue)}</strong>₽</span>
                                                </Col>
                                            </Row>

                                        </Col>
                                    ))}
                                </div>
                            </React.Fragment>
                        }

                    </Container>
                }
            </React.Fragment>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.saleDrink,
    SaleDrinkStore.actionCreators
)(SaleDrink as any);
