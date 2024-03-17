// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rdev::{Event, EventType};
use std::thread;

use tauri::{Manager, Window};

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

// init a background process on the command, and emit periodic events only to the window that used the command
#[tauri::command]
fn init_process(window: Window) {
    let callback = move |event: Event| {
        match event.event_type {
            EventType::KeyPress(key) => window
                .emit(
                    "key",
                    Payload {
                        message: format!("KeyPress-{:?}", key),
                    },
                )
                .unwrap(),
            // EventType::KeyRelease(key) => println!("My callback {:?}", event.event_type),
            EventType::KeyRelease(key) => window
                .emit(
                    "key",
                    Payload {
                        message: format!("KeyRelease-{:?}", key),
                    },
                )
                .unwrap(),
            // EventType::MouseMove{x, y}=> (),
            _ => println!("My callback {:?}", event.event_type),
        }
        // if let EventType::KeyPress(Key::KeyF) = event.event_type {
        //     window.emit("key", Payload { message: "KeyPress-KeyF".into()}).unwrap();
        // };
        // if let EventType::KeyPress(Key::KeyD) = event.event_type {
        //     window.emit("key", Payload { message: "KeyPress-KeyD".into()}).unwrap();
        // };
        // if let EventType::KeyRelease(Key::KeyF) = event.event_type {
        //     window.emit("key", Payload { message: "KeyRelease-KeyF".into()}).unwrap();
        // };
        // if let EventType::KeyRelease(Key::KeyD) = event.event_type {
        //     window.emit("key", Payload { message: "KeyRelease-KeyD".into()}).unwrap();
        // };
    };

    thread::spawn(move || {
        rdev::listen(callback).expect("could not listen events");
    });
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // `main` here is the window label; it is defined on the window creation or under `tauri.conf.json`
            // the default value is `main`. note that it must be unique
            let main_window = app.get_window("main").unwrap();

            // listen to the `event-name` (emitted on the `main` window)
            let id = main_window.listen("event-name", |event| {
                println!("got window event-name with payload {:?}", event.payload());
            });
            // unlisten to the event using the `id` returned on the `listen` function
            // an `once` API is also exposed on the `Window` struct
            main_window.unlisten(id);

            // emit the `event-name` event to the `main` window
            main_window
                .emit(
                    "event-name",
                    Payload {
                        message: "Tauri is awesome!".into(),
                    },
                )
                .unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![init_process])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
