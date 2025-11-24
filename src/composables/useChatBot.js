import { useModuleStore } from "../stores/modules";

export function useChatBot() {
  const moduleStore = useModuleStore();

  const removeChat = () => {
    console.log("🔥 Removing chat widget...");


    if (window.getbutton) {
      try {
        window.getbutton.destroy();
      } catch (e) {
        console.warn("⚠ getbutton.destroy failed:", e);
      }
    }


    try {
      delete window.getbutton;
    } catch {}
    try {
      window.getbutton = undefined;
    } catch {}
    try {
      window.gbHashId = undefined;
    } catch {}


    Object.keys(window).forEach((key) => {
      if (
        key.toLowerCase().includes("getbutton") ||
        key.toLowerCase().includes("gb")
      ) {
        try {
          delete window[key];
        } catch {}
      }
    });


    const script = document.getElementById("chat-widget");
    if (script) {
      script.onload = null;
      script.onerror = null;
      script.remove();
    }


    const widgetSelectors = [
      ".gb-widget",
      ".gb-widget-launcher",
      ".gb-widget-content",
      "[class*='gb-']",
      "[id*='gb-']",
      "[data-testid*='gb-']",
      "[class*='getbutton']",
      "iframe[src*='getbutton']",
      "iframe.gb-frame",
      "[data-gb-widget]",
    ];

    widgetSelectors.forEach((selector) => {
      try {
        document.querySelectorAll(selector).forEach((el) => {
          const newEl = el.cloneNode(false);
          el.parentNode?.replaceChild(newEl, el);
          newEl.remove();
        });
      } catch (e) {
        console.warn(`Failed to remove ${selector}:`, e);
      }
    });


    const styleSelectors = [
      "style[data-emotion]",
      "style[id*='gb-']",
      "style[class*='gb-']",
      "link[href*='getbutton']",
    ];

    styleSelectors.forEach((selector) => {
      try {
        document.querySelectorAll(selector).forEach((el) => el.remove());
      } catch (e) {
        console.warn(`Failed to remove style ${selector}:`, e);
      }
    });

    document.querySelectorAll("script").forEach((script) => {
      if (script.src && script.src.includes("getbutton")) {
        script.remove();
      }
    });

    console.log("🧹 Chat widget fully removed.");
  };

  const loadChat = () => {
    removeChat();

    setTimeout(() => {
      const existingScript = document.getElementById("chat-widget");
      if (existingScript) {
        existingScript.onload = null;
        existingScript.onerror = null;
        existingScript.remove();
      }

      const widgetId = moduleStore.currentWidgetId;

      if (!widgetId) {
        console.warn("⚠ No widget ID available");
        return;
      }

      console.log(`📦 Loading chat widget with ID: ${widgetId}`);

      const script = document.createElement("script");
      script.src = `https://static.getbutton.io/widget/bundle.js?id=${widgetId}`;
      script.defer = true;
      script.id = "chat-widget";
      script.async = true;

      script.onload = () => {
        console.log("✅ Chat widget loaded successfully");
        setTimeout(() => {
          if (window.getbutton) {
            console.log("✅ GetButton instance is ready");
          } else {
            console.warn("⚠ GetButton instance not found after load");
          }
        }, 500);
      };

      script.onerror = () => {
        console.error("❌ Failed to load chat widget script");
      };

      document.body.appendChild(script);
    }, 800);
  };

  return {
    removeChat,
    loadChat,
  };
}
