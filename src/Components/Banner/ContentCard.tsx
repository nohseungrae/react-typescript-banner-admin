import React from 'react';
import SS from "@saraceninc/saracen-style-ts"
import theme from "@saraceninc/saracen-style-ts/lib/theme";

const ContentCard = () => {
    return (
        <SS.Core.RowF>
            <SS.Core.Card width={`${100 / 3}%`} margin="1%">
                <SS.Core.CardBody padding={"1px 0"}>
                    <SS.Core.CardTitle style={{textAlign : "center", margin : "0"}}>hello</SS.Core.CardTitle>
                </SS.Core.CardBody>
            </SS.Core.Card>
            <SS.Core.Card width={`${100 / 3}%`} margin="1%">
                <SS.Core.CardBody>
                    <SS.Core.CardTitle style={{textAlign : "center", margin : "0"}}>hello</SS.Core.CardTitle>
                </SS.Core.CardBody>
            </SS.Core.Card>
            <SS.Core.Card width={`${100 / 3}%`} margin="1%">
                <SS.Core.CardBody>
                    <SS.Core.CardTitle style={{textAlign : "center", margin : "0"}}>hello</SS.Core.CardTitle>
                </SS.Core.CardBody>
            </SS.Core.Card>
        </SS.Core.RowF>
    );
};

export default ContentCard;