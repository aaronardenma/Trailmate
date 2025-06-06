import React, {useContext} from 'react';
import "./css/UserProfile.css"
import {Input} from "@/components/ui/input"
import {Badge} from "@/components/ui/badge"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"



export default function UserProfile() {
    // // const { id } = useParams();
    // // const user = users[id + 1]
    // //
    // // console.log(JSON.stringify(user))
    //
    // const user = useSelector((state) => state.user)
    // console.log(user);
    //
    // const dispatch = useDispatch();
    return (
        <div>
            <div className="profile-page">
                <div className="profile-info">
                    {/*<img src={profileLogo} alt=""/>*/}
                    <div className="flex flex-row flex-wrap items-center gap-12">
                        <Avatar className="w-[200px] h-[200px] self-start">
                            <AvatarImage src="profileLogo" alt="@shadcn"/>
                            <AvatarFallback>Picture Here</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-5">
                    <div className="flex w-full flex-wrap gap-5 mt-5">
                        <Badge variant="secondary" className="bg:grey-300 text-[#A3B18A] border-3 border-[#A3B18A]">
                            Beginner</Badge>
                    </div>
                </div>
                <div className="left-right-panes">
                    <div className="left-pane">
                        <div>
                            <h1>Full Name</h1>
                            <p>
                                <Input className="w-[380px]" type="name" placeholder="Full Name"/>
                            </p>
                        </div>

                        <div>
                            <h1>Gender</h1>
                            <p>
                                <Input className="w-[380px]" type="gender" placeholder="Gender"/>
                            </p>
                        </div>

                        <div>
                            <h1>Language</h1>
                            <p>
                                <Select>
                                    <SelectTrigger className="w-[380px]">
                                        <SelectValue placeholder="Select a Language"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Language</SelectLabel>
                                            <SelectItem value="english">English</SelectItem>
                                            <SelectItem value="french">French</SelectItem>
                                            <SelectItem value="chinese">Chinese</SelectItem>
                                            <SelectItem value="spanish">Spanish</SelectItem>
                                            <SelectItem value="korean">Korean</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </p>
                        </div>
                    </div>

                    <div className="right-pane">
                        <div>
                            <h1>Nick Name</h1>
                            <p>
                                <Input className="w-[380px]" type="nick_name" placeholder="Nick Name"/>
                            </p>
                        </div>

                        <div>
                            <h1>Country</h1>
                            <p>
                                <Input className="w-[380px]" type="country" placeholder="Country"/>
                            </p>
                        </div>
                        <div>
                            <h1>Time Zone</h1>
                            <p>
                                <Select>
                                    <SelectTrigger className="w-[380px]">
                                        <SelectValue placeholder="Select Timezone"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Timezone</SelectLabel>
                                            <SelectItem value="pst">Pacific Time</SelectItem>
                                            <SelectItem value="mst">Mountain Time</SelectItem>
                                            <SelectItem value="cst">Central Time</SelectItem>
                                            <SelectItem value="est">Easter Time</SelectItem>
                                            <SelectItem value="utc">Universal Time Coordinated</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};