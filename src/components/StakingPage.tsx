import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export const StakingPage = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('USDC');

  const stakingOptions = [
    { 
      crypto: 'USDC', 
      icon: '💵', 
      apy: '8.5', 
      minStake: '100',
      locked: '30 дней',
      totalStaked: '150,000',
      myStake: '5,000'
    },
    { 
      crypto: 'ETH', 
      icon: '⟠', 
      apy: '5.2', 
      minStake: '0.1',
      locked: '90 дней',
      totalStaked: '12,500',
      myStake: '0'
    },
    { 
      crypto: 'BTC', 
      icon: '₿', 
      apy: '4.8', 
      minStake: '0.01',
      locked: '180 дней',
      totalStaked: '2,450',
      myStake: '0'
    }
  ];

  const handleStake = () => {
    alert(`Застейкано ${stakeAmount} ${selectedCrypto}!`);
    setStakeAmount('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="TrendingUp" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Стейкинг</h2>
          <p className="text-sm text-muted-foreground">Зарабатывайте пассивный доход</p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Мой доход
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">$425.50</div>
            <p className="text-xs text-muted-foreground mt-1">За все время</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              В стейкинге
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">$5,000</div>
            <p className="text-xs text-muted-foreground mt-1">USDC</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Ожидаемый доход
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">$425/год</div>
            <p className="text-xs text-muted-foreground mt-1">APY 8.5%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Застейкать криптовалюту</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Выберите криптовалюту</Label>
            <div className="grid grid-cols-3 gap-2">
              {stakingOptions.map((option) => (
                <button
                  key={option.crypto}
                  onClick={() => setSelectedCrypto(option.crypto)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedCrypto === option.crypto
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-sm font-semibold">{option.crypto}</div>
                  <div className="text-xs text-success">APY {option.apy}%</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stakeAmount">Сумма</Label>
            <div className="relative">
              <Input
                id="stakeAmount"
                type="number"
                placeholder="0.00"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="pr-20"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                {selectedCrypto}
              </span>
            </div>
          </div>

          {stakingOptions
            .filter((opt) => opt.crypto === selectedCrypto)
            .map((opt) => (
              <div key={opt.crypto} className="p-4 rounded-lg bg-muted/30 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Минимум:</span>
                  <span className="font-medium">{opt.minStake} {opt.crypto}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Период блокировки:</span>
                  <span className="font-medium">{opt.locked}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">APY:</span>
                  <span className="font-medium text-success">{opt.apy}%</span>
                </div>
                {stakeAmount && (
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Доход за год:</span>
                    <span className="font-bold text-success">
                      ~{(parseFloat(stakeAmount) * parseFloat(opt.apy) / 100).toFixed(2)} {opt.crypto}
                    </span>
                  </div>
                )}
              </div>
            ))}

          <Button onClick={handleStake} className="w-full" disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}>
            <Icon name="Lock" size={16} className="mr-2" />
            Застейкать
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Доступные пулы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stakingOptions.map((option) => (
              <div key={option.crypto} className="p-4 rounded-lg border border-border/30 bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{option.icon}</div>
                    <div>
                      <h3 className="font-bold">{option.crypto} Staking</h3>
                      <p className="text-sm text-muted-foreground">Блокировка: {option.locked}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{option.apy}%</div>
                    <p className="text-xs text-muted-foreground">APY</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">В пуле:</p>
                    <p className="font-semibold">{option.totalStaked} {option.crypto}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Мой стейк:</p>
                    <p className="font-semibold">{option.myStake} {option.crypto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
