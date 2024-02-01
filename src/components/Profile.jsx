import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profile from '/profile.png';
import axios from 'axios';

export default function Profile() {
    const [users, setUsers] = useState([]);
    const params = useParams();

    useEffect(() => {
        const handleData = async () => {
            try {
                const res = await axios.get(`https://602e7c2c4410730017c50b9d.mockapi.io/users/${params.id}`);
                console.log(res.data);
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        handleData();
    }, [])

    const addDefaultSrc = (e) => {
        e.target.src = `${profile}`;
    }

    return (
        <div className='bg-dark vh-100 d-flex' style={{backgroundImage: "url('/bg.png')", backgroundSize: "cover"}}>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card p-1 my-5">
                    <div className="upper w-100">
                        <img src="https://i.imgur.com/Qtrsrk5.jpg" className="img-fluid w-100" />
                    </div>
                    <div className="user text-center position-relative">
                        <div className="profile position-absolute rounded-circle" style={{ top: "-50px", left: "40%", border: "3px solid #fff" }}>
                            <img src={users.avatar} onError={addDefaultSrc} className="rounded-circle" width="80" />
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                        {users.profile ?
                            <h4 className="mb-0">{users.profile.firstName} {users.profile.lastName}</h4> :
                            <h4 className="mb-0"></h4>
                        }
                        {users.profile ?
                            <span className="mb-0">@{users.profile.username}</span> :
                            <h4 className="mb-0"></h4>
                        }
                        <span className="text-muted d-block mb-2">{users.jobTitle}</span>
                        <div className="d-flex justify-content-center align-items-center my-4 px-4">
                            <div>
                                <p>{users.Bio}</p>
                                {users.profile ?
                                    <p>{users.profile.email}</p> :
                                    <p>Ursula77@gmail.com</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
