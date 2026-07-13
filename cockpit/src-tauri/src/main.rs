// PM Skills Cockpit — a faithful Tauri shell over the bundled web/ app.
// v1 keeps native surface minimal on purpose; the web app is the product.
//
// TODO(native, post-v1) — the hooks that earn a native app, with the APIs:
//  - Tray menu rendering `pm-claude-skills brief` (tauri::tray::TrayIconBuilder + std::process::Command)
//  - OS notification when a prediction comes due (tauri-plugin-notification, check brain/predictions on a timer)
//  - Global hotkey summoning the command bar (tauri-plugin-global-shortcut → emit to webview)
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running pm-skills cockpit");
}
