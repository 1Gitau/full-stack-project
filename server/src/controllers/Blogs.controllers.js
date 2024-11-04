export function createBlog(req, res) {
  try {
    res.send("createBlog");
  } catch (error) {
    res.status(500).json({ message: "something went wrong.please try again." });
  }
}
