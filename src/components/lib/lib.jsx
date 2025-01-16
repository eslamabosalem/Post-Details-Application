export async function getAllPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch posts...');
    }
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { error: true, message: error.message };
  }
}

export async function getPostDetails(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch post details...');
    }
    const postDetails = await res.json();
    return postDetails;
  } catch (error) {
    console.error("Error fetching post details:", error);
    return { error: true, message: error.message };
  }
}

export async function getAllComments() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    if (!res.ok) {
      throw new Error('Failed to fetch comments...');
    }
    const comments = await res.json();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { error: true, message: error.message };
  }
}
