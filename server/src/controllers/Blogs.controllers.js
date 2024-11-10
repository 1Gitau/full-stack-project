import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBlog(req, res) {
  try {
    const { imageUrl, title, excerpt, body } = req.body;
    const userId = req.userId;
    console.log(userId);

    if (!userId) {
      // If userId is not provided, respond with an error early
      return res.status(400).json({ message: "User ID is required." });
    }

    const newBlog = await prisma.blog.create({
      data: {
        imageUrl,
        title,
        excerpt,
        body,
        owner: userId,
      },
    });

    // Send a successful response
    return res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    // Send error response only if there hasn't been one already
    return res.status(500).json({ message: error.message
    });
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

    if (!blogs) {
      res.status(404).json({ message: "blogs not found" });
      return;
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
    return;
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


export async function deleteBlogByOwner(req, res){
  try {
    const userId = req.userId;
    const { id: blogId}  = req.params;

    const deleteBlog =await prisma.blog.delete({
      where : {
        id: blogId,
        owner: userId
      }
    });

    res.status(200).json({message: "blog deleted successfully", data: deleteBlog})
  } catch (error) {
    res.status(500).json({message: error.message})
    return;
  }
}

export async function updateBlog(req, res){
  try {
    const userId = req.userId;
    const { blogId } = req.params;

    const {title, body, excerpt, imageUrl} = req.body;

    const updateBlog = await prisma.blog.update({
      where: {
        id: blogId,
        owner: userId
      },
      data: {
        title,
        body,
        excerpt,
        imageUrl
      }
    });

    res.status(200).json({message: "blog updated successfully", blog: updateBlog})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
