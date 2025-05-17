# Testimate - Open Source Testimonial Collection Platform

Testimate is a modern, open-source alternative to testimonial collection platforms like testimonials.to, Senja, and Trustmary. Built with a focus on privacy, customization, and ease of use, Testimate allows businesses to collect, manage, and display customer testimonials with full control over their data.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftestimate%2Ftestimate&env=DATABASE_URL,NODE_ENV,SUPABASE_SERVICE_ROLE_KEY,S3_ACCESS_KEY_ID,S3_SECRET_ACCESS_KEY,MUX_WEBHOOK_SECRET,JWT_SECRET,S3_REGION,MUX_TOKEN_ID,MUX_TOKEN_SECRET,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_S3_BUCKET_NAME,NEXT_PUBLIC_S3_ENDPOINT,NEXT_PUBLIC_URL&envDescription=Environment%20variables%20for%20the%20Testimate%20application&envLink=https%3A%2F%2Fgithub.com%2Ftestimate%2Ftestimate%23environment-variables)

## 🚀 Features

- ⚡️ **Next.js 15** with App Router for blazing fast performance
- 🔐 **Supabase** Authentication & Database for secure data management
- 🎨 **Tailwind CSS** for beautiful, customizable designs
- 🔄 **tRPC** for type-safe API calls
- 📦 **Drizzle ORM** for efficient database management
- 🎯 **TypeScript** for robust type safety
- 🔍 **Biome** for code quality

## 📋 Prerequisites

- Node.js 18+
- pnpm 9+
- Supabase account

## Refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details on how to get started.

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

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the [AGPL-3.0 License](LICENSE) - see the LICENSE file for details. This license structure follows the same approach as [Cal.com](https://cal.com), ensuring that any modifications to the codebase remain open source.

## 🔐 Commercial License

For commercial use cases where you need to modify the codebase without open-sourcing your changes, we offer a commercial license. Please contact us for more information.

## 🙏 Acknowledgments

- [create-t3-app](https://create.t3.gg/) for the initial setup
- [Supabase](https://supabase.com/) for authentication and database
- [Next.js](https://nextjs.org/) for the framework
- [Drizzle ORM](https://orm.drizzle.team/) for database management
- [Cal.com](https://cal.com) for inspiration on open-source licensing model
