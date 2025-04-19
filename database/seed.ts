import dummyBooks from '../dummybooks.json';
import ImageKit from 'imagekit';
import { books } from './schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

config({path : '.env.local'});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

// const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
//     try{
//     const response = await imagekit.upload({
//         file: url,
//         fileName,
//         folder,
//     });

//     return response.filePath;
//     }
//     catch(error) {
//         console.error("Error uploading image:", error);
//     }
// }

const uploadToImageKit = async (
    url: string,
    fileName: string,
    folder: string
  ): Promise<string> => {
    try {
      const response = await imagekit.upload({
        file: url,
        fileName,
        folder,
      });
  
      return response.filePath;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };
  

  const seed = async () => {
    console.log('Seeding database...');

    try {
        for (const book of dummyBooks) {
            console.log(`Checking book: ${book.title}`);

            
            const slicedSummary = book.summary.length > 1000 ? book.summary.slice(0, 1000) : book.summary;

            
            const coverUrl = (await uploadToImageKit(book.coverUrl, `${book.title}.jpg`, "/books/covers")) as string;

            
            await db.insert(books).values({
                ...book,
                summary: slicedSummary, 
                coverUrl,
            });
        }

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};


seed();