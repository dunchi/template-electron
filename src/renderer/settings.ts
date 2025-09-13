import "./settings.css";
import { showToast } from "./toast";

// 설정 화면 기본 로직
document.addEventListener("DOMContentLoaded", () => {
  console.log("Settings 화면 로드됨");
  showToast("설정 화면이 열렸습니다", "info");
});

// 예제: 설정 저장 함수
function saveSetting(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
  showToast("설정이 저장되었습니다", "success");
}

// 예제: 설정 로드 함수
function loadSetting(key: string) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}