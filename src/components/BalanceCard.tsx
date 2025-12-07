import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const BalanceCard = () => {
  const [usdcPrice, setUsdcPrice] = useState(1.0);
  const usdcBalance = 196446;
  const [totalValue, setTotalValue] = useState(usdcBalance);

  useEffect(() => {
    const fetchCryptoPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd'
        );
        const data = await response.json();
        const price = data['usd-coin']?.usd || 1.0;
        setUsdcPrice(price);
        setTotalValue(usdcBalance * price);
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error);
      }
    };

    fetchCryptoPrice();
    const interval = setInterval(fetchCryptoPrice, 30000);

    return () => clearInterval(interval);
  }, [usdcBalance]);

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Icon name="Wallet" size={16} />
          Общий баланс
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-5xl font-bold mb-2">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span>+2.47% за 24ч</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-lg font-semibold text-secondary">$</span>
              </div>
              <div>
                <p className="font-semibold">USDC</p>
                <p className="text-sm text-muted-foreground">USD Coin</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{usdcBalance.toLocaleString('en-US')}</p>
              <p className="text-sm text-muted-foreground">
                ${(usdcBalance * usdcPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-xs text-muted-foreground mb-1">Цена USDC</p>
            <p className="font-semibold">${usdcPrice.toFixed(4)}</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-xs text-muted-foreground mb-1">Обновлено</p>
            <p className="font-semibold text-xs">Сейчас</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
