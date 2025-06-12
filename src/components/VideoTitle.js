const VideoTitle = ({ title,overview }) => {
  return (
    <div className=" w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-6xl font-bold ">{title}</h1>
        <p className="py-6 text-lg w-1/2">{overview}</p>
        <div className="my-4">
            <button className="bg-white text-black p-4  px-10 text-xl rounded-lg text-bold hover:bg-opacity-80" >▶️ Play</button>
            <button className=  " mx-2 bg-gray-500 text-white p-4  px-10 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-70"> ⓘ More Info</button>
        </div>

    </div>
  )
}

export default VideoTitle;