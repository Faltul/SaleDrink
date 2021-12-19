import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import validator from 'validator';
import { withFormik, FormikProps, FormikErrors, Field, FieldProps } from "formik";
import { Icon, Input,
    InputNumber, List, IconButton, Checkbox
} from 'rsuite';
import { ActionTypeEnum } from '../../../../models/ComponentStateMode';
import { Drink, DrinkUpdateCommand, DrinkCreateCommand } from '../../../../models/DrinkModels';


interface DrinkFormProps { 
    editDrink: Drink | null,
    actionType: ActionTypeEnum,
    UpdateOject(drink: DrinkUpdateCommand): Promise<void>,
    CreateOject(drink: DrinkCreateCommand): Promise<void>,
    CloseOperation(): void,
}

interface DrinkFormValue {
    label: string;
    price: number;
    quantity: number;
    isActive: boolean;
}

class DrinkForm extends React.PureComponent<DrinkFormProps & FormikProps<DrinkFormValue>>
{

    constructor(props: DrinkFormProps & FormikProps<DrinkFormValue>) {
        super(props);

    }

    render() {
        const {
            errors,
            handleSubmit,
            setFieldValue,
            setValues,
            values,
        } = this.props;

        return (
            <React.Fragment>
                <List.Item >
                    <Row className="d-flex justify-content-start align-items-center">
                        <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex pt-2 pt-md-0 justify-content-center justify-content-md-start align-items-center">
                            <Input
                                name="label"
                                placeholder="" 
                                style={{ borderColor: errors.label && "red" }}
                                value={values.label}
                                onChange={(value) => {
                                    setFieldValue("label", value, true)
                                }}
                            />
                        </Col>
                        <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3"  className="d-flex pt-2 pt-md-0  justify-content-center justify-content-md-start align-items-center">
                            <InputNumber
                                name="price"
                                placeholder=""
                                min={0}
                                style={{ borderColor: errors.price && "red" }}
                                value={values.price}
                                onChange={(value) => {
                                    setFieldValue("price", value, true)
                                }}
                            />
                        </Col>
                        <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2"  className="d-flex pt-2 pt-md-0  justify-content-center justify-content-md-start align-items-center">
                            <InputNumber
                                name="quantity"
                                placeholder=""
                                min={0}
                                style={{ borderColor: errors.quantity && "red" }}
                                value={values.quantity}
                                onChange={(value) => {
                                    setFieldValue("quantity", value, true)
                                }}
                            />
                        </Col>
                        <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex pt-2 pt-md-0  justify-content-center justify-content-md-start align-items-center">
                            <Checkbox
                                checked={values.isActive}
                                onChange={(value)=>{
                                    setFieldValue("isActive", !values.isActive, true)

                                }}
                                value={values.isActive}>
                            </Checkbox>

                        </Col>
                        <Col xs="12" sm="12" md="2" lg="2" xl="2" xxl="2" className="d-flex  pt-2 pt-md-0 justify-content-center justify-content-md-start align-items-center">
                            <IconButton
                                onClick={() => {
                                    handleSubmit();

                                }}
                                color="green"
                                icon={<Icon icon="save" />}
                                disabled={!this.props.isValid}
                                circle
                            />
                            <IconButton
                                onClick={() => {
                                    this.props.CloseOperation();

                                }}
                                icon={<Icon icon="close" />}
                                circle
                            />
                        </Col>
                    </Row>
                </List.Item>

            </React.Fragment >
        )
    }
}

export default withFormik<DrinkFormProps, DrinkFormValue>({
    enableReinitialize: false,
    validateOnMount: true,
    validateOnChange: true,
    mapPropsToValues: (props: DrinkFormProps) => ({
        label: props.editDrink != null ? props.editDrink.label : "",
        price: props.editDrink != null ? props.editDrink.price : 0,
        quantity: props.editDrink != null ? props.editDrink.quantity : 0,
        isActive: props.editDrink != null ? props.editDrink.isActive : true,
    }),
    validate: (values: DrinkFormValue, props: DrinkFormProps) => {
        let errors: FormikErrors<DrinkFormValue> = {};
        if (!values.label || values.label == "" ) {
            errors.label = 'Не указано наименование'
        }
        if (values.price<0 ||
            !validator.isInt(values.price.toString())) {
            errors.price = 'Не указана цена'
        }
        if (values.quantity<0 || 
            !validator.isInt(values.quantity.toString())) {
            errors.quantity = 'Не указано колличество'
        }
        return errors;
    },
    handleSubmit: async (
        valuesForm: DrinkFormValue,
        { props, setSubmitting, setErrors, setStatus, resetForm, validateForm }
    ) => {
        if (props.actionType===ActionTypeEnum.edit &&
            props.editDrink)
        {
            let drink: DrinkUpdateCommand=
            {
                id: props.editDrink.id,
                label: valuesForm.label,
                price: valuesForm.price,
                quantity: valuesForm.quantity,
                isActive: valuesForm.isActive,
            }
            await props.UpdateOject(drink);
        }
        if (props.actionType===ActionTypeEnum.create)
        {
            let drink: DrinkCreateCommand=
            {
                label: valuesForm.label,
                price: valuesForm.price,
                quantity: valuesForm.quantity,
                isActive: valuesForm.isActive,
            }
            await props.CreateOject(drink);
        }
    }
})(DrinkForm);


