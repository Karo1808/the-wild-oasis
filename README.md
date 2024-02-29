# The Wild Oasis

[![pl](https://img.shields.io/badge/lang-pl-red.svg)](https://github.com/Karo1808/the-wild-oasis/blob/master/README.pl.md)

### Description

This web application serves as a dashboard for a fictional hotel. It allows multiple users to manage various aspects of the hotel, including guest information, bookings, earnings, and room availability.

It was built as part of a [course](https://www.udemy.com/course/the-ultimate-react-course/?couponCode=ST22FS22724) and modified using TypeScript

### Demo

[Website link](https://the-wild-oasis-gamma.vercel.app)

### Features

- User Management: Admin users can create and manage user accounts for staff members.
- Dashboard: Provides an overview of current guests, bookings, hotel earnings, and room occupancy.
- Booking Management: Allows staff to create, edit, and confirm bookings. Bookings can be marked as checked-in when guests arrive.
- Room Management: Staff can add or remove cabins/rooms from the system, ensuring accurate room availability.
- Settings Page: Admins can modify global hotel-specific information such as minimum numbers of nights or breakfast price.
- Security: Implements measures such as user authentication, authorization.

### Technologies Used

- Vite: A fast build tool for creating modern Single Page Applications.
- React: A JavaScript library for building user interfaces.
- TypeScript: A superset of JavaScript for enhanced code quality and developer productivity.
- Styled Components: A CSS-in-JS library for styling React components.
- React Query: Provides tools for managing, caching, and synchronizing server state in React applications.
- React Hook Form: Simplifies creating forms with React.
- Supabase: An open-source backend as a service utility, providing authentication services, database functionalities, and file uploads.
- React Hot Toast: A toast notification library for React applications.

### Installation

Clone the repository locally

```bash
git clone https://github.com/Karo1808/the-wild-oasis.git
```

Install the required dependencies

```bash
npm install
```

Create an .env.local file and add the following environment variables

```bash
VITE_SUPABASE_KEY=
VITE_SUPABASE_URL=
```

Create tables in supabase with this structure

![Tables](./assets/tables.png)

Enable row level security based on the image below

![RLS](./assets/rls.png)

Create storage buckets in supabase

```bash
avatars
cabing-images
```

Run the website locally

```bash
npm run dev
```
