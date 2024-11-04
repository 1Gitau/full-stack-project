import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export async function createBlog(req, res) {
  try {
    const{imageUrl,title,excerpt,body}=req.body
    const userId = req.userId;

    const newBlog = await prisma.blog.create({
      data: {
        imageUrl,
        title,
        excerpt,
        body,
        owner: userId
      }
    })
    res.status(201).json(newBlog)
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong.please try again." });
  }
}
