import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  // Add a new task
  addTask: protectedProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(1, { message: "Field can't be empty." })
          .max(100, { message: "Maximum characters exceeded." }),
        important: z.boolean(),
        user: z.object({ connect: z.object({ id: z.string() }) }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const item = await ctx.prisma.task.create({ data: input });
        return item;
      } catch (err) {
        console.log(`It wasn't possible to add the task...\n ${err as string}`);
      }
    }),
  // Get all tasks for a user
  getTasks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const tasks = await ctx.prisma.task.findMany({
        where: { user: { id: ctx.session.user.id } },
      });
      return tasks;
    } catch (err) {
      console.log(
        `It wasn't possible to find your tasks...\n ${err as string}`
      );
    }
  }),
  // Complete task
  completeTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isCompleted: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const item = await ctx.prisma.task.update({
          where: { id: input.id },
          data: { completed: input.isCompleted },
        });
        return item;
      } catch (err) {
        console.log(
          `It wasn't possible to toggle the task's completed status...\n ${
            err as string
          }`
        );
      }
    }),
  // Delete a task
  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const item = await ctx.prisma.task.delete({ where: { id: input.id } });
        return item;
      } catch (err) {
        console.log(
          `It wasn't possible to delete the task...\n ${err as string}`
        );
      }
    }),
});
