import React from "react";

interface IBannerProps {
  onSubmit: any;
  onChange: any;
}

const BannerPresenter: React.FunctionComponent<IBannerProps> = ({
  onSubmit,
  onChange,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept="image/*,.txt"
          multiple={true}
          required={true}
          capture="user"
          onChange={onChange}
        />
        <input type="submit" />
      </form>
      <div>메인 페이지</div>
    </div>
  );
};

export default BannerPresenter;
