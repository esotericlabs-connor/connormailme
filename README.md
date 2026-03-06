# Connor Remsen - Portfolio Website

A modern portfolio website showcasing projects and professional information with a Pacific Northwest theme.

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Motion** (Framer Motion) - Animations
- **Lucide React** - Icons
- **React Router** - Client-side routing

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment to Azure Static Web Apps

This site is designed to deploy seamlessly to Azure Static Web Apps via GitHub.

### Project Structure

```
/public/assets/        # Static assets (images, logos)
/src/app/             # Application components
/src/styles/          # Global styles and theme
```

### Azure Static Web Apps Configuration

The build configuration for Azure:

- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **App Location**: `/`

### Asset Management

All images are stored in `/public/assets/` and referenced using absolute paths:
- `/assets/seattle-day.png` - Daytime Seattle skyline
- `/assets/seattle-night.png` - Nighttime Seattle skyline
- `/assets/openkeyflow-logo.png` - OpenKeyFlow project logo
- `/assets/monolith-logo.png` - MONOLITH project logo

### GitHub Integration

1. Push your code to a GitHub repository
2. Create an Azure Static Web App resource
3. Connect it to your GitHub repository
4. Azure will automatically build and deploy on every push to main

### Build Scripts

The `package.json` includes the necessary build script:
- `npm run build` - Creates production build in `/dist` directory


## License

All rights reserved - Connor Remsen
