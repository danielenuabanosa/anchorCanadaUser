# Anchor Canada - User Portal Design Breakdown Report
**Prepared:** June 6, 2026  
**Project:** Anchor Canada User Application  
**Status:** Complete Design & Feature Implementation

---

## Executive Summary

The User Portal is a comprehensive Next.js 16.2.4 application designed to connect users with diverse opportunities including jobs, housing, training, funding, and community resources. The application supports three user roles (Individual, Business, Expert) and provides a seamless onboarding experience, personalized dashboard, opportunity discovery, and profile management.

**Key Stats:**
- ✅ **7 Core Features** implemented and designed
- ✅ **9 Main Pages/Routes** with multi-step workflows
- ✅ **10+ Reusable UI Components** with consistent design
- ✅ **3 User Roles** with role-based features
- ✅ **5 Opportunity Categories** (Jobs, Housing, Training, Funding, Community)
- ✅ **Responsive Design** with mobile-first approach

---

## 1. USER FLOWS & JOURNEYS

### 1.1 Sign-Up & Onboarding (7-Step Process)
**Route:** `/register` → `/onboarding/[step]` → `/dashboard`

**Process Flow:**
1. **Registration** - User selects role (Individual/Business/Expert) & creates account
2. **Journey Selection** - Choose primary goal (Find Opportunities, Publish, Explore)
3. **Interest Selection** - Select relevant opportunity categories
4. **Location Selection** - Choose province/region
5. **Profile Completion** - Enter bio and interests
6. **Account Verification** - Email/phone verification step
7. **Activation** - Final account activation & redirect to dashboard

**Key Features:**
- Multi-step wizard with progress tracking
- Form validation with Zod schemas
- Persistent form state across steps
- Mobile-friendly form design

---

### 1.2 Opportunity Discovery & Browsing
**Route:** `/opportunities` → `/opportunities/[slug]` → Save/Share

**Features:**
- **Browse All Opportunities** - Grid/list view of all opportunities
- **Advanced Filtering** - Filter by:
  - Opportunity Type (Job, Housing, Training, Funding, Community)
  - Province/Location
  - Search Query (keyword search)
- **Pagination** - Paginated results (configurable limit)
- **Save for Later** - Bookmark opportunities to `/saved` collection
- **Opportunity Detail View** - Complete details with description, deadline, provider info

**Opportunity Data Model:**
- Title, Type, Status (Open/Closed/Coming Soon)
- Provider/Organization name
- Location & Province
- Description & Tags
- Deadline date
- Salary/Funding amount (if applicable)
- Provider contact info

---

### 1.3 Category Browsing
**Route:** `/categories` → `/categories/[slug]`

**Features:**
- **Category Overview** - View all 5 categories with opportunity counts
- **Category Details** - Type-specific view showing:
  - Category description & icon
  - Filtered opportunities by type
  - Metadata (total count, active count)
- **Quick Navigation** - Easy access to browse by opportunity type

**Available Categories:**
1. Jobs
2. Housing
3. Training
4. Funding
5. Community

---

### 1.4 Profile Management & Personalization
**Route:** `/profile`

**Features:**
- **View Current Profile** - Display user information
- **Edit Profile** - Update:
  - Name & email
  - Phone number
  - Bio/Summary
  - Province/Location
  - Interests & categories
- **Avatar Management** - Upload & update profile picture
- **Profile Persistence** - Changes saved to backend with optimistic updates

**Profile Data:**
- Name, Email, Phone
- Bio/Summary text
- Role (Individual/Business/Expert)
- Province/Location
- Interests array
- Avatar URL
- Account creation date

---

### 1.5 Saved Opportunities (Bookmarks)
**Route:** `/saved`

**Features:**
- **View All Saved** - Browse all bookmarked opportunities
- **Remove from Saved** - Quick remove action
- **Sort & Filter** - Organize saved opportunities
- **Quick Actions** - Apply, share, or explore similar opportunities

---

### 1.6 Dashboard & Home
**Route:** `/` (public) & `/dashboard` (authenticated)

**Public Landing Page (`/`):**
- Hero section with value proposition
- Journey selection options (Find, Publish, Explore)
- Call-to-action for sign-up
- Feature highlights

**Authenticated Dashboard (`/dashboard`):**
- Personalized welcome banner
- Summary statistics
- Quick action shortcuts:
  - Browse Opportunities
  - Browse Categories
  - View Saved Opportunities
- Recent Activity feed
- Recommended opportunities

---

## 2. FEATURE MODULES (Architecture)

### 2.1 Authentication Feature
**Location:** `src/features/auth/`  
**Purpose:** User registration, login, and session management

**Components:**
- `LoginForm.tsx` - Login form with email/password fields
- `RegisterForm.tsx` - Registration with role selection (Individual/Business/Expert)

**Hooks:**
- `useLogin()` - Login mutation with auto-redirect to dashboard on success
- `useRegister()` - Registration mutation with role selection
- `useLogout()` - Logout mutation with session cleanup

**Services:**
- `auth.service.ts` - API integration
  - `login(email, password)` - POST `/auth/login`
  - `register(name, email, password, role)` - POST `/auth/register`
  - `logout()` - POST `/auth/logout`
  - `me()` - GET `/auth/me` (get current user)

**Data Models:**
```typescript
- AuthUser: {id, name, email, role, avatarUrl, createdAt}
- LoginDto: {email, password}
- RegisterDto: {name, email, password, confirmPassword, role}
- AuthResponse: {user, token}
- UserRole: 'individual' | 'business' | 'expert'
```

---

### 2.2 Opportunities Feature (Core)
**Location:** `src/features/opportunities/`  
**Purpose:** Browse, search, filter, and save job/grant/housing/training opportunities

**Hooks:**
- `useOpportunities(filters)` - Query opportunities with pagination & filters
- `useOpportunity(id)` - Fetch single opportunity details
- `useSaveOpportunity()` - Mutation to save/unsave opportunities

**Services:**
- `opportunity.service.ts` - API integration
  - `list(filters)` - GET `/opportunities` with type, province, search, pagination
  - `getById(id)` - GET `/opportunities/{id}`
  - `getBySlug(slug)` - GET `/opportunities/slug/{slug}`
  - `save(id)` - POST `/opportunities/{id}/save`
  - `unsave(id)` - DELETE `/opportunities/{id}/save`

**Data Models:**
```typescript
- Opportunity: {
    id, title, type, status, provider, location, province, 
    description, tags[], deadline, salary, fundingAmount, 
    isSaved, createdAt, slug
  }
- OpportunityType: 'job' | 'housing' | 'training' | 'funding' | 'community'
- OpportunityStatus: 'open' | 'closed' | 'coming_soon'
- OpportunityFilters: {type, province, query, page, limit}
```

---

### 2.3 Categories Feature
**Location:** `src/features/categories/`  
**Purpose:** Display and manage opportunity categories

**Hooks:**
- `useCategories()` - Fetch all categories with metadata

**Services:**
- `category.service.ts` - API integration
  - `list()` - GET `/categories` (all categories)
  - `getBySlug(slug)` - GET `/categories/{slug}` (category details)

**Data Models:**
```typescript
- Category: {
    id, slug, type, title, description, icon, 
    opportunityCount, color
  }
```

**Category Types:**
- Jobs
- Housing
- Training
- Funding
- Community

---

### 2.4 Profile Feature
**Location:** `src/features/profile/`  
**Purpose:** User profile viewing and editing

**Hooks:**
- `useProfile()` - Fetch user profile with caching
- `useUpdateProfile()` - Mutation to update profile fields & avatar

**Services:**
- `profile.service.ts` - API integration
  - `get()` - GET `/profile` (fetch current user profile)
  - `update(dto)` - PATCH `/profile` (update profile)
  - `uploadAvatar(file)` - POST `/profile/avatar` (avatar upload)

**Data Models:**
```typescript
- UserProfile: {
    id, name, email, phone, bio, role, province, 
    avatarUrl, interests[], createdAt
  }
- UpdateProfileDto: {name?, phone?, bio?, province?, interests?}
```

---

### 2.5 Saved Feature (Bookmarks)
**Location:** `src/features/saved/`  
**Purpose:** Manage bookmarked/saved opportunities

**Components:**
- `SavedList.tsx` - Display saved opportunities grid/list

**Hooks:**
- `useSaved()` - Fetch all saved opportunities for current user

**Services:**
- `saved.service.ts` - API integration
  - `list()` - GET `/saved` (all saved opportunities)
  - `remove(opportunityId)` - DELETE `/saved/{opportunityId}`

---

### 2.6 Dashboard Feature
**Location:** `src/features/dashboard/`  
**Purpose:** Main authenticated user dashboard

**Components:**
- `DashboardContent.tsx` - Main dashboard layout wrapper
- `WelcomeBanner.tsx` - Personalized greeting with user name
- `StatsCard.tsx` - Key metrics display (views, saves, applications)
- `QuickActions.tsx` - Action shortcuts to main features
- `RecentActivity.tsx` - Feed of recent opportunities & activities

---

### 2.7 Home Feature (Public)
**Location:** `src/features/home/`  
**Purpose:** Public landing pages and onboarding UI

**Components:**
- `LandingNavbar.tsx` - Navigation for public landing page
- `OnboardingNavbar.tsx` - Navigation for onboarding flow
- `HeroSection.tsx` - Landing page hero with value proposition
- `GetStartedSection.tsx` - Call-to-action section

---

## 3. SHARED COMPONENTS & DESIGN SYSTEM

### 3.1 Layout Components
**Location:** `src/shared/components/layout/`

| Component | Purpose |
|-----------|---------|
| `Sidebar.tsx` | Main navigation sidebar with collapsible state, mobile support |
| `Topbar.tsx` | Top navigation bar with user menu, notifications, theme toggle |
| `Container.tsx` | Centered content wrapper with responsive width |

---

### 3.2 UI Components Library
**Location:** `src/shared/components/ui/`

| Component | Purpose | Variants |
|-----------|---------|----------|
| `Avatar.tsx` | User profile pictures | Sizes: sm, md, lg |
| `Badge.tsx` | Tags, labels, status indicators | Colors: primary, success, danger, warning |
| `Button.tsx` | Call-to-action buttons | primary, secondary, danger, outlined |
| `Card.tsx` | Content container | With/without padding, hover effects |
| `Input.tsx` | Form text inputs | text, email, password, number |
| `Modal.tsx` | Dialog/popup overlays | Responsive, dismiss options |
| `Select.tsx` | Dropdown select fields | Multi-select support |
| `Skeleton.tsx` | Loading placeholder | Animated placeholder |
| `Table.tsx` | Data table display | Sortable columns, pagination |
| `Tabs.tsx` | Tab navigation | Horizontal/vertical |

**Design System:**
- **Tailwind CSS v4** - CSS-only, no config file needed
- **Color Palette** - Primary, secondary, success, danger, warning
- **Responsive Breakpoints** - Mobile-first design
- **Accessibility** - WCAG compliant components
- **Consistent Spacing** - Based on 4px grid system

---

### 3.3 Provider Component
**Location:** `src/shared/components/providers/`

**Providers.tsx:**
- Wraps entire app with:
  - **React Query Provider** - Data fetching & caching
  - **Auth Store** - Zustand state management
  - **UI Store** - Layout & UI state management

---

## 4. STATE MANAGEMENT

### 4.1 Zustand Authentication Store
**Location:** `src/store/authStore.ts`  
**Persistence:** localStorage (`anchor_auth` key)

**State:**
```typescript
{
  user: AuthUser | null,
  token: string | null,
  isAuthenticated: boolean
}
```

**Actions:**
- `setAuth(user, token)` - Set authenticated user
- `clearAuth()` - Clear auth state (logout)
- `updateUser(user)` - Update user info

**Usage Pattern:**
- Automatically persisted to localStorage
- Token used in API interceptors
- Auto-rehydrated on app startup

---

### 4.2 Zustand UI Store
**Location:** `src/store/uiStore.ts`  
**Persistence:** localStorage (`anchor_ui` key)

**State:**
```typescript
{
  sidebarCollapsed: boolean,
  sidebarMobileOpen: boolean
}
```

**Actions:**
- `toggleSidebar()` - Collapse/expand sidebar
- `setSidebarMobileOpen(open)` - Mobile menu state

---

### 4.3 React Query Integration
**Location:** `lib/queryClient.ts`

**Features:**
- Automatic caching of GET requests
- 5-minute cache time (configurable)
- Mutation invalidation on POST/PATCH/DELETE
- Stale-while-revalidate strategy
- Error boundary integration

---

## 5. API INTEGRATION & BACKEND CONNECTIVITY

### 5.1 API Configuration
**Location:** `lib/api.ts`

**Base Configuration:**
- **Base URL:** `process.env.NEXT_PUBLIC_API_URL` (default: `http://localhost:3001/api`)
- **Timeout:** 15 seconds
- **Headers:** Content-Type: application/json

**Axios Interceptors:**
1. **Request Interceptor:**
   - Attaches Bearer token from localStorage
   - Validates token expiry

2. **Response Interceptor:**
   - Handles 401 (unauthorized) - redirects to `/login`
   - Handles 403 (forbidden) - shows error message
   - Clears auth state on token expiry

---

### 5.2 API Endpoints Map

| Module | Method | Endpoint | Purpose |
|--------|--------|----------|---------|
| **Auth** | POST | `/auth/login` | User login |
| | POST | `/auth/register` | User registration |
| | POST | `/auth/logout` | Logout session |
| | GET | `/auth/me` | Get current user |
| **Profile** | GET | `/profile` | Fetch profile |
| | PATCH | `/profile` | Update profile |
| | POST | `/profile/avatar` | Upload avatar |
| **Opportunities** | GET | `/opportunities` | List all (with filters) |
| | GET | `/opportunities/{id}` | Detail by ID |
| | GET | `/opportunities/slug/{slug}` | Detail by slug |
| | POST | `/opportunities/{id}/save` | Save opportunity |
| | DELETE | `/opportunities/{id}/save` | Unsave opportunity |
| **Categories** | GET | `/categories` | List all categories |
| | GET | `/categories/{slug}` | Category details |
| **Saved** | GET | `/saved` | Get saved opportunities |
| | DELETE | `/saved/{opportunityId}` | Remove from saved |

---

## 6. AUTHENTICATION & SECURITY

### 6.1 Authentication Flow
```
1. User fills login form
2. POST /auth/login with email/password
3. Backend returns { user, token }
4. Token stored in localStorage (via authStore)
5. API interceptor attaches token to all requests
6. Protected routes check isAuthenticated state
7. On 401: Clear token, redirect to /login
```

### 6.2 Protected Routes
**Route Group:** `(app)`

**Protection Mechanism:**
- Checks `useAuthStore().isAuthenticated` before rendering
- Non-authenticated users redirected to `/login`
- Token automatically validated on each protected route access

**Protected Routes:**
- `/dashboard` - Main dashboard
- `/opportunities` - Browse opportunities
- `/categories` - View categories
- `/saved` - View saved opportunities
- `/profile` - User profile

---

### 6.3 User Roles & Access Control

| Role | Purpose | Features |
|------|---------|----------|
| **Individual** | Job seekers, training participants | Browse all opportunities, save, apply |
| **Business** | Organizations posting opportunities | Create postings, manage applications |
| **Expert** | Resource providers, mentors | Publish resources, connect with users |

---

## 7. TECHNICAL STACK

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2.4 |
| **Runtime** | React 19 |
| **Styling** | Tailwind CSS v4 (CSS-only) |
| **State** | Zustand |
| **Data Fetching** | React Query, Axios |
| **Validation** | Zod |
| **Type Safety** | TypeScript |
| **Package Manager** | npm (v11+ with quirks) |

**Environment Setup:**
- Node.js 25+
- npm install: Use `--prefer-offline --no-audit --no-fund` flags
- Dev server: `npm run dev` (port 3000/3001)

---

## 8. KEY DESIGN PATTERNS & CONVENTIONS

### 8.1 Feature Module Structure
Each feature follows this pattern:
```
src/features/{feature-name}/
├── types.ts          # Data models & types
├── components/       # React components
├── hooks/            # Custom hooks (useQuery, useMutation)
├── services/         # API integration
└── schemas/          # Zod validation (if applicable)
```

### 8.2 Custom Hooks Pattern
```typescript
// useOpportunities.ts
export function useOpportunities(filters) {
  return useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => opportunityService.list(filters)
  })
}
```

### 8.3 API Service Pattern
```typescript
// opportunity.service.ts
export const opportunityService = {
  list: (filters) => api.get('/opportunities', { params: filters }),
  getById: (id) => api.get(`/opportunities/${id}`),
  save: (id) => api.post(`/opportunities/${id}/save`),
  unsave: (id) => api.delete(`/opportunities/${id}/save`)
}
```

---

## 9. USER EXPERIENCE FEATURES

### 9.1 Responsive Design
- **Mobile-First Approach** - Base styles for mobile, enhanced for desktop
- **Breakpoints:** sm, md, lg, xl
- **Sidebar Collapse** - Collapsible navigation on desktop, mobile drawer
- **Touch-Friendly** - Adequate button/tap target sizes

### 9.2 Loading States
- **Skeleton Loading** - Placeholder components during data fetch
- **Optimistic Updates** - Immediate UI updates before server response
- **Loading Indicators** - Spinners on buttons during async actions

### 9.3 Error Handling
- **User-Friendly Messages** - Clear error notifications
- **Form Validation** - Real-time validation feedback
- **Network Error Recovery** - Retry mechanisms for failed requests
- **Session Expiry** - Auto-logout with warning

### 9.4 Performance Optimizations
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Route-based code splitting
- **Lazy Loading** - Components lazy loaded on demand
- **Query Caching** - 5-minute cache with stale-while-revalidate

---

## 10. TESTING & QUALITY ASSURANCE

### 10.1 Code Quality
- **TypeScript** - Full type safety
- **Zod Validation** - Runtime schema validation
- **ESLint Configuration** - Code style enforcement

### 10.2 Form Validation
- **Zod Schemas** - All forms have Zod schemas
- **Real-Time Feedback** - Inline validation errors
- **Progressive Enhancement** - Works without JavaScript (basic)

---

## 11. DEPLOYMENT & DEVOPS CONSIDERATIONS

### 11.1 Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development|production
```

### 11.2 Build Configuration
- **Next.js Config** - `next.config.ts`
- **TypeScript Config** - `tsconfig.json`
- **PostCSS Config** - `postcss.config.mjs` (Tailwind CSS)
- **ESLint Config** - `eslint.config.mjs`

---

## 12. COMPLETED DESIGN DELIVERABLES

### ✅ Completed
- [x] Authentication system (login/register/logout)
- [x] Multi-step onboarding wizard (7 steps)
- [x] Opportunity browsing & filtering
- [x] Category management & display
- [x] User profile management
- [x] Saved opportunities feature
- [x] Responsive dashboard
- [x] Mobile-responsive design
- [x] API integration layer
- [x] State management (Zustand)
- [x] Design system (UI components)
- [x] Form validation (Zod)
- [x] Error handling & loading states
- [x] Protected routes & authentication guards

### 📋 Architectural Decisions
- Zustand for lightweight state management
- React Query for server state & caching
- Feature-based folder structure
- Centralized API service layer
- Axios interceptors for auth & error handling
- Tailwind CSS v4 for styling consistency
- Next.js app directory structure

---

## CONCLUSION

The Anchor Canada User Portal is a fully designed, feature-complete application with:
- **Comprehensive user authentication** with 3 role types
- **Rich opportunity discovery** with advanced filtering
- **Personalized user dashboard** with activity tracking
- **Complete profile management** system
- **Responsive, accessible UI** with reusable components
- **Robust API integration** with error handling
- **Type-safe codebase** with TypeScript & validation

The architecture supports future scaling with clear feature modules, centralized state management, and extensible API integration patterns.

---

**Report Generated:** June 6, 2026  
**Application:** Anchor Canada User Portal  
**Version:** 1.0 - Design Complete
