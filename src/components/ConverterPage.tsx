import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export const ConverterPage = () => {
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('0');
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USDC');
  const [rates, setRates] = useState<Record<string, number>>({});

  const currencies = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', price: 43250.50 },
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠', price: 2280.75 },
    { symbol: 'BNB', name: 'BNB', icon: '💎', price: 315.20 },
    { symbol: 'SOL', name: 'Solana', icon: '◎', price: 98.45 },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵', price: 1.00 },
    { symbol: 'USD', name: 'US Dollar', icon: '$', price: 1.00 },
    { symbol: 'RUB', name: 'Russian Ruble', icon: '₽', price: 0.0105 }
  ];

  useEffect(() => {
    const newRates: Record<string, number> = {};
    currencies.forEach(currency => {
      newRates[currency.symbol] = currency.price;
    });
    setRates(newRates);
  }, []);

  useEffect(() => {
    if (fromAmount && rates[fromCurrency] && rates[toCurrency]) {
      const fromValue = parseFloat(fromAmount) * rates[fromCurrency];
      const result = fromValue / rates[toCurrency];
      setToAmount(result.toFixed(6));
    }
  }, [fromAmount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const quickAmounts = ['100', '500', '1000', '5000'];

  const conversionRate = rates[fromCurrency] && rates[toCurrency] 
    ? (rates[fromCurrency] / rates[toCurrency]).toFixed(6)
    : '0';

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="Calculator" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Калькулятор</h2>
          <p className="text-sm text-muted-foreground">Конвертация криптовалют</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Конвертер валют</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Из</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.symbol} value={currency.symbol}>
                      <div className="flex items-center gap-2">
                        <span>{currency.icon}</span>
                        <span>{currency.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  size="sm"
                  variant="outline"
                  onClick={() => setFromAmount(amount)}
                  className="flex-1"
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              size="icon"
              variant="outline"
              onClick={handleSwap}
              className="rounded-full"
            >
              <Icon name="ArrowDownUp" size={20} />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">В</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={toAmount}
                onChange={(e) => setToAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1"
                readOnly
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.symbol} value={currency.symbol}>
                      <div className="flex items-center gap-2">
                        <span>{currency.icon}</span>
                        <span>{currency.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Курс обмена:</span>
              <span className="font-semibold">
                1 {fromCurrency} = {conversionRate} {toCurrency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Обратный курс:</span>
              <span className="font-semibold">
                1 {toCurrency} = {(1 / parseFloat(conversionRate)).toFixed(6)} {fromCurrency}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Комиссия (0.1%):</span>
              <span className="font-semibold">
                {(parseFloat(toAmount) * 0.001).toFixed(6)} {toCurrency}
              </span>
            </div>
          </div>

          <Button className="w-full" size="lg">
            <Icon name="ArrowLeftRight" size={18} className="mr-2" />
            Обменять сейчас
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Текущие курсы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currencies.slice(0, 5).map((currency) => (
              <div
                key={currency.symbol}
                className="flex items-center justify-between p-3 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => {
                  setFromCurrency(currency.symbol);
                  setFromAmount('1');
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currency.icon}</span>
                  <div>
                    <p className="font-semibold">{currency.name}</p>
                    <p className="text-sm text-muted-foreground">{currency.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${currency.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">за 1 {currency.symbol}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Популярные пары</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {[
              { from: 'BTC', to: 'USDC' },
              { from: 'ETH', to: 'USDC' },
              { from: 'BNB', to: 'USDC' },
              { from: 'SOL', to: 'USDC' },
              { from: 'USDC', to: 'RUB' },
              { from: 'BTC', to: 'ETH' }
            ].map((pair, idx) => {
              const fromCurr = currencies.find(c => c.symbol === pair.from);
              const toCurr = currencies.find(c => c.symbol === pair.to);
              const rate = fromCurr && toCurr ? (fromCurr.price / toCurr.price).toFixed(4) : '0';
              
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setFromCurrency(pair.from);
                    setToCurrency(pair.to);
                    setFromAmount('1');
                  }}
                  className="p-3 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{fromCurr?.icon}</span>
                    <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                    <span>{toCurr?.icon}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{pair.from}/{pair.to}</p>
                  <p className="text-sm font-bold">{rate}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
