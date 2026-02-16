# Skytex Georgia

Professional embroidery and textile manufacturing company website. Based in Batumi, Georgia.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Email**: Nodemailer (SMTP)

## Features

- 🌐 Bilingual: Turkish & English
- 📱 Responsive design
- 📧 Contact form with email delivery to info@skytexgeorgia.com
- 🖼️ Portfolio: Embroidery samples & sock collection
- 🤝 Partner brands: Nike, Adidas, Erima, Lotto, Under Armour, New Balance

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure SMTP for the contact form:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@skytexgeorgia.com
SMTP_PASS=your-app-password
SMTP_FROM=info@skytexgeorgia.com
```

For Gmail, create an [App Password](https://myaccount.google.com/apppasswords).

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

- `src/app/` - Pages and API routes
- `src/components/` - Header, Footer
- `src/context/` - Language context
- `src/lib/` - Translations
- `public/` - Static assets (partners, portfolio)

## License

Private - Skytex Georgia
