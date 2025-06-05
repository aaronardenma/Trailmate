import React from 'react';
import profileLogo from "../Images/placeholderImage.jpg";
import "./css/UserProfile.css"
import users from "../Images/users.json"

console.log()

const UserProfile = () => {

    return (
        <div>
            <div className="profile-page">
                <div className="profile-info">
                    <img src={profileLogo} alt=""/>
                </div>
                <h1>Profile Page - TYPE</h1>
                <p>{users[0].expertise}</p>
                <div className="left-right-panes">
                    <div className="left-pane">
                        <div className="favourite-trails">
                            <h1>Favourite Trails</h1>
                            <p>
                                {users[0].favourite_trails}
                            </p>
                        </div>
                    </div>
                    <div className="right-pane">
                        <h1>Custom Gear</h1>
                        <div className="custom-gear">
                            {users[0].gear_list}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
