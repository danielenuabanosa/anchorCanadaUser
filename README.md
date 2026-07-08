<<<<<<< HEAD
# Anchor Canada — Provider Portal

Next.js 16 provider application for organizations to register, publish opportunities, and manage applications.

## Structure

Mirrors the user app (`../user`) with separate desktop/mobile view components per page:

```
src/app/
├── (auth)/           # Login, guest, password reset
├── (app)/            # Authenticated provider dashboard
└── onboarding/       # 7-step provider registration flow
assets/
├── icons/
└── images/
```

## Onboarding Flow

| Step | Route | Description |
|------|-------|-------------|
| 0 | `/onboarding` | Journey selection |
| 1 | `/onboarding/organization-type` | Organization type |
| 2 | `/onboarding/categories` | Opportunity categories |
| 3 | `/onboarding/organization-info` | Organization details |
| 4 | `/onboarding/verification` | Email/phone verification |
| 5 | `/onboarding/team` | Team setup |
| 6 | `/onboarding/activation` | Activation complete |

## Development

```bash
npm install
npm run dev    # http://localhost:3002
```

## Demo Credentials

- **Email:** `demo@provider.anchorcanada.ca`
- **Password:** `Demo@1234`

## Figma Design File

[PROVIDER-APPLICATION](https://www.figma.com/design/boUqDwdpCbCoxkDlX4Kk9p/PROVIDER-APPLICATION)

### Exporting assets from Figma

1. Create a [Figma personal access token](https://www.figma.com/developers/api#access-tokens)
2. Add to `.env.local`: `FIGMA_ACCESS_TOKEN=your_token`
3. Run: `node scripts/download-figma-assets.mjs`

This exports all screen PNGs to `assets/images/figma-screens/` and embedded icons/images to `assets/icons/` and `assets/images/`.

Alternatively, enable the **Figma MCP** plugin in Cursor Settings for direct design inspection and asset export.
=======
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
>>>>>>> provider/main
