import { ipcMain } from "electron";

// 기본 IPC 핸들러들
export function registerIpcHandlers() {
  // 기본 메시지 핸들러
  ipcMain.handle('send-message', async (event, message: string) => {
    console.log('Received message:', message);
    return `Echo: ${message}`;
  });

  // 설정 관련 핸들러
  ipcMain.handle('settings-get', async (event, key: string) => {
    // 여기에 설정 로드 로직 구현
    return null;
  });

  ipcMain.handle('settings-set', async (event, key: string, value: any) => {
    // 여기에 설정 저장 로직 구현
    return true;
  });

  // 시스템 정보 핸들러
  ipcMain.handle('get-version', async () => {
    return process.env.npm_package_version || '1.0.0';
  });
}