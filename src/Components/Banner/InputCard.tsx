import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
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
import Alert from "@material-ui/lab/Alert"
import {ADD_BANNER, UPDATE_BANNER} from "../../Graphql";
import {useMutation} from "@apollo/client";

const styles: any = {
    alert: {
        left: '0',
        pointerEvents: 'none',
        position: 'relative',
        margin: "10px 0 0 0",
        top: 0,
        width: '100%',
    }
}

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
    alt: yup.string().required("빈 칸을 채워주세요."),
    url: yup.string().required("빈 칸을 채워주세요."),
    mainCopy: yup.string().required("빈 칸을 채워주세요."),
    subCopy: yup.string().required("빈 칸을 채워주세요."),
    color: yup.string().required("빈 칸을 채워주세요."),
    seq: yup.number().min(0, "숫자를 채워주세요").required("빈 칸을 채워주세요."),
    img: yup.string().required("이미지를 채워주세요.")
})

interface IProps {
    uploadHeight?: string
    banner?: {
        id: number, relationId: number,
        img: string, type: string,
        url: string, alt: string,
        mainCopy: string
    }
    story?: boolean
    logo?: boolean
}

interface Values {
    type?: string;
    relationId?: number;
    adminId?: number;
    img?: string;
    url?: string;
    mainCopy?: string;
    subCopy?: string;
    color?: string;
    seq?: number;
    alt?: string;

}


const InputCard: React.FunctionComponent<IProps> = ({uploadHeight, banner, story, logo}) => {

        const {
            reserveCheck, handleReserve, filename, files,
            formData, setFormData
        } = useContext(Context);

        const [flash, setFlash] = useState(false);
        let initalValues: Values = {
            type: banner?.type,
            relationId: banner?.relationId,
            adminId: 0,
            img: '',
            url: '',
            alt: ''
        }
        useEffect(() => {

        }, [])

        const [updateBanner, {data, loading}] = useMutation(UPDATE_BANNER)

        return (
            <SS.Core.Row>
                <Col className={"formik"}>
                    <Formik
                        initialValues={
                            story ?
                                initalValues = {
                                    ...initalValues,
                                    mainCopy: '',
                                    subCopy: '',
                                    color: '',
                                    seq: -1
                                } : initalValues
                        }
                        validationSchema={ContactFormSchema}
                        onSubmit={async (
                            values: Values,
                            {setSubmitting}: FormikHelpers<Values & any>) => {
                            if (reserveCheck) {
                                setFlash(true)
                                setTimeout(() => {
                                    setFlash(false)
                                }, [3000])
                                return false
                            }
                            console.log(values, files)
                            // setFormData({
                            //     ...formData, ...values,
                            //     file: files[0]
                            // });
                            await updateBanner({
                                variables: {
                                    bannerUpdateData: {...values, relationId: banner?.relationId, type: banner?.type},
                                    id: banner?.id
                                }
                            })
                        }}
                    >
                        {
                            ({
                                 errors,
                                 handleChange,
                                 touched,
                                 setFieldValue,
                             }: any) => (
                                <>
                                    {console.log(initalValues)}
                                    <DropzoneComponent uploadHeight={uploadHeight}/>
                                    <FormUpload>
                                        {story ?
                                            <>
                                                <Group
                                                    margin={"dense"}
                                                    error={errors?.alt && touched?.alt}
                                                    onChange={handleChange}
                                                    autoComplete="alt"
                                                    name="alt"
                                                    variant="outlined"
                                                    id="alt"
                                                    label="제목"
                                                    color={"secondary"}
                                                    helperText={
                                                        errors?.alt && touched?.alt
                                                            ? errors?.alt
                                                            : null
                                                    }
                                                />
                                                <Group
                                                    margin={"dense"}
                                                    error={errors?.mainCopy && touched?.mainCopy}
                                                    onChange={handleChange}
                                                    autoComplete="mainCopy"
                                                    name="mainCopy"
                                                    variant="outlined"
                                                    id="mainCopy"
                                                    label="메인카피"
                                                    color={"secondary"}
                                                    helperText={
                                                        errors?.mainCopy && touched?.mainCopy
                                                            ? errors?.mainCopy
                                                            : null
                                                    }
                                                />
                                                <Group
                                                    margin={"dense"}
                                                    error={errors?.subCopy && touched?.subCopy}
                                                    onChange={handleChange}
                                                    autoComplete="subCopy"
                                                    name="subCopy"
                                                    variant="outlined"
                                                    id="subCopy"
                                                    label="서브카피"
                                                    color={"secondary"}
                                                    helperText={
                                                        errors?.subCopy && touched?.subCopy
                                                            ? errors?.subCopy
                                                            : null
                                                    }
                                                />
                                                <Group
                                                    margin={"dense"}
                                                    error={errors?.color && touched?.color}
                                                    onChange={handleChange}
                                                    autoComplete="color"
                                                    name="color"
                                                    variant="outlined"
                                                    id="color"
                                                    label="배경색"
                                                    color={"secondary"}
                                                    helperText={
                                                        errors?.color && touched?.color
                                                            ? errors?.color
                                                            : null
                                                    }
                                                />
                                                <Group
                                                    margin={"dense"}
                                                    error={errors?.seq && touched?.seq}
                                                    onChange={handleChange}
                                                    autoComplete="seq"
                                                    name="seq"
                                                    variant="outlined"
                                                    id="seq"
                                                    label="순서"
                                                    color={"secondary"}
                                                    helperText={
                                                        errors?.seq && touched?.seq
                                                            ? errors?.seq
                                                            : null
                                                    }
                                                />
                                                <Group
                                                    margin={"dense"}
                                                    error={errors.url && touched.url}
                                                    onChange={handleChange}
                                                    autoComplete="url"
                                                    name="url"
                                                    variant="outlined"
                                                    id="url"
                                                    label="링크"
                                                    color={"secondary"}
                                                    helperText={
                                                        errors.url && touched.url
                                                            ? errors.url
                                                            : null
                                                    }
                                                />
                                            </>
                                            : <></>
                                        }
                                        {
                                            logo ?
                                                <>
                                                    <Group
                                                        margin={"dense"}
                                                        error={errors.miniImg && touched.miniImg}
                                                        autoComplete="miniImg"
                                                        onBlur={() => setFieldValue('miniImg', filename)}
                                                        name="miniImg"
                                                        variant="outlined"
                                                        id="miniImg"
                                                        placeholder="위 박스를 클릭하여 이미지를 올려주세요."
                                                        value={filename ? filename : ""}
                                                        disabled={filename ? false : true}
                                                        color={"secondary"}
                                                        autoFocus
                                                        helperText={
                                                            errors.miniImg && touched.miniImg
                                                                ? errors.miniImg
                                                                : null
                                                        }
                                                    />
                                                    <Group
                                                        margin={"dense"}
                                                        error={errors.backImgPos && touched.backImgPos}
                                                        onChange={handleChange}
                                                        autoComplete="backImgPos"
                                                        name="backImgPos"
                                                        variant="outlined"
                                                        id="backImgPos"
                                                        placeholder="위 박스를 클릭하여 이미지를 올려주세요."
                                                        value={filename ? filename : ""}
                                                        disabled={filename ? false : true}
                                                        color={"secondary"}
                                                        autoFocus
                                                        helperText={
                                                            errors.backImgPos && touched.backImgPos
                                                                ? errors.backImgPos
                                                                : null
                                                        }
                                                    />
                                                </>
                                                : <></>
                                        }
                                        <Group
                                            margin={"dense"}
                                            error={errors?.alt && touched?.alt}
                                            onChange={handleChange}
                                            autoComplete="alt"
                                            name="alt"
                                            variant="outlined"
                                            id="alt"
                                            label="제목"
                                            color={"secondary"}
                                            helperText={
                                                errors?.alt && touched?.alt
                                                    ? errors?.alt
                                                    : null
                                            }
                                        />
                                        <Group
                                            margin={"dense"}
                                            error={errors.img && touched.img}
                                            autoComplete="img"
                                            onBlur={() => setFieldValue('img', filename)}
                                            name="img"
                                            variant="outlined"
                                            id="img"
                                            placeholder="위 박스를 클릭하여 이미지를 올려주세요."
                                            value={filename ? filename : ""}
                                            disabled={filename ? false : true}
                                            color={"secondary"}
                                            autoFocus
                                            helperText={
                                                errors.img && touched.img
                                                    ? errors.img
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
                                            <SS.Core.Text display={"flex"} alignItems={"center"} flex={"1"}
                                                          justifyContent={"flex-end"}>
                                                마지막 수정일 : <SS.Core.Span fontSize={"transparent"}
                                                                        margin={"0 20px 0 5px"}>{`날짜`}</SS.Core.Span>
                                                마지막 수정자 : <SS.Core.Span fontSize={"transparent"}
                                                                        margin={"0 0 0 5px"}>{`김승석`}</SS.Core.Span>
                                            </SS.Core.Text>
                                        </SS.Core.RowF>
                                        {flash ?
                                            <Alert style={styles.alert} severity="error">예약 시간을 설정하여 주십시오.</Alert> : null}
                                    </FormUpload>
                                </>
                            )
                        }
                    </Formik>
                </Col>
            </SS.Core.Row>
        );
    }
;
export default InputCard;