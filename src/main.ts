import { invoke } from "@tauri-apps/api/tauri";
import { listen } from '@tauri-apps/api/event'

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}
const main = async () => {
await invoke("init_process")

const keyPressStyle = (key: string) => {
  const keyEl = document.querySelector(`#key-${key!}--inject-1`) as HTMLElement
  const keyInlineEl = document.querySelector(`#key-inline-${key}--inject-1`) as HTMLElement
  const keyOutlineEl = document.querySelector(`#key-outline-${key}--inject-1`) as HTMLElement
  
  if (keyEl) {
    keyEl.style.transition = "100ms"
    keyEl.style.transform = "scale(1, 0.8)";
    keyEl.style.transformOrigin = "50% 60%";
    keyEl.style.filter = "brightness(100%)"
  }
  if (keyInlineEl) {
    keyInlineEl.style.fill = "#938E73";
  }
  if (keyOutlineEl) {
    keyOutlineEl.style.fill = "#5B4D02";
  }
}

const keyReleaseStyle = (key: string) => {
  const keyEl = document.querySelector(`#key-${key!}--inject-1`) as HTMLElement
  const keyInlineEl = document.querySelector(`#key-inline-${key}--inject-1`) as HTMLElement
  const keyOutlineEl = document.querySelector(`#key-outline-${key}--inject-1`) as HTMLElement
  
  if (keyEl) {
    keyEl.style.transition = "100ms"
    keyEl.style.transform = "scale(1, 1)";
    keyEl.style.transformOrigin = "50% 50%";
    keyEl.style.filter = "brightness(80%)"
  }
  if (keyInlineEl) {
    keyInlineEl.style.fill = "#f9f4d9";
  }
  if (keyOutlineEl) {
    keyOutlineEl.style.fill = "#c1b368";
  }
}

await listen('key', (event: any) => {
  console.log(event.payload.message)
  if (event.payload.message.match("KeyPress")) {
    console.log('F got pressed')
    const key = event.payload.message.replace(/KeyPress-/,'')
    if (key == 'Escape') {
      keyPressStyle('RightEscape')
    }
    keyPressStyle(key)
  }
  if (event.payload.message.match("KeyRelease")) {
    const key = event.payload.message.replace(/KeyRelease-/,'')
    if (key == 'Escape') {
      keyReleaseStyle('RightEscape')
    }
    keyReleaseStyle(key)
  }
  console.log(event.payload)
})
}
main()
window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
