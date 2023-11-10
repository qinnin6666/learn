async function Analytics() {
  await new Promise(resolve => setTimeout(() => resolve(3000), 3000))
  return <div className="w-72 h-72 bg-yellow-800 border-2 border-red-600">Analytics</div>
}

export default Analytics
