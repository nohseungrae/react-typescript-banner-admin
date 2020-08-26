import React, {useEffect, useState} from 'react';
import {DropzoneState, useDropzone} from "react-dropzone";
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import theme from "@saraceninc/saracen-style-ts/lib/theme";

interface DropProps {
    exist: boolean
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
          content:  "";
          position: absolute;
          ${props => props.exist ? "width : 0" : "width : 6px"};
          height : 40px;
          left : 50%;
          top : 50%;
          border-radius: 5px;
          transform: translate(-50%,-50%);
          background-color: #ecf0f1;
        }
        &::after {
          content:  "";
          position: absolute;
          width : 40px;
          ${props => props.exist ? "height : 0" : "height : 6px"};
          left : 50%;
          top : 50%;
          border-radius: 5px;
          transform: translate(-50%,-50%);
          background-color: #ecf0f1;
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