import './ProfileCard.css'

export default function ProfileCard() {

    return (
        <div className="div-profileCard" >
            <div className="profileCard">
                <div className="left-side-profileCard">
                    <img src="https://pbs.twimg.com/profile_images/1470446279503364101/rwI7MBho_400x400.jpg" alt="" className="photo-profileCard" />
                    <p className="name-profileCard">Guilherme Moreira</p>
                    <p className="prof-profileCard">Developer FullStack</p>
                    <button>Follow</button>
                    <button>Message</button>
                </div>
                <div className="right-side-profileCard">
                    <div className="div-right-side">
                        <p className="title-right-side">215</p>
                        <p className="subTitle-right-side">Posts</p>
                    </div>
                    <div className="div-right-side">
                        <p className="title-right-side">804</p>
                        <p className="subTitle-right-side">Likes</p>
                    </div>
                    <div className="div-right-side">
                        <p className="title-right-side">127</p>
                        <p className="subTitle-right-side">Follower</p>
                    </div>
                </div>
            </div>
        </div>
    )
}