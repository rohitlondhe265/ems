export default function ResultTable() {
  const data = [
    {
      username: "rohit",
      exam: "a.com",
      attempts: 3,
      points: 30,
      percentage: 60,
    },
  ];
  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Exam Name</td>
            <td>Attempted Questions</td>
            <td>Earned Points</td>
            <td>Percentage</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Data Found </div>}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ""}</td>
              <td>{v?.exam || ""}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.percentage || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
