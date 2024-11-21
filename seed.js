import { PrismaClient } from '@prisma/client'

const database = new PrismaClient();


async function createCategories() {
    try {

        // ======= Categories Creation
        // await database.chapter.createMany({
        //     data: [
        //         { name: "Computer Science" },
        //         { name: "Music" },
        //         { name: "Fitness" },
        //         { name: "Photography" },
        //         { name: "Accounting" },
        //         { name: "Engineering" },
        //         { name: "Filming" },
        //     ]
        // })
        // ======= Chapters Creation
        await database.chapter.createMany({
            data: [
                {
                    title: 'Chapter 3',
                    description:`
                    <p>A normal line for chapter description</p><ul><li><p>Bullet list 1</p></li><li><p>Bullet list 2</p></li></ul><blockquote><p>This is BlockQuote Text</p></blockquote><pre><code>        const chapter = await db.chapter.update({
            where: {
                id: event.context.params.chapterId,
                courseId: event.context.params.courseId,
            },
            data: {
                title, description, videoUrl, position, isPublished, isFree
            }
        });</code></pre>
                    `,
                    videoUrl: 'https://res.cloudinary.com/doqvy0h8u/video/upload/v1732155925/y3jpmybq3k2whuvgnz3v.mp4',
                    courseId: '673eb44a8eb4fe3b3008f0c8',
                    position: 3,
                    isPublished: true,
                },
                {
                    title: 'Chapter 4',
                    description: 'Chapter 4 description',
                    videoUrl: 'https://res.cloudinary.com/doqvy0h8u/video/upload/v1732155925/y3jpmybq3k2whuvgnz3v.mp4',
                    courseId: '673eb44a8eb4fe3b3008f0c8',
                    position: 4,
                    isPublished: true

                },
                {
                    title: 'Chapter 5',
                    description: 'Chapter 5 description',
                    videoUrl: 'https://res.cloudinary.com/doqvy0h8u/video/upload/v1732155925/y3jpmybq3k2whuvgnz3v.mp4',
                    courseId: '673eb44a8eb4fe3b3008f0c8',
                    position: 5,
                    isPublished: true

                },
                {
                    title: 'Chapter 6',
                    description: 'Chapter 6 description',
                    videoUrl: 'https://res.cloudinary.com/doqvy0h8u/video/upload/v1732155925/y3jpmybq3k2whuvgnz3v.mp4',
                    courseId: '673eb44a8eb4fe3b3008f0c8',
                    position: 6,
                    isPublished: true

                },
                {
                    title: 'Chapter 7',
                    description: 'Chapter 7 description',
                    videoUrl: 'https://res.cloudinary.com/doqvy0h8u/video/upload/v1732155925/y3jpmybq3k2whuvgnz3v.mp4',
                    courseId: '673eb44a8eb4fe3b3008f0c8',
                    position: 7,
                    isPublished: true

                },
            ]
        })

        // await database.course.createMany({
        //     data: [
        //         {
        //             title: 'Course 1',
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas quod vel aut expedita. Laboriosam eveniet necessitatibus doloremque magnam veniam!',
        //             price: 100,
        //             isPublished: true,
        //             imageUrl: 'https://res.cloudinary.com/hafizjavaid/image/upload/v1731315166/djallwfysumsao2f9avx.jpg',
        //             categoryId: '6731bfcf76363f2263b56cdc',
        //             userId: '67356d885d569b78961efed0',
        //         },
        //         {
        //             title: 'Course 2',
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas quod vel aut expedita. Laboriosam eveniet necessitatibus doloremque magnam veniam!',
        //             price: 200,
        //             isPublished: true,
        //             imageUrl: 'https://res.cloudinary.com/hafizjavaid/image/upload/v1731315166/djallwfysumsao2f9avx.jpg',
        //             categoryId: '6731bfcf76363f2263b56cdc',
        //             userId: '67356d885d569b78961efed0',

        //         },
        //         {
        //             title: 'Course 3',
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas quod vel aut expedita. Laboriosam eveniet necessitatibus doloremque magnam veniam!',
        //             price: 300,
        //             isPublished: true,
        //             imageUrl: 'https://res.cloudinary.com/hafizjavaid/image/upload/v1731315166/djallwfysumsao2f9avx.jpg',
        //             categoryId: '6731bfcf76363f2263b56cdc',
        //             userId: '67356d885d569b78961efed0',

        //         },
        //         {
        //             title: 'Course 4',
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas quod vel aut expedita. Laboriosam eveniet necessitatibus doloremque magnam veniam!',
        //             price: 150,
        //             isPublished: true,
        //             imageUrl: 'https://res.cloudinary.com/hafizjavaid/image/upload/v1731315166/djallwfysumsao2f9avx.jpg',
        //             categoryId: '67382642d567dd23a57c56c7',
        //             userId: '67356d885d569b78961efed0',
        //         },
        //         {
        //             title: 'Course 5',
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas quod vel aut expedita. Laboriosam eveniet necessitatibus doloremque magnam veniam!',
        //             price: 250,
        //             isPublished: true,
        //             imageUrl: 'https://res.cloudinary.com/hafizjavaid/image/upload/v1731315166/djallwfysumsao2f9avx.jpg',
        //             categoryId: '67382642d567dd23a57c56c7',
        //             userId: '67356d885d569b78961efed0',

        //         },
        //         {
        //             title: 'Course 6',
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas quod vel aut expedita. Laboriosam eveniet necessitatibus doloremque magnam veniam!',
        //             price: 350,
        //             isPublished: true,
        //             imageUrl: 'https://res.cloudinary.com/hafizjavaid/image/upload/v1731315166/djallwfysumsao2f9avx.jpg',
        //             categoryId: '67382642d567dd23a57c56c7',
        //             userId: '67356d885d569b78961efed0',

        //         },
        //         {
        //             title: 'Course 7',
        //             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam voluptas quod vel aut expedita. Laboriosam eveniet necessitatibus doloremque magnam veniam!',
        //             price: 50,
        //             isPublished: true,
        //             imageUrl: 'https://res.cloudinary.com/hafizjavaid/image/upload/v1731315166/djallwfysumsao2f9avx.jpg',
        //             categoryId: '67382642d567dd23a57c56cb',
        //             userId: '67356d885d569b78961efed0',

        //         },
        //     ]
        // })
        console.log('Success');


    } catch (error) {
        console.log(error);

    } finally {
        await database.$disconnect();
    }
}


createCategories();


