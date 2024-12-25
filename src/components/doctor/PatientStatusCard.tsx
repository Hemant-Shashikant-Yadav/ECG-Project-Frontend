interface PatientStatusCardProps {
  title: string;
  count: number;
  type: 'total' | 'pending' | 'critical';
}

export default function PatientStatusCard({ title, count, type }: PatientStatusCardProps) {
  const getColorClass = () => {
    switch (type) {
      case 'total':
        return 'text-indigo-600';
      case 'pending':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${getColorClass()}`}>{count}</p>
    </div>
  );
}