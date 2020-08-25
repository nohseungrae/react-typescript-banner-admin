import React, {useState} from 'react';
import SS from "@saraceninc/saracen-style-ts";
import styled from "styled-components";
import DateRange from "react-datepicker"

const Col = styled(SS.Core.Col)`
box-shadow: 0 2px 0 rgba(90,97,105,.11), 0 4px 8px rgba(90,97,105,.12), 0 10px 10px rgba(90,97,105,.06), 0 7px 70px rgba(90,97,105,.1);
padding: 10px 10px;
margin : 20px 0 ;
`;

const ReserveComponent = () => {
    const [startDate ,setStartDate] = useState(new Date.now());

    return (
        <SS.Core.Row>
            <Col>
                <DateRange
                    startDate={startDate}
                    setStartDate={(date: any) => setStartDate(date)}
                    endDate={endDate}
                    setEndDate={(date: any) => setEndDate(date)}
                />
                <SS.Core.Button round={true} className='darkClouds-outline' onClick={handleResetDate}>
                    <i className="fas fa-sync-alt" style={{fontSize: '1.5em'}}/>
                </SS.Core.Button>
            </Col>
        </SS.Core.Row>
    );
};

export default ReserveComponent;