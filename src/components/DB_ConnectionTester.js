import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';

function DB_ConnectWidget() {
  const [status, setStatus] = useState('Checking...');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
        try {
            const { error } = await supabase.from('Categories').select('*').limit(1);
            if (error) {setStatus('❌'); setErrMessage(error.message);} 
            else {setStatus('✅');}} 
        catch (err) {setStatus('❌'); setErrMessage(err.message);}
    };

    checkConnection();
  }, []);

  return (
    <div className="max-w-md text-center">
      <h3 className="text-xl font-semibold">Connection: {status}</h3>
      <p className="text-base font-normal">
        {errMessage.length > 0 && errMessage}
      </p>
    </div>
  );
}

export default DB_ConnectWidget;

