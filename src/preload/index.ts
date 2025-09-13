import { contextBridge, ipcRenderer } from "electron";

// 기본 API 정의
const API = {
  // 기본 IPC 통신 예제
  sendMessage: (message: string) => ipcRenderer.invoke('send-message', message),
  
  // 설정 관련 기본 API
  settings: {
    get: (key: string) => ipcRenderer.invoke('settings-get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('settings-set', key, value),
  },
  
  // 시스템 정보 기본 API
  system: {
    getVersion: () => ipcRenderer.invoke('get-version'),
  }
};

// 렌더러 프로세스에 API 노출
contextBridge.exposeInMainWorld("api", API);