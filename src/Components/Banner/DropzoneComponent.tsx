import React, {useCallback, useContext, useEffect} from 'react';
import {DropzoneState, useDropzone} from "react-dropzone";
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import Context from "../../Context/context";
import {IBanners} from "./InputCard";
import {ApolloCache, useMutation} from "@apollo/client";
import {DELETE_BANNER, GET_BANNERS_ASIWANT} from "../../Graphql";
import {useHistory} from "react-router"
import {compare} from "../../Routes/Banner/Main/MainContainer";

interface DropProps {
    exist?: boolean
    app?: boolean
    uploadHeight?: string
}

const Inner = styled(SS.Core.Inner)`
padding : 5px 5px 5px 5px;
position: relative;
button {
  position : absolute;
 right: 0;
  top: 0;
  margin : 0 5px 0 0; 
}
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
    height: ${props => props.uploadHeight};
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
    bannerIndex?: string
    story?: boolean
    maxWidth: number
}

interface FileProps extends File {
    preview: string | undefined
}

const DropzoneComponent: React.FunctionComponent<IProps> = ({
                                                                uploadHeight,
                                                                imgPath,
                                                                name,
                                                                whichImg,
                                                                bannerIndex,
                                                                story,
                                                                maxWidth
                                                            }) => {

    const {
        files, setFiles, filename, setFilename, setDelete,
        initialValues, setValueData, key
    } = useContext(Context)

    const history = useHistory();

    const [removeBanner, {data}] = useMutation(DELETE_BANNER, {
        update(cache: ApolloCache<any>) {
            const {getNewBanners}: any = cache.readQuery({
                query: GET_BANNERS_ASIWANT,
                variables: {typeAndCategoryIdInput: {type: ["sara_story"], relationId: 0}}
            });
            const temp = getNewBanners.map((item: any) => item);
            const refetchData = temp?.splice(temp.findIndex((e: any) => e.id === bannerIndex), 1)
            const finalData = temp.filter((item: any) => item !== refetchData[0])
            console.log(temp, refetchData)
            cache.writeQuery({
                query: GET_BANNERS_ASIWANT,
                variables: {typeAndCategoryIdInput: {type: ["sara_story"], relationId: 0}},
                data: {getNewBanners: finalData}
            })
        },
        onCompleted: data1 => {
            if (data1) {
                // const findIndex = bannerIndex
                // history.push(`/banners/main/sara_story/${findIndex}`)
            }
        }
    })
    const deleteBanner = async (id: string) => {

        if (!id) {
            return setDelete(true)
        }
        await removeBanner({
            variables: {
                id: parseInt(id as string)
            }
        })
    }

    //TODO DropZone에 파일은 넣었을 경우 발동하는 FileSetting 함수---
    const {getRootProps, getInputProps, acceptedFiles}: DropzoneState = useDropzone({
            accept: 'image/*',
            onDrop: (acceptedFiles: any) => {
                //이곳에서 contextAPI 에 있는 files 스테이트를 업데이트 해준다.
                //whichImg 가 img면 {img : "--"}, backImg면  {backImg : "--"}
                const copy = URL.createObjectURL(acceptedFiles[0])
                const img = new Image()
                img.src = copy
                img.onload = () => {
                    console.log(img.width)
                    // if (maxWidth !== img.width) {
                    //     alert(`가로 사이즈 : ${maxWidth}를 지켜주세요`)
                    //     return false
                    // }
                    // const maxHeight = uploadHeight?.split("px")[0] as string;
                    // if (parseInt(maxHeight) !== img.height) {
                    //     alert(`세로 사이즈 : ${maxHeight}를 지켜주세요`)
                    //     return false
                    // }
                    setFiles({
                        ...files,
                        [whichImg]: acceptedFiles.map((file: FileProps) => Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        }))
                    })
                }
            }
        }
        )
    ;
//TODO DropZone에 파일은 넣었을 경우 발동하는 FileSetting 함수---

    const thumbs = (file: FileProps | undefined) => {
        console.log(file)
        return <div style={{
            overflow: "auto", height: "100%",
            width: "100%", display: "flex",
            justifyContent: "center"
        }} key={file?.name}>
            {
                file?.preview ? <img style={{maxWidth: "100%", maxHeight: "100%"}}
                                     src={file?.preview} alt={file?.name}
                /> : <img style={{maxWidth: "100%", maxHeight: "100%"}}
                          src={imgPath?.includes('undefined') ? '' : imgPath}
                          alt={whichImg}
                />
            }
        </div>
    };

    const filenameSetting = useCallback((files: any) => {
        setValueData({
            [key as keyof IBanners]: {
                ...initialValues[key as keyof IBanners],
                img: Object.keys(files).includes("img") ? files?.img[0]?.name : initialValues[key as keyof IBanners]?.img,
                backImg: Object.keys(files).includes("backImg") ? files?.backImg[0]?.name : initialValues[key as keyof IBanners]?.backImg
            }
        })
    }, [initialValues, key, setValueData])

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        if (files[whichImg]?.length > 0) {
            console.log(files, whichImg, "---Dropzone");
            const image = document.querySelector("#img") as HTMLDivElement
            const backImg = document.querySelector("#backImg") as HTMLDivElement
            setTimeout(() => {
                image?.dispatchEvent(new Event("blur", {bubbles: false}))
                backImg?.dispatchEvent(new Event("blur", {bubbles: false}))
            }, [500]);

            //TODO File을 업데이트 한 후에 name만 꺼내서 사용하고 싶으므로 name 스테이트 업데이트함수
            filenameSetting(files)
            //TODO File을 업데이트 한 후에 name만 꺼내서 사용하고 싶으므로 name 스테이트 업데이트함수

        }
    }, [files]);

    useEffect(() => {
        console.log(imgPath, "imgPath 바뀔 때")
        if (files[whichImg]) {
            files[whichImg]?.map((file: any) => {
                URL.revokeObjectURL(file.preview as string)
                delete file.preview;
            })
            setFilename(() => {
                return {
                    ...filename,
                    [whichImg]: ""
                }
            })
        }
    }, [imgPath])

    useEffect(() => {
        if (data?.deleteBannerByGraph) {
            setDelete(true)
        }
    }, [data, setDelete])

    return (
        <Inner className="container">
            <div style={{paddingBottom: "15px", fontWeight: "bold", display: "inline-block"}}>
                적용시킬 {name} 이미지 : {initialValues?.[key]?.[whichImg] ? "있음" : "없음"}
                <span style={{display: "inline-block", margin: "0 0 0 10px"}}></span>
            </div>
            {
                story ? <SS.Core.Button style={{backgroundColor: "#3f51b5"}}
                                        onClick={() => deleteBanner(bannerIndex as string)}>
                    삭제
                </SS.Core.Button> : <></>
            }
            <Drop {...getRootProps({className: 'dropzone'})} exist={acceptedFiles.length > 0 ? true : false}>
                <input {...getInputProps()} />
                <Preview exist={acceptedFiles.length > 0 || imgPath ? true : false}
                         uploadHeight={uploadHeight === "fit-content" ? "425px" : uploadHeight}>
                    {files[whichImg] ? files[whichImg].map((file: FileProps) => thumbs(file)) : thumbs(undefined)}
                </Preview>
            </Drop>
        </Inner>
    );
}
export default DropzoneComponent;