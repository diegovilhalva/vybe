import Feed from "../components/Feed"
import LeftBar from "../components/LeftBar"
import RightBar from "../components/RightBar"


const Home = () => {
  return (
    <div className='w-full flex justify-center items-center'>
        <LeftBar />
        <Feed />
        <RightBar />
    </div>
  )
}

export default Home