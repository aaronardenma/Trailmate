// import React, {createContext, useState} from 'react';
// export const UserContents = createContext(null);
// import allUsers from "../Images/users.json";
//
// const defaultUsers = () => {
//     let users = {};
//     for (let index = 0; index < allUsers.length + 1; index++) {
//         users[index] = allUsers[index];
//     }
//     console.log("In store " + users[1]);
//     return users;
// }
//
// const UserContentsProvider = (props) => {
//     const [userItems] = useState(defaultUsers);
//     const contextValue = {allUsers, userItems};
//     return (
//         <UserContents.Provider value={contextValue}>
//             {props.children}
//         </UserContents.Provider>
//     );
// };
//
// export default UserContentsProvider;
