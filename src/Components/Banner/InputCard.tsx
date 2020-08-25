import React from 'react';
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import {TextField, Button, withStyles, createStyles} from "@material-ui/core"
import {
    Formik,
    Form,
    FormikHelpers
} from "formik"
import * as yup from "yup";
import DropzoneComponent from "./DropzoneComponent";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import {Theme as AugmentedTheme} from "@material-ui/core/styles"
import {styled as styledMaterial} from "@material-ui/core/styles";


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
  padding : theme.spacing(0)
}));

let ContactFormSchema = yup.object().shape({
    description: yup.string().required("빈 칸을 채워주세요."),
    link: yup.string().required("빈 칸을 채워주세요."),
    image: yup.string().required("이미지를 넣어주세요."),
})

interface Values {
    description: string | undefined;
    link: string;
    image: string;
}

const InputCard: React.FunctionComponent = () => {


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
                                <DropzoneComponent/>
                                <FormUpload>
                                    <Group
                                        margin={"dense"}
                                        error={errors.description && touched.description}
                                        onChange={handleChange}
                                        autoComplete="description"
                                        name="description"
                                        variant="outlined"
                                        id="description"
                                        label="설명"
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
                                        autoFocus
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
                                        label="위 박스를 클릭하여 이미지를 주세요."
                                        disabled={true}
                                        color={"secondary"}
                                        autoFocus
                                        helperText={
                                            errors.image && touched.image
                                                ? errors.image
                                                : null
                                        }
                                    />
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        style={{alignSelf: "center"}}
                                    >
                                        SAVE
                                    </Button>
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