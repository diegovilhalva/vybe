import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { urlEndpoint } from "../constants/apiUrl";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiPlusSquare } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { setPostData } from "../redux/postSlice";
import { toast } from "sonner";
import { setCurrentUserStory } from "../redux/storySlice";
import { setLoopData } from "../redux/loopSlice";


const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postData } = useSelector((state) => state.post);
  const { loopData } = useSelector((state) => state.loop);
  const { storyData } = useSelector((state) => state.story);

  const [uploadType, setUploadType] = useState("post");
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [backendMedia, setBackendMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const mediaInput = useRef()

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setMediaType("image");
    } else {
      setMediaType("video");
    }
    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file));
  }

  const uploadPost = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("caption", caption)
      formData.append("mediaType", mediaType)
      formData.append("media", backendMedia)
      const res = await axios.post(`${urlEndpoint}/post/upload`,  formData , { withCredentials: true })
      dispatch(setPostData([...postData, res.data]));
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const uploadStory = async () => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("mediaType", mediaType);
      formData.append("media", backendMedia);

      const res = await axios.post(`${urlEndpoint}/story/upload`,  formData , { withCredentials: true })
      dispatch(setCurrentUserStory(res.data))
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const uploadLoop = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("mediaType", mediaType);
      formData.append("media", backendMedia);
      const res = await axios.post(`${urlEndpoint}/loop/upload`,formData, { withCredentials: true })
        dispatch(setLoopData([...loopData, res.data]))
    } catch (error) {
        toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  }

  const handleUpload = () => {
    if (uploadType === "post") {
      uploadPost();
    } else if (uploadType === "story") {
      uploadStory();
    } else {
      uploadLoop();
    }
  };

  return (
    <div className="w-full h-[100vh] bg-black flex flex-col items-center">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
        <IoArrowBackOutline
          className="text-white w-[25px] h-[25px] cursor-pointer"
          onClick={() => navigate("/")}
        />
        <h1 className="text-white text-[20px] font-semibold">Upload Midia</h1>
      </div>
      <div className="w-[90%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center gap-[10px]">
        <div
          className={`${uploadType == "post"
            ? "bg-black text-white shadow-2xl shadow-black"
            : ""
            }  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("post")}
        >
          Post
        </div>
        <div
          className={`${uploadType == "story"
            ? "bg-black text-white shadow-2xl shadow-black"
            : ""
            }  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("story")}
        >
          Story
        </div>
        <div
          className={`${uploadType == "loop"
            ? "bg-black text-white shadow-2xl shadow-black"
            : ""
            }  w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>
      {!frontendMedia && (
        <div
          className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
          onClick={() => mediaInput.current.click()}
        >
          <input
            accept={uploadType == "loop" ? "video/*" : ""}
            type="file"
            className="hidden"
            ref={mediaInput}
            onChange={handleMedia}
          />
          <FiPlusSquare className="text-white w-[25px] h-[25px] cursor-pointer" />
          <div className="text-white text-[19px] font-semibold">
            upload {uploadType}
          </div>
        </div>
      )}

      {frontendMedia && (
        <div className="w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[15vh]">
          {mediaType == "image" && (
            <div className="w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[5vh] ">
              <img src={frontendMedia} alt="" className="h-[60%] rounded-2xl" />
              {uploadType != "story" && (
                <input
                  type="text"
                  className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]"
                  placeholder="write caption"
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                />
              )}
            </div>
          )}

          {mediaType == "video" && (
            <div className="w-[80%] max-w-[500px] h-[250px]  flex flex-col items-center justify-center  mt-[5vh] ">
              <VideoPlayer media={frontendMedia} />
              {uploadType != "story" && (
                <input
                  type="text"
                  className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]"
                  placeholder="write caption"
                  onChange={(e) => setCaption(e.target.value)}
                  value={caption}
                />
              )}
            </div>
          )}
        </div>
      )}


      {frontendMedia && (
        <button
          className="px-[10px] w-[60%] max-w-[400px]   py-[5px] h-[50px] bg-[white] mt-[50px] cursor-pointer rounded-2xl"
          onClick={handleUpload}
        >
          {loading ? (
            <ClipLoader size={30} color="black" />
          ) : (
            `Upload ${uploadType}`
          )}
        </button>
      )}
    </div>
  )
}

export default Upload