import { useState } from 'react';
import Navbar from '../components/NavBar';
import CurrencyExchangeRates from '../components/CurrencyExchangeRates';
import RecentTransactions from '../components/RecentTransactions';
import AvailableBalance from '../components/AvailableBalance';
import InternalTransaction from '../components/InternalTransaction';

const HomePage = () => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const updateData = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div>
      <Navbar 
        elements={[
          { to: '/account', label: 'Account' },
          { to: '/card', label: 'Cards' },
          { to: '/maketransaction', label: 'Make Transaction' },
          { to: '/alltransactions', label: 'Transactions' }
        ]} 
        showLogout={true} 
      />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-4">
            <AvailableBalance updateTrigger={updateTrigger} />
          </div>
          <div className="col-md-12 mb-4">
            <RecentTransactions updateTrigger={updateTrigger} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-8">
            <InternalTransaction updateData={updateData} />
          </div>
          <div className="col-md-6 mb-12">
            <CurrencyExchangeRates updateTrigger={updateTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
