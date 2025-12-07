import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PriceData {
  time: string;
  price: number;
}

export const PriceHistoryPage = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D' | '1Y'>('24H');
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', price: 43250.50, change: 2.47 },
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠', price: 2280.75, change: 1.85 },
    { symbol: 'BNB', name: 'BNB', icon: '💎', price: 315.20, change: -0.52 },
    { symbol: 'SOL', name: 'Solana', icon: '◎', price: 98.45, change: 5.23 },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵', price: 1.00, change: 0.01 }
  ];

  useEffect(() => {
    const crypto = cryptos.find(c => c.symbol === selectedCrypto);
    if (crypto) {
      setCurrentPrice(crypto.price);
      setPriceChange(crypto.change);
      
      const points = timeframe === '1H' ? 60 : timeframe === '24H' ? 24 : timeframe === '7D' ? 7 : timeframe === '30D' ? 30 : 12;
      const data: PriceData[] = [];
      let basePrice = crypto.price;
      
      for (let i = 0; i < points; i++) {
        const variation = (Math.random() - 0.5) * (basePrice * 0.02);
        basePrice += variation;
        data.push({
          time: timeframe === '1H' ? `${i}m` : timeframe === '24H' ? `${i}h` : `${i}d`,
          price: parseFloat(basePrice.toFixed(2))
        });
      }
      
      setPriceData(data);
    }
  }, [selectedCrypto, timeframe]);

  const maxPrice = Math.max(...priceData.map(d => d.price));
  const minPrice = Math.min(...priceData.map(d => d.price));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="LineChart" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">История цен</h2>
          <p className="text-sm text-muted-foreground">Детальные графики криптовалют</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {cryptos.map((crypto) => (
          <button
            key={crypto.symbol}
            onClick={() => setSelectedCrypto(crypto.symbol)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all whitespace-nowrap ${
              selectedCrypto === crypto.symbol
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <span className="text-xl">{crypto.icon}</span>
            <div className="text-left">
              <p className="font-semibold text-sm">{crypto.symbol}</p>
              <p className={`text-xs ${crypto.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {crypto.change >= 0 ? '+' : ''}{crypto.change}%
              </p>
            </div>
          </button>
        ))}
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {cryptos.find(c => c.symbol === selectedCrypto)?.icon}
              </span>
              <div>
                <CardTitle>{cryptos.find(c => c.symbol === selectedCrypto)?.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{selectedCrypto}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${currentPrice.toLocaleString()}</p>
              <Badge className={priceChange >= 0 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}>
                {priceChange >= 0 ? '+' : ''}{priceChange}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 justify-center">
            {(['1H', '24H', '7D', '30D', '1Y'] as const).map((tf) => (
              <Button
                key={tf}
                size="sm"
                variant={timeframe === tf ? 'default' : 'outline'}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>

          <div className="relative h-64 bg-muted/20 rounded-lg p-4">
            {priceData.length > 1 ? (
              <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" className="overflow-visible">
                <defs>
                  <linearGradient id={`priceGradient-${selectedCrypto}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                <polygon
                  fill={`url(#priceGradient-${selectedCrypto})`}
                  stroke="none"
                  points={`
                    ${priceData.map((d, i) => {
                      const x = (i / (priceData.length - 1)) * 400;
                      const y = ((maxPrice - d.price) / (maxPrice - minPrice || 1)) * 160 + 20;
                      return `${x},${y}`;
                    }).join(' ')}
                    400,180 0,180
                  `}
                />
                <polyline
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={priceData.map((d, i) => {
                    const x = (i / (priceData.length - 1)) * 400;
                    const y = ((maxPrice - d.price) / (maxPrice - minPrice || 1)) * 160 + 20;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Icon name="TrendingUp" size={48} className="opacity-30" />
              </div>
            )}
            
            <div className="absolute top-2 left-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              ${maxPrice.toLocaleString()}
            </div>
            <div className="absolute bottom-2 left-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              ${minPrice.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Макс (24ч)</p>
              <p className="font-bold">${maxPrice.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Мин (24ч)</p>
              <p className="font-bold">${minPrice.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Объем (24ч)</p>
              <p className="font-bold">$2.4B</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Рын. кап.</p>
              <p className="font-bold">$842B</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Исторические данные</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {priceData.slice().reverse().map((data, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                <span className="text-sm text-muted-foreground">{data.time}</span>
                <span className="font-semibold">${data.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};