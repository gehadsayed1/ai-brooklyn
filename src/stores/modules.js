import { defineStore } from "pinia";
import { ref } from "vue";

export const useModuleStore = defineStore("moduleStore", () => {
  const currentWidgetId = ref(null);

 function setWidgetId(id) {
  currentWidgetId.value = id;
}

return { currentWidgetId, setWidgetId };
});
