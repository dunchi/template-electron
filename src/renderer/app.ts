import "./app.css";
import { showToast, setToastConfig } from "./toast";

// 토스트 설정
setToastConfig({ bottom: 20, right: 20 });

// 기본 DOM 요소들
const container = document.querySelector(".container") as HTMLDivElement;

// 기본 이벤트 리스너
document.addEventListener("DOMContentLoaded", () => {
  console.log("Electron App Template 로드됨");
  showToast("앱이 시작되었습니다", "success");
});

// 예제: 간단한 클릭 이벤트
container?.addEventListener("click", () => {
  console.log("Container 클릭됨");
  showToast("Container가 클릭되었습니다", "info");
});