<script setup lang="ts">
import FixedSizeList from "./FixedSizeList.vue";
</script>

<template>
  <fixed-size-list class="List" :itemSize="50" :width="400" :height="200" :itemCount="1000">
    <template v-slot:default="slotProps">
      <div
        :class="slotProps.index % 2 ? 'ListItemOdd' : 'ListItemEven'"
        :style="slotProps.style"
      >
        Row {{ slotProps.index }}
      </div>
    </template>
  </fixed-size-list>
</template>

<style scoped>
.List {
  border: 1px solid gray;
}

.ListItemEven,
.ListItemOdd {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ListItemOdd {
  background-color: lightcoral;
}
.ListItemEven {
  background-color: lightblue;
}
</style>
