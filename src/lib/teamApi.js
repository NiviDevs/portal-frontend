import axios from "axios";
import { BASE_URL } from "./api";


export const getTeamInfo = async () => {
    const res = await axios.get(`${BASE_URL}/team/info`, {
        withCredentials: true,
    });
    return res.data;
};

export const createTeam = async ({ teamName,regId }) => {
    const res = await axios.post(`${BASE_URL}/team/create`, {
        teamName,
        regId,
    },{withCredentials:true});
    return res.data;
};

export const joinTeam = async ({ teamName,regId }) => {
    const res = await axios.post(
        `${BASE_URL}/team/join`,
        {
            teamName,
            regId,
        },
        { withCredentials: true }
    );
    return res.data;
};

export const leaveTeam = async()=>{
    const res = await axios.post(
        `${BASE_URL}/team/leave`,{},{withCredentials:true}
    );
    return res.data;
}

export const kickMember = async ({ leaderRegId, memberRegId }) => {
    const res = await axios.post(
        `${BASE_URL}/team/kick`,
        { leaderRegId, memberRegId },
        { withCredentials: true }
    );
    return res.data;
};

export const deleteTeam = async () => {
    const res = await axios.post( `${BASE_URL}/team/delete`, {}, { withCredentials: true });
    return res.data;
};