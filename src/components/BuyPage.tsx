import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export const BuyPage = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', color: 'text-orange-500' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', color: 'text-blue-500' },
    { symbol: 'BNB', name: 'BNB', icon: '🔶', color: 'text-yellow-500' },
    { symbol: 'SOL', name: 'Solana', icon: '◎', color: 'text-purple-500' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵', color: 'text-green-500' },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Банковская карта', icon: 'CreditCard', fee: '0%' },
    { id: 'sbp', name: 'СБП (Система быстрых платежей)', icon: 'Smartphone', fee: '0%' },
    { id: 'bank', name: 'Банковский перевод', icon: 'Building2', fee: '0%' },
  ];

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,usd-coin&vs_currencies=usd&include_24hr_change=true'
      );
      const data = await response.json();
      
      setPrices({
        BTC: { symbol: 'BTC', name: 'Bitcoin', price: data['bitcoin']?.usd || 0, change24h: data['bitcoin']?.usd_24h_change || 0 },
        ETH: { symbol: 'ETH', name: 'Ethereum', price: data['ethereum']?.usd || 0, change24h: data['ethereum']?.usd_24h_change || 0 },
        BNB: { symbol: 'BNB', name: 'BNB', price: data['binancecoin']?.usd || 0, change24h: data['binancecoin']?.usd_24h_change || 0 },
        SOL: { symbol: 'SOL', name: 'Solana', price: data['solana']?.usd || 0, change24h: data['solana']?.usd_24h_change || 0 },
        USDC: { symbol: 'USDC', name: 'USD Coin', price: data['usd-coin']?.usd || 1, change24h: data['usd-coin']?.usd_24h_change || 0 },
      });
    } catch (error) {
      console.error('Failed to fetch prices:', error);
    }
  };

  const calculateCryptoAmount = () => {
    if (!amount || !prices[selectedCrypto]) return 0;
    return (parseFloat(amount) / prices[selectedCrypto].price).toFixed(8);
  };

  const handleBuy = () => {
    const frozen = localStorage.getItem('accountFrozen');
    if (frozen === 'true') {
      alert('Счет заморожен. Операции невозможны.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Покупка выполнена: ${calculateCryptoAmount()} ${selectedCrypto} за ${amount} USD`);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-success to-secondary flex items-center justify-center">
          <Icon name="ShoppingCart" size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Купить криптовалюту</h2>
          <p className="text-sm text-muted-foreground">Покупка с банковской карты или СБП</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Выберите криптовалюту</CardTitle>
          <CardDescription>Популярные монеты и токены</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {cryptos.map((crypto) => {
              const priceData = prices[crypto.symbol];
              return (
                <button
                  key={crypto.symbol}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedCrypto === crypto.symbol
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 bg-muted/30'
                  }`}
                >
                  <div className="text-2xl mb-2">{crypto.icon}</div>
                  <div className="font-bold">{crypto.symbol}</div>
                  <div className="text-xs text-muted-foreground">{crypto.name}</div>
                  {priceData && (
                    <>
                      <div className="text-sm font-medium mt-2">
                        ${priceData.price.toLocaleString('ru-RU')}
                      </div>
                      <div className={`text-xs ${priceData.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}%
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <Label>Сумма покупки (USD)</Label>
            <Input
              type="number"
              placeholder="Введите сумму в USD"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-muted/50 text-lg"
            />
            {amount && prices[selectedCrypto] && (
              <p className="text-sm text-muted-foreground">
                Вы получите: <span className="font-medium text-foreground">{calculateCryptoAmount()} {selectedCrypto}</span>
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Способ оплаты</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 bg-muted/30 hover:bg-muted/50'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Icon name={method.icon as any} size={20} />
                    <div>
                      <Label htmlFor={method.id} className="cursor-pointer font-medium">
                        {method.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">Комиссия: {method.fee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Card className="bg-muted/30 border-0">
            <CardContent className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Цена {selectedCrypto}</span>
                <span className="font-medium">${prices[selectedCrypto]?.price.toLocaleString('ru-RU')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Комиссия платформы</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Комиссия оплаты</span>
                <span className="font-medium">0%</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between text-base font-bold">
                <span>Итого</span>
                <span>${amount || '0.00'}</span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleBuy}
            disabled={!amount || parseFloat(amount) <= 0 || loading}
            className="w-full bg-gradient-to-r from-success to-secondary disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Icon name="Loader2" size={20} className="animate-spin" />
                <span>Обработка...</span>
              </div>
            ) : (
              `Купить ${selectedCrypto}`
            )}
          </Button>

          <div className="flex items-start gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Важная информация:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Покупка обрабатывается мгновенно</li>
                <li>Криптовалюта поступит на ваш кошелек в течение 5 минут</li>
                <li>Минимальная сумма покупки: $10</li>
                <li>Максимальная сумма: $50,000 в день</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};