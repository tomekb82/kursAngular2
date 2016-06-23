System.config({
  baseURL: "/",
  transpiler: "typescript",
  //map:{'app': 'client/app'},
  typescriptOptions: {
    "emitDecoratorMetadata": true
  },
  packages: {
    "app": {
      "defaultExtension": "ts",
      "main": "main.ts"
    }
  }
});
