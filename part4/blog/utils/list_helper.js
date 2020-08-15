const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((prev, curr) => prev + curr, 0);
};

const blogWithMostLikes = (blogs) => {
  const mostLikes = blogs
    .map((blog) => blog.likes)
    .reduce((prev, curr) => Math.max(prev, curr));
  const mostLikedBlog = blogs.find((blog) => blog.likes === mostLikes);

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  blogWithMostLikes,
};
