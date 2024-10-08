import React, {useEffect} from 'react';
import WebApp from "@twa-dev/sdk";
import SquadTile from '../components/squad/SquadTile';
import '../squad.css';
import {useNavigate} from "react-router-dom";
import {ImageSliceType, SquadSliceType, UserSliceType} from "../types/store.ts";
import {useDispatch, useSelector} from "react-redux";
import SquadSkeleton from "../skeleton/SquadSkeleton.tsx";
import {squadDataLeague} from "../types/data.ts";
import {leagueName} from "../helpers/helper.ts";
import {squadLoading} from "../store/squad.ts";

const Squad = () => {
    const navigate = useNavigate();
    WebApp.BackButton.onClick(() => navigate(-1))
    WebApp.BackButton.show();
    const user: UserSliceType = useSelector((state: any) => state.user);
    const squad: SquadSliceType = useSelector((state: any) => state.squad);
    const image: ImageSliceType = useSelector((state: any) => state.image);
    const CELEBRATION_IMG = image.optional.find((img) => img.name == 'CELEBRATION_ICON');
    const squadBGImage = image.optional.find((img) => img.name === 'JOIN_SQUAD_BG');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(squadLoading())
        user.websocket.emit('getTopSquads')
    }, []);
    return !squad.isLoading ? (
        <div className='squad-con'>
            <div className='squad-header'>
                {squadBGImage ? <img className='squad-header-bg' src={squadBGImage?.img.src}/> : null}
                {CELEBRATION_IMG ?
                    <img className='squad-header-img h-[320px]' src={CELEBRATION_IMG?.img.src} alt='celebration'/> : null}
                <p className='squad-text-join-title'>⚔️ Clan Wars ⚔️</p>
                <p className='squad-text-sm text-glass'>Pick your clan, unleash the Dragon,</p>
                <p className='squad-text-sm-sub text-glass'>and climb your way up the ranks for glory and riches!</p>
                <button className='join-squad-btn' onClick={() => {
                    WebApp.openTelegramLink(`https://t.me/${import.meta.env.VITE_REACT_APP_BOT_USERNAME}?start=squad`);
                    WebApp.close();
                }}>Create/Join A Clan</button>
            </div>
            <div className='squad-list-con'>
                {
                    squad.topSquad.map((sq: squadDataLeague, index: number) => <SquadTile key={sq.chat_id.slice(1)}
                                                                                          squad={sq} name={sq.name}
                                                                                          league={leagueName(sq.league?.preset)}
                                                                                          id={sq.chat_id.slice(1)}
                                                                                          image={sq.image == null ? null : import.meta.env.VITE_REACT_APP_BACKEND_URL + '/pimg/squad-profile/' + sq.image + '.jpg'}/>)
                }
            </div>
        </div>
    ) : <SquadSkeleton/>;

};

export default Squad;