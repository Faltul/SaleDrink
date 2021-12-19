import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { withFormik, FormikProps, FormikErrors } from "formik";
import validator from 'validator';
import { Icon, Input,
    InputNumber, List, IconButton, Checkbox
} from 'rsuite';
import { ActionTypeEnum } from '../../../../models/ComponentStateMode';
import { Banknote, BanknoteUpdateCommand, BanknoteCreateCommand } from '../../../../models/BanknoteModels';


interface BanknoteFormProps {
    editBanknote: Banknote | null,
    actionType: ActionTypeEnum,
    UpdateOject(banknote: BanknoteUpdateCommand): Promise<void>,
    CreateOject(banknote: BanknoteCreateCommand): Promise<void>,
    CloseOperation(): void,
}

interface BanknoteFormValue {
    label: string;
    nominalValue: number ;
    isActive: boolean;
}

 class BanknoteForm extends React.PureComponent<BanknoteFormProps & FormikProps<BanknoteFormValue>>
{

    constructor(props: BanknoteFormProps & FormikProps<BanknoteFormValue>) {
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
                                name="nominalValue"
                                placeholder=""
                                min={0}
                                style={{ borderColor: errors.nominalValue && "red" }}
                                value={values.nominalValue}
                                onChange={(value) => {
                                    setFieldValue("nominalValue",  value, true)
                                }}
                            />
                        </Col>
                      
                        <Col xs="12" sm="12" md="3" lg="3" xl="3" xxl="3" className="d-flex pt-2 pt-md-0  justify-content-center justify-content-md-start align-items-center">
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

export default withFormik<BanknoteFormProps, BanknoteFormValue>({
    enableReinitialize: false,
    validateOnMount: true,
    validateOnChange: true,
    mapPropsToValues: (props: BanknoteFormProps) => ({
        label: props.editBanknote != null ? props.editBanknote.label : "",
        nominalValue: props.editBanknote != null ? props.editBanknote.nominalValue : 0,
        isActive: props.editBanknote != null ? props.editBanknote.isActive : true,
    }),
    validate: (values: BanknoteFormValue, props: BanknoteFormProps) => {
        let errors: FormikErrors<BanknoteFormValue> = {};
        if (!values.label || values.label == "" ) {
            errors.label = 'Не указано наименование'
        }
        if (values.nominalValue<0  ||
            !validator.isInt(values.nominalValue.toString())) {
            
            errors.nominalValue = 'Не указан номинал' 
        }
        return errors; 
    },
    handleSubmit: async (
        valuesForm: BanknoteFormValue,
        { props, setSubmitting, setErrors, setStatus, resetForm, validateForm }
    ) => {
        if (props.actionType===ActionTypeEnum.edit &&
            props.editBanknote)
        {
            let banknote: BanknoteUpdateCommand=
            {
                id: props.editBanknote.id,
                label: valuesForm.label,
                nominalValue: valuesForm.nominalValue,
                isActive: valuesForm.isActive,
            }
            await props.UpdateOject(banknote);
        }
        if (props.actionType===ActionTypeEnum.create)
        {
            let banknote: BanknoteCreateCommand=
            {
                label: valuesForm.label,
                nominalValue: valuesForm.nominalValue,
                isActive: valuesForm.isActive,
            }
            await props.CreateOject(banknote);
        }
    }
})(BanknoteForm);


