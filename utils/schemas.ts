import { z } from 'zod'

export const authSchema = z.object({
    email: z.string().email({ message: 'Email is not valid field' }),
    password: z.string().min(8, { message: 'Password is required and must be 8 character' })
})

export const loginSchema = authSchema;
export const registerSchema = authSchema.extend({
    name: z.string().min(1).max(255).default('')
})


export type LoginSchema = z.output<typeof loginSchema>;
export type RegisterSchema = z.output<typeof registerSchema>;


// Course 

export const courseSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    description: z.string().nullish(),
    imageUrl: z.string().min(1, {
        message: 'Image is required'
    }),
    categoryId: z.string().min(1, {
        message: 'Category is required'
    }),
    price: z.coerce.number().optional(),
    attachmentUrl: z.string().min(1, {
        message: 'Attachment is required'
    }),
})

export const chapterSchema = z.object({
    title: z.string().min(1, {
        message: 'Title is required'
    }),
    description: z.string().min(1, {
        message: 'Description is required'
    }),
    videoUrl: z.string().min(1, {
        message: 'Video is required'
    }),
    isFree: z.coerce.boolean().default(false),
})

export type CourseSchema = z.output<typeof courseSchema>;
export type ChapterSchema = z.output<typeof chapterSchema>;
