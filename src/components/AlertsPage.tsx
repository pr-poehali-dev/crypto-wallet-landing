import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface Alert {
  id: number;
  crypto: string;
  condition: 'above' | 'below';
  price: number;
  active: boolean;
  triggered: boolean;
}

export const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, crypto: 'BTC', condition: 'above', price: 45000, active: true, triggered: false },
    { id: 2, crypto: 'ETH', condition: 'below', price: 2000, active: true, triggered: false },
    { id: 3, crypto: 'SOL', condition: 'above', price: 100, active: false, triggered: true }
  ]);

  const [newCrypto, setNewCrypto] = useState('BTC');
  const [newCondition, setNewCondition] = useState<'above' | 'below'>('above');
  const [newPrice, setNewPrice] = useState('');

  const cryptos = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', currentPrice: 43250.50 },
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠', currentPrice: 2280.75 },
    { symbol: 'BNB', name: 'BNB', icon: '💎', currentPrice: 315.20 },
    { symbol: 'SOL', name: 'Solana', icon: '◎', currentPrice: 98.45 },
    { symbol: 'USDC', name: 'USD Coin', icon: '💵', currentPrice: 1.00 }
  ];

  const handleAddAlert = () => {
    if (!newPrice || parseFloat(newPrice) <= 0) return;
    
    const newAlert: Alert = {
      id: Date.now(),
      crypto: newCrypto,
      condition: newCondition,
      price: parseFloat(newPrice),
      active: true,
      triggered: false
    };
    
    setAlerts([...alerts, newAlert]);
    setNewPrice('');
  };

  const handleToggleAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="Bell" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Алерты цен</h2>
          <p className="text-sm text-muted-foreground">Уведомления о достижении цены</p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Активных алертов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">
              {alerts.filter(a => a.active).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Из {alerts.length} всего</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Сработало
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">
              {alerts.filter(a => a.triggered).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">За все время</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Ожидают
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">
              {alerts.filter(a => a.active && !a.triggered).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">В очереди</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Создать новый алерт</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Криптовалюта</Label>
              <Select value={newCrypto} onValueChange={setNewCrypto}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cryptos.map((crypto) => (
                    <SelectItem key={crypto.symbol} value={crypto.symbol}>
                      <div className="flex items-center gap-2">
                        <span>{crypto.icon}</span>
                        <span>{crypto.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Условие</Label>
              <Select value={newCondition} onValueChange={(v: 'above' | 'below') => setNewCondition(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Выше чем</SelectItem>
                  <SelectItem value="below">Ниже чем</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Целевая цена ($)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
          </div>

          {newCrypto && (
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Текущая цена {newCrypto}: ${cryptos.find(c => c.symbol === newCrypto)?.currentPrice.toLocaleString()}
              </p>
              {newPrice && (
                <p className="text-sm font-semibold mt-2">
                  Алерт сработает когда {newCrypto} будет {newCondition === 'above' ? 'выше' : 'ниже'} ${parseFloat(newPrice).toLocaleString()}
                </p>
              )}
            </div>
          )}

          <Button onClick={handleAddAlert} className="w-full" disabled={!newPrice || parseFloat(newPrice) <= 0}>
            <Icon name="Plus" size={16} className="mr-2" />
            Создать алерт
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Мои алерты</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="BellOff" size={48} className="mx-auto mb-4 opacity-50" />
                <p>У вас пока нет алертов</p>
                <p className="text-sm mt-1">Создайте первый алерт выше</p>
              </div>
            ) : (
              alerts.map((alert) => {
                const crypto = cryptos.find(c => c.symbol === alert.crypto);
                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      alert.triggered
                        ? 'border-success/50 bg-success/5'
                        : alert.active
                        ? 'border-primary/30 bg-card'
                        : 'border-border/30 bg-muted/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{crypto?.icon}</span>
                        <div>
                          <p className="font-bold">
                            {alert.crypto} {alert.condition === 'above' ? '↑' : '↓'} ${alert.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {alert.condition === 'above' ? 'Выше' : 'Ниже'} ${alert.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {alert.triggered && (
                          <div className="bg-success/20 text-success px-2 py-1 rounded text-xs font-semibold">
                            Сработал
                          </div>
                        )}
                        <Switch
                          checked={alert.active}
                          onCheckedChange={() => handleToggleAlert(alert.id)}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Icon name="Trash2" size={16} className="text-destructive" />
                        </Button>
                      </div>
                    </div>
                    {crypto && (
                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          Текущая цена: <span className="font-semibold text-foreground">${crypto.currentPrice.toLocaleString()}</span>
                        </p>
                        <p className="text-muted-foreground mt-1">
                          До цели: <span className={`font-semibold ${
                            alert.condition === 'above'
                              ? crypto.currentPrice >= alert.price ? 'text-success' : 'text-foreground'
                              : crypto.currentPrice <= alert.price ? 'text-success' : 'text-foreground'
                          }`}>
                            ${Math.abs(alert.price - crypto.currentPrice).toLocaleString()} 
                            ({((Math.abs(alert.price - crypto.currentPrice) / crypto.currentPrice) * 100).toFixed(2)}%)
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
