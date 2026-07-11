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
