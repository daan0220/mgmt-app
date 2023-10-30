import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { useMutation } from '@apollo/client';

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();// ページ遷移を管理するためのuseNavigateを使用して navigate 関数を取得

  // useMutationフックを使用してDELETE_PROJECTミューテーションを宣言
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },// ミューテーションの変数を指定
    onCompleted: () => navigate('/'),// ミューテーションが完了したら '/' に遷移
    refetchQueries: [{ query: GET_PROJECTS }],// ミューテーションが完了した後にGET_PROJECTSクエリを再実行してプロジェクトのデータを更新
  });

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2' onClick={deleteProject}>
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
  );
}