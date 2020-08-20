import React from "react";
import PropTypes from "prop-types";
import SS from "@saraceninc/saracen-style-ts";
import theme from "@saraceninc/saracen-style-ts/lib/theme";

interface IProps {
  loading: boolean;
  employee: {
    id: number;
    phone_number: string;
    email: string;
    name: string;
    team: string;
    img: string;
  };
  inputMsg?: string;
  handleChange?: any;
}

const MyInfoPresenter: React.FunctionComponent<IProps> = ({
  loading,
  employee,
  inputMsg,
  handleChange,
}) => (
  <>
    {loading ? <SS.Loader /> : <></>}
    <SS.Core.Title>내 정보 수정</SS.Core.Title>
    <SS.BreadCrumbs navs={[{ title: "내정보수정", path: `/auth/me` }]} />
    <SS.Core.RowF className="flexCenter">
      <SS.Core.Card margin="1%" style={{ maxWidth: "500px" }}>
        <SS.Core.CardHeader>
          <SS.Core.RowF className="flexCenter">
            <SS.Core.Group>
              <SS.Core.Input
                className="readOnly"
                value={inputMsg}
                disabled={true}
              />
              <SS.Core.Input type="file" id="file" onChange={handleChange} />
              <SS.Core.Label className="file" htmlFor="file">
                업로드
              </SS.Core.Label>
            </SS.Core.Group>
          </SS.Core.RowF>
        </SS.Core.CardHeader>
        <SS.Core.CardImg bgUrl={employee.img} style={{ minHeight: "15em" }} />
        <SS.Core.CardBody>
          <SS.Core.CardTitle>{employee.name} 정보수정</SS.Core.CardTitle>
          <SS.Core.RowF className="flexCenter" style={{ marginBottom: "5px" }}>
            <SS.Core.Group>
              <SS.Core.InputLabel>이름</SS.Core.InputLabel>
              <SS.Core.Input
                id="name"
                name="employee.name"
                placeholder="이름"
              />
            </SS.Core.Group>
          </SS.Core.RowF>
          <SS.Core.RowF className="flexCenter" style={{ marginBottom: "5px" }}>
            <SS.Core.Group>
              <SS.Core.InputLabel>전화번호</SS.Core.InputLabel>
              <SS.Core.Input
                id="phone_number"
                name="employee.phone_number"
                placeholder="전화번호"
              />
            </SS.Core.Group>
          </SS.Core.RowF>
          <SS.Core.RowF className="flexCenter" style={{ marginBottom: "5px" }}>
            <SS.Core.Group>
              <SS.Core.InputLabel>이메일</SS.Core.InputLabel>
              <SS.Core.Input
                id="email"
                name="employee.email"
                placeholder="이메일"
              />
            </SS.Core.Group>
          </SS.Core.RowF>
          <SS.Core.RowF className="flexCenter">
            <SS.Core.Group>
              <SS.Core.InputLabel>팀명</SS.Core.InputLabel>
              <SS.Core.Input
                id="team"
                name="employee.team"
                placeholder="팀명"
              />
            </SS.Core.Group>
          </SS.Core.RowF>
        </SS.Core.CardBody>
        <SS.Core.CardFooter>
          <a href="/" style={{ flex: 1 }}>
            <SS.Core.Button className="fr" theme={theme.orange}>
              정보수정하기
            </SS.Core.Button>
          </a>
        </SS.Core.CardFooter>
      </SS.Core.Card>
    </SS.Core.RowF>
  </>
);
MyInfoPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default MyInfoPresenter;
