import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: { price: number[] };
}

export const CryptoChart = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,usd-coin&order=market_cap_desc&sparkline=true&price_change_percentage=24h'
        );
        const data = await response.json();
        setCryptoData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);

    return () => clearInterval(interval);
  }, []);

  const selectedData = cryptoData.find((c) => c.id === selectedCrypto);

  const renderMiniChart = (sparkline: number[]) => {
    if (!sparkline || sparkline.length === 0) return null;

    const max = Math.max(...sparkline);
    const min = Math.min(...sparkline);
    const range = max - min;
    const width = 120;
    const height = 40;

    const points = sparkline
      .map((price, index) => {
        const x = (index / (sparkline.length - 1)) * width;
        const y = height - ((price - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');

    const isPositive = sparkline[sparkline.length - 1] > sparkline[0];

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? 'rgb(34 197 94)' : 'rgb(239 68 68)'}
          strokeWidth="2"
          className="transition-all"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardContent className="p-8 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Loader2" size={20} className="animate-spin" />
            <span>Загрузка данных...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="LineChart" size={20} />
          Курсы криптовалют
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={selectedCrypto} onValueChange={setSelectedCrypto}>
          <TabsList className="bg-muted/50 w-full grid grid-cols-5">
            <TabsTrigger value="bitcoin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              BTC
            </TabsTrigger>
            <TabsTrigger value="ethereum" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              ETH
            </TabsTrigger>
            <TabsTrigger value="binancecoin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              BNB
            </TabsTrigger>
            <TabsTrigger value="solana" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              SOL
            </TabsTrigger>
            <TabsTrigger value="usd-coin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              USDC
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {selectedData && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">
                  ${selectedData.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h3>
                <p className="text-sm text-muted-foreground">{selectedData.name}</p>
              </div>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  selectedData.price_change_percentage_24h >= 0
                    ? 'bg-success/20 text-success'
                    : 'bg-destructive/20 text-destructive'
                }`}
              >
                <Icon
                  name={selectedData.price_change_percentage_24h >= 0 ? 'TrendingUp' : 'TrendingDown'}
                  size={14}
                />
                <span className="text-sm font-semibold">
                  {Math.abs(selectedData.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-xs text-muted-foreground mb-2">7 дней</p>
              {renderMiniChart(selectedData.sparkline_in_7d.price)}
            </div>
          </div>
        )}

        <div className="space-y-2 pt-4 border-t border-border/50">
          <p className="text-sm font-semibold text-muted-foreground mb-3">Все активы</p>
          {cryptoData.map((crypto) => (
            <div
              key={crypto.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => setSelectedCrypto(crypto.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {crypto.symbol.toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{crypto.symbol.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{crypto.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  {renderMiniChart(crypto.sparkline_in_7d.price)}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">
                    ${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p
                    className={`text-xs ${
                      crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
