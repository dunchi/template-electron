interface ToastConfig {
  bottom?: number;
  right?: number;
  duration?: number;
}

let toastConfig: ToastConfig = {
  bottom: 20,
  right: 20,
  duration: 3000
};

export function setToastConfig(config: ToastConfig) {
  toastConfig = { ...toastConfig, ...config };
}

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info', duration?: number) {
  // 기존 토스트 제거
  dismissToast();

  // 토스트 요소 생성
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.id = 'active-toast';

  // 스타일 적용
  toast.style.position = 'fixed';
  toast.style.bottom = `${toastConfig.bottom}px`;
  toast.style.right = `${toastConfig.right}px`;
  toast.style.padding = '12px 16px';
  toast.style.borderRadius = '8px';
  toast.style.color = 'white';
  toast.style.fontWeight = '500';
  toast.style.fontSize = '14px';
  toast.style.zIndex = '10000';
  toast.style.maxWidth = '300px';
  toast.style.wordWrap = 'break-word';
  toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  toast.style.transform = 'translateX(100%)';
  toast.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
  toast.style.opacity = '0';

  // 타입별 색상
  switch (type) {
    case 'success':
      toast.style.backgroundColor = '#4CAF50';
      break;
    case 'error':
      toast.style.backgroundColor = '#f44336';
      break;
    case 'info':
    default:
      toast.style.backgroundColor = '#2196F3';
      break;
  }

  // DOM에 추가
  document.body.appendChild(toast);

  // 애니메이션 시작
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  });

  // 자동 제거
  const toastDuration = duration || toastConfig.duration || 3000;
  setTimeout(() => {
    dismissToast();
  }, toastDuration);
}

export function dismissToast() {
  const existingToast = document.getElementById('active-toast');
  if (existingToast) {
    existingToast.style.transform = 'translateX(100%)';
    existingToast.style.opacity = '0';
    setTimeout(() => {
      if (existingToast.parentNode) {
        existingToast.parentNode.removeChild(existingToast);
      }
    }, 300);
  }
}