import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//Vue Prime
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(PrimeVue);
app.use(router);
app.use(pinia);

//Component
app.component("InputText", InputText);
app.component("Dialog", Dialog);
app.component("Button", Button);

app.mount("#app");
