import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config: import("next").NextConfig = {
  reactStrictMode: true,
};

export default withMDX(config);
