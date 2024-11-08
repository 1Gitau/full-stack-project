function ValidateBlogs(req, res, next) {
  const { imageUrl, title, excerpt, body } = req.body;
  if (!imageUrl) {
    res.status(400).json({ message: "imageUrl is required" });
  }
  if (!title) {
    res.status(400).json({ message: "title is required" });
  }
  if (!excerpt) {
    res.status(400).json({ message: "excerpt is required" });
  }
  if (!body) {
    res.status(400).json({ message: "body is required" });
  }
  next();
}
export default ValidateBlogs;
