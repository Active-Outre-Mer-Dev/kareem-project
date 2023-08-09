/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@aomdev/ui": {
      transform: "@aomdev/ui/src/{{ kebabCase member }}",
      skipDefaultConversion: true
    }
  }
};

module.exports = nextConfig;
