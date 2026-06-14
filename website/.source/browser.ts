// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"installation.mdx": () => import("../content/docs/installation.mdx?collection=docs"), "quick-start.mdx": () => import("../content/docs/quick-start.mdx?collection=docs"), "api/create-server.mdx": () => import("../content/docs/api/create-server.mdx?collection=docs"), "api/resource.mdx": () => import("../content/docs/api/resource.mdx?collection=docs"), "api/tool.mdx": () => import("../content/docs/api/tool.mdx?collection=docs"), "examples/basic-server.mdx": () => import("../content/docs/examples/basic-server.mdx?collection=docs"), "examples/gmail-server.mdx": () => import("../content/docs/examples/gmail-server.mdx?collection=docs"), }),
};
export default browserCollections;