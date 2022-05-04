import React from "react";
export default function ({
  getItemSize, // 单个条目高度
  getEstimatedTotalSize, // 预计总高度
  getItemOffset, // 获取偏移量
}) {
  return class extends React.Component {
    render() {
      const { height, width, itemCount, children: ComponentType } = this.props;
      const containerStyle = {
        position: "relative",
        width,
        height,
        overflow: "auto",
        willChange: "transform",
      };
      const contentStyle = {
        width: "100%",
        height: getEstimatedTotalSize({ height, itemCount }),
      };
      const items = [];

      return <div></div>;
    }
  };
}
