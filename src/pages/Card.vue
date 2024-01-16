<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  $navigateTo,
  ListView,
} from "nativescript-vue";
import type { GameInterface } from "@/models/game.interface";
import { Label, ObservableArray, TextView } from "@nativescript/core";
const games = ref<GameInterface[]>([]);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const items = computed(() => {
  return new ObservableArray(games.value);
});

onMounted(async () => {
  const response = await fetch("https://www.freetogame.com/api/games");
  games.value = await response.json();
  console.log(props.id);
});
</script>
<template>
  <Page actionBarHidden="true">
    <CollectionView
      :items="items"
      ref="listView"
      itemIdGenerator="color"
      colWidth="100%"
      rowHeight="200"
      separatorColor="transparent"
    >
      <template #default="{ item }">
        <StackLayout>
          <Label
            :text="item.title"
            class="flex-auto text-lg font-semibold text-slate-900"
            textAlignment="center"
          />
          <Image :src="item.thumbnail" height="100" />
          <Label
            :text="item.short_description"
            class="mt-4 text-sm leading-6 col-start-1"
            textAlignment="center"
            textWrap="true"
            lineHeight="1.5"
          />
        </StackLayout>
      </template>
    </CollectionView>
  </Page>
</template>

<style scoped></style>
