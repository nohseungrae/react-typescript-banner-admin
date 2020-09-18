import React, {useContext, useEffect, useState} from 'react';
import {DropzoneState, useDropzone} from "react-dropzone";
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import Context from "../../Context/context";
import {IBanners} from "./InputCard";

interface DropProps {
    exist?: boolean
    app?: boolean
    uploadHeight?: string
}

const Inner = styled(SS.Core.Inner)`
padding : 5px 5px 5px 5px;
`;
const Drop = styled.div<DropProps>`
    width: 100%;
    height: 100%;
    border: 1px solid #e2e2e2;
    position: relative;
    display : flex;
    align-items: center;
        &::before {
          content:  "";
          position: absolute;
          height : 40px;
          left : 50%;
          top : 50%;
          border-radius: 5px;
          transform: translate(-50%,-50%);
          background-color: #3f51b5;
        }
        &::after {
          content:  "";
          position: absolute;
          width : 40px;
          left : 50%;
          top : 50%;
          border-radius: 5px;
          transform: translate(-50%,-50%);
          background-color: #3f51b5;
        }
`;
const Preview = styled.div<DropProps>`
    display: flex;
    align-items: center;
    width :100%;
    min-height : ${props => props.uploadHeight};
    position: relative;
    &::before{
    content : "";
    z-index: ${props => !props.exist ? "1" : "-1"};
    position : absolute;
    top: 30%;
    left : 50%;
    font-weight: bold;
    color : #3f51b5;
    transform: translate(-50%,0%);
    }
`;

interface IProps {
    uploadHeight?: string
    pathname?: string
    imgPath?: string
    name: string
    whichImg: string
}

interface FileProps extends File {
    preview: string | undefined
}

const DropzoneComponent: React.FunctionComponent<IProps> = ({
                                                                uploadHeight,
                                                                imgPath,
                                                                name,
                                                                whichImg,
                                                            }) => {

    const {
        files, setFiles, filename, setFilename, setReserveCheck, pathname,
        initialValues, setValueData, key
    } = useContext(Context)


    //TODO DropZone에 파일은 넣었을 경우 발동하는 FileSetting 함수---
    const {getRootProps, getInputProps, acceptedFiles}: DropzoneState = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            //이곳에서 contextAPI 에 있는 files 스테이트를 업데이트 해준다.
            //whichImg 가 img면 {img : "--"}, backImg면  {backImg : "--"}
            console.log(files, whichImg, "acceptfiles")
            setFiles({
                ...files,
                [whichImg]: acceptedFiles.map((file: FileProps) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            });

        }
    });
    //TODO DropZone에 파일은 넣었을 경우 발동하는 FileSetting 함수---

    const thumbs = (file: FileProps | undefined) => (
        <div style={{overflow: "auto", height: "100%", width: "100%"}} key={file?.name}>
            {
                file?.preview ? <img style={{maxWidth: "100%"}}
                                     src={file?.preview}
                /> : <img style={{maxWidth: "100%"}}
                          src={`${process.env.REACT_APP_SARACEN_IMG}img/banner/image/${imgPath}`}
                />
            }
        </div>
    );

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        console.log(files, "acceptfile 후에 files")
        if (files[whichImg]?.length > 0) {
            console.log(files, whichImg, "---Dropzone");
            const image = document.querySelector("#img") as HTMLDivElement
            const backImg = document.querySelector("#backImg") as HTMLDivElement
            setTimeout(() => {
                image?.dispatchEvent(new Event("blur", {bubbles: false}))
                backImg?.dispatchEvent(new Event("blur", {bubbles: false}))
            }, [500]);

            //TODO File을 업데이트 한 후에 name만 꺼내서 사용하고 싶으므로 name 스테이트 업데이트함수
            const fileNameSetting = ((files: any) => {
                setValueData({
                    [key as keyof IBanners]: {
                        ...initialValues[key as keyof IBanners],
                        img: Object.keys(files).includes("img") ? files?.img[0].name : initialValues[key as keyof IBanners].img,
                        backImg: Object.keys(files).includes("backImg") ? files?.backImg[0].name : initialValues[key as keyof IBanners].backImg
                    }
                })
            })(files)
            //TODO File을 업데이트 한 후에 name만 꺼내서 사용하고 싶으므로 name 스테이트 업데이트함수

        }
    }, [files]);

    useEffect(() => {
        if (files[whichImg]) {
            files[whichImg]?.map((file: any) => {
                URL.revokeObjectURL(file.preview as string)
                delete file.preview;
            })
            setFilename({
                ...filename,
                [whichImg]: ""
            })
        }

    }, [])


    return (
        <Inner className="container">
            <div style={{marginBottom: "5px", fontWeight: "bold"}}>
                적용시킬 {name} 이미지 : {imgPath ? "있음" : "없음"}
            </div>
            <Drop {...getRootProps({className: 'dropzone'})} exist={acceptedFiles.length > 0 ? true : false}>
                <input {...getInputProps()} />
                <Preview exist={acceptedFiles.length > 0 || imgPath ? true : false} uploadHeight={uploadHeight}>
                    {files[whichImg] ? files[whichImg].map((file: FileProps) => thumbs(file)) : thumbs(undefined)}
                </Preview>
            </Drop>

        </Inner>
    );
}
export default DropzoneComponent;