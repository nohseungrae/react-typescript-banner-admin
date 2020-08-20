import React, {useEffect, useState} from 'react';
import LoginPresenter from './LoginPresenter';

const LoginContainer = () => {
  // uesQuery 문 쓰면 거기 loading, data 받아오기
  const [loading, getLoading] = useState<boolean>(true);
  const admin: Array<{email: string, id: number, phone_number: string, img: string, name: string, team: string}> = [{
    id: 11,
    phone_number: "",
    email: "hong@saracen.co.kr",
    name: "홍길동",
    team: "Art Team",
    img: "http://img.segye.com/content/image/2019/11/14/20191114515059.jpg"
  },{
    id: 22,
    phone_number: "010-1110-1111",
    email: "soonsin@saracen.co.kr",
    name: "이순신",
    team: "Design Team",
    img: "https://dimg.donga.com/wps/NEWS/IMAGE/2019/11/02/98183065.2.jpg"
  },{
    id: 33,
    phone_number: "010-1110-1111",
    email: "asbgvb@saracen.co.kr",
    name: "사원명",
    team: "SB Team",
    img: "https://www.newscj.com/news/photo/201912/newscj_%EC%B2%9C%EC%A7%80%EC%9D%BC%EB%B3%B4_695191_717311_4829.jpg"
  },{
    id: 44,
    phone_number: "010-1110-1111",
    email: "asbgvb@saracen.co.kr",
    name: "사원명",
    team: "CS Team",
    img: "https://dimg.donga.com/wps/NEWS/IMAGE/2019/12/22/98915688.2.jpg"
  },{
    id: 55,
    phone_number: "010-1110-1111",
    email: "asbgvb@saracen.co.kr",
    name: "사원명",
    team: "Team Name",
    img: "https://img.insight.co.kr/static/2020/04/05/700/cq40d2bd0nl5dox91591.jpg"
  },{
    id: 66,
    phone_number: "010-1110-1111",
    email: "asbgvb@saracen.co.kr",
    name: "펭수",
    team: "GIANT PANG",
    img: "https://lh3.googleusercontent.com/proxy/DfPR0cnDa61wBBQToAMK1wR7i5MRlmfDDIGlp9CYLh_-RrDsYj6OvWxtJiw6oz2C9TC8UPduFde78twEAv_gSkX11dB6EtcffcpDD-5h3rWU8unClN53"
  }];

  useEffect(() => {
    getLoading(false)
  });

  return (
      <LoginPresenter
          loading={loading}
          admin={admin}
      />
  );
};

export default LoginContainer;
