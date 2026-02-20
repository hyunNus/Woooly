# Woooly Client (vLLM Backend Version)

**안내**: 이 코드는 `demo/backend`에서 실행되는 vLLM 서버(또는 ngrok URL)와 통신하여 작동하는 프론트엔드입니다.

## VLLM 연동 안내
이 프론트엔드는 VLLM 서버와 통신합니다. 원활한 통신을 위해 `demo/backend`에서 ngrok을 통해 할당받은 URL을 `.env` (또는 `.env.local`) 파일에 아래와 같이 설정해 주셔야 합니다.

```env
VLLM_ENDPOINT="https://여기에_ngrok_주소_입력.ngrok-free.app/v1"
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
