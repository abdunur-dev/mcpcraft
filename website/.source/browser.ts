// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"authentication.mdx": () => import("../content/docs/authentication.mdx?collection=docs"), "comparison.mdx": () => import("../content/docs/comparison.mdx?collection=docs"), "deployment.mdx": () => import("../content/docs/deployment.mdx?collection=docs"), "faq.mdx": () => import("../content/docs/faq.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "quick-start.mdx": () => import("../content/docs/quick-start.mdx?collection=docs"), "security.mdx": () => import("../content/docs/security.mdx?collection=docs"), "testing.mdx": () => import("../content/docs/testing.mdx?collection=docs"), "api/create-server.mdx": () => import("../content/docs/api/create-server.mdx?collection=docs"), "api/resource.mdx": () => import("../content/docs/api/resource.mdx?collection=docs"), "api/tool.mdx": () => import("../content/docs/api/tool.mdx?collection=docs"), "examples/ai-agent.mdx": () => import("../content/docs/examples/ai-agent.mdx?collection=docs"), "examples/api-fetch.mdx": () => import("../content/docs/examples/api-fetch.mdx?collection=docs"), "examples/basic-server.mdx": () => import("../content/docs/examples/basic-server.mdx?collection=docs"), "examples/database-server.mdx": () => import("../content/docs/examples/database-server.mdx?collection=docs"), "examples/file-system.mdx": () => import("../content/docs/examples/file-system.mdx?collection=docs"), "examples/github-server.mdx": () => import("../content/docs/examples/github-server.mdx?collection=docs"), "examples/gmail-server.mdx": () => import("../content/docs/examples/gmail-server.mdx?collection=docs"), "examples/resources.mdx": () => import("../content/docs/examples/resources.mdx?collection=docs"), }),
};
export default browserCollections;