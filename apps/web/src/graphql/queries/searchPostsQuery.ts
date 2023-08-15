// import { graphql } from '../../generated';
//
// export const searchPostsQueryDocument = graphql(/* GraphQL */ `
//   query SearchPosts($term: String!, $take: Int!, $skip: Int!) {
//     searchPosts(term: $term, take: $take, skip: $skip) {
//       took
//       timed_out
//       _shards {
//         total
//         successful
//         skipped
//         failed
//       }
//       hits {
//         max_score
//         hits {
//           _index
//           _id
//           _score
//           _source {
//             ...PostItem
//           }
//         }
//       }
//     }
//   }
// `);
