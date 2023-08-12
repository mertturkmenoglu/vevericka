import { Injectable, NotImplementedException } from '@nestjs/common';
import { PaginationArgs } from 'src/common/args/pagination.args';
import { NewPostInput, Vote } from '@/posts/dto';
import { Post } from '@/posts/models';
import { PostsRepository } from './posts.repository';
import { User } from '@/users/models/user.model';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository) {}

  async create(userId: string, data: NewPostInput): Promise<Post> {
    console.log(userId, data);
    throw new NotImplementedException();
  }

  async changeVote(
    userId: string,
    postId: string,
    vote: Vote,
  ): Promise<boolean> {
    await this.repository.changeVote(userId, postId, vote);
    return true;
  }

  async findOneById(userId: string, id: string): Promise<Post | null> {
    const post = await this.repository.findOneById(userId, id);
    this.mapQueryResultToResponse(post);
    return null;
  }

  async remove(id: string): Promise<boolean> {
    await this.repository.deleteOneById(id);
    return true;
  }

  async getPostsByUserId(
    thisUserId: string,
    userId: string,
    pagination: PaginationArgs,
  ): Promise<Post[]> {
    const posts = await this.repository.findManyByThisUserIdAndUserId(
      thisUserId,
      userId,
      pagination,
    );

    return posts.map(this.mapQueryResultToResponse.bind(this));
  }

  async getPostsByTag(
    userId: string,
    tag: string,
    pagination: PaginationArgs,
  ): Promise<Post[]> {
    console.log(userId, tag, pagination);
    return [];
  }

  private prepareTags(content: string): string[] {
    const hashtagRegex = /#[-A-Z0-9_]+/gi;
    const tags = content.match(hashtagRegex);
    return tags || [];
  }

  private getVote(likes: User[], dislikes: User[]) {
    if (likes.length > 0) {
      return 'like';
    } else if (dislikes.length > 0) {
      return 'dislike';
    } else {
      return 'none';
    }
  }

  private mapQueryResultToResponse(post: any) {
    return {
      ...post,
      vote: this.getVote(post.likes, post.dislikes),
    };
  }
}
