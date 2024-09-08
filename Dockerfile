# 단계 1: 빌드 단계
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사하여 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 프로젝트 빌드
RUN npm run build

# 단계 2: 실행 단계
FROM node:18

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일을 복사
COPY --from=build /app/build /app/build

# 의존성 설치 (운영 환경에서는 필요 없음)
COPY package.json package-lock.json ./
RUN npm install --only=production

# 서버 코드 복사
COPY server.js ./

# 애플리케이션 포트 열기
EXPOSE 3002

# 애플리케이션 시작 명령
CMD ["node", "server.js"]