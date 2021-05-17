import { server } from "./server";

// The `listen` method launches a web server.
void server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
