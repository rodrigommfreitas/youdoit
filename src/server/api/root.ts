import { createTRPCRouter } from "./trpc";
import { taskRouter } from "./routers/taskRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
