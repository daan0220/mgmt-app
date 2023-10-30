import { gql } from '@apollo/client';

// プロジェクト一覧を取得するGraphQLクエリの定義
const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      status
    }
  }
`;

// 特定のプロジェクトの詳細情報を取得するGraphQLクエリの定義
const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT };