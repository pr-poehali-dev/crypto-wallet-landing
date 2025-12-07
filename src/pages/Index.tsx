import { useState } from 'react';
import { LoginPage } from '@/components/LoginPage';
import { Dashboard } from '@/components/Dashboard';

export type Page = 'home' | 'send' | 'receive' | 'settings' | 'exchange' | 'buy' | 'sell';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard currentPage={currentPage} onPageChange={setCurrentPage} />;
};

export default Index;