import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs",  
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        sinon: "readonly",
        before: "readonly",
        chai: "readonly",
        _: "readonly",
      }
    },
  },
  pluginJs.configs.recommended,
  {
      rules: {
          "no-unused-vars": "warn"
      }
  },
];
