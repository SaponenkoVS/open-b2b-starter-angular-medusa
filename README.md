# Open B2B Starter - Angular & MedusaJS

Open-source B2B Storefront built with Angular & MedusaJS. Features: Organization management, Bulk ordering, Custom price lists, and Enterprise-grade architecture.

[![Angular](https://img.shields.io/badge/Angular-21-dd0031.svg?logo=angular)](https://angular.dev/)
[![MedusaJS](https://img.shields.io/badge/MedusaJS-v2-562ad1.svg?logo=medusajs)](https://medusajs.com/)
[![AnalogJS](https://img.shields.io/badge/AnalogJS-Meta--framework-bf4040.svg)](https://analogjs.org/)
[![Nx](https://img.shields.io/badge/Nx-Monorepo-14304b.svg?logo=nx)](https://nx.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, open-source B2B Storefront starter kit. Built with the cutting-edge **MedusaJS v2 Framework** and **Angular 21** using **AnalogJS**. This project features a robust organization management system, multi-step approval workflows, and modern signal-based state management.

## ✨ Features

- 🏢 **Organization Management**: Multi-user company accounts with hierarchical roles.
- ⏳ **B2B Approval Workflow**: "Wait-for-approval" registration flow with atomic Medusa Workflows.
- 💰 **B2B Price Lists**: Individual pricing logic per company via Customer Groups.
- 🚀 **Modern Frontend**: Built with **AnalogJS** (Vite-based, File-based routing).
- 🧠 **Signals-First**: State management using Angular Signals for peak performance.
- 🎨 **Spartan UI**: Accessible, high-quality UI components based on Tailwind CSS and Radix primitives.
- 🏗️ **Expert Architecture**: Strict separation of concerns using Nx Monorepo and Clean Architecture.

---

## 📁 Project Structure

```
/open-b2b-starter-angular-medusa
├── apps/
│   ├── storefront/                     # ANALOGJS (ANGULAR + VITE)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/               # "The Brain" (Singleton logic)
│   │   │   │   │   ├── auth/           # Signals-based Auth State & Guards
│   │   │   │   │   ├── interceptors/   # Auth & Error handling
│   │   │   │   │   └── providers/      # Medusa SDK & Global Configs
│   │   │   │   ├── pages/              # FILE-BASED ROUTING (Expert Level)
│   │   │   │   │   ├── (auth)/         # Route group without URL prefix
│   │   │   │   │   │   ├── login.page.ts
│   │   │   │   │   │   └── register.page.ts
│   │   │   │   │   ├── (dashboard)/     # Route group with shared Sidebar Layout
│   │   │   │   │   │   ├── (dashboard).page.ts  # MASTER LAYOUT (Sidebar + Content)
│   │   │   │   │   │   ├── checkout.page.ts        # /dashboard (Overview/Stats)
│   │   │   │   │   │   ├── orders/
│   │   │   │   │   │   │   ├── checkout.page.ts    # /orders (Order List)
│   │   │   │   │   │   │   └── [id].page.ts     # /orders/:id (Dynamic Details)
│   │   │   │   │   │   ├── products/
│   │   │   │   │   │   │   ├── checkout.page.ts    # /products (B2B Grid/Catalog)
│   │   │   │   │   │   │   └── [id].page.ts     # /products/:id (PDP)
│   │   │   │   │   │   └── organization/    # B2B Organization Features
│   │   │   │   │   │       ├── members.page.ts  # Team / Employee Management
│   │   │   │   │   │       ├── profile.page.ts  # Company Settings / VAT info
│   │   │   │   │   │       └── invite.page.ts   # Colleague Invitation Flow
│   │   │   │   │   └── [fallback].page.ts       # 404 / Catch-all Page
│   │   │   │   ├── shared/             # Local components specific to this app
│   │   │   │   │   ├── components/      # Complex widgets (e.g., Order Charts)
│   │   │   │   │   └── ui/              # App-specific wrappers for Spartan UI
│   │   │   ├── styles/                 # Tailwind + Spartan/Shadcn Theme
│   │   │   └── vite.config.ts          # Vite & AnalogJS Configuration
│   │
│   └── backend/                        # MEDUSAJS V2 (MODULAR ARCHITECTURE)
│       ├── src/
│       │   ├── modules/                # DOMAIN-DRIVEN MODULES
│       │   │   └── company/            # B2B Organization Module
│       │   │       ├── models/         # Database Entities (Company, Member)
│       │   │       ├── services/       # Internal Business Logic (CRUD)
│       │   │       ├── migrations/     # Auto-generated Schema Migrations
│       │   │       └── index.ts        # Module Definition & Exports
│       │   ├── workflows/              # ATOMIC TRANSACTIONS (Workflows SDK)
│       │   │   ├── b2b-registration.ts # Multi-step: Create Company + Admin User
│       │   │   ├── approve-company.ts  # Multi-step: Approve + Assign Price List
│       │   │   └── invite-member.ts    # Multi-step: Invite Employee to Company
│       │   ├── api/                    # CUSTOM ENDPOINTS
│       │   │   ├── store/              # Public Storefront API
│       │   │   │   └── b2b/            # /store/b2b/...
│       │   │   ├── admin/              # Management/Admin API
│       │   │   │   └── b2b/            # /admin/b2b/...
│       │   │   └── middlewares.ts      # Global Security Checks (RBAC)
│       │   ├── subscribers/            # EVENT-DRIVEN LOGIC
│       │   │   ├── company-created.ts  # Slack/Email Notification on Sign-up
│       │   │   └── order-placed.ts     # ERP/CRM Data Synchronization
│       │   └── index.ts
│       ├── medusa-config.ts            # Core Configuration (Database, Redis, Modules)
│       └── project.json                # Nx Metadata & Task Definitions
│
├── libs/                               # SHARED LIBRARIES (The Contract)
│   ├── b2b-types/                      # Single Source of Truth (Interfaces)
│   │   ├── src/
│   │   │   ├── domain/                 # Core Entities: Company, Member, Role
│   │   │   ├── dtos/                   # API Request/Response Payloads
│   │   │   └── index.ts
│   ├── b2b-api/                        # Angular Data Access Library (SDK Wrapper)
│   │   └── src/
│   │       ├── services/               # AuthService, CompanyService, OrderService
│   │       └── index.ts
│   └── shared-ui/                      # SPARTAN UI / HELM (Shadcn for Angular)
│       └── src/
│           ├── brain/                  # Headless Logic Components (Radix-like)
│           └── helm/                   # Styled Components (Buttons, Tables, Dialogs)
│
├── .github/                            # CI/CD Workflows (GitHub Actions)
├── docker/                             # Dockerfiles for Development & Production
├── docker-compose.yml                  # Infrastructure (Postgres, Redis, Meilisearch)
├── nx.json                             # Nx Workspace Configuration
├── package.json                        # Global Workspace Dependencies
├── tailwind.config.js                  # Global Tailwind CSS Configuration
└── tsconfig.base.json                  # Path Mappings (@b2b/types -> libs/...)
```

## 🛠️ Tech Stack

### Backend (Core)
- **MedusaJS v2** - The leading open-source commerce framework.
- **MikroORM** - Database ORM (Native for Medusa v2).
- **Workflows SDK** - Orchestrating complex B2B business logic.
- **PostgreSQL & Redis** - High-performance data and event handling.

### Frontend
- **Angular 21** - Enterprise-ready frontend framework.
- **AnalogJS** - Meta-framework for Angular (Vite, SSR/SSG support).
- **Angular Signals** - Reactive state management
- **Spartan UI / Tailwind CSS** - Modern, utility-first design system.

### Monorepo
- **Nx** - Build system and monorepo tools
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast frontend build tool and dev server.

## 📋 Prerequisites

- Node.js 20+ (LTS) or 22+ (Recommended)
- npm or pnpm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SaponenkoVS/open-b2b-starter-angular-medusa.git
cd open-b2b-starter-angular-medusa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```bash
# Database
DATABASE_URL=postgres://localhost/medusa-b2b

# API URLs
BACKEND_URL=http://localhost:9000
STORE_CORS=http://localhost:4200
ADMIN_CORS=http://localhost:7001,http://localhost:7000

# Secrets
JWT_SECRET=your-jwt-secret-here
COOKIE_SECRET=your-cookie-secret-here
```

### 4. Run the backend

```bash
# Start the Medusa backend
npx nx serve backend
```

The backend will be available at `http://localhost:9000`

### 5. Run the frontend

```bash
# Start the Angular frontend
npx nx serve storefront
```

The frontend will be available at `http://localhost:4200`

## 🔧 Development

### Build projects

```bash
# Build backend
npx nx build backend

# Build frontend
npx nx build storefront

# Build shared library
npx nx build medusa-api

# Build all
npx nx run-many --target=build --all
```

### Run tests

```bash
# Test all projects
npx nx run-many --target=test --all
```

### Lint code

```bash
# Lint all projects
npx nx run-many --target=lint --all
```

## 📚 Key Concepts

### Company Entity

The `Company` entity extends Medusa with B2B-specific fields:

- `name` - Company name
- `tax_id` - Tax identification number
- `address`, `city`, `country`, `postal_code` - Location info
- `phone`, `email` - Contact information
- `is_active` - Active status

### Extended Customer

The `Customer` entity is extended to include:

- `company_id` - Foreign key linking to Company
- `company` - Relation to Company entity

This enables multi-user company accounts where multiple users belong to one company.

### B2B Price Lists

MedusaJS Price Lists are used for company-specific pricing:

- Assign price lists to customer groups
- Link companies to customer groups
- Apply custom pricing based on company membership

### Angular Signals

Modern reactive state management using Angular Signals:

```typescript
// Service with signals
private companiesSignal = signal<Company[]>([]);
companies = computed(() => this.companiesSignal());

// Component using signals
@if (companyState.loading()) {
  <div>Loading...</div>
}
```

## 🎨 UI Components

### Company Management
- List view with search and filters
- Create/Edit forms
- Inline editing
- Status indicators

### Bulk Order
- Table-based order entry
- CSV import functionality
- Real-time totals calculation
- Quantity adjustments

## 📝 Conventional Commits

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add bulk order CSV import
fix: resolve company deletion error
docs: update setup instructions
refactor: improve signal-based state management
test: add company service tests
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MedusaJS](https://medusajs.com/) - Headless commerce platform
- [Angular](https://angular.dev/) - Frontend framework
- [Nx](https://nx.dev/) - Monorepo tools
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📧 Support

For questions and support, please open an issue in the GitHub repository.

---

Made with ❤️ for the B2B commerce community
