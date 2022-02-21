import { useQuery } from 'react-query';

const Index = () => {
  const { data } = useQuery(['user'], async () => {
    const response = await fetch('/api/user');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  return (
    <div>
      <h1>Hello mc2 👋️ {JSON.stringify(data)}</h1>
    </div>
  );
};

export default Index;
