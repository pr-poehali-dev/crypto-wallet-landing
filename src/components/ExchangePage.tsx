import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export const ExchangePage = () => {
  const [fromCurrency, setFromCurrency] = useState('USDC');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});

  const currencies = [
    { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ' },
    { symbol: 'BNB', name: 'BNB', icon: '🔶' },
    { symbol: 'SOL', name: 'Solana', icon: '◎' },
  ];

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateExchange();
  }, [fromCurrency, toCurrency, fromAmount, prices]);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,bitcoin,ethereum,binancecoin,solana&vs_currencies=usd&include_24hr_change=true'
      );
      const data = await response.json();
      
      setPrices({
        USDC: { symbol: 'USDC', name: 'USD Coin', price: data['usd-coin']?.usd || 1, change24h: data['usd-coin']?.usd_24h_change || 0 },
        BTC: { symbol: 'BTC', name: 'Bitcoin', price: data['bitcoin']?.usd || 0, change24h: data['bitcoin']?.usd_24h_change || 0 },
        ETH: { symbol: 'ETH', name: 'Ethereum', price: data['ethereum']?.usd || 0, change24h: data['ethereum']?.usd_24h_change || 0 },
        BNB: { symbol: 'BNB', name: 'BNB', price: data['binancecoin']?.usd || 0, change24h: data['binancecoin']?.usd_24h_change || 0 },
        SOL: { symbol: 'SOL', name: 'Solana', price: data['solana']?.usd || 0, change24h: data['solana']?.usd_24h_change || 0 },
      });
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    }
  };

  const calculateExchange = () => {
    if (!fromAmount || !prices[fromCurrency] || !prices[toCurrency]) return;
    
    const fromValue = parseFloat(fromAmount) * prices[fromCurrency].price;
    const toValue = fromValue / prices[toCurrency].price;
    setToAmount(toValue.toFixed(8));
    setExchangeRate(prices[fromCurrency].price / prices[toCurrency].price);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
  };

  const handleExchange = () => {
    const frozen = localStorage.getItem('accountFrozen');
    if (frozen === 'true') {
      alert('Счет заморожен. Операции невозможны.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Обмен выполнен: ${fromAmount} ${fromCurrency} → ${toAmount} ${toCurrency}`);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="ArrowLeftRight" size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Обмен криптовалют</h2>
          <p className="text-sm text-muted-foreground">Моментальный обмен по рыночному курсу</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Обменять</CardTitle>
          <CardDescription>Выберите валюты и укажите сумму</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Отдаете</Label>
              <div className="flex gap-2">
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-[180px] bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.symbol} value={curr.symbol}>
                        <div className="flex items-center gap-2">
                          <span>{curr.icon}</span>
                          <span>{curr.symbol}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1 bg-muted/50"
                />
              </div>
              {prices[fromCurrency] && fromCurrency === 'USDC' && (
                <p className="text-xs text-muted-foreground">
                  Баланс: 246,778.19 {fromCurrency} ≈ ${(246778.19 * prices[fromCurrency].price).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
                </p>
              )}
              {prices[fromCurrency] && fromCurrency !== 'USDC' && (
                <p className="text-xs text-muted-foreground">
                  Баланс: 0.00 {fromCurrency}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwap}
                className="rounded-full hover:bg-primary/20 hover:rotate-180 transition-transform duration-300"
              >
                <Icon name="ArrowDownUp" size={20} />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Получаете</Label>
              <div className="flex gap-2">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="w-[180px] bg-muted/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.symbol} value={curr.symbol}>
                        <div className="flex items-center gap-2">
                          <span>{curr.icon}</span>
                          <span>{curr.symbol}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="0.00"
                  value={toAmount}
                  readOnly
                  className="flex-1 bg-muted/50"
                />
              </div>
              {prices[toCurrency] && toAmount && (
                <p className="text-xs text-muted-foreground">
                  ≈ ${(parseFloat(toAmount) * prices[toCurrency].price).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
                </p>
              )}
            </div>
          </div>

          {exchangeRate > 0 && (
            <Card className="bg-muted/30 border-0">
              <CardContent className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Курс обмена</span>
                  <span className="font-medium">1 {fromCurrency} = {exchangeRate.toFixed(8)} {toCurrency}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Комиссия сети</span>
                  <span className="font-medium">0.1%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Время обработки</span>
                  <span className="font-medium">~ 30 секунд</span>
                </div>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={handleExchange}
            disabled={!fromAmount || parseFloat(fromAmount) <= 0 || loading}
            className="w-full bg-gradient-to-r from-primary to-secondary disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Icon name="Loader2" size={20} className="animate-spin" />
                <span>Обмен...</span>
              </div>
            ) : (
              `Обменять ${fromAmount || '0'} ${fromCurrency}`
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Популярные пары</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { from: 'BTC', to: 'USDC' },
              { from: 'ETH', to: 'USDC' },
              { from: 'BNB', to: 'USDC' },
              { from: 'SOL', to: 'USDC' },
            ].map((pair) => {
              const rate = prices[pair.from] && prices[pair.to]
                ? (prices[pair.from].price / prices[pair.to].price).toFixed(2)
                : '0';
              return (
                <button
                  key={`${pair.from}-${pair.to}`}
                  onClick={() => {
                    setFromCurrency(pair.from);
                    setToCurrency(pair.to);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="font-medium">{pair.from}/{pair.to}</span>
                  <span className="text-muted-foreground">{rate}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};