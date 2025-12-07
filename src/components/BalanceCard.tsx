import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const BalanceCard = () => {
  const [usdcPrice, setUsdcPrice] = useState(1.0);
  const [usdToRub, setUsdToRub] = useState(95.0);
  const usdcBalance = 246778.19;
  const [totalValue, setTotalValue] = useState(usdcBalance);
  const [isAccountFrozen, setIsAccountFrozen] = useState(false);

  useEffect(() => {
    const frozen = localStorage.getItem('accountFrozen');
    setIsAccountFrozen(frozen === 'true');

    const fetchCryptoPrice = async () => {
      try {
        const cryptoResponse = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd'
        );
        const cryptoData = await cryptoResponse.json();
        const price = cryptoData['usd-coin']?.usd || 1.0;
        setUsdcPrice(price);
        setTotalValue(usdcBalance * price);

        const rubResponse = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=rub'
        );
        const rubData = await rubResponse.json();
        const rubRate = rubData['tether']?.rub || 95.0;
        setUsdToRub(rubRate);
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error);
      }
    };

    fetchCryptoPrice();
    const interval = setInterval(fetchCryptoPrice, 30000);

    const handleStorageChange = () => {
      const frozen = localStorage.getItem('accountFrozen');
      setIsAccountFrozen(frozen === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [usdcBalance]);

  return (
    <Card className={`border-border/50 bg-gradient-to-br backdrop-blur ${
      isAccountFrozen 
        ? 'from-card via-card to-destructive/10 border-destructive/30' 
        : 'from-card via-card to-primary/5'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Icon name={isAccountFrozen ? "Lock" : "Wallet"} size={16} />
            {isAccountFrozen ? 'Счет заморожен' : 'Общий баланс'}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (isAccountFrozen) {
                const password = prompt('Введите пароль для разморозки:');
                if (password) {
                  const storedUsers = localStorage.getItem('users');
                  let correctPassword = 'Lilia051181!';
                  
                  if (storedUsers) {
                    const users = JSON.parse(storedUsers);
                    const currentUser = users.find((u: { email: string }) => u.email === 'M.Kozlov@techglobal.ru');
                    if (currentUser) {
                      correctPassword = currentUser.password;
                    }
                  }

                  if (password === correctPassword) {
                    localStorage.setItem('accountFrozen', 'false');
                    setIsAccountFrozen(false);
                    alert('Счет разморожен');
                    window.location.reload();
                  } else {
                    alert('Неверный пароль');
                  }
                }
              } else {
                if (confirm('Вы уверены, что хотите заморозить счет?')) {
                  localStorage.setItem('accountFrozen', 'true');
                  setIsAccountFrozen(true);
                  window.location.reload();
                }
              }
            }}
            className={isAccountFrozen ? 'text-destructive hover:text-destructive' : 'text-muted-foreground hover:text-foreground'}
          >
            <Icon name={isAccountFrozen ? "Lock" : "Lock"} size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {isAccountFrozen && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Lock" size={20} className="text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-destructive text-sm">Счет заморожен</p>
                <p className="text-xs text-muted-foreground">Все операции заблокированы.</p>
              </div>
            </div>
            <Button 
              onClick={() => {
                const password = prompt('Введите пароль для разморозки:');
                if (password) {
                  const storedUsers = localStorage.getItem('users');
                  let correctPassword = 'Lilia051181!';
                  
                  if (storedUsers) {
                    const users = JSON.parse(storedUsers);
                    const currentUser = users.find((u: { email: string }) => u.email === 'M.Kozlov@techglobal.ru');
                    if (currentUser) {
                      correctPassword = currentUser.password;
                    }
                  }

                  if (password === correctPassword) {
                    localStorage.setItem('accountFrozen', 'false');
                    setIsAccountFrozen(false);
                    alert('Счет разморожен');
                    window.location.reload();
                  } else {
                    alert('Неверный пароль');
                  }
                }
              }}
              className="w-full bg-gradient-to-r from-primary to-secondary"
            >
              <Icon name="Unlock" size={18} className="mr-2" />
              Разморозить счет
            </Button>
          </div>
        )}
        <div className={isAccountFrozen ? 'opacity-50' : ''}>
          <div className="text-3xl sm:text-5xl font-bold mb-1 break-all">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-2">
            ≈{(totalValue * usdToRub).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={12} className="text-success sm:w-3.5 sm:h-3.5" />
            <span>+2.47% за 24ч</span>
          </div>
        </div>

        <div className={`pt-3 sm:pt-4 border-t border-border/50 ${isAccountFrozen ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-base sm:text-lg font-semibold text-secondary">$</span>
              </div>
              <div>
                <p className="text-sm sm:text-base font-semibold">USDC</p>
                <p className="text-xs sm:text-sm text-muted-foreground">USD Coin</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm sm:text-base font-semibold break-all">{usdcBalance.toLocaleString('en-US')}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                ${(usdcBalance * usdcPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-0.5">
                ≈{(usdcBalance * usdcPrice * usdToRub).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ₽
              </p>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 gap-2 sm:gap-3 pt-2 ${isAccountFrozen ? 'opacity-50' : ''}`}>
          <div className="p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Цена USDC</p>
            <p className="text-sm sm:text-base font-semibold">${usdcPrice.toFixed(4)}</p>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">Обновлено</p>
            <p className="text-sm sm:text-base font-semibold">Сейчас</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};