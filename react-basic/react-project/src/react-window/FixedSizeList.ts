import createListComponent from "./createListComponent";
const FixedSizeList = createListComponent({
  getItemSize: ({ itemSize }) => itemSize, //每个条目的高度
  getEstimatedTotalSize: ({ itemSize, itemCount }) => itemSize * itemCount, //获取预计的总高度
  getItemOffset: ({ itemSize }, index) => itemSize * index, //获取每个条目的偏移量
  getStartIndexForOffset: ({itemSize}, offset) => Math.floor(offset/itemSize), // 获取开始index
  getEndIndexForStartIndex: ({height, itemSize}, startIndex) => { // 获取结束index
    const numVisible = Math.ceil(height/ itemSize)
    console.log(height, itemSize, Math.ceil(height/itemSize))
    return startIndex + numVisible
  }
});
export default FixedSizeList;
