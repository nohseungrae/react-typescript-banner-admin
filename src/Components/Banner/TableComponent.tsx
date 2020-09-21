import React, {FunctionComponent} from 'react';
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";
import styled from "styled-components";
import moment from "moment";

const Col = styled(SS.Core.Col)`
box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
display: flex;
td {
    width: 25%;
    word-break: break-all;
}
`;

interface IProps {
    reservedBanners: []
}

const TableComponent: FunctionComponent<IProps> = ({reservedBanners}) => {
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
        {
            reservedBanners?.map((item: any) => (
                <tr>
                    <td>{item.img}</td>
                    <td>{item.alt}</td>
                    <td>{item.url}</td>
                    <td>{moment(item.reservationDate).format('YYYY.MM.DD HH:mm:ss')}</td>
                    <td>
                        <SS.Core.Button theme={"#3f51b5"}>
                            삭제
                        </SS.Core.Button>
                    </td>
                </tr>)
            )
        }

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