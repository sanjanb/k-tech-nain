# Farm To Table

A direct farmer-to-buyer marketplace platform that eliminates intermediaries from the agricultural supply chain.

**Version**: 7.0  
**Status**: Production Ready  
**License**: MIT

---

![image](/assets/Screenshot%202025-12-17%20101852.png)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [User Roles](#user-roles)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Farm To Table is a minimal web platform designed to connect farmers directly with buyers, removing costly intermediaries from the agricultural supply chain. The platform operates as a pure discovery and connection layer, allowing farmers to retain full control over pricing and transactions.

### Problem Statement

Traditional agricultural supply chains suffer from:

- Excessive intermediary fees reducing farmer profits
- Lack of transparency in pricing and sourcing
- Complex commission structures
- Farmers receiving unfair prices for their produce

### Solution

Farm To Table addresses these issues by:

- Providing a free, zero-commission marketplace
- Enabling direct farmer-to-buyer connections
- Facilitating transparent pricing and product information
- Supporting direct payment methods (UPI)
- Maintaining platform neutrality in transactions

### Design Philosophy

- **Simplicity**: Only essential features for discovery and trust
- **Transparency**: Clear visibility of all parties and transactions
- **Zero Lock-in**: No platform dependency for payments or logistics
- **Free by Design**: No commissions or hidden charges

---

## Key Features

### For Farmers

- Product listing management (create, edit, delete)
- Real-time status updates (available/sold)
- Optional UPI payment integration with QR codes
- Public farmer profile pages
- Product dashboard with analytics
- Verification badge system
- Deal confirmation tracking

### For Buyers

- Public product browsing (no login required)
- Advanced search and filtering
- Detailed product information pages
- Direct farmer contact details
- Farmer profile and history viewing
- Deal creation and tracking
- Transparent pricing information

### Platform Capabilities

- Role-based authentication (Farmer/Buyer)
- Firebase-powered backend
- Responsive design (desktop and mobile)
- Offline-capable data persistence
- Base64 image storage (500KB limit)
- Deal confirmation workflow
- Trust verification system

---

## Technology Stack

### Frontend

- **Framework**: Next.js 16.0 (App Router)
- **UI Library**: React 19.2
- **Styling**: CSS Custom Properties
- **State Management**: React Hooks

### Backend

- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email/Password)
- **Storage**: Firebase Storage (QR codes)
- **Hosting**: Vercel-ready

### Development Tools

- **Package Manager**: npm
- **Version Control**: Git
- **Code Editor**: VS Code recommended

---

## Architecture

### Data Model

**Users Collection**

```javascript
{
  uid: string,
  name: string,
  email: string,
  phoneNumber: string | null,
  role: 'farmer' | 'buyer',
  isVerified: boolean,
  upiId: string | null,
  qrCodeUrl: string | null,
  createdAt: timestamp
}
```

**Products Collection**

```javascript
{
  id: string,
  farmerId: string,
  cropName: string,
  category: string,
  price: number,
  quantity: string,
  imageUrl: string | null,
  status: 'available' | 'sold',
  createdAt: timestamp
}
```

**Deals Collection**

```javascript
{
  id: string,
  buyerId: string,
  farmerId: string,
  productId: string,
  buyerConfirmed: boolean,
  farmerConfirmed: boolean,
  createdAt: timestamp
}
```

### Application Flow

1. **Registration**: User selects role (Farmer/Buyer) during signup
2. **Authentication**: Firebase handles email/password authentication
3. **Product Listing**: Farmers create listings with details and images
4. **Discovery**: Buyers browse and search available products
5. **Connection**: Buyers express interest creating a deal record
6. **Transaction**: Direct payment between parties using UPI
7. **Confirmation**: Both parties confirm deal completion

---

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Firebase account (free tier supported)
- Modern web browser

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sanjanb/k-tech-nain.git
cd k-tech-nain
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Set up Firebase:

   - Create a new Firebase project
   - Enable Email/Password authentication
   - Create a Firestore database (production or test mode)
   - Enable Firebase Storage
   - Copy configuration to `.env.local`

5. Start development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

---

## User Roles

### Farmer

- Register with farmer role
- Create and manage product listings
- Set prices and quantities
- Upload product images
- Add payment details (UPI/QR)
- View and manage deals
- Confirm completed transactions
- Access farmer dashboard

### Buyer

- Register with buyer role
- Browse products without login
- Search and filter listings
- View farmer profiles
- Express interest in products
- Create deal records
- Access payment information
- Confirm completed purchases

### Admin (Future)

- Verify farmer identities
- Moderate content
- Handle disputes
- Manage platform settings

---

## Project Structure

```
k-tech-nain/
├── app/                          # Next.js App Router pages
│   ├── layout.jsx               # Root layout with navigation
│   ├── page.jsx                 # Homepage
│   ├── auth/                    # Authentication
│   │   └── page.jsx            # Login/Register
│   ├── browse/                  # Product browsing
│   │   └── page.jsx
│   ├── farmer/                  # Farmer dashboard
│   │   └── page.jsx
│   ├── add-product/             # Product creation
│   │   └── page.jsx
│   ├── edit-product/            # Product editing
│   │   └── [id]/page.jsx
│   ├── product/                 # Product details
│   │   └── [id]/page.jsx
│   ├── farmer-profile/          # Public farmer profile
│   │   └── [id]/page.jsx
│   ├── profile/                 # User profile management
│   │   └── page.jsx
│   └── my-deals/                # Buyer deals page
│       └── page.jsx
├── components/                   # React components
│   ├── Navigation.jsx           # Header navigation
│   └── Footer.jsx               # Footer component
├── lib/                         # Utilities and configuration
│   ├── firebase.js              # Firebase initialization
│   └── upiValidation.js         # UPI ID validation
├── styles/                      # Stylesheets
│   └── globals.css              # Global styles
├── docs/                        # Documentation
│   ├── README.md                # Documentation overview
│   ├── 01-project-planning/     # Project planning docs
│   ├── 02-version-releases/     # Version history
│   ├── 03-implementation-guides/# Technical guides
│   ├── 04-user-guides/          # User documentation
│   └── 05-features/             # Feature documentation
├── .env.example                 # Environment template
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies
└── README.md                    # This file
```

---

## Development

### Running Tests

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Code Style

- Use functional components with hooks
- Follow Next.js 13+ App Router conventions
- Maintain inline styles for component-level styling
- Use CSS custom properties for theming
- Keep components small and focused

### Environment Variables

Required environment variables (see `.env.example`):

- Firebase configuration (6 variables)
- All must be prefixed with `NEXT_PUBLIC_` for client access

---

## Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy automatically on push

### Firebase Hosting

```bash
npm run build
firebase deploy
```

### Custom Server

```bash
npm run build
npm run start
# Configure reverse proxy (nginx/Apache)
```

### Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Firebase project set up
- [ ] Firestore rules configured
- [ ] Storage rules configured
- [ ] Build succeeds locally
- [ ] All features tested
- [ ] Documentation updated

---

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **Project Planning**: Vision, goals, and development roadmap
- **Version Releases**: Detailed changelog and release notes
- **Implementation Guides**: Technical implementation details
- **User Guides**: Complete user manual for all roles
- **Feature Documentation**: Specific feature guides (QR payment, etc.)

### Quick Links

- [Documentation Index](docs/documentation-index.md)
- [User Guide](docs/04-user-guides/usage-guide.md)
- [Latest Release Notes](docs/02-version-releases/version-7.0-release-notes.md)
- [QR Payment Feature](docs/05-features/qr-payment/feature-overview.md)

---

## Current Scope and Limitations

### Included Features

- Product listing and discovery
- User authentication and profiles
- Direct payment information sharing
- Deal tracking and confirmation
- Farmer verification system
- Mobile responsive design

### Intentional Exclusions

- In-platform payment processing
- Messaging system
- Logistics coordination
- Admin moderation panel
- Real-time notifications
- Advanced analytics

These limitations maintain simplicity and reduce platform liability.

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Update documentation for new features
- Test thoroughly before submitting
- Keep commits focused and descriptive

---

## Roadmap

### Version 8.0 (Planned)

- Enhanced farmer verification
- Location-based product discovery
- Multi-language support
- Performance optimizations

### Version 9.0 (Future)

- Mobile application (iOS/Android)
- Advanced search filters
- Seasonal product recommendations
- Analytics dashboard for farmers

---

## Security

### Reporting Vulnerabilities

If you discover a security vulnerability, please email the maintainer directly. Do not create public issues for security concerns.

### Security Measures

- Firebase Authentication for user management
- Firestore security rules enforced
- Input validation on all forms
- XSS protection through React
- HTTPS enforced in production

---

## Performance

- Lighthouse Score: 90+ (Performance)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Mobile optimized with responsive design
- Offline data persistence enabled

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgments

- Firebase for backend infrastructure
- Next.js team for the excellent framework
- Open source community for tools and libraries

---

## Contact

**Project Maintainer**: Sanjan BM

- GitHub: [@sanjanb](https://github.com/sanjanb)
- Portfolio: [https://sanjanb.github.io/](https://sanjanb.github.io/)

---

## Disclaimer

Farm To Table is a connection platform only. All transactions, payments, communications, and deliveries occur directly between users. The platform assumes no liability for disputes, payment issues, or product quality. Users transact at their own risk.

---

**Last Updated**: December 23, 2025  
**Current Version**: 7.0  
**Build Status**: Production Ready
