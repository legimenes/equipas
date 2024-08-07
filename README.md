# equipas

## Setup

### Express and TypeScript
```
npm init -y
npm install express pg-promise
npm install -D typescript @types/express ts-node-dev tsconfig-paths
```

### Configuring TypeScript
```
npx tsc --init
```

The tsconfig.json is custommized.

#### Module path aliases
```
"rootDir": "./",
"baseUrl": ".",
"paths": {
    "@controllers/*": ["src/controllers/*"],
    "@models/*": ["src/models/*"],
    "@views/*": ["src/views/*"]
}
```

### Eslint

```
npm install -D eslint eslint-plugin-node @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Create config files:
.eslintrc.js
.eslintignore

### Postgres
```
npm install pg-promise
```

### Zod
```
npm install zod
```

### jest
```
npm install -D jest ts-jest @types/jest
```

Create config files and customize:
jest.config.js

or:
´´´
npx jest --init
´´´

The jest.config.ts is custommized.

### Babel
```
npm install -D @babel/core @babel/cli @babel/node @babel/preset-env @babel/preset-typescript babel-plugin-module-resolver
```

Create config files:
babel.config.json

### Other packages
```
npm install uuidv4
```

## Execute
Run test:
```
npm test
```

Run dev:
```
npm run dev
```

## References

https://github.com/rodrigobranas/cccat13_4/tree/master/backend/ride
https://github.com/diego3g/node-arch
https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/

** As novas versões do typescript possuem um watch nativo. Basta configurar o watchOptions e rodar `tsc --watch`
 eslint: pre-commit

 ** testar no tsconfig: "rootDirs": ["./src", "./test"]
 "exclude":["./node_modules/*", "dist"] --colocar todos os arquivos de .eslintignore
 