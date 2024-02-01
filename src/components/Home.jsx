import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import profile from '/profile.png'
import { Link } from 'react-router-dom';
// import './home.css'

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const handleData = async () => {
            try {
                const res = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
                // console.log(res.data);
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
        <section className='bg-dark'>
            <div className="container py-5  justify-content-center ">
                <div className="d-flex justify-content-center ">
                    <div className="col-md-8 people-nearby">
                        <h1 className='text-white text-center'>Users</h1>
                        {users.map((user) => (
                            <Link to={`/profile/${user.id}`} className='text-decoration-none text-white'>
                                <div key={user.profile.username} className="nearby-user border-top border-bottom align-items-center p-4 ">
                                    <div className="row">
                                        <div className="col-md-2 col-sm-2">
                                            <img src={user.avatar} onError={addDefaultSrc} className='rounded-circle' height={"100%"} width={"100%"} alt={user.profile.firstName} />
                                        </div>
                                        <div className="col-md-7 col-sm-7 d-flex align-items-center">
                                            <div className=''>
                                                <h5>{user.profile.firstName} {user.profile.lastName}</h5>
                                                <p className='mb-0'>{user.jobTitle}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-3 d-flex align-items-center">
                                            <button className="btn btn-primary pull-right">Details</button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
