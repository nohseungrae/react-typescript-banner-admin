import React from "react";
import PropTypes from "prop-types";
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";

// TODO:interface 중복 문제인가?
interface IProps {
  loading?: boolean;
  employee: {
    id: number;
    phone_number: string;
    email: string;
    name: string;
    team: string;
    img: string;
  };
}

const LoginCheckPresenter: React.FunctionComponent<IProps> = ({
  loading,
  employee,
}) => (
  <>
    {loading ? <SS.Loader /> : <></>}
    <SS.Core.Title>인증번호를 작성해주세요</SS.Core.Title>
    <SS.BreadCrumbs
      navs={[
        { title: "프로필선택", path: `/auth/login` },
        {
          title: `${employee.name}님 인증`,
          path: `/auth/login/${employee.id}`,
        },
      ]}
    />
    <SS.Core.RowF className="flexCenter">
      <SS.Core.Card margin="1%" style={{ maxWidth: "500px" }}>
        <SS.Core.CardImg bgUrl={employee.img} style={{ minHeight: "15em" }} />
        <SS.Core.CardBody>
          <SS.Core.CardTitle>{employee.name}님</SS.Core.CardTitle>
          <p>{employee.phone_number}로 인증번호가 발송되었습니다.</p>
        </SS.Core.CardBody>
        <SS.Core.CardFooter>
          <SS.Core.Group>
            <SS.Core.InputLabel>인증번호</SS.Core.InputLabel>
            <SS.Core.Input id="auth" name="auth" placeholder="인증번호" />
            <SS.Core.Button width="15%" margin="0" theme={theme.blue}>
              확인
            </SS.Core.Button>
          </SS.Core.Group>
        </SS.Core.CardFooter>
      </SS.Core.Card>
    </SS.Core.RowF>
  </>
);

LoginCheckPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoginCheckPresenter;
