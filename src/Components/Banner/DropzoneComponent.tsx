import React, {useEffect, useState} from 'react';
import {DropzoneState, useDropzone} from "react-dropzone";
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";

interface DropProps {
    exist : boolean
}

const Inner = styled(SS.Core.Inner)`
padding : 5px 5px 5px 5px;
`;
const Drop = styled.div<DropProps>`
    width: 100%;
    height: 100%;
    border: 1px solid #e2e2e2;
    position: relative;
        &::before {
          content: ${props => props.exist ? "none" : ""};
          position: absolute;
          width : 10px;
          height : 50px;
          left : 50%;
          top : 50%;
          border-radius: 5px;
          transform: translate(-50%,-50%);
          background-color: black;
        }
        &::after {
          content: ${props => props.exist ? "none" : ""};
          position: absolute;
          width : 50px;
          height : 10px;
          left : 50%;
          top : 50%;
            border-radius: 5px;
          transform: translate(-50%,-50%);
          background-color: black;
        }
`;
const Preview = styled.div`
    display: flex;
    width :100%;
    min-height : 250px;
`;

interface FileProps extends File {
    preview: string
}

const DropzoneComponent: React.FunctionComponent = (props: React.PropsWithChildren<any>) => {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps, acceptedFiles}: DropzoneState = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles: any) => {
            console.log(acceptedFiles)
            setFiles(acceptedFiles.map((file: FileProps) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map((file: FileProps) => (
        <div style={{overflow: "auto", height: "100%", width: "100%"}} key={file.name}>
            <img style={{maxWidth: "100%"}}
                 src={file.preview}
            />
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file: FileProps) => URL.revokeObjectURL(file.preview));
        console.log(files, acceptedFiles)
    }, [files]);

    return (
        <Inner className="container">
            <Drop {...getRootProps({className: 'dropzone'})} exist={acceptedFiles.length > 0 ? true : false}>
                <input {...getInputProps()} />
                <Preview>
                    {thumbs}
                </Preview>
            </Drop>

        </Inner>
    );
}
export default DropzoneComponent;