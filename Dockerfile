# 단계 1: 실행 단계
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm install --only=production

# 소스 코드 및 서버 코드 복사
COPY . .

# 애플리케이션 포트 열기
EXPOSE 3002

# 애플리케이션 시작 명령
CMD ["node", "server.js"]