import './NotificationCard.css'

function NotificationItem({ text, hour, name }) {
    return (
        <div className='notificationItem'>
            <div>
                <div className="circle"></div>
                <div className="hour">{hour}</div>
            </div>
            <div className="text"><b>{name}</b>{text}</div>
        </div>
    )
}


export default function NotificationCard() {

    return (
        <div className="div-notificationCard" >
            <div className="notificationCard">
                <div className="header-notificationCard">
                    <div class="header-notificationCard-menu-icon">
                        <div class="dash-top"></div>
                        <div class="dash-bottom"></div>
                        <div class="circle"></div>
                    </div>
                    <p className='header-notificationCard-title' >Notification</p>
                    <div className='hearder-notificationCard-search-icon'></div>
                </div>
                <ul className='notification-list'>
                    <li><NotificationItem name='Guilherme Moreira' text="Posted a photo on your feed." hour='10:00 AM' /></li>
                    <li><NotificationItem name='Maira Campelo' text="Commented your last post." hour='06:17 AM' /></li>
                    <li><NotificationItem name='Vania Moreira' text="added you as friend." hour='yesterday' /></li>
                </ul>
            </div>
        </div>
    )
}