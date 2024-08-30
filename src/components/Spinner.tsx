export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-8 border-primary rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 border-8 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
