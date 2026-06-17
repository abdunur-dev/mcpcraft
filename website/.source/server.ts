// @ts-nocheck
import * as __fd_glob_22 from "../content/docs/examples/resources.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/examples/gmail-server.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/examples/github-server.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/examples/file-system.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/examples/database-server.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/examples/basic-server.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/examples/api-fetch.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/examples/ai-agent.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/api/tool.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/api/resource.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/api/create-server.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/testing.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/security.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/quick-start.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/faq.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/deployment.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/comparison.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/authentication.mdx?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/examples/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/api/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "api/meta.json": __fd_glob_1, "examples/meta.json": __fd_glob_2, }, {"authentication.mdx": __fd_glob_3, "comparison.mdx": __fd_glob_4, "deployment.mdx": __fd_glob_5, "faq.mdx": __fd_glob_6, "index.mdx": __fd_glob_7, "installation.mdx": __fd_glob_8, "quick-start.mdx": __fd_glob_9, "security.mdx": __fd_glob_10, "testing.mdx": __fd_glob_11, "api/create-server.mdx": __fd_glob_12, "api/resource.mdx": __fd_glob_13, "api/tool.mdx": __fd_glob_14, "examples/ai-agent.mdx": __fd_glob_15, "examples/api-fetch.mdx": __fd_glob_16, "examples/basic-server.mdx": __fd_glob_17, "examples/database-server.mdx": __fd_glob_18, "examples/file-system.mdx": __fd_glob_19, "examples/github-server.mdx": __fd_glob_20, "examples/gmail-server.mdx": __fd_glob_21, "examples/resources.mdx": __fd_glob_22, });