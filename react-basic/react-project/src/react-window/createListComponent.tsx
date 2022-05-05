import React from "react";
export default function ({
  getItemSize, // 单个条目高度
  getEstimatedTotalSize, // 预计总高度
  getItemOffset, // 获取偏移量
  getStartIndexForOffset,
  getEndIndexForStartIndex
}) {
  return class extends React.Component<any> {
    state = {
      scrollOffset: 0
    }
    static defaultProps = {
      overscanCount: 2
    }
    render() {
      const { height, width, itemCount, children } = this.props;
      let ComponentType = children
      const containerStyle: React.CSSProperties = {
        position: "relative",
        width,
        height,
        overflow: "auto",
        willChange: "transform",
      };
      const contentStyle = {
        width: "100%",
        height: getEstimatedTotalSize(this.props),
      };
      const items = [];
      // console.log(itemCount)
      if (itemCount > 0) {
        const [startIndex, endIndex] = this._getRangeToRender()
        for (let i = startIndex; i < endIndex; i++) {
          items.push(
            <ComponentType key={ i } index={ i } style={ this._getItemStyle(i) } />
          )
        }
      }

      return (<div style={containerStyle} onScroll={this.onScroll}>
        <div style={contentStyle}>
          {items}
        </div>  
      </div>);
    }
    onScroll = (ev: any) => {
      console.log(ev.currentTarget)
      const { scrollTop } = ev.currentTarget
      this.setState({scrollOffset: scrollTop})
    }
    _getRangeToRender() {
      const {scrollOffset} = this.state
      const {overscanCount, itemCount} = this.props
      const startIndex = getStartIndexForOffset(this.props, scrollOffset)
      const endIndex = getEndIndexForStartIndex(this.props, startIndex)
      // return [startIndex, endIndex]
      return [
        Math.max(0, startIndex - overscanCount),
        Math.min(itemCount, endIndex + overscanCount)
      ]
    }
    _getItemStyle(index: number) {
      const style = {
        position: 'absolute',
        width: '100%',
        height: getItemSize(this.props),
        top: getItemOffset(this.props, index)
      };
      return style;
    }
  };
}
