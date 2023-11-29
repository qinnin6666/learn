async function Team() {
  await new Promise(resolve => setTimeout(() => resolve(6000), 6000))
  return <div className="bg-orange-800 text-white rounded flex justify-center items-center">Team</div>
}

export default Team
