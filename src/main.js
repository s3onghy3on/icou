import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    ENV: "",
  },
});

export default app;
