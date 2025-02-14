import { useEffect, useState } from "react";

const fetchData = async () => {
  // Simulate fetching data (replace with actual API call)
  return [
    {
      country: "United Kingdom",
      flag: "🇬🇧",
      air: { current: 4, goal: 3 },
      sea: { current: 22, goal: 20 },
    },
    {
      country: "China",
      flag: "🇨🇳",
      air: { current: 6, goal: 5 },
      sea: { current: 35, goal: 30 },
    },
    {
      country: "Netherlands",
      flag: "🇳🇱",
      air: { current: 3, goal: 2 },
      sea: { current: 18, goal: 15 },
    },
  ];
};

export default function KPITrackingTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div className="container">
      <table>
        <thead>
          <tr style={{fontSize:'10px',textWrap : "break-word"}}>
            <th>Country</th>
            <th>Avg by Air</th>
            <th>Goal by Air</th>
            <th>Avg by Sea</th>
            <th>Goal by Sea</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ country, flag, air, sea }) => (
            <tr key={country}>
              <td>
                {flag}
              </td>
              <td>{air.current}</td>
              <td className={air.current > air.goal ? "red" : "green"}>{air.goal}</td>
              <td>{sea.current}</td>
              <td className={sea.current > sea.goal ? "red" : "green"}>{sea.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
