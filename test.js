// test.js
const HttpClient = require("./index");

const client = new HttpClient("https://jsonplaceholder.typicode.com");

async function test() {
  try {
    const posts = await client.get("/posts");
    console.log(posts);

    const post = await client.get("/posts/1");
    console.log(post);

    const newPost = await client.post("/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    console.log(newPost);

    const updatedPost = await client.put("/posts/1", {
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    });
    console.log(updatedPost);

    const deletedPost = await client.delete("/posts/1");
    console.log(deletedPost);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
