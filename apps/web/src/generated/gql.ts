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
    "\n  fragment CountFragment on Count {\n    dislikes\n    likes\n    tags\n    comments\n  }\n": types.CountFragmentFragmentDoc,
    "\n  fragment PostFragment on Post {\n    id\n    content\n    _count {\n      ...CountFragment\n    }\n    tags {\n      id\n      tagName\n      createdAt\n      updatedAt\n    }\n    images {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    videos {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    createdAt\n    updatedAt\n    user {\n      ...UserFragment\n    }\n  }\n": types.PostFragmentFragmentDoc,
    "\n  fragment ProfileFragment on Profile {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    genderOther\n    city\n    country\n    createdAt\n    updatedAt\n    _count {\n      followers\n      following\n      posts\n    }\n  }\n": types.ProfileFragmentFragmentDoc,
    "\n  fragment UserFragment on User {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    genderOther\n    city\n    country\n    createdAt\n    updatedAt\n  }\n": types.UserFragmentFragmentDoc,
    "\n  mutation CreateBookmark($payload: NewBookmarkInput!) {\n    createBookmark(newBookmarkData: $payload) {\n      id\n      post {\n        ...PostFragment\n      }\n    }\n  }\n": types.CreateBookmarkDocument,
    "\n  mutation CreatePost($payload: NewPostInput!) {\n    createPost(newPostData: $payload) {\n      ...PostFragment\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation UpdateLastSeen {\n    updateLastSeen\n  }\n": types.UpdateLastSeenDocument,
    "\n  query GetUserBookmarks($skip: Int, $take: Int) {\n    bookmarks(skip: $skip, take: $take) {\n      id\n      post {\n        ...PostFragment\n      }\n    }\n  }\n": types.GetUserBookmarksDocument,
    "\n  query feedQuery($skip: Int, $take: Int) {\n    feed(skip: $skip, take: $take) {\n      posts {\n        ...PostFragment\n      }\n    }\n  }\n": types.FeedQueryDocument,
    "\n  query Me {\n    me {\n      ...UserFragment\n    }\n  }\n": types.MeDocument,
    "\n  query GetProfileData($id: String!, $skip: Int!, $take: Int!) {\n    profile(id: $id) {\n      ...ProfileFragment\n    }\n\n    posts(id: $id, skip: $skip, take: $take) {\n      ...PostFragment\n    }\n  }\n": types.GetProfileDataDocument,
    "\n  query GetProfileById($id: String!) {\n    profile(id: $id) {\n      ...ProfileFragment\n    }\n  }\n": types.GetProfileByIdDocument,
    "\n  query SearchPosts($term: String!, $take: Int!, $skip: Int!) {\n    searchPosts(term: $term, take: $take, skip: $skip) {\n      ...PostFragment\n    }\n  }\n": types.SearchPostsDocument,
    "\n  query SearchUsers($term: String!, $take: Int!, $skip: Int!) {\n    searchUsers(term: $term, take: $take, skip: $skip) {\n      ...UserFragment\n    }\n  }\n": types.SearchUsersDocument,
    "\n  query GetUserById($id: String!) {\n    user(id: $id) {\n      ...UserFragment\n    }\n  }\n": types.GetUserByIdDocument,
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
export function graphql(source: "\n  fragment CountFragment on Count {\n    dislikes\n    likes\n    tags\n    comments\n  }\n"): (typeof documents)["\n  fragment CountFragment on Count {\n    dislikes\n    likes\n    tags\n    comments\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostFragment on Post {\n    id\n    content\n    _count {\n      ...CountFragment\n    }\n    tags {\n      id\n      tagName\n      createdAt\n      updatedAt\n    }\n    images {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    videos {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    createdAt\n    updatedAt\n    user {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  fragment PostFragment on Post {\n    id\n    content\n    _count {\n      ...CountFragment\n    }\n    tags {\n      id\n      tagName\n      createdAt\n      updatedAt\n    }\n    images {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    videos {\n      id\n      url\n      postId\n      createdAt\n      updatedAt\n    }\n    createdAt\n    updatedAt\n    user {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProfileFragment on Profile {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    genderOther\n    city\n    country\n    createdAt\n    updatedAt\n    _count {\n      followers\n      following\n      posts\n    }\n  }\n"): (typeof documents)["\n  fragment ProfileFragment on Profile {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    genderOther\n    city\n    country\n    createdAt\n    updatedAt\n    _count {\n      followers\n      following\n      posts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserFragment on User {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    genderOther\n    city\n    country\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment UserFragment on User {\n    id\n    name\n    image\n    job\n    twitterHandle\n    school\n    birthDate\n    website\n    description\n    verified\n    protected\n    bannerImage\n    gender\n    genderOther\n    city\n    country\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBookmark($payload: NewBookmarkInput!) {\n    createBookmark(newBookmarkData: $payload) {\n      id\n      post {\n        ...PostFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBookmark($payload: NewBookmarkInput!) {\n    createBookmark(newBookmarkData: $payload) {\n      id\n      post {\n        ...PostFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($payload: NewPostInput!) {\n    createPost(newPostData: $payload) {\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($payload: NewPostInput!) {\n    createPost(newPostData: $payload) {\n      ...PostFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLastSeen {\n    updateLastSeen\n  }\n"): (typeof documents)["\n  mutation UpdateLastSeen {\n    updateLastSeen\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserBookmarks($skip: Int, $take: Int) {\n    bookmarks(skip: $skip, take: $take) {\n      id\n      post {\n        ...PostFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserBookmarks($skip: Int, $take: Int) {\n    bookmarks(skip: $skip, take: $take) {\n      id\n      post {\n        ...PostFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query feedQuery($skip: Int, $take: Int) {\n    feed(skip: $skip, take: $take) {\n      posts {\n        ...PostFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query feedQuery($skip: Int, $take: Int) {\n    feed(skip: $skip, take: $take) {\n      posts {\n        ...PostFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProfileData($id: String!, $skip: Int!, $take: Int!) {\n    profile(id: $id) {\n      ...ProfileFragment\n    }\n\n    posts(id: $id, skip: $skip, take: $take) {\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  query GetProfileData($id: String!, $skip: Int!, $take: Int!) {\n    profile(id: $id) {\n      ...ProfileFragment\n    }\n\n    posts(id: $id, skip: $skip, take: $take) {\n      ...PostFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProfileById($id: String!) {\n    profile(id: $id) {\n      ...ProfileFragment\n    }\n  }\n"): (typeof documents)["\n  query GetProfileById($id: String!) {\n    profile(id: $id) {\n      ...ProfileFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchPosts($term: String!, $take: Int!, $skip: Int!) {\n    searchPosts(term: $term, take: $take, skip: $skip) {\n      ...PostFragment\n    }\n  }\n"): (typeof documents)["\n  query SearchPosts($term: String!, $take: Int!, $skip: Int!) {\n    searchPosts(term: $term, take: $take, skip: $skip) {\n      ...PostFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchUsers($term: String!, $take: Int!, $skip: Int!) {\n    searchUsers(term: $term, take: $take, skip: $skip) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query SearchUsers($term: String!, $take: Int!, $skip: Int!) {\n    searchUsers(term: $term, take: $take, skip: $skip) {\n      ...UserFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($id: String!) {\n    user(id: $id) {\n      ...UserFragment\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($id: String!) {\n    user(id: $id) {\n      ...UserFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;