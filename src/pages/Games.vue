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
import {
  GridLayout,
  Label,
  ObservableArray,
  TextView,
} from "@nativescript/core";
const games = ref<GameInterface[]>([]);
const isLoading = ref(false);

const props = defineProps({
  params: {
    type: Object,
    required: true,
    default() {
      return {
        platform: "",
        type: "",
      };
    },
  },
});

const items = computed(() => {
  return new ObservableArray(games.value);
});

onMounted(async () => {
  isLoading.value = true;
  const { platform, type } = props.params;
  const url = `https://www.freetogame.com/api/games?platform=${platform}&category=${type}&sort-by=release-date`;
  const response = await fetch(url);
  games.value = await response.json();
  isLoading.value = false;
});
</script>
<template>
  <Page actionBarHidden="true">
    <ActionBar>
      <Label text="Games" class="font-bold text-lg" />
    </ActionBar>
    <FlexboxLayout
      v-if="isLoading"
      flexWrap="wrap"
      backgroundColor="#3c495e"
      justifyContent="center"
    >
      <ActivityIndicator width="30%" busy="true" />
    </FlexboxLayout>
    <GridLayout v-else class="px-2 py-2">
      <CollectionView
        :items="items"
        ref="listView"
        itemIdGenerator="color"
        colWidth="100%"
        separatorColor="transparent"
      >
        <template #default="{ item }">
          <StackLayout class="mb-2">
            <Label :text="item.title" textAlignment="center" class="title" />
            <Image :src="item.thumbnail" height="100" />
            <Label
              :text="item.short_description"
              class="py-2 text-neutral-400"
              textAlignment="center"
              textWrap="true"
              lineHeight="1.5"
            />
            <Button text="See more" class="btn" />
          </StackLayout>
        </template>
      </CollectionView>
    </GridLayout>
  </Page>
</template>

<style scoped></style>
