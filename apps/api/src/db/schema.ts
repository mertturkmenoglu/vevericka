import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { InferModel } from 'drizzle-orm';

/* POST
 * id
 * content
 * userId
 * createdAt
 * updatedAt
 * source
 * location
 * entities {
 *   mentions: { start; end; id; name; }[]
 *   tags: { start; end; tag; }[]
 *   urls: { start; end; url; meta; }[]
 * }
 * images
 * videos
 * sensitive
 * poll
 * references // repliedTo, repost, quoted
 * replySettings
 */

/* USER
 * createdAt
 * updatedAt
 * description
 * urls
 * location
 * pinnedPostId
 * stats { followersCount; followingCount; postsCount; listedCount; likesCount; dislikesCount; repliesCount; repostsCount; quotesCount; }
 */
