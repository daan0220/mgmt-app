import { gql } from '@apollo/client';

// ミューテーションクエリは、Apollo Clientを使用してGraphQLサーバーに送信され、データの作成と削除の操作を実行


const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!,
    $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone)
        {
            id
            name
            email
            phone
        }
    }
`;


const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`;

export { ADD_CLIENT, DELETE_CLIENT };