import { configureStore } from '@reduxjs/toolkit'
import score from "./score.ts";
import loading from "./loading.ts";
import user from "./user.ts";
import game from './game.ts';
import skin from './skin.ts';
import boost from './boost.ts';
import purchase from './purchase.ts';

export const store = configureStore({
    reducer: {
        game: game,
        score: score,
        loading: loading,
        user: user,
        skin: skin,
        boost: boost,
        purchase: purchase,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})