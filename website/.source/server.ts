// @ts-nocheck
import * as __fd_glob_11 from "../content/docs/examples/gmail-server.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/examples/basic-server.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/api/tool.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/api/resource.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/api/create-server.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/quick-start.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/installation.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/comparison.mdx?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/examples/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/api/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "api/meta.json": __fd_glob_1, "examples/meta.json": __fd_glob_2, }, {"comparison.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, "installation.mdx": __fd_glob_5, "quick-start.mdx": __fd_glob_6, "api/create-server.mdx": __fd_glob_7, "api/resource.mdx": __fd_glob_8, "api/tool.mdx": __fd_glob_9, "examples/basic-server.mdx": __fd_glob_10, "examples/gmail-server.mdx": __fd_glob_11, });