import { createApp } from "nativescript-vue";
import Home from "./pages/Home.vue";
import CollectionView from "@nativescript-community/ui-collectionview/vue3";

const app = createApp(Home);
app.use(CollectionView);
app.start();
