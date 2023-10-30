import {gql} from '@apollo/client';


const GET_CLIENTS = gql`
 query getClients {
    clients {
        id
        name
        email
        phone
    }
}
`;
// クエリはバッククエリとしてサーバーに送信され、clients フィールドのクライアント情報を取得
// サーバーは対応するデータを返す
export { GET_CLIENTS };

