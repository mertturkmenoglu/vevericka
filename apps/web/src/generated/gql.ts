/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment CountItem on Count {\n    dislikes\n    likes\n    tags\n  }\n": types.CountItemFragmentDoc,
    "\n  fragment PostItem on Post {\n    id\n    content\n    _count {\n      ...CountItem\n    }\n    tags {\n      id\n      tagName\n      createdAt\n      updatedAt\n    }\n    images {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    videos {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    vote\n    createdAt\n    updatedAt\n    user {\n      ...UserItem\n    }\n  }\n": types.PostItemFragmentDoc,
    "\n  fragment ProfileItem on Profile {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    city\n    country\n    isFollowing\n    isMe\n    createdAt\n    updatedAt\n    _count {\n      followers\n      following\n      posts\n    }\n  }\n": types.ProfileItemFragmentDoc,
    "\n  fragment UserItem on User {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    city\n    country\n    createdAt\n    updatedAt\n  }\n": types.UserItemFragmentDoc,
    "\n  mutation AddOrRemoveBookmark($id: String!) {\n    addOrRemoveBookmark(postId: $id) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n": types.AddOrRemoveBookmarkDocument,
    "\n  mutation CreateBookmark($payload: NewBookmarkInput!) {\n    createBookmark(newBookmarkData: $payload) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n": types.CreateBookmarkDocument,
    "\n  mutation CreatePost($payload: NewPostInput!) {\n    createPost(newPostData: $payload) {\n      ...PostItem\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation DeletePost($id: String!) {\n    deletePost(id: $id) {\n      ...PostItem\n    }\n  }\n": types.DeletePostDocument,
    "\n  mutation InteractWithUser($followeeId: String!, $interaction: String!) {\n    interactWithUser(id: $followeeId, interaction: $interaction)\n  }\n": types.InteractWithUserDocument,
    "\n  mutation UpdateLastSeen {\n    updateLastSeen\n  }\n": types.UpdateLastSeenDocument,
    "\n  mutation UpdateUser($payload: UpdateUserInput!) {\n    updateUser(payload: $payload) {\n      ...UserItem\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation VotePost($id: String!, $vote: String!) {\n    votePost(id: $id, vote: $vote) {\n      ...PostItem\n    }\n  }\n": types.VotePostDocument,
    "\n  query Bookmarks($skip: Int!, $take: Int!) {\n    bookmarks(skip: $skip, take: $take) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n": types.BookmarksDocument,
    "\n  query Feed($skip: Int!, $take: Int!) {\n    feed(skip: $skip, take: $take) {\n      posts {\n        ...PostItem\n      }\n    }\n  }\n": types.FeedDocument,
    "\n  query LinkPreview($url: String!) {\n    linkPreview(url: $url) {\n      title\n      description\n      image\n      url\n    }\n  }\n": types.LinkPreviewDocument,
    "\n  query Me {\n    me {\n      ...UserItem\n    }\n  }\n": types.MeDocument,
    "\n  query PopularTags($skip: Int!, $take: Int!) {\n    popularTags(skip: $skip, take: $take) {\n      id\n      tagName\n      _count {\n        posts\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.PopularTagsDocument,
    "\n  query Post($id: String!) {\n    post(id: $id) {\n      ...PostItem\n    }\n  }\n": types.PostDocument,
    "\n  query PostsByTag($tag: String!, $skip: Int!, $take: Int!) {\n    postsByTag(tag: $tag, skip: $skip, take: $take) {\n      ...PostItem\n    }\n  }\n": types.PostsByTagDocument,
    "\n  query ProfileData($id: String!, $skip: Int!, $take: Int!) {\n    profile(id: $id) {\n      ...ProfileItem\n    }\n\n    posts(id: $id, skip: $skip, take: $take) {\n      ...PostItem\n    }\n  }\n": types.ProfileDataDocument,
    "\n  query ProfileById($id: String!) {\n    profile(id: $id) {\n      ...ProfileItem\n    }\n  }\n": types.ProfileByIdDocument,
    "\n  query SearchPosts($term: String!, $take: Int!, $skip: Int!) {\n    searchPosts(term: $term, take: $take, skip: $skip) {\n      took\n      timed_out\n      _shards {\n        total\n        successful\n        skipped\n        failed\n      }\n      hits {\n        max_score\n        hits {\n          _index\n          _id\n          _score\n          _source {\n            ...PostItem\n          }\n        }\n      }\n    }\n  }\n": types.SearchPostsDocument,
    "\n  query SearchUsers($term: String!, $take: Int!, $skip: Int!) {\n    searchUsers(term: $term, take: $take, skip: $skip) {\n      took\n      timed_out\n      _shards {\n        total\n        successful\n        skipped\n        failed\n      }\n      hits {\n        max_score\n        hits {\n          _index\n          _id\n          _score\n          _source {\n            ...UserItem\n          }\n        }\n      }\n    }\n  }\n": types.SearchUsersDocument,
    "\n  query User($id: String!) {\n    user(id: $id) {\n      ...UserItem\n    }\n  }\n": types.UserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CountItem on Count {\n    dislikes\n    likes\n    tags\n  }\n"): (typeof documents)["\n  fragment CountItem on Count {\n    dislikes\n    likes\n    tags\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostItem on Post {\n    id\n    content\n    _count {\n      ...CountItem\n    }\n    tags {\n      id\n      tagName\n      createdAt\n      updatedAt\n    }\n    images {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    videos {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    vote\n    createdAt\n    updatedAt\n    user {\n      ...UserItem\n    }\n  }\n"): (typeof documents)["\n  fragment PostItem on Post {\n    id\n    content\n    _count {\n      ...CountItem\n    }\n    tags {\n      id\n      tagName\n      createdAt\n      updatedAt\n    }\n    images {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    videos {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    vote\n    createdAt\n    updatedAt\n    user {\n      ...UserItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProfileItem on Profile {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    city\n    country\n    isFollowing\n    isMe\n    createdAt\n    updatedAt\n    _count {\n      followers\n      following\n      posts\n    }\n  }\n"): (typeof documents)["\n  fragment ProfileItem on Profile {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    city\n    country\n    isFollowing\n    isMe\n    createdAt\n    updatedAt\n    _count {\n      followers\n      following\n      posts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserItem on User {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    city\n    country\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment UserItem on User {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    city\n    country\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddOrRemoveBookmark($id: String!) {\n    addOrRemoveBookmark(postId: $id) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddOrRemoveBookmark($id: String!) {\n    addOrRemoveBookmark(postId: $id) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBookmark($payload: NewBookmarkInput!) {\n    createBookmark(newBookmarkData: $payload) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBookmark($payload: NewBookmarkInput!) {\n    createBookmark(newBookmarkData: $payload) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($payload: NewPostInput!) {\n    createPost(newPostData: $payload) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($payload: NewPostInput!) {\n    createPost(newPostData: $payload) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($id: String!) {\n    deletePost(id: $id) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePost($id: String!) {\n    deletePost(id: $id) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InteractWithUser($followeeId: String!, $interaction: String!) {\n    interactWithUser(id: $followeeId, interaction: $interaction)\n  }\n"): (typeof documents)["\n  mutation InteractWithUser($followeeId: String!, $interaction: String!) {\n    interactWithUser(id: $followeeId, interaction: $interaction)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLastSeen {\n    updateLastSeen\n  }\n"): (typeof documents)["\n  mutation UpdateLastSeen {\n    updateLastSeen\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($payload: UpdateUserInput!) {\n    updateUser(payload: $payload) {\n      ...UserItem\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($payload: UpdateUserInput!) {\n    updateUser(payload: $payload) {\n      ...UserItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VotePost($id: String!, $vote: String!) {\n    votePost(id: $id, vote: $vote) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  mutation VotePost($id: String!, $vote: String!) {\n    votePost(id: $id, vote: $vote) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Bookmarks($skip: Int!, $take: Int!) {\n    bookmarks(skip: $skip, take: $take) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query Bookmarks($skip: Int!, $take: Int!) {\n    bookmarks(skip: $skip, take: $take) {\n      id\n      post {\n        ...PostItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Feed($skip: Int!, $take: Int!) {\n    feed(skip: $skip, take: $take) {\n      posts {\n        ...PostItem\n      }\n    }\n  }\n"): (typeof documents)["\n  query Feed($skip: Int!, $take: Int!) {\n    feed(skip: $skip, take: $take) {\n      posts {\n        ...PostItem\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LinkPreview($url: String!) {\n    linkPreview(url: $url) {\n      title\n      description\n      image\n      url\n    }\n  }\n"): (typeof documents)["\n  query LinkPreview($url: String!) {\n    linkPreview(url: $url) {\n      title\n      description\n      image\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ...UserItem\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ...UserItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PopularTags($skip: Int!, $take: Int!) {\n    popularTags(skip: $skip, take: $take) {\n      id\n      tagName\n      _count {\n        posts\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query PopularTags($skip: Int!, $take: Int!) {\n    popularTags(skip: $skip, take: $take) {\n      id\n      tagName\n      _count {\n        posts\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Post($id: String!) {\n    post(id: $id) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  query Post($id: String!) {\n    post(id: $id) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostsByTag($tag: String!, $skip: Int!, $take: Int!) {\n    postsByTag(tag: $tag, skip: $skip, take: $take) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  query PostsByTag($tag: String!, $skip: Int!, $take: Int!) {\n    postsByTag(tag: $tag, skip: $skip, take: $take) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProfileData($id: String!, $skip: Int!, $take: Int!) {\n    profile(id: $id) {\n      ...ProfileItem\n    }\n\n    posts(id: $id, skip: $skip, take: $take) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  query ProfileData($id: String!, $skip: Int!, $take: Int!) {\n    profile(id: $id) {\n      ...ProfileItem\n    }\n\n    posts(id: $id, skip: $skip, take: $take) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProfileById($id: String!) {\n    profile(id: $id) {\n      ...ProfileItem\n    }\n  }\n"): (typeof documents)["\n  query ProfileById($id: String!) {\n    profile(id: $id) {\n      ...ProfileItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchPosts($term: String!, $take: Int!, $skip: Int!) {\n    searchPosts(term: $term, take: $take, skip: $skip) {\n      took\n      timed_out\n      _shards {\n        total\n        successful\n        skipped\n        failed\n      }\n      hits {\n        max_score\n        hits {\n          _index\n          _id\n          _score\n          _source {\n            ...PostItem\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchPosts($term: String!, $take: Int!, $skip: Int!) {\n    searchPosts(term: $term, take: $take, skip: $skip) {\n      took\n      timed_out\n      _shards {\n        total\n        successful\n        skipped\n        failed\n      }\n      hits {\n        max_score\n        hits {\n          _index\n          _id\n          _score\n          _source {\n            ...PostItem\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchUsers($term: String!, $take: Int!, $skip: Int!) {\n    searchUsers(term: $term, take: $take, skip: $skip) {\n      took\n      timed_out\n      _shards {\n        total\n        successful\n        skipped\n        failed\n      }\n      hits {\n        max_score\n        hits {\n          _index\n          _id\n          _score\n          _source {\n            ...UserItem\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($term: String!, $take: Int!, $skip: Int!) {\n    searchUsers(term: $term, take: $take, skip: $skip) {\n      took\n      timed_out\n      _shards {\n        total\n        successful\n        skipped\n        failed\n      }\n      hits {\n        max_score\n        hits {\n          _index\n          _id\n          _score\n          _source {\n            ...UserItem\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User($id: String!) {\n    user(id: $id) {\n      ...UserItem\n    }\n  }\n"): (typeof documents)["\n  query User($id: String!) {\n    user(id: $id) {\n      ...UserItem\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;