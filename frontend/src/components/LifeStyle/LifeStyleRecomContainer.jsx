import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import LifeStyleRecomPresenter from "./LifeStyleRecomPresenter";


const LifeStyleRecomContainer=()=>{
    const { winecode } = useParams();
    const [winelist, setWineList] = useState([]);
    const [lifename, setLifename] = useState("");
    const [totalWishList, setTotalWishList] = useState(0);

    useEffect(()=>{
        axios.get(`/api/recommends/lifestyle-wish/${winecode}`).then(function (response){
            setWineList(response.data.result);
            setLifename(response.data.lifestyleName);
        }).catch(function (error){
            console.log("실패");
        });
    },[]);

    const cntWishList = (type) => {
        if (type === "add") {
            setTotalWishList(totalWishList + 1);
        } else {
            setTotalWishList(totalWishList - 1);
        }
    };

    return(
        <LifeStyleRecomPresenter
        winelists = {winelist}
        lifename = {lifename}
        winecode = {winecode}
        cntWishList = {cntWishList}
        totalWishList = {totalWishList}
        />
    );  
}
export default LifeStyleRecomContainer