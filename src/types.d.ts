interface LocalSettingFile {
  llmType: "claude" | "ollama:mistral-small3.1" | "ollama:llama3.1";
  claudeApiKey: string;
  ollamaConnectionString: string;
  serverUrls: string[];
}

interface McpConnectionResult {
  success: number;
  fail: number;
  total: number;
}

declare module "screenshot-desktop" {
  function screenshot(): Promise<Buffer>;
  export = screenshot;
}

declare module "ps-list" {
  interface ProcessInfo {
    pid: number;
    name: string;
    cpu?: number;
    memory?: number;
  }
  function psList(): Promise<ProcessInfo[]>;
  export = psList;
}

declare module "robotjs" {
  interface Point {
    x: number;
    y: number;
  }
  export function getMousePos(): Point;
}

declare module "systeminformation" {
  interface OsInfo {
    distro: string;
    release: string;
    kernel: string;
    arch: string;
  }

  interface CpuInfo {
    manufacturer: string;
    brand: string;
    cores: number;
    physicalCores: number;
    speed: number;
  }

  interface MemInfo {
    total: number;
    free: number;
  }

  interface NetworkInterface {
    iface: string;
    ip4: string;
    mac: string;
  }

  export function osInfo(): Promise<OsInfo>;
  export function cpu(): Promise<CpuInfo>;
  export function mem(): Promise<MemInfo>;
  export function networkInterfaces(): Promise<NetworkInterface[]>;
}
