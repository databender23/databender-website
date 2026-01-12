interface TopPagesTableProps {
  data: { page: string; count: number }[];
}

export default function TopPagesTable({ data }: TopPagesTableProps) {
  const maxCount = data[0]?.count || 1;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-gray-500 text-sm">No data available</p>
        ) : (
          data.map((item, index) => (
            <div key={item.page} className="flex items-center gap-3">
              <span className="text-sm text-gray-400 w-6">{index + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 font-medium truncate max-w-[200px]">
                    {item.page}
                  </span>
                  <span className="text-sm text-gray-500">{item.count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
