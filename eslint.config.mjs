import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "script", 
      globals: globals.browser 
    } 
  },
  { 
    ignores: ['src/', 'test/', '.mocharc.js', 'config.js'] 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];