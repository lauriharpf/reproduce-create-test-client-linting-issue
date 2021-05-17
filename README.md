# Reproduces linter issue with createTestClient function typing

Reproduces a linter issue in the `createTestClient` function reported by [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md) with the [type-aware rules](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md).

## Steps to repeat

1. `npm install`
2. `npm run lint`

## What happens

The following linter errors, related to the createTestClient function, are reported:

```
/directory/reproduce-create-test-client-typing-issue/src/index.test.ts
  9:11  error  Avoid referencing unbound methods which may cause unintentional scoping of `this`.
If your function does not access `this`, you can annotate it with `this: void`, or consider using an arrow function instead  @typescript-eslint/unbound-method
  9:11  error  Avoid referencing unbound methods which may cause unintentional scoping of `this`.
If your function does not access `this`, you can annotate it with `this: void`, or consider using an arrow function instead  @typescript-eslint/unbound-method
```

## Expected result

No linter errors occur.

## Change suggestion

3. Edit the `node_modules/apollo-server-testing/dist/createTestClient.d.ts` file. Replace this type definition:

```
export interface ApolloServerTestClient {
    query<TData = any, TVariables = Record<string, any>>(query: Query<TVariables>): Promise<GraphQLResponse<TData>>;
    mutate<TData = any, TVariables = Record<string, any>>(mutation: Mutation<TVariables>): Promise<GraphQLResponse<TData>>;
}
```

with this type definition:

```
export interface ApolloServerTestClient {
    query: <TData = any, TVariables = Record<string, any>>(query: Query<TVariables>) => Promise<GraphQLResponse<TData>>;
    mutate: <TData = any, TVariables = Record<string, any>>(mutation: Mutation<TVariables>) => Promise<GraphQLResponse<TData>>;
}
```

4. Run `npm run lint` again in the repository root directory. It should no longer cause linter errors.

## Additional details

See https://stackoverflow.com/a/67573584/843984
