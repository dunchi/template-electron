#!/bin/bash

# Windows x64용 포터블 실행 파일 빌드
echo "Windows x64용 포터블 실행 파일 빌드 시작..."
npm run package -- --win --x64

echo "빌드 완료!"
echo "실행 파일 위치: ./release/"
