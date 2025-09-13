# Electron Template Project

일렉트론 애플리케이션 개발을 위한 TypeScript 기반 템플릿 프로젝트입니다.

## 📋 프로젝트 개요

이 템플릿은 모던 일렉트론 개발을 위한 기본 구조와 설정을 제공합니다:

- **TypeScript + Vite** 기반 빌드 시스템
- **ESM 방식** 지원
- **멀티 프로세스 아키텍처** (Main, Preload, Renderer)
- **보안 강화** 설정 (contextIsolation, preload)
- **토스트 알림** 시스템 내장
- **VSCode 디버깅** 설정 포함

## 프로젝트 클론 후 의존성 설치
```bash
npm install
```

## 📚 추가 리소스

- [CLAUDE.md](./CLAUDE.md) - AI 개발자용 상세 매뉴얼
- [Electron 공식 문서](https://www.electronjs.org/docs)
- [Vite 공식 문서](https://vitejs.dev/)

### 런타임 에러 발생 시
1. 브라우저 개발자 도구 확인
2. Main 프로세스 콘솔 확인
3. preload 스크립트 로딩 상태 확인

---

이 템플릿을 기반으로 다양한 일렉트론 애플리케이션을 개발하세요! 🚀
