'use server';
import { books } from "@/database/schema";
import { db } from "@/database/drizzle";

const createBook = async (params: BookParams) => {
    try{
        const newBook = await db.insert(books).values({
            ...params,
            availableCopies: params.totalCopies,
        })
        .returning();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook[0])),
        }
    } catch (error) {
        console.error("Error creating book:", error);
        
        return {
            success: false,
            message: 'an error occurred while creating the book',
        }
    }
}

export default createBook;

