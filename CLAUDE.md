# 일렉트론 프로젝트 개발 메뉴얼

## 프로젝트 기본 구조

```
/Users/hanju/01dev/personal/soomgo/01goodui/
├── package.json          # 프로젝트 설정, 의존성
├── vite.config.ts        # 빌드 설정
├── tsconfig.json         # TypeScript 설정
├── public/               # HTML 템플릿 (수동 편집)
│   ├── renderer-app.html
│   └── renderer-settings.html
├── src/                  # 소스 코드 (수동 편집)
│   ├── main.ts          # 메인 프로세스
│   ├── types.d.ts       # 타입 정의
│   ├── preload/         # 프리로드 스크립트
│   │   ├── index.ts
│   │   ├── mcp.ts
│   │   └── settings.ts
│   ├── renderer/        # 렌더러 프로세스 (UI)
│   │   ├── app.ts
│   │   ├── app.css
│   │   ├── settings.ts
│   │   ├── settings.css
│   │   └── toast.ts
│   ├── ipc/            # 프로세스 간 통신
│   └── mcp/            # MCP 프로토콜
└── dist/               # 빌드 결과물 (자동 생성, 편집 금지)
```

## 개발 시 수정할 폴더

### 1. public/ - HTML 템플릿
- **언제 수정**: UI 구조 변경 시 (버튼, 입력창, 레이아웃 추가)
- **파일**: renderer-app.html, renderer-settings.html
- **주의**: `<script src="./renderer-app.js">` 경로 유지 필수

### 2. src/ - 소스 코드
- **언제 수정**: 기능 구현 시
- **주요 파일들**:
  - `main.ts`: 앱 생명주기, 창 관리
  - `renderer/app.ts`: 메인 화면 로직
  - `renderer/settings.ts`: 설정 화면 로직
  - `renderer/*.css`: 스타일링
  - `preload/*.ts`: 보안 브릿지 (main ↔ renderer 통신)

## 절대 수정하지 말 것

### dist/ 폴더
- 빌드 시 자동 생성됨
- 수정해도 다음 빌드 시 덮어씌워짐

## 개발 워크플로우

### 1. 기능 개발 순서
1. **UI 필요시**: public/*.html 수정
2. **로직 구현**: src/renderer/*.ts 수정
3. **스타일링**: src/renderer/*.css 수정
4. **프로세스 간 통신**: src/preload/*.ts, src/ipc/ 수정

### 2. 빌드 및 실행
```bash
npm run build    # src → dist 변환
npm run debug    # 빌드 + 일렉트론 실행
```

### 3. 디버깅 설정 (VSCode)
```json
{
  "name": "Electron Main",
  "type": "node", 
  "request": "launch",
  "cwd": "${workspaceFolder}",
  "runtimeExecutable": "electron",
  "runtimeArgs": ["--inspect-brk=5858", "."],
  "console": "integratedTerminal",
  "preLaunchTask": "npm: build"
}
```

## 일렉트론 아키텍처 이해

### 프로세스 구조
1. **Main Process** (src/main.ts)
   - 앱 생명주기 관리
   - 브라우저 창 생성
   - 파일 시스템 접근

2. **Renderer Process** (src/renderer/)
   - 웹 기술 기반 UI
   - 보안상 제한된 환경

3. **Preload Script** (src/preload/)
   - Main ↔ Renderer 안전한 통신 브릿지
   - API 노출 역할

### 통신 방식
```typescript
// Preload에서 API 노출
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (data) => ipcRenderer.invoke('message', data)
});

// Renderer에서 사용
window.electronAPI.sendMessage('hello');

// Main에서 처리
ipcMain.handle('message', (event, data) => {
  console.log(data); // 'hello'
});
```

## 주요 파일별 역할

### package.json
- 프로젝트 메타데이터
- npm 스크립트 정의
- 의존성 관리
- 일렉트론 빌더 설정

### vite.config.ts
- TypeScript → JavaScript 변환 설정
- 멀티 엔트리 포인트 정의
- 빌드 출력 설정

### src/main.ts
- BrowserWindow 생성
- 메뉴, 단축키 설정
- IPC 핸들러 등록
- 앱 이벤트 처리

### src/renderer/app.ts
- DOM 조작
- 사용자 이벤트 처리
- UI 상태 관리

### src/preload/index.ts
- contextBridge로 API 노출
- 보안 정책 준수

## 개발 시 주의사항

### 1. 보안
- `nodeIntegration: false` 유지
- `contextIsolation: true` 유지
- preload를 통해서만 Node.js API 접근

### 2. 빌드
- src 수정 후 반드시 빌드 필요
- dist 직접 수정 금지

### 3. 경로
- 절대 경로 사용 권장
- `path.join(__dirname, ...)` 활용

### 4. 타입 안전성
- TypeScript 컴파일 에러 해결 필수
- types.d.ts에서 전역 타입 정의

## 일반적인 작업 패턴

### 새 기능 추가 시
1. public/*.html에 UI 요소 추가
2. src/renderer/*.css에 스타일 추가  
3. src/renderer/*.ts에 이벤트 리스너 추가
4. 필요시 src/preload/*.ts에 API 추가
5. src/main.ts에 IPC 핸들러 추가

### 새 창 추가 시
1. public/에 새 HTML 파일 생성
2. src/renderer/에 새 TS/CSS 파일 생성
3. vite.config.ts에 새 엔트리 포인트 추가
4. src/main.ts에 창 생성 로직 추가

## 트러블슈팅

### 빌드 에러
- TypeScript 타입 에러 확인
- import/export 구문 확인
- vite.config.ts 설정 확인

### 런타임 에러
- 브라우저 개발자 도구 활용
- Main 프로세스 콘솔 확인
- preload 스크립트 로딩 확인

### 통신 에러
- IPC 채널 이름 일치 확인
- contextBridge API 노출 확인
- 보안 정책(CSP) 확인