async function Team() {
  await new Promise((resolve) => setTimeout(() => resolve(6000), 6000))
  return <div className="w-72 h-72 bg-gray-800">Team</div>
}

export default Team
