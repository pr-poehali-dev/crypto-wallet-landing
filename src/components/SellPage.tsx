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

export const SellPage = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', balance: '0.0234' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: '0.8421' },
    { symbol: 'BNB', name: 'BNB', icon: '🔶', balance: '2.456' },
    { symbol: 'SOL', name: 'Solana', icon: '◎', balance: '15.789' },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵', balance: '196446' },
  ];

  const withdrawalMethods = [
    { id: 'card', name: 'Банковская карта', icon: 'CreditCard', fee: '1%', time: '5-30 минут' },
    { id: 'sbp', name: 'СБП', icon: 'Smartphone', fee: '0%', time: 'Мгновенно' },
    { id: 'bank', name: 'Банковский счет', icon: 'Building2', fee: '0.5%', time: '1-3 дня' },
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

  const calculateUsdAmount = () => {
    if (!cryptoAmount || !prices[selectedCrypto]) return 0;
    const fee = withdrawalMethod === 'card' ? 0.01 : withdrawalMethod === 'bank' ? 0.005 : 0;
    const gross = parseFloat(cryptoAmount) * prices[selectedCrypto].price;
    return (gross * (1 - fee)).toFixed(2);
  };

  const handleSell = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Продажа выполнена: ${cryptoAmount} ${selectedCrypto} за $${calculateUsdAmount()}`);
    }, 2000);
  };

  const currentCrypto = cryptos.find(c => c.symbol === selectedCrypto);
  const currentMethod = withdrawalMethods.find(m => m.id === withdrawalMethod);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-destructive to-orange-500 flex items-center justify-center">
          <Icon name="Banknote" size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Продать криптовалюту</h2>
          <p className="text-sm text-muted-foreground">Вывод на карту или банковский счет</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Продажа активов</CardTitle>
          <CardDescription>Выберите криптовалюту и укажите количество</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Криптовалюта</Label>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cryptos.map((crypto) => {
                  const priceData = prices[crypto.symbol];
                  const balanceUsd = priceData ? (parseFloat(crypto.balance) * priceData.price).toFixed(2) : '0';
                  return (
                    <SelectItem key={crypto.symbol} value={crypto.symbol}>
                      <div className="flex items-center justify-between gap-4 w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{crypto.icon}</span>
                          <div>
                            <div className="font-medium">{crypto.symbol}</div>
                            <div className="text-xs text-muted-foreground">{crypto.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{crypto.balance}</div>
                          <div className="text-xs text-muted-foreground">≈ ${balanceUsd}</div>
                        </div>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {currentCrypto && prices[selectedCrypto] && (
              <p className="text-xs text-muted-foreground">
                Доступно: {currentCrypto.balance} {selectedCrypto} ≈ $
                {(parseFloat(currentCrypto.balance) * prices[selectedCrypto].price).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Количество {selectedCrypto}</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder={`0.00 ${selectedCrypto}`}
                value={cryptoAmount}
                onChange={(e) => setCryptoAmount(e.target.value)}
                className="bg-muted/50 text-lg pr-20"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary"
                onClick={() => currentCrypto && setCryptoAmount(currentCrypto.balance)}
              >
                Макс
              </Button>
            </div>
            {cryptoAmount && prices[selectedCrypto] && (
              <p className="text-sm text-muted-foreground">
                Сумма к получению: <span className="font-medium text-foreground">${calculateUsdAmount()}</span>
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Способ вывода</Label>
            <div className="space-y-2">
              {withdrawalMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setWithdrawalMethod(method.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                    withdrawalMethod === method.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={method.icon as any} size={20} />
                    <div className="text-left">
                      <div className="font-medium">{method.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Комиссия: {method.fee} • {method.time}
                      </div>
                    </div>
                  </div>
                  {withdrawalMethod === method.id && (
                    <Icon name="CheckCircle2" size={20} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {withdrawalMethod === 'card' && (
            <div className="space-y-2">
              <Label>Номер карты</Label>
              <Input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                className="bg-muted/50"
              />
            </div>
          )}

          {withdrawalMethod === 'sbp' && (
            <div className="space-y-2">
              <Label>Номер телефона</Label>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="bg-muted/50"
              />
            </div>
          )}

          {withdrawalMethod === 'bank' && (
            <div className="space-y-2">
              <Label>Банковский счет</Label>
              <Input
                type="text"
                placeholder="Номер счета"
                className="bg-muted/50"
              />
            </div>
          )}

          <Card className="bg-muted/30 border-0">
            <CardContent className="pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Цена {selectedCrypto}</span>
                <span className="font-medium">${prices[selectedCrypto]?.price.toLocaleString('ru-RU')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Сумма до комиссии</span>
                <span className="font-medium">
                  ${cryptoAmount && prices[selectedCrypto] 
                    ? (parseFloat(cryptoAmount) * prices[selectedCrypto].price).toFixed(2)
                    : '0.00'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Комиссия вывода</span>
                <span className="font-medium">{currentMethod?.fee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Время зачисления</span>
                <span className="font-medium">{currentMethod?.time}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between text-base font-bold">
                <span>Вы получите</span>
                <span>${calculateUsdAmount()}</span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSell}
            disabled={!cryptoAmount || parseFloat(cryptoAmount) <= 0 || loading}
            className="w-full bg-gradient-to-r from-destructive to-orange-500 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Icon name="Loader2" size={20} className="animate-spin" />
                <span>Обработка...</span>
              </div>
            ) : (
              `Продать ${cryptoAmount || '0'} ${selectedCrypto}`
            )}
          </Button>

          <div className="flex items-start gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Важная информация:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Средства поступят на указанные реквизиты</li>
                <li>Минимальная сумма продажи: $10</li>
                <li>Максимальная сумма: $100,000 в день</li>
                <li>Курс фиксируется на момент подтверждения</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
