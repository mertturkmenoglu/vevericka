import { Api } from '@service/common/Api';
import { AsyncApiResult } from '@service/common/AsyncApiResult';
import { MinimalUserResponse, Tag } from '@service/common/models';
import { TagsAndPeople } from '@service/common/models/TagsAndPeople';
import { TagWithCount } from '@service/common/models/TagWithCount';
import { PaginatedResults } from '@service/common/PaginatedResult';
import { PaginationQuery } from '@service/common/PaginationQuery';
import { AxiosInstance } from 'axios';
import { createPublicApi } from '../Api';

export class ExploreApi {
  private get api(): AxiosInstance {
    return createPublicApi('explore');
  }

  async getPopularTags(paginationQuery: PaginationQuery): AsyncApiResult<PaginatedResults<TagWithCount[]>> {
    try {
      const response = await this.api.get<PaginatedResults<TagWithCount[]>>('/tags', {
        params: {
          page: paginationQuery.page,
          pageSize: paginationQuery.pageSize,
          order: paginationQuery.order,
        },
      });
      return {
        data: response.data,
      };
    } catch (e) {
      return {
        exception: Api.handleApiError(e),
      };
    }
  }

  async getTagByTagName(tagName: string): AsyncApiResult<Tag> {
    try {
      const response = await this.api.get<Tag>(`/tag/${tagName}`);
      return {
        data: response.data,
      };
    } catch (e) {
      return {
        exception: Api.handleApiError(e),
      };
    }
  }

  async getPopularPeople(paginationQuery: PaginationQuery): AsyncApiResult<PaginatedResults<MinimalUserResponse[]>> {
    try {
      const response = await this.api.get<PaginatedResults<MinimalUserResponse[]>>('/people', {
        params: {
          page: paginationQuery.page,
          pageSize: paginationQuery.pageSize,
          order: paginationQuery.order,
        },
      });
      return {
        data: response.data,
      };
    } catch (e) {
      return {
        exception: Api.handleApiError(e),
      };
    }
  }

  async getPopularTagsAndPeople(paginationQuery: PaginationQuery): AsyncApiResult<TagsAndPeople> {
    try {
      const response = await this.api.get<TagsAndPeople>('/tags-and-people', {
        params: {
          page: paginationQuery.page,
          pageSize: paginationQuery.pageSize,
          order: paginationQuery.order,
        },
      });
      return {
        data: response.data,
      };
    } catch (e) {
      return {
        exception: Api.handleApiError(e),
      };
    }
  }
}
