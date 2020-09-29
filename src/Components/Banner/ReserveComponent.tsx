import React, {useContext, useEffect, useState} from "react";
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import TableComponent from "./TableComponent";
import Context from "../../Context/context";
import moment from "moment";
import {parseISO} from "date-fns";

registerLocale("ko", ko);

const Col = styled(SS.Core.ColF)`
  box-shadow: 0 2px 0 rgba(90, 97, 105, 0.11), 0 4px 8px rgba(90, 97, 105, 0.12),
    0 10px 10px rgba(90, 97, 105, 0.06), 0 7px 70px rgba(90, 97, 105, 0.1);
  padding: 10px 10px;
  margin: 20px 0;
  flex-direction: row;
  .saturday {
    color: rgb(0, 0, 255);
  }
  .sunday {
    color: rgb(255, 0, 0);
  }
`;
const ResetBtn = styled(SS.Core.Button)`
  padding: 0 5px;
  margin: 0;
`;

interface IProps {
    reservedBanners: any;
    id?: number;
    variables?: any;
}

const ReserveComponent: React.FunctionComponent<IProps> = ({
                                                               reservedBanners,
                                                               variables,
                                                               id,
                                                           }) => {
    let now = moment();
    console.log(now.format());
    const {reserveCheck, startDate, setStartDate} = useContext(Context);

    const [loading, setLoading] = useState<boolean>(true);

    const [endDate, setEndDate] = useState<Date | null>();

    const handleStartDate = (date: Date) => {
        setStartDate(date);
    };
    const handleResetDate = () => {
        setStartDate(null);
        setEndDate(null);
    };
    // 월/일
    const getFormattedDate = (date: Date) => {
        const month = date.toLocaleDateString("ko-KR", {month: "long"});
        const day = date.toLocaleDateString("ko-KR", {day: "numeric"});
        return `${month.substr(0, month.length - 1)}/${day.substr(
            0,
            day.length - 1
        )}`;
    };

    // 요일 반환
    const getDayName = (date: Date): string => {
        return date.toLocaleDateString("ko-KR", {weekday: "long"}).substr(0, 1);
    };

    // 날짜 비교시 년 월 일까지만 비교하게끔
    const createDate = (date: Date) => {
        return new Date(
            new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
        );
    };

    useEffect((): void => {
        if(loading){
            setLoading(false);
        }
    }, []);

    useEffect((): void => {
        if(!reserveCheck){
            setStartDate(null);
        }
    }, [reserveCheck]);
    return (
        <SS.Core.Row>
            {!reserveCheck ? (
                <></>
            ) : (
                <Col>
                    <SS.Core.SubTitle
                        style={{display: "flex", alignItems: "center"}}
                        margin={"0 10px 0 0"}
                    >
                        예약설정
                    </SS.Core.SubTitle>
                    <DatePicker
                        locale="ko"
                        dayClassName={(date: Date): any => {
                            return getDayName(createDate(date)) === "토"
                                ? "saturday"
                                : getDayName(createDate(date)) === "일"
                                    ? "sunday"
                                    : undefined;
                        }}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        minDate={new Date()}
                        minTime={(new Date(startDate).getDate() === new Date().getDate()) || startDate === null ? parseISO(now.hours(new Date().getHours()).format()) : parseISO(now.days(new Date().getDate()).hours(24).minutes(0).format())}
                        maxTime={parseISO(now.days(new Date().getDate()).hours(23).minutes(50).format())}
                        selected={startDate}
                        onChange={(date: Date) => handleStartDate(date)}
                        startDate={startDate}
                        selectsStart={true}
                        endDate={endDate}
                        dateFormat="yyyy-MM-dd h:mm aa"
                        placeholderText="시작 일시"
                        dateFormatCalendar="yyyy LLLL"
                    />
                    <ResetBtn
                        round={true}
                        className="darkClouds-outline"
                        onClick={handleResetDate}
                    >
                        <i className="fas fa-sync-alt" style={{fontSize: "1.5em"}}/>
                    </ResetBtn>
                </Col>
            )}
            <TableComponent
                reservedBanners={reservedBanners}
                id={id}
                variables={variables}
            />
        </SS.Core.Row>
    );
};

export default ReserveComponent;
