import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import { API_KEY, API_URL } from "../../config";

const supabase = createClient(API_URL, API_KEY);

const Session = ({user}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error('Error al registrarse:', error.message)
    }
  }

  async function loginUser() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Error al registrarse:', error.message)
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error al registrarse:', error.message)
    } else {
      window.location.reload();
    }
  }

  return (
      user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={loginUser}>Login</button>
          <button onClick={signUpNewUser}>Registrarse</button>
        </div>
      )
  );
};

export default Session;
