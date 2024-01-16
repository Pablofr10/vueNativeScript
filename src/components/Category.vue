<template>
  <Label :text="props.label" class="title" />
  <ListPicker
    :items="props.categories"
    @selectedIndexChange="selectCategory($event)"
  />
</template>

<script setup lang="ts">
import { ListPicker } from "@nativescript/core";

const emit = defineEmits(["selectCategory"]);

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: "Category",
  },
});

const selectCategory = (valor: any) => {
  const picker = <ListPicker>valor.object;
  const categoriesSelected = props.categories[picker.selectedIndex] as string;
  emit("selectCategory", categoriesSelected);
};
</script>

<style scoped></style>
