import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
    // useStateフックを使用して、プロジェクトの名前、説明、ステータスの状態を管理
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
        // プロジェクトのステータスを選択肢に変換
    switch (project.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });
  // useMutationフックを使用してUPDATE_PROJECTミューテーションを宣言
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },// ミューテーションの変数を指定
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],// ミューテーション後にクエリを再実行してデータを更新
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // 名前、説明、ステータスのいずれかが空白の場合、アラートが表示されます
    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }
    // updateProjectミューテーションを実行してプロジェクトを更新
    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
