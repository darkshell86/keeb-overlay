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

await invoke("init_process")

const unlisten = await listen('key', (event) => {
document.querySelector("#key-d--inject-1").style.transition = "100ms";
document.querySelector("#key-f--inject-1").style.transition = "100ms";
  if (event.payload.message == "KeyPress-KeyF") {
    console.log('F got pressed')
    // document.querySelector("#key-outline-f--inject-1").style.fill = "#83EEFF";
    document.querySelector("#key-inline-f--inject-1").style.fill = "#938E73";
    document.querySelector("#key-outline-f--inject-1").style.fill = "#5B4D02";
    document.querySelector("#key-f--inject-1").style.transform = "scale(1, 0.8)";
    document.querySelector("#key-f--inject-1").style.transformOrigin = "50% 60%";
    document.querySelector("#key-inline-f--inject-1").style.filter = "brightness(100%)"
  }
  if (event.payload.message == "KeyPress-KeyD") {
    console.log('D got pressed')
    // document.querySelector("#key-outline-d--inject-1").style.fill = "#83EEFF";
    document.querySelector("#key-inline-d--inject-1").style.fill = "#938E73";
    document.querySelector("#key-outline-d--inject-1").style.fill = "#5B4D02";
    document.querySelector("#key-d--inject-1").style.transform = "scale(1, 0.8)";
    document.querySelector("#key-d--inject-1").style.transformOrigin = "50% 60%";
    document.querySelector("#key-d--inject-1").style.filter = "brightness(100%)"
  }
  if (event.payload.message == "KeyRelease-KeyF") {
    console.log('F got pressed')
    document.querySelector("#key-inline-f--inject-1").style.fill = "#f9f4d9";
    document.querySelector("#key-outline-f--inject-1").style.fill = "#c1b368";
    document.querySelector("#key-f--inject-1").style.transform = "scale(1, 1)";
    document.querySelector("#key-f--inject-1").style.transformOrigin = "50% 50%";
    document.querySelector("#key-f--inject-1").style.filter = "brightness(80%)"
  }
  if (event.payload.message == "KeyRelease-KeyD") {
    console.log('D got pressed')
    document.querySelector("#key-inline-d--inject-1").style.fill = "#f9f4d9";
    document.querySelector("#key-outline-d--inject-1").style.fill = "#c1b368";
    document.querySelector("#key-d--inject-1").style.transform = "scale(1, 1)";
    document.querySelector("#key-d--inject-1").style.transformOrigin = "50% 50%";
    document.querySelector("#key-d--inject-1").style.filter = "brightness(100%)"
  }
  console.log(event.payload)
})

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });
});
