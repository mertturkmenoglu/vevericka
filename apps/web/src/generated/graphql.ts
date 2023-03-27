/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

/** C */
export type C = {
  __typename?: 'C';
  id: Scalars['Float'];
};

/** feed */
export type Feed = {
  __typename?: 'Feed';
  posts: Array<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipe: Recipe;
  createPost: Post;
  removeRecipe: Scalars['Boolean'];
};


export type MutationAddRecipeArgs = {
  newRecipeData: NewRecipeInput;
};


export type MutationCreatePostArgs = {
  newPostData: NewPostInput;
};


export type MutationRemoveRecipeArgs = {
  id: Scalars['String'];
};

export type NewPostInput = {
  content: Scalars['String'];
};

export type NewRecipeInput = {
  description?: InputMaybe<Scalars['String']>;
  ingredients: Array<Scalars['String']>;
  title: Scalars['String'];
};

/** post */
export type Post = {
  __typename?: 'Post';
  comments: Array<C>;
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['Float'];
  updatedAt: Scalars['Date'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  me: User;
  post: Post;
  posts: Array<Post>;
  recipe: Recipe;
  recipes: Array<Recipe>;
  tags: Array<Tag>;
  user: User;
  users: Array<User>;
};


export type QueryFeedArgs = {
  id: Scalars['Float'];
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryRecipeArgs = {
  id: Scalars['String'];
};


export type QueryRecipesArgs = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryTagsArgs = {
  skip?: Scalars['Int'];
  take?: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

/** recipe  */
export type Recipe = {
  __typename?: 'Recipe';
  creationDate: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ingredients: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  recipeAdded: Recipe;
};

/** tag */
export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['Date'];
  id: Scalars['Float'];
  posts: Array<Post>;
  tagName: Scalars['String'];
  updatedAt: Scalars['Date'];
};

/** user */
export type User = {
  __typename?: 'User';
  bannerImage: Scalars['String'];
  birthDate?: Maybe<Scalars['Date']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  genderOther?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  image: Scalars['String'];
  job?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  protected: Scalars['Boolean'];
  school?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
  website?: Maybe<Scalars['String']>;
};

export type FeedQueryQueryVariables = Exact<{
  id: Scalars['Float'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type FeedQueryQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', posts: Array<{ __typename?: 'Post', id: number, content: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, username: string, email: string, name: string, image: string, verified: boolean } }> } };


export const FeedQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"feedQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<FeedQueryQuery, FeedQueryQueryVariables>;