import React from 'react';
import { useGoogleAuth } from '../pages/Login/googleAuth';

const PrivatePage = () => {
    const { signIn } = useGoogleAuth();
    return (
        <div>
            <h2>Private Page</h2>

         <button onClick={signIn}>Login</button>
        </div>
    );
};

export default PrivatePage;