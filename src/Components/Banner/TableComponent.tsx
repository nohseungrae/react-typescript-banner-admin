import React, {FunctionComponent, useContext, useEffect, useRef, useState} from "react";
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import styled from "styled-components";
import moment from "moment";
import {useMutation, ApolloCache} from "@apollo/client";
import {DELETE_RESERVEDBANNER, GET_BANNERS_ASIWANT} from "src/Graphql";
import Context from "../../Context/context";
import {GET_RESERVEDBANNERS} from "../../Graphql";
import {HoverImage} from "./HoverImage";

const Col = styled(SS.Core.Col)`
  box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
    0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1);
  display: flex;
  td {
    width: 25%;
    word-break: break-all;
  }
`;

const Preview = styled.div`

`;

interface IProps {
    reservedBanners: [];
    id?: number;
    variables?: any;
}

// const useMousePosition = () => {
//
//     const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
//
//     useEffect(() => {
//         const updateMousePosition = (event: any) => {
//             setMousePosition({x: event.clientX, y: event.clientY});
//         }
//
//         window.addEventListener('mousemove', updateMousePosition)
//
//         return () => window.removeEventListener('mousemove', updateMousePosition)
//
//     }, [])
//
//     return mousePosition
// }

const TableComponent: FunctionComponent<IProps> = ({
                                                       reservedBanners,
                                                       id,
                                                       variables,
                                                   }) => {
    const {setReservedDelete} = useContext(Context);

    const [removeReservedBanner, {data}] = useMutation(DELETE_RESERVEDBANNER, {
        update(cache: ApolloCache<any>, {data: {deleteReservedBannerByGraph}}) {
            if (id) {
                const {getNewBanners}: any = cache.readQuery({
                    query: GET_BANNERS_ASIWANT,
                    variables,
                });
                const temp = getNewBanners.map((item: any) => item);
                const findIndex = temp.findIndex((e: any) => e.id === id);
                const refetchData = temp[findIndex]?.reservedBanners.filter((item: any) => item.id !== deleteReservedBannerByGraph?.id.toString());
                const finalData = temp.map((item: any) => {
                    if (item.id === id) {
                        return {...item, reservedBanners: refetchData}
                    }
                    return item
                })
                cache.writeQuery({
                    query: GET_BANNERS_ASIWANT,
                    variables,
                    data: {getNewBanners: finalData},
                });
            } else {
                const {getReservedBannerListByGraph}: any = cache.readQuery({
                    query: GET_RESERVEDBANNERS
                });
                const copy = getReservedBannerListByGraph.map((item: any) => item);
                const retrieve = copy.filter((item: any) => item.id === deleteReservedBannerByGraph.id)

                cache.writeQuery({
                    query: GET_RESERVEDBANNERS,
                    data: {getReservedBannerListByGraph: retrieve}
                })
            }
        },
    });

    const removeBtn = async (id: string) => {
        await removeReservedBanner({
            variables: {
                id: parseInt(id),
            },
        });
    };

    useEffect(() => {
        if (data?.deleteReservedBannerByGraph) {
            console.log(data)
            setReservedDelete(data)
        }
    }, [data, setReservedDelete])

    const imgRef = useRef(null);

    const [hover, setHover] = useState(false);

    // const {x, y} = useMousePosition();

    const handleMouseOver = () => setHover(true);
    const handleMouseOut = () => setHover(false);


    const Thead = () => (
        <thead style={{backgroundColor: theme.pink}}>
        <tr>
            <th style={{width: "10%"}}>이미지</th>
            <th>설명</th>
            <th>링크주소</th>
            <th>예약시간</th>
            <th>삭제</th>
        </tr>
        </thead>
    );

    const Tbody: FunctionComponent<IProps> = ({reservedBanners}) => (
        <tbody>
        {reservedBanners?.map((item: any, i: number) => (
            <React.Fragment key={i}>
                <tr>
                    <td style={{display: "flex", width: "100%", padding: "0"}}>
                        <Preview onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={'preview'}>
                            <img ref={imgRef} style={{width: "100%"}} src={
                                item?.type === "app_splash_image"
                                    ? item?.img === undefined ? '' : `${process.env.REACT_APP_ACTIVE_IMG}img/app/splash/${item?.img}`
                                    : item?.relationId === undefined ? '' : `${process.env.REACT_APP_SARACEN_IMG}img/banner/image/${item?.relationId}/${item?.img}`
                            } alt={item.alt}/>
                        </Preview>
                    </td>
                    <td>{item.alt}</td>
                    <td><a href={item.url} target={"_blank"}>{item.url}</a></td>
                    <td>{moment(item.reservationDate).format("YYYY.MM.DD HH:mm:ss")}</td>
                    <td>
                        <SS.Core.Button
                            theme={"#3f51b5"}
                            onClick={() => removeBtn(item.id)}
                        >
                            삭제
                        </SS.Core.Button>
                    </td>
                </tr>
                <HoverImage  hover={hover} url={item?.type === "app_splash_image"
                    ? item?.img === undefined ? '' : `${process.env.REACT_APP_ACTIVE_IMG}img/app/splash/${item?.img}`
                    : item?.relationId === undefined ? '' : `${process.env.REACT_APP_SARACEN_IMG}img/banner/image/${item?.relationId}/${item?.img}`}/>
            </React.Fragment>
        ))}
        </tbody>
    );
    return (
        <Col>
            <SS.Core.Table>
                <Thead></Thead>
                <Tbody reservedBanners={reservedBanners}></Tbody>
            </SS.Core.Table>
        </Col>
    );
};
export default TableComponent;
