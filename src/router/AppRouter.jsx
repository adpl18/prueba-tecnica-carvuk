import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Session from '../auth/Session';

import { createClient } from '@supabase/supabase-js';
import { API_KEY, API_URL } from "../../config";
import Home from '../views/Home';
import AddServices from '../views/AddServices';

const supabase = createClient(API_URL, API_KEY);


const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
				setUser(session.user);
        setIsAuthenticated(true);
      }
    });
  }, []);

	return (
		<Routes>
			{isAuthenticated ? (
				<Route path="/">
					<Route index element={<Home user={user}/>} />
					<Route path="addservices" element={<AddServices user={user} />} />
				</Route>
			) : (
				<Route path="/">
					<Route index element={<Session />} />
				</Route>

			)}
		</Routes>
	);
};

export default AppRouter;
