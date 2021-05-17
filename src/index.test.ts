import { createTestClient } from "apollo-server-testing";
import { server } from "./server";

describe("createTestClient", () => {
  it("should not cause linting errors", () => {
    // "npm run lint" flags the "createTestClient" line with this linter error:
    // 6:11  error  Avoid referencing unbound methods which may cause unintentional scoping of `this`.
    // If your function does not access `this`, you can annotate it with `this: void`, or consider using an arrow function instead  @typescript-eslint/unbound-method
    const { query, mutate } = createTestClient(server);
    console.log(query);
    console.log(mutate);
  });
});
