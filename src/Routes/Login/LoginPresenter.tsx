import React from "react";
import PropTypes from "prop-types";
import SS from "@saraceninc/saracen-style-ts";
import EmployeeList from "../../Components/EmployeeList";

interface IAdmin {
  id: number;
  email?: string;
  name?: string;
  team?: string;
  img?: string;
}

interface IProps {
  loading: boolean;
  admin: IAdmin[];
}

const LoginPresenter: React.FunctionComponent<IProps> = ({
  loading,
  admin,
}) => (
  <>
    {loading ? <SS.Loader /> : <></>}
    <SS.Core.Title>본인 프로필을 선택하세요.</SS.Core.Title>
    <SS.BreadCrumbs navs={[{ title: "프로필선택", path: `/auth/login` }]} />
    <SS.Core.RowF>
      {admin.map((item, index) => (
        <EmployeeList
          key={index}
          id={item.id}
          img={item.img}
          name={item.name}
          email={item.email}
          team={item.team}
        />
      ))}
    </SS.Core.RowF>
  </>
);
LoginPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoginPresenter;
