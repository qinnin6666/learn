async function Analytics() {
  await new Promise(resolve => setTimeout(() => resolve(3000), 3000))
  return <div className="bg-yellow-800 text-white rounded flex justify-center items-center">Analytics</div>
}

export default Analytics
