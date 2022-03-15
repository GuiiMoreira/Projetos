import { db } from '../context/config';
import { onValue, ref } from "firebase/database";

function handleSetChannels() {
    return onValue(ref(db, '/channel'), (snapshot) => {
        const channels = (snapshot.val() && snapshot.val());
        // ...
    }, {
        onlyOnce: true
    });
}

function handleSetUser() {
    return onValue(ref(db, '/users/' + usuarioLogado.user.uid), (snapshot) => {
        const user = (snapshot.val() && snapshot.val());
        // ...
    }, {
        onlyOnce: true
    });
}


export {
    handleSetChannels,
    handleSetUser
}