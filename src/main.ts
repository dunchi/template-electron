import { app, BrowserWindow } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { registerIpcHandlers } from "./ipc/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // 디버그 모드 확인
  const isDebugMode = process.argv.includes("--inspect");
  console.log("Debug mode:", isDebugMode);

  // 브라우저 창 생성
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    x: isDebugMode ? 510 : undefined,
    y: isDebugMode ? 120 : undefined,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      preload: path.join(__dirname, "./preload-index.mjs"),
    },
  });

  // HTML 파일 로드
  const htmlPath = path.join(__dirname, "./renderer-app.html");
  mainWindow.loadFile(htmlPath);

  if (isDev) {
    mainWindow.webContents.openDevTools();
    console.log("DevTools opened");
  }
}

// IPC 핸들러 등록
registerIpcHandlers();

// 앱 이벤트 처리
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});