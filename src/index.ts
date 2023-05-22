import fastify from "fastify";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/post";
import { Comment } from "./entities/comment";
import { getRepository } from "typeorm";

// fastify.register(swagger, {
//   routePrefix: "/docs",
//   swagger: {
//     info: {
//       title: "My API",
//       description: "API documentation",
//       version: "1.0.0",
//     },
//     host: "localhost:3000", // Adjust the host and port as needed
//     schemes: ["http"],
//     consumes: ["application/json"],
//     produces: ["application/json"],
//   },
//   exposeRoute: true,
// });

const App = fastify();

App.register(require("fastify-pg"), {
  connectionString: "postgresql://username:password@localhost:5432/database",
});

//================================= API calls for Users =================================//

// To create a user

App.post("/users", async (request: any, reply) => {
  const userRepository = getRepository(User);
  const newUser = userRepository.create(request.body);
  await userRepository.save(newUser);
  reply.send(newUser);
});

/// Get all users
App.get("/users", async (request, reply) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  // const users = await userRepository.find({ relations: ["post"] });
  reply.send(users);
});

/// Get a specific user by ID
App.get("/users/:id", async (request: any, reply) => {
  const userRepository = getRepository(User);
  // console.log(request.params.id);
  const user = await userRepository.findOneBy({ id: request.params.id });
  reply.send(user);
});

/// To update a user
App.put("/users/:id", async (request: any, reply) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOneBy({ id: request.params.id });
  userRepository.merge(user!, request.body);
  const updatedUser = await userRepository.save(user!);
  reply.send(updatedUser);
});

/// To delete user
App.delete("/users/:id", async (request: any, reply) => {
  const userRepository = getRepository(User);
  await userRepository.delete(request.params.id);
  reply.send({ message: "User deleted successfully." });
});

//================================= API calls for Posts =================================//

/// To create a post
App.post("/posts", async (request: any, reply) => {
  const postRepository = getRepository(Post);
  const newPost = postRepository.create(request.body);
  await postRepository.save(newPost);
  reply.send(newPost);
});

/// To get all posts
App.get("/posts", async (request, reply) => {
  const postRepository = getRepository(Post);
  const posts = await postRepository.find();
  reply.send(posts);
});

/// Get a specific user by ID
App.get("/posts/:id", async (request: any, reply) => {
  const postRepository = getRepository(Post);
  // console.log(request.params.id);
  const user = await postRepository.findOneBy({ id: request.params.id });
  reply.send(user);
});

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [User, Post, Comment],
})
  .then(() => {
    console.log("Database connection established");
    // Define your routes and other application logic here
    App.listen(3000, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });

// get all users
// app.get("/user", async (request, reply) => {
//   reply.send("Hello, world!");
// });
// app.get("/nithin", async (request, reply) => {
//   reply.send("Hello, nithin!");
// });
