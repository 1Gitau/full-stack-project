import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBlog(req, res) {
  try {
    const { imageUrl, title, excerpt, body } = req.body;
    const userId = req.userId;

    const newBlog = await prisma.blog.create({
      data: {
        imageUrl,
        title,
        excerpt,
        body,
        owner: userId,
      },
    });
    res.status(201).json(newBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong.please try again." });
  }
}

export async function FetchSingleBlog(req, res) {
  try {
    const { id } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
      return;
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUserBlogs(req, res) {
  try {
    const userId = req.userId;
    const blogs = await prisma.blog.findMany({
      where: {
        owner: userId,
      },
      //  include: {
      //    user: true,
      //  },
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getAllBlogs(_req, res) {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        user: true,
      },
    });
    res
      .status(200)
      .json({ message: "bloges fetched successfully", blog: blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteBlog(req, res) {
  try {
    const { userId } = req.userId;
    const { blogId } = req.params;
    res.send("delete blog");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
