# Next-Supabase-TRPC - Full Stack TypeScript Starter

A modern, full-stack TypeScript starter template built with Next.js, Supabase, and tRPC. This template provides a solid foundation for building scalable web applications with type safety, authentication, and database management.

## 🚀 Features

- ⚡️ **Next.js 15** with App Router
- 🔐 **Supabase** Authentication & Database
- 🎨 **Tailwind CSS** for styling
- 🔄 **tRPC** for type-safe API calls
- 📦 **Drizzle ORM** for database management
- 🎯 **TypeScript** for type safety
- 📱 **Responsive** design
- 🔍 **Biome** for linting and formatting
- 🧪 **React Query** for data fetching
- 🔒 **Middleware** for route protection

## 📋 Prerequisites

- Node.js 18+
- pnpm 9+
- Supabase account
- PostgreSQL (if running locally)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/testimate.git
cd testimate
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
```

## 🚀 Getting Started

1. Start the development server:

```bash
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utility functions and shared logic
├── server/          # Server-side code
│   └── db/         # Database configuration and schema
├── styles/          # Global styles
├── supabase/        # Supabase client configuration
└── trpc/            # tRPC router and procedures
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:generate` - Generate database migrations
- `pnpm db:push` - Push database changes
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run Biome linting
- `pnpm check:write` - Fix linting issues

## 🔒 Authentication

The project uses Supabase for authentication with middleware protection. Protected routes will automatically redirect to the login page if the user is not authenticated.

## 🗄️ Database

This project uses Drizzle ORM with Supabase PostgreSQL. To manage your database:

1. Generate migrations:

```bash
pnpm db:generate
```

2. Push changes to database:

```bash
pnpm db:push
```

3. View database in Drizzle Studio:

```bash
pnpm db:studio
```

## 🎨 Styling

The project uses Tailwind CSS for styling. You can find global styles in `src/styles/globals.css`.

## 📝 Type Safety

- TypeScript for static type checking
- tRPC for end-to-end type safety
- Zod for runtime type validation

## 🔍 Code Quality

- Biome for linting and formatting
- TypeScript for type checking
- ESLint for code quality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [create-t3-app](https://create.t3.gg/) for the initial setup
- [Supabase](https://supabase.com/) for authentication and database
- [Next.js](https://nextjs.org/) for the framework
- [Drizzle ORM](https://orm.drizzle.team/) for database management
