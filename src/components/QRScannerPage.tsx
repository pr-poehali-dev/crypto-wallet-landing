import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export const QRScannerPage = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedAddress, setScannedAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScannedAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
      setScanning(false);
    }, 2000);
  };

  const recentScans = [
    { address: '0x742d...f0bEb', amount: '1,500 USDC', date: '10 ноя 2025', status: 'Отправлено' },
    { address: '0x8a9f...3c2A1', amount: '850 USDC', date: '8 ноя 2025', status: 'Отправлено' },
    { address: '0x1c4e...7d5F9', amount: '2,300 USDC', date: '5 ноя 2025', status: 'Отправлено' }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="QrCode" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">QR Сканер</h2>
          <p className="text-sm text-muted-foreground">Быстрая отправка по QR-коду</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Сканировать QR-код</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-square max-w-sm mx-auto rounded-lg border-4 border-dashed border-border bg-muted/20 flex items-center justify-center relative overflow-hidden">
            {scanning ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Сканирование...</p>
              </div>
            ) : scannedAddress ? (
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <Icon name="CheckCircle2" size={64} className="text-success" />
                <div>
                  <p className="font-bold text-lg mb-2">Адрес найден!</p>
                  <p className="text-sm text-muted-foreground break-all">{scannedAddress}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <Icon name="QrCode" size={80} className="text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">Нажмите "Сканировать" для начала</p>
              </div>
            )}
          </div>

          {!scanning && !scannedAddress && (
            <Button onClick={handleScan} className="w-full" size="lg">
              <Icon name="Camera" size={18} className="mr-2" />
              Начать сканирование
            </Button>
          )}

          {scannedAddress && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="qrAddress">Адрес получателя</Label>
                <Input
                  id="qrAddress"
                  value={scannedAddress}
                  onChange={(e) => setScannedAddress(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qrAmount">Сумма</Label>
                <div className="relative">
                  <Input
                    id="qrAmount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pr-20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    USDC
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доступно:</span>
                  <span className="font-medium">246,778.19 USDC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Комиссия сети:</span>
                  <span className="font-medium">~$1.50</span>
                </div>
                {amount && (
                  <div className="flex justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">К получению:</span>
                    <span className="font-bold">{(parseFloat(amount) - 1.5).toFixed(2)} USDC</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  disabled={!amount || parseFloat(amount) <= 0}
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setScannedAddress('');
                    setAmount('');
                  }}
                >
                  <Icon name="RotateCcw" size={16} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Недавние QR-транзакции</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentScans.map((scan, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border/30 bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="QrCode" size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{scan.amount}</p>
                    <p className="text-xs text-muted-foreground font-mono">{scan.address}</p>
                    <p className="text-xs text-muted-foreground mt-1">{scan.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs bg-success/20 text-success px-2 py-1 rounded">
                    {scan.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Мой QR-код</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center p-4">
              <div className="text-7xl">📱</div>
            </div>
            <div className="text-center">
              <p className="font-mono text-sm mb-2 break-all">0xA123...F789</p>
              <p className="text-xs text-muted-foreground">Покажите этот код для получения криптовалюты</p>
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1">
                <Icon name="Share2" size={16} className="mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Download" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
