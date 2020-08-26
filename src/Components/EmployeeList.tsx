import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SS from "@saraceninc/saracen-style-ts";

interface IProps {
  id: number | undefined;
  img: string | undefined;
  name: string | undefined;
  email: string | undefined;
  team: string | undefined;
}

const EmployeeList: React.SFC<IProps> = ({ id, img, name, email, team }) => (
  <>
    <SS.Core.Card margin="1%">
      <Link to={`/auth/login/${id}`}>
        <SS.Core.CardImg bgUrl={img} />
        <SS.Core.CardBody>
          <SS.Core.CardTitle>{name}</SS.Core.CardTitle>
          <p>{email}</p>
          <SS.Core.CardTags>
            <span
              className={
                team === "Art Team"
                  ? "pink"
                  : team === "NailArt Team"
                  ? "orange"
                  : team === "SB Team"
                  ? "mint"
                  : team === "CS Team"
                  ? "blue"
                  : "yellow"
              }
            >
              {team}
            </span>
          </SS.Core.CardTags>
        </SS.Core.CardBody>
      </Link>
    </SS.Core.Card>
  </>
);

EmployeeList.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
};

export default EmployeeList;
