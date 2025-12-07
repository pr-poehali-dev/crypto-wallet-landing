import { useState, useEffect } from 'react';
import { LoginPage } from '@/components/LoginPage';
import { Dashboard } from '@/components/Dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export type Page = 'home' | 'send' | 'receive' | 'settings' | 'exchange' | 'buy' | 'sell' | 'staking' | 'nft' | 'defi' | 'qr' | 'price-history' | 'converter' | 'alerts' | 'referral' | 'contacts' | 'news';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAccountFrozen, setIsAccountFrozen] = useState(false);
  const [showUnfreezeDialog, setShowUnfreezeDialog] = useState(false);
  const [unfreezePassword, setUnfreezePassword] = useState('');
  const [unfreezeError, setUnfreezeError] = useState('');

  useEffect(() => {
    const frozen = localStorage.getItem('accountFrozen');
    if (frozen === 'true') {
      setIsAccountFrozen(true);
    }
  }, []);

  const handleFreeze = (freeze: boolean) => {
    setIsAccountFrozen(freeze);
    localStorage.setItem('accountFrozen', freeze.toString());
    if (freeze) {
      setShowUnfreezeDialog(true);
    }
  };

  const handleUnfreeze = () => {
    const storedUsers = localStorage.getItem('users');
    let correctPassword = 'Lilia051181!';
    
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const currentUser = users.find((u: { email: string }) => u.email === 'M.Kozlov@techglobal.ru');
      if (currentUser) {
        correctPassword = currentUser.password;
      }
    }

    if (unfreezePassword === correctPassword) {
      setIsAccountFrozen(false);
      localStorage.setItem('accountFrozen', 'false');
      setShowUnfreezeDialog(false);
      setUnfreezePassword('');
      setUnfreezeError('');
    } else {
      setUnfreezeError('Неверный пароль');
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  if (isAccountFrozen && showUnfreezeDialog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 via-background to-destructive/10 opacity-50" />
        
        <Card className="w-full max-w-md relative z-10 border-destructive/50 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mb-2">
              <Icon name="Lock" size={32} className="text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold text-destructive">
              Счет заморожен
            </CardTitle>
            <p className="text-muted-foreground">
              Для разморозки счета введите пароль от учетной записи
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="unfreezePassword">Пароль</Label>
              <div className="relative">
                <Icon 
                  name="Lock" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  id="unfreezePassword"
                  type="password"
                  placeholder="Введите пароль"
                  value={unfreezePassword}
                  onChange={(e) => {
                    setUnfreezePassword(e.target.value);
                    setUnfreezeError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleUnfreeze()}
                  className="pl-10 bg-muted/50 border-border"
                  autoFocus
                />
              </div>
            </div>

            {unfreezeError && (
              <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <Icon name="AlertCircle" size={16} />
                <span>{unfreezeError}</span>
              </div>
            )}

            <Button 
              onClick={handleUnfreeze}
              className="w-full bg-gradient-to-r from-primary to-secondary"
            >
              <Icon name="Unlock" size={18} className="mr-2" />
              Разморозить счет
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <Dashboard currentPage={currentPage} onPageChange={setCurrentPage} isAccountFrozen={isAccountFrozen} onFreezeAccount={handleFreeze} />;
};

export default Index;