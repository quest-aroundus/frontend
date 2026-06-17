# Around-Us

_Do you want to look for an event?_

![Next](https://img.shields.io/npm/v/next?style=flat-square&logo=Next.js&logoColor=white&label=Next&labelColor=black&color=555555) ![Typescript](https://img.shields.io/npm/v/typescript?style=flat-square&logo=TypeScript&logoColor=white&label=Typescript&labelColor=3178C6&color=555555) ![Jest](https://img.shields.io/npm/v/jest?style=flat-square&logo=jest&logoColor=FFFFFF&label=Jest&labelColor=99425B&color=555555) ![Tailwind](https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss)

## Project Workspace

[Notion](https://www.notion.so/fedev-genie/AROUNDUS-b44cbf6924e683b5ba0501ce5e9c591f?source=copy_link)

## Deployment

To deploy this project run

```bash
  pnpm run dev // for dev
  pnpm run deploy // for deploy
  pnpm run test // for test
```

Docker build process

```bash
docker build -t aroundus/frontend -f deploy/Dockerfile . --platform linux/amd64
docker tag aroundus/frontend ${image-registry}/${image-repository}:latest
docker push ${image-registry}/${image-repository}:latest
```

## 🌱 Features

- Socket alert
- Responsive web

## Authors

- [@eunjin0212](https://www.github.com/eunjin0212)
- [@allyesdev](https://github.com/allyesdev)

## License

[MIT](https://choosealicense.com/licenses/mit/)
