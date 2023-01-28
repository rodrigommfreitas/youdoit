# YouDoIt
 A simple to-do list app built using the [T3 Stack](https://create.t3.gg/) and bootstrapped with `create-t3-app`.
 
## T3 stack:
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Features:
- Authentication (Google OAuth) and protected pages both client side and server side;  
- Protected tRPC routes;
- Add tasks;
- Complete tasks;
- Delete tasks;
- Sort your tasks.

### Setup
After creating your MySQL database (I used [PlanetScale](https://planetscale.com/)) and creating a google project with OAuth, setup your .env file following the structure found in .env.example.

### Install dependencies:
```
npm install
```
### Run
```
npm run dev
```

### Preview
![page preview](https://raw.githubusercontent.com/rodrigommfreitas/youdoit/main/preview.png)
