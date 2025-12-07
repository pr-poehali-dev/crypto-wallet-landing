import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export const SendPage = () => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [currency, setCurrency] = useState('USDC');

  const handleSend = () => {
    alert(`Отправка ${amount} ${currency} на адрес ${address}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Send" size={24} />
            Отправить криптовалюту
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currency">Валюта</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="bg-muted/50 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="BTC">Bitcoin</SelectItem>
                <SelectItem value="ETH">Ethereum</SelectItem>
                <SelectItem value="BNB">BNB</SelectItem>
                <SelectItem value="SOL">Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Сумма</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-muted/50 border-border text-2xl h-14"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                {currency}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адрес получателя</Label>
            <div className="relative">
              <Input
                id="address"
                type="text"
                placeholder="0x..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-muted/50 border-border"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Icon name="QrCode" size={20} />
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/30 border border-border/30">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Комиссия сети</span>
              <span className="font-semibold">$2.50</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Итого</span>
              <span className="font-bold text-lg">
                {amount ? (parseFloat(amount) + 2.5).toFixed(2) : '0.00'} {currency}
              </span>
            </div>
          </div>

          <Button
            onClick={handleSend}
            disabled={!amount || !address}
            className="w-full bg-gradient-to-r from-primary to-secondary h-12 text-base"
          >
            Отправить
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">Недавние адреса</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: 'Анна Петрова', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', avatar: '👩‍💼' },
            { name: 'Дмитрий Иванов', address: '0x8a9f2c1e4b7d3A51F8C2E9D6B4A7C1E3F5A8B2D4', avatar: '👨‍💻' },
            { name: 'ООО "ТехГлобал"', address: '0x1c4e5f7a9b2d8c3e6f1a4b7d9c2e5f8a1b4d7c9e', avatar: '🏢' }
          ].map((contact, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
              onClick={() => setAddress(contact.address)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                {contact.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{contact.name}</p>
                <p className="text-xs text-muted-foreground truncate font-mono">
                  {contact.address.substring(0, 10)}...{contact.address.substring(contact.address.length - 8)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};