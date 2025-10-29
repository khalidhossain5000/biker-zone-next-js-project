# GoRide - Bike Shop Next Js Project.

**GoRide** is a modern and responsive bike shop web application built with **Next.js**, **Tailwind CSS**, **NextAuth**, and **MongoDB**, designed to provide users with a smooth and secure shopping experience. It allows users to browse and explore bikes, view detailed product information, and manage their profiles with real-time updates and image uploads. The project includes authentication using both Google and email/password, supports light and dark themes, and features a clean, dynamic UI optimized for performance and usability.

## 🚀 Live Site

https://biker-zone-next-js-project.vercel.app

## Features

- Register and login using **Email & Password** and **Google** using **Next Auth**.
- Browse Bike in shop and purchase it with filter by category.
- Place orders from bike details page and manage checkout process.
- Fully responsive design with Tailwind CSS and **ShadCdn**.
- Dark and light mode toggle support using **ShadCdn**.
- Fetch and cache data using TanStack Query with real-time updates.
- Multiple User Role admin and user with separte Dashboard.
- Passwords hashed with bcryptjs for security and Toast Notification.
- Optimized images using Next.js Image component with default fallbacks.
- Dynamic routing for individual product pages
- Admin can Manage products and Manage All Users and Their Role in Admin Dashboard.
- Dropdown menu for profile options.
- Edit Profile info in their dashboard page .
- Featured Bike Added on the Home page.
- Shopping cart with secure checkout process.
- Order Mangement in admin dashboard and order history in user dashboard.

## Setup & installation instructions

1.Clone the repository

```bash
git clone https://github.com/khalidhossain5000/biker-zone-next-js-project.git
cd biker-zone-next-js-project

```

2.Install dependencies

```bash
npm install

```

3.Create environment variables

```bash
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string

```

4.Run the development server

```bash
npm run dev

```

5.Open in browser

```bash
http://localhost:3000

```

## Technologies Used

- Next.js
- React
- Tailwind CSS
- NextAuth.js
- MongoDB
- TanStack Query
- Axios
- Bcrypt
- BcryptJS
- Lucide React
- **ShadCdn**
- React Hook Form
- React Hot Toast
- SweetAlert2
- Swiper
- Next Themes
