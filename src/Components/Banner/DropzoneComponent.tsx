import React, {useContext, useEffect, useState} from 'react';
import {DropzoneState, useDropzone} from "react-dropzone";
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import Context from "../../Context/context";

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

const DropzoneComponent: React.FunctionComponent<IProps> = ({uploadHeight, imgPath, name, whichImg}) => {

    const {
        files, setFiles, setFilename, setReserveCheck, pathname
    } = useContext(Context)

    const {getRootProps, getInputProps, acceptedFiles}: DropzoneState = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            console.log(acceptedFiles, whichImg);
            setFiles({
                ...files,
                [whichImg]: acceptedFiles.map((file: FileProps) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            });

        }
    });

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

        console.log(files)
        if (files[whichImg]?.length > 0) {
            const image = document.querySelector("#img") as HTMLDivElement
            setTimeout(() => {
                image.dispatchEvent(new Event("blur", {bubbles: false}))
            }, [500])
            files[whichImg]?.forEach((file: FileProps) => {
                setFilename({
                    [whichImg] : file.name
                });
            });
        }
    }, [files]);

    useEffect(() => {
        if (files[whichImg]) {
            files[whichImg]?.map((file: any) => {
                URL.revokeObjectURL(file.preview as string)
                delete file.preview;
            })
            setFilename("");
            setReserveCheck(false)
            setFiles({});
            console.log(files, "-----여기는 pathname useEffect", pathname)
        }

    }, [pathname])


    return (
        <Inner className="container">
            <div style={{marginBottom: "5px", fontWeight: "bold"}}>
                적용시킬 {name} 이미지 : {imgPath ? "있음" : "없음"}
            </div>
            <Drop {...getRootProps({className: 'dropzone'})} exist={acceptedFiles.length > 0 ? true : false}>
                <input {...getInputProps()} />
                <Preview exist={acceptedFiles.length > 0 || imgPath ? true : false} uploadHeight={uploadHeight}>
                    {imgPath && files[whichImg]?.map((file: FileProps) => (thumbs(file)))}
                    {imgPath && files[whichImg]?.length < 1 ? thumbs(undefined) : ""}
                </Preview>
            </Drop>

        </Inner>
    );
}
export default DropzoneComponent;