# Open B2B Starter - Angular & MedusaJS

Open-source B2B Storefront built with Angular & MedusaJS. Features: Organization management, Bulk ordering, Custom price lists, and Enterprise-grade architecture.

## 🚀 Features

- **Company Management**: Full CRUD operations for B2B companies
- **Extended Customer Entity**: Customers linked to companies for multi-user accounts
- **B2B Price Lists**: Custom pricing logic for different companies
- **Bulk Ordering**: Table-based interface for quick bulk orders with CSV import
- **Angular Signals**: Modern reactive state management
- **Tailwind CSS**: Utility-first styling for rapid UI development
- **Standalone Components**: Latest Angular architecture patterns
- **Clean Architecture**: Separation of concerns with shared libraries
- **TypeScript Strict Mode**: Type-safe development
- **Nx Monorepo**: Efficient workspace management

## 📁 Project Structure

```
├── apps/
│   ├── backend/          # Medusa backend with custom entities
│   │   ├── src/
│   │   │   ├── models/   # Company & extended Customer entities
│   │   │   ├── services/ # Business logic services
│   │   │   ├── api/      # API routes
│   │   │   └── migrations/ # Database migrations
│   │   └── medusa-config.ts
│   └── storefront/       # Angular frontend application
│       └── src/
│           ├── app/
│           │   ├── components/ # UI components
│           │   │   ├── company/ # Company management
│           │   │   └── bulk-order/ # Bulk ordering
│           │   └── services/ # State management services
│           └── styles.css # Tailwind CSS imports
├── libs/
│   └── medusa-api/       # Shared library with Medusa SDK wrapper
│       └── src/
│           └── lib/
│               ├── types.ts # TypeScript interfaces
│               ├── medusa-client.service.ts
│               ├── company.service.ts
│               └── auth.service.ts
└── nx.json               # Nx workspace configuration
```

## 🛠️ Tech Stack

### Backend
- **MedusaJS** - Headless commerce platform
- **TypeORM** - Database ORM
- **Express** - Web framework
- **PostgreSQL** - Database (recommended)

### Frontend
- **Angular 21** - Frontend framework
- **Angular Signals** - Reactive state management
- **Tailwind CSS** - Utility-first CSS
- **RxJS** - Reactive extensions

### Monorepo
- **Nx** - Build system and monorepo tools
- **TypeScript** - Type-safe development
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL 14+ (for production)

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
