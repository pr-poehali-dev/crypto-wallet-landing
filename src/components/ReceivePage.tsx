import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export const ReceivePage = () => {
  const [currency, setCurrency] = useState('USDC');
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Адрес скопирован!');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Download" size={24} />
            Получить криптовалюту
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

          <div className="flex flex-col items-center gap-6 py-8">
            <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center p-4 shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                <Icon name="QrCode" size={120} className="text-primary" />
              </div>
            </div>

            <div className="text-center space-y-2 w-full">
              <p className="text-sm text-muted-foreground">Ваш адрес кошелька</p>
              <div className="flex items-center gap-2 bg-muted/30 border border-border/30 rounded-lg p-4">
                <p className="flex-1 font-mono text-sm break-all">{walletAddress}</p>
                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                  <Icon name="Copy" size={20} />
                </Button>
              </div>
            </div>

            <Button
              onClick={copyToClipboard}
              className="w-full bg-gradient-to-r from-primary to-secondary h-12"
            >
              <Icon name="Copy" size={20} className="mr-2" />
              Скопировать адрес
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="AlertCircle" size={20} className="text-primary" />
            Важная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Icon name="CheckCircle2" size={20} className="text-success mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">Только {currency}</p>
              <p className="text-xs text-muted-foreground">
                Отправляйте только {currency} на этот адрес. Другие токены могут быть потеряны.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">Подтверждение сети</p>
              <p className="text-xs text-muted-foreground">
                Средства появятся после подтверждения транзакции в блокчейне.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Icon name="Clock" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">Время обработки</p>
              <p className="text-xs text-muted-foreground">
                Обычно занимает 5-30 минут в зависимости от загруженности сети.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
