import { PrismaClient } from '@prisma/client'

const database = new PrismaClient();


async function createCategories() {
    try {

        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Engineering" },
                { name: "Filming" },
            ]
        })
        console.log('Success');
        

    } catch (error) {
        console.log(error);
        
    } finally {
        await database.$disconnect();
    }
}


createCategories();