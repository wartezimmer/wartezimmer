module.exports = {
    client: {
        addTypeName: true,
        globalTypesFile: "src/types/graphql-global-types.ts",
        includes: ["./src/**/*.ts", "./src/**/*.tsx"],
        tagName: "gql",
        target: "typescript",
        service: {
            name: "-",
            url: "-/graphql"
        }
    }
}
