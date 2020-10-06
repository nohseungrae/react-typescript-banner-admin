import React, {FunctionComponent, useContext, useEffect} from "react";
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import styled from "styled-components";
import moment from "moment";
import {useMutation, ApolloCache} from "@apollo/client";
import {DELETE_RESERVEDBANNER, GET_BANNERS_ASIWANT} from "src/Graphql";
import Context from "../../Context/context";

const Col = styled(SS.Core.Col)`
  box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
    0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1);
  display: flex;
  td {
    width: 25%;
    word-break: break-all;
  }
`;

interface IProps {
    reservedBanners: [];
    id?: number;
    variables?: any;
}

const TableComponent: FunctionComponent<IProps> = ({
                                                       reservedBanners,
                                                       id,
                                                       variables,
                                                   }) => {
    const {setReservedDelete} = useContext(Context);

    const [removeReservedBanner, {data}] = useMutation(DELETE_RESERVEDBANNER, {
        update(cache: ApolloCache<any>, {data: {deleteReservedBannerByGraph}}) {
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

    const Thead = () => (
        <thead style={{backgroundColor: theme.pink}}>
        <tr>
            <th>이미지</th>
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
            <tr key={i}>
                <td>{item.img}</td>
                <td>{item.alt}</td>
                <td>{item.url}</td>
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
        ))}
        </tbody>
    );
    return (
        <Col>
            <SS.Core.Table>
                <Thead></Thead>
                <Tbody id={id} reservedBanners={reservedBanners}></Tbody>
            </SS.Core.Table>
        </Col>
    );
};

export default TableComponent;
