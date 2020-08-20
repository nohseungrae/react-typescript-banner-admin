import React, { useEffect, useState } from "react";
import LoginCheckPresenter from "./LoginCheckPresenter";

interface IProps {
  id: number;
  phone_number: string;
  email: string;
  name: string;
  team: string;
  img: string;
}

const LoginCheckContainer = () => {
  // uesQuery 문 쓰면 거기 loading, data 받아오기
  const [loading, getLoading] = useState<boolean>(true);
  const employee: IProps = {
    id: 11,
    phone_number: "010-1234-5678",
    email: "hong@saracen.co.kr",
    name: "홍길동",
    team: "Art Team",
    img: "http://img.segye.com/content/image/2019/11/14/20191114515059.jpg",
  };

  useEffect(() => {
    getLoading(false);
  }, []);

  return <LoginCheckPresenter loading={loading} employee={employee} />;
};

export default LoginCheckContainer;
