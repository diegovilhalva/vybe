
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { toggleFollow } from '../redux/userSlice.js';
import { useNavigate } from 'react-router';
import { urlEndpoint } from '../constants/apiUrl.js';
import {toast} from "sonner"
const FollowButton = ({targetUserId, tailwind, onFollowChange}) => {

    const dispatch = useDispatch();

    const following = useSelector((state) => state.user.following);
    const isFollowing = following.includes(targetUserId);

    const handleFollow = async () => {

        try{

            const result = await axios.get(`${urlEndpoint}/user/follow/${targetUserId}`, { withCredentials: true });
            dispatch(toggleFollow(targetUserId));
            if(onFollowChange) {
                onFollowChange();
            }
        }
        catch (error) {
           toast.error(error.response.data.message)
        }

    }

    return (
        <button className={tailwind} onClick={handleFollow}>
            {isFollowing ? "Seguindo" : "Seguir"}
        </button>
    )
}

export default FollowButton