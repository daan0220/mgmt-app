import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ClientInfo from '../components/ClientInfo';
import DeleteProjectButton from '../components/DeleteProjectButton';
import EditProjectForm from '../components/EditProjectForm';
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Project() {
  const { id } = useParams();// URLパラメータからプロジェクトのIDを取得
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });// GraphQLクエリを実行してプロジェクトデータを取得

  if (loading) return <Spinner />;// データがロード中の場合、ローディングスピナーを表示
  if (error) return <p>Something Went Wrong</p>;// エラーが発生した場合、エラーメッセージを表示

  return (
    <>
     {/* データがロード済みでエラーが発生していない場合にコンポーネントを描画 */}
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className='mt-3'>Project Status</h5>
          <p className='lead'>{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}