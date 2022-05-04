import createListComponent from "./createListComponent";
const FixedSizeList = createListComponent({
  getItemSize: ({ itemSize }) => itemSize, //每个条目的高度
  getEstimatedTotalSize: ({ itemSize, itemCount }) => itemSize * itemCount, //获取预计的总高度
  getItemOffset: ({ itemSize }, index) => itemSize * index, //获取每个条目的偏移量
});
export default FixedSizeList;
