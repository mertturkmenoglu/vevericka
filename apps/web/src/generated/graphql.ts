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
  id: Scalars['String'];
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
  id: Scalars['String'];
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
  id: Scalars['String'];
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
  id: Scalars['String'];
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
  gender?: Maybe<Scalars['String']>;
  genderOther?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image: Scalars['String'];
  job?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  protected: Scalars['Boolean'];
  school?: Maybe<Scalars['String']>;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  verified: Scalars['Boolean'];
  website?: Maybe<Scalars['String']>;
};

export type UserFragmentFragment = { __typename?: 'User', id: string, name: string, image: string, job?: string | null, twitterHandle?: string | null, school?: string | null, birthDate?: any | null, website?: string | null, description?: string | null, verified: boolean, protected: boolean, bannerImage: string, gender?: string | null, genderOther?: string | null, city?: string | null, country?: string | null, createdAt: any, updatedAt: any } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type FeedQueryQueryVariables = Exact<{
  id: Scalars['String'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type FeedQueryQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', posts: Array<{ __typename?: 'Post', id: string, content: string, createdAt: any, updatedAt: any, user: (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
      ) }> } };

export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"job"}},{"kind":"Field","name":{"kind":"Name","value":"twitterHandle"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"protected"}},{"kind":"Field","name":{"kind":"Name","value":"bannerImage"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderOther"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const FeedQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"feedQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"job"}},{"kind":"Field","name":{"kind":"Name","value":"twitterHandle"}},{"kind":"Field","name":{"kind":"Name","value":"school"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"protected"}},{"kind":"Field","name":{"kind":"Name","value":"bannerImage"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderOther"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FeedQueryQuery, FeedQueryQueryVariables>;