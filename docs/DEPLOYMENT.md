# 🚀 Деплой

## Vercel (рекомендуется для статики)

```bash
npm install -g vercel
vercel
```

Выбрать папку `dist/` как output directory.

## Netlify

1. Коннектить репозиторий на GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

## Heroku (для Node.js)

```bash
heroku create soyuz-3d
git push heroku main
heroku open
```

## Docker Hub

```bash
docker build -t yourusername/soyuz-3d:latest .
docker push yourusername/soyuz-3d:latest
```

На сервере:

```bash
docker pull yourusername/soyuz-3d:latest
docker run -p 3000:3000 yourusername/soyuz-3d:latest
```

## DigitalOcean App Platform

1. Подключить GitHub репозиторий
2. Build: `npm run build`
3. Run: `npm run serve`
4. HTTP Port: `3000`

## AWS EC2 + Docker

```bash
# На сервере
git clone <your-repo>
cd 3d_website
docker-compose up -d
```

## Environment для продакшена

Создать `.env` файл (не добавлять в Git):

```
NODE_ENV=production
PORT=3000
```

Остальные переменные добавить в Dockerfile или docker-compose.yml
