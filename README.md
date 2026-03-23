<div align="center">
  <br />
  <img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=400&fit=crop" alt="Ecommerce Store Banner" width="1200" height="400" />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=next.js&color=black" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logoColor=white&logo=stripe&color=635BFF" alt="Stripe" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=336791" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=38B2AC" alt="Tailwind" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Devin%20AI-black?style=for-the-badge&logoColor=white&color=111111" alt="Devin AI" />
  </div>

  <h3 align="center">Ecommerce Fullstack Store</h3>

  <p align="center">A modern fullstack ecommerce platform with secure payments, scalable backend APIs, and a clean responsive UI.</p>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ✨ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">✨ Introduction</a>

This project is a fullstack ecommerce app built with **Next.js**, **Tailwind CSS**, **Stripe**, and **PostgreSQL**. It is designed to support core ecommerce workflows including browsing products, managing carts, handling checkout, and processing secure payments. Development is accelerated using coding-agent workflows with **Devin AI** to streamline implementation, iteration, and delivery.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Next.js](https://nextjs.org/docs)** is a React framework for building fullstack web apps with server rendering, API routes, and modern routing.

- **[Stripe](https://stripe.com/docs)** powers secure checkout, payment intent handling, and order payment confirmation.

- **[PostgreSQL](https://www.postgresql.org/docs/)** is the relational database used for products, users, orders, and transaction records.

- **[Tailwind CSS](https://tailwindcss.com/docs)** provides utility-first styling for building a responsive and consistent UI quickly.

- **[TypeScript](https://www.typescriptlang.org/docs/)** improves developer experience with static typing and safer refactors.

- **Devin AI** is used as a coding-agent workflow assistant to speed up development and repetitive implementation tasks.

## <a name="features">🔋 Features</a>

👉 **Modern Storefront**: Responsive product listing pages with clean layouts, categories, and product detail views.

👉 **Product Search & Filtering**: Search products and refine by categories, price ranges, and availability.

👉 **Cart Management**: Add, remove, and update cart items with real-time subtotal and total calculations.

👉 **Stripe Checkout**: Secure checkout flow with Stripe for payment processing and status confirmation.

👉 **Order Management**: Persist orders and payment metadata in PostgreSQL for tracking and history.

👉 **Authentication Ready**: Structure prepared for user accounts, protected routes, and personalized order history.

👉 **Scalable Fullstack Architecture**: Built with Next.js server capabilities for API endpoints, data access, and frontend rendering.

👉 **Developer-Friendly Workflow**: Clean project structure and coding-agent support with Devin AI for faster development cycles.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to run the project locally.

**Prerequisites**

Make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

**Cloning the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-fullstack-store.git
cd ecommerce-fullstack-store
```

**Installation**

```bash
npm install
```

**Set Up Environment Variables**

Create a `.env` file in the project root:

```env
NODE_ENV='development'
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# DATABASE
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/ecommerce_db

# STRIPE
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# APP
NEXT_PUBLIC_APP_NAME=Ecommerce Fullstack Store
```

Replace placeholder values with your actual credentials from your PostgreSQL setup and Stripe dashboard.

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
