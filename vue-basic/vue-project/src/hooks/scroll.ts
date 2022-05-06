import { ref } from "vue"

export function useScrollTop() {
    const scrollOffsetTop = ref(0)
    const onScroll = (ev: any) => {
        scrollOffsetTop.value = ev.target.scrollTop
    }
    return {
        scrollOffsetTop,
        onScroll
    }
}