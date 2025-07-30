import Messages from "./Messages"


const RightBar = () => {
  return (
      <div className='w-[25%] hidden lg:block min-h-[100vh] bg-[black] border-l-2 border-gray-900'>
        <Messages />
      </div>
  )
}

export default RightBar