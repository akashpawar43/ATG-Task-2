import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import profile from '/profile.png'
import { Link } from 'react-router-dom';
// import './home.css'

export default function Home() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

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
        e.target.src = profile;
    }

    const handlePage = (selectPage) => {
        if (selectPage >= 1 && selectPage <= users.length / 10 && selectPage !== page)
            setPage(selectPage);
    }

    return (
        <section className='bg-dark'>
            <div className="container py-5  justify-content-center ">
                <div className="d-flex justify-content-center ">
                    <div className="col-md-8 people-nearby">
                        <h1 className='text-white text-center'>Users</h1>
                        {users.length > 0 ?
                            (users.slice(page * 10 - 10, page * 10).map((user, i) => (
                                <Link to={`/profile/${user.id}`} key={i} className='text-decoration-none text-white'>
                                    <div className="nearby-user border-top border-bottom align-items-center p-3 ">
                                        <div className="row">
                                            <div className="col-2 col-md-2 p-1">
                                                <img src={user.avatar} onError={addDefaultSrc} className='rounded-circle' height={"100%"} width={"100%"} alt={user.profile.firstName} />
                                            </div>
                                            <div className="col-7 col-md-7 d-flex align-items-center">
                                                <div className=''>
                                                    <h5>{user.profile.firstName} {user.profile.lastName}</h5>
                                                    <p className='mb-0'>{user.jobTitle}</p>
                                                </div>
                                            </div>
                                            <div className="col-3 col-md-3 d-flex align-items-center">
                                                <button className="btn btn-primary pull-right">Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))) :
                            (<div className='text-white text-center'>Loading....</div>)
                        }

                        {users.length > 0 && (
                            <div className="pagination d-flex justify-content-center align-items-center p-3 w-100">
                                {/* if page is less than 1 then disable it else show  */}
                                <span className={`${page > 1 ? "" : "opacity-0"} p-3`} onClick={() => handlePage(page - 1)} style={{ cursor: "pointer" }}>⬅️</span>
                                {
                                    [...Array(users.length / 10)].map((_, i) => {
                                        return (
                                            <span
                                                className={`${page === i + 1 ? "bg-secondary" : ""} text-white pointer p-3 border`}
                                                onClick={() => handlePage(i + 1)}
                                                key={i} style={{ cursor: "pointer" }}>
                                                {i + 1}
                                            </span>
                                        );
                                    })
                                }
                                {/* if page is grater than length of data divide by 10 then disable it else show  */}
                                {/* eg no. of data = 100 , page no. is 10   ( 100 / 10 = 10  == page no so after it exceds disable the page)  */}
                                <span className={`${page < users.length / 10 ? "" : "opacity-0"} p-3`} onClick={() => handlePage(page + 1)} style={{ cursor: "pointer" }}>➡️</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
