<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  $navigateTo,
  watch,
} from "nativescript-vue";
import Games from "./Games.vue";
import Category from "~/components/Category.vue";
import { Label } from "@nativescript/core";

const textHome = {
  title: "Free to Play Games",
  description:
    "Games that are free to play. They may have other monetization methods like ads or lootboxes, but the games themselves are free to play.",
};

const categoriesSelected = ref({
  platform: "",
  type: "",
});

const categoriesPlatform = [
  {
    title: "PC (Windows)",
    key: "pc",
  },
  {
    title: "Browser",
    key: "browser",
  },
  {
    title: "All",
    key: "all",
  },
];

const gameTypes = [
  {
    title: "MMORPG",
    key: "mmorpg",
  },
  {
    title: "Shooter",
    key: "shooter",
  },
  {
    title: "Strategy",
    key: "strategy",
  },
  {
    title: "Moba",
    key: "moba",
  },
  {
    title: "Racing",
    key: "racing",
  },
  {
    title: "Sports",
    key: "sports",
  },
  {
    title: "Social",
    key: "social",
  },
  {
    title: "Sandbox",
    key: "sandbox",
  },
  {
    title: "Open-world",
    key: "open-world",
  },
  {
    title: "Survival",
    key: "survival",
  },
  {
    title: "PVP",
    key: "pvp",
  },
  {
    title: "PVE",
    key: "pve",
  },
  {
    title: "Pixel",
    key: "pixel",
  },
  {
    title: "Voxel",
    key: "voxel",
  },
  {
    title: "Zombie",
    key: "zombie",
  },
  {
    title: "Turn-based",
    key: "turn-based",
  },
  {
    title: "First-person",
    key: "first-person",
  },
  {
    title: "Third-Person",
    key: "third-Person",
  },
  {
    title: "Top-down",
    key: "top-down",
  },
  {
    title: "Tank",
    key: "tank",
  },
  {
    title: "Space",
    key: "space",
  },
  {
    title: "Sailing",
    key: "sailing",
  },
  {
    title: "Side-scroller",
    key: "side-scroller",
  },
  {
    title: "Superhero",
    key: "superhero",
  },
  {
    title: "Permadeath",
    key: "permadeath",
  },
  {
    title: "Card",
    key: "card",
  },
  {
    title: "Battle-royale",
    key: "battle-royale",
  },
  {
    title: "MMO",
    key: "mmo",
  },
  {
    title: "MMOFPS",
    key: "mmofps",
  },
];

// return array with names of categories
const itemsPlatform = computed<string[]>(() => {
  return categoriesPlatform.map((item, index) => {
    return item.title;
  });
});

const itemsTypes = computed<string[]>(() => {
  return gameTypes.map((item, index) => {
    return item.title;
  });
});

const lookingCategories = () => {
  const { platform, type } = categoriesSelected.value;
  const params = {
    platform: categoriesPlatform.find((x) => x.title === platform)?.key,
    type: gameTypes.find((x) => x.title === type)?.key,
  };
  $navigateTo(Games, {
    props: {
      params,
    },
  });
};
</script>

<template>
  <Frame>
    <Page>
      <ActionBar>
        <Label text="Home Page" class="font-bold text-lg" />
      </ActionBar>

      <GridLayout class="px-4">
        <StackLayout>
          <Label
            row="0"
            class="text-3xl align-middle text-center text-[#e4e4e9] font-bold mb-4"
            :text="textHome.title"
          />
          <Label
            row="0"
            class="text-sm align-middle text-center text-gray-400 mb-6"
            :text="textHome.description"
            textAlignment="center"
            textWrap="true"
            lineHeight="1.5"
          />
          <Category
            :categories="itemsPlatform"
            label="Platforms"
            @select-category="categoriesSelected.platform = $event"
          />
          <Category
            :categories="itemsTypes"
            label="Types"
            @select-category="categoriesSelected.type = $event"
          />
          <Button
            row="1"
            class="btn"
            text="Search Games"
            @tap="lookingCategories"
          >
          </Button>
        </StackLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>

<style>
/* .info {
    font-size: 20;
  } */
</style>
