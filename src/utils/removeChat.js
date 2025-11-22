export function removeChat() {
  const el = document.getElementById("chat-widget");
  if (el) el.remove();

  const btn = document.querySelector(".gb-widget-launcher");
  if (btn) btn.remove();

  const stuff = document.querySelectorAll(
    "[class*='gb-'], .gb-widget, .gb-widget-content"
  );
  stuff.forEach((el) => el.remove());

  if (window.getbutton) {
    try {
      window.getbutton.destroy();
    } catch {}
    delete window.getbutton;
  }
}
