import React, {useContext} from 'react';
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core"
import {
    Formik,
    Form,
    FormikHelpers
} from "formik"
import * as yup from "yup";
import DropzoneComponent from "./DropzoneComponent";
import {styled as styledMaterial} from "@material-ui/core/styles";
import Context from "../../Context/context";
import theme from "@saraceninc/saracen-style-ts/lib/theme";


const Col = styled(SS.Core.Col)`
box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
padding: 10px 10px;
display: flex;
`;
const FormUpload = styled(Form)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  > div {
    width: 100%;
  }
`;
const Group = styledMaterial(TextField)(({theme}) => ({
    padding: theme.spacing(0)
}));

let ContactFormSchema = yup.object().shape({
    description: yup.string().required("빈 칸을 채워주세요."),
    link: yup.string().required("빈 칸을 채워주세요."),
    image: yup.string().required("이미지를 넣어주세요."),
})

interface IProps {
    app? : boolean
}
interface Values {
    description: string | undefined;
    link: string;
    image: string;
}

const InputCard: React.FunctionComponent<IProps> = ({app}) => {

    const {reserveCheck, handleReserve, filename} = useContext(Context);

    return (
        <SS.Core.Row>
            <Col className={"formik"}>
                <Formik
                    initialValues={{
                        description: '',
                        link: '',
                        image: '',
                    }}
                    validationSchema={ContactFormSchema}
                    onSubmit={(
                        values: Values,
                        {setSubmitting}: FormikHelpers<Values & any>) => {
                        console.log(values)
                    }}
                >
                    {
                        ({
                             errors,
                             handleChange,
                             touched
                         }: any) => (
                            <>
                                <DropzoneComponent app={app}/>
                                <FormUpload>
                                    <Group
                                        margin={"dense"}
                                        error={errors.description && touched.description}
                                        onChange={handleChange}
                                        autoComplete="description"
                                        name="description"
                                        variant="outlined"
                                        id="description"
                                        label="제목"
                                        color={"secondary"}
                                        autoFocus
                                        helperText={
                                            errors.description && touched.description
                                                ? errors.description
                                                : null
                                        }
                                    />
                                    <Group
                                        margin={"dense"}
                                        error={errors.link && touched.link}
                                        onChange={handleChange}
                                        autoComplete="link"
                                        name="link"
                                        variant="outlined"
                                        id="link"
                                        label="링크"
                                        color={"secondary"}
                                        helperText={
                                            errors.link && touched.link
                                                ? errors.link
                                                : null
                                        }
                                    />
                                    <Group
                                        margin={"dense"}
                                        error={errors.image && touched.image}
                                        onChange={handleChange}
                                        autoComplete="image"
                                        name="image"
                                        variant="outlined"
                                        id="image"
                                        placeholder="위 박스를 클릭하여 이미지를 올려주세요."
                                        value={filename}
                                        disabled={true}
                                        color={"secondary"}
                                        autoFocus
                                        helperText={
                                            errors.image && touched.image
                                                ? errors.image
                                                : null
                                        }
                                    />
                                    <SS.Core.RowF>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            style={{alignSelf: "center"}}
                                        >
                                            SAVE
                                        </Button>
                                        <SS.Core.InputRow
                                            style={{border: `none`, backgroundColor: "transparent", margin: "0 10px"}}
                                            width={"fit-content"}>
                                            <SS.Core.Input style={{position: "unset"}} id={"reserve"} type={"checkBox"}
                                                           checked={reserveCheck} onChange={handleReserve}/>
                                            <label style={{padding: "5px"}} htmlFor={"reserve"}>예약</label>
                                        </SS.Core.InputRow>
                                        <SS.Core.Text display={"flex"} alignItems={"center"} flex={"1"} justifyContent={"flex-end"}>
                                            마지막 수정일 : <SS.Core.Span fontSize={"transparent"} margin={"0 20px 0 5px"}>{`날짜`}</SS.Core.Span>
                                            마지막 수정자 : <SS.Core.Span fontSize={"transparent"} margin={"0 0 0 5px"}>{`김승석`}</SS.Core.Span>
                                        </SS.Core.Text>
                                    </SS.Core.RowF>
                                </FormUpload>
                            </>
                        )
                    }
                </Formik>
            </Col>
        </SS.Core.Row>
    );
};

export default InputCard;