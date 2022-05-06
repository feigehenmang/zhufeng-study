<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref } from "vue";
import { useScrollTop } from "../hooks/scroll";
export default defineComponent({
  props: {
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    itemCount: {
        type: Number,
        required: true
    },
    itemSize: {
        type: Number,
        required: true
    },
    overscanCount: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    // console.log(props)
    const reactiveProps = reactive(props);
    type PropType = typeof reactiveProps
    const { scrollOffsetTop, onScroll } = useScrollTop();
    function getStartIndexByScrollTop(props: PropType, scrollOffsetTop: Ref<number>) {
      return Math.floor(scrollOffsetTop.value / props.itemSize);
    }
    function getEndIndexByStartIndex(props: PropType, startIndex: number) {
      const numVisible = Math.ceil(props.height / props.itemSize);
      return startIndex + numVisible;
    }
    const _getRangeToRender = () => {
      const startIndex = getStartIndexByScrollTop(
        reactiveProps,
        scrollOffsetTop
      );
      const endIndex = getEndIndexByStartIndex(reactiveProps, startIndex);
      return [
        Math.max(0, startIndex - reactiveProps.overscanCount),
        Math.min(
          reactiveProps.itemCount,
          endIndex + reactiveProps.overscanCount
        ),
      ];
    };
    const getItemSize = (props: PropType) => {
      return props.itemSize;
    };
    const getItemOffset = (props: PropType, index: number) => props.itemSize * index;
    const getItemStyle = (i: number) => {
      return {
        position: "absolute",
        width: "100%",
        height: getItemSize(reactiveProps) + "px",
        top: getItemOffset(reactiveProps, i) + "px",
      };
    };
    const items = computed(() => {
      const items = [];
      if (reactiveProps.itemCount && reactiveProps.itemCount > 0) {
        const [startIndex, endIndex] = _getRangeToRender();
        for (let i = startIndex; i < endIndex; i++) {
          items.push({
            style: getItemStyle(i),
            index: i,
          });
        }
      }
      return items;
    });

    // getItems();
    const containerStyle = computed(() => ({
      position: "relative",
      width: reactiveProps.width + "px",
      height: reactiveProps.height + "px",
      willChange: "transform",
      overflow: "auto",
    }));
    const getEstimatedTotalSize = (props: any) =>
      props.itemSize * props.itemCount;
    const contentStyle = computed(() => ({
      width: "100%",
      height: getEstimatedTotalSize(reactiveProps) + "px",
    }));
    return {
      scrollOffsetTop,
      onScroll,
      containerStyle,
      contentStyle,
      items,
    };
  },
});
</script>
<template>
  <div :style="containerStyle" @scroll="onScroll">
    <div :style="contentStyle">
      <template v-for="item in items" :key="item.index">
        <slot :style="item.style" :index="item.index"></slot>
      </template>
    </div>
  </div>
</template>
