import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export const DeFiPage = () => {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  const protocols = [
    {
      name: 'Uniswap',
      icon: '🦄',
      type: 'DEX',
      tvl: '$4.2B',
      apy: '12.5%',
      description: 'Децентрализованная биржа',
      connected: true,
      balance: '2,450 USDC'
    },
    {
      name: 'Aave',
      icon: '👻',
      type: 'Lending',
      tvl: '$6.8B',
      apy: '8.3%',
      description: 'Протокол кредитования',
      connected: true,
      balance: '5,000 USDC'
    },
    {
      name: 'Curve',
      icon: '🌊',
      type: 'DEX',
      tvl: '$3.5B',
      apy: '15.2%',
      description: 'Обмен стейблкоинов',
      connected: false,
      balance: '0'
    },
    {
      name: 'Compound',
      icon: '🏦',
      type: 'Lending',
      tvl: '$2.1B',
      apy: '6.8%',
      description: 'Кредитование',
      connected: false,
      balance: '0'
    },
    {
      name: 'Yearn',
      icon: '🔷',
      type: 'Yield',
      tvl: '$890M',
      apy: '18.7%',
      description: 'Автоматизация доходов',
      connected: false,
      balance: '0'
    },
    {
      name: 'SushiSwap',
      icon: '🍣',
      type: 'DEX',
      tvl: '$1.2B',
      apy: '10.4%',
      description: 'DEX с фармингом',
      connected: false,
      balance: '0'
    }
  ];

  const myPositions = [
    {
      protocol: 'Uniswap',
      icon: '🦄',
      pair: 'USDC/ETH',
      invested: '2,450 USDC',
      earned: '+$145.20',
      apy: '12.5%'
    },
    {
      protocol: 'Aave',
      icon: '👻',
      pair: 'USDC Lending',
      invested: '5,000 USDC',
      earned: '+$312.50',
      apy: '8.3%'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="Network" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">DeFi</h2>
          <p className="text-sm text-muted-foreground">Децентрализованные финансы</p>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Инвестировано
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold">$7,450</div>
            <p className="text-xs text-muted-foreground mt-1">В 2 протоколах</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Заработано
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">$457.70</div>
            <p className="text-xs text-muted-foreground mt-1">Всего доход</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
              Средний APY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-success">10.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Годовых</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Мои позиции</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myPositions.map((position, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border/30 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{position.icon}</div>
                    <div>
                      <h3 className="font-bold">{position.protocol}</h3>
                      <p className="text-sm text-muted-foreground">{position.pair}</p>
                    </div>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30">
                    APY {position.apy}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                  <div>
                    <p className="text-muted-foreground">Инвестировано:</p>
                    <p className="font-semibold">{position.invested}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Заработано:</p>
                    <p className="font-semibold text-success">{position.earned}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="Minus" size={14} className="mr-1" />
                    Вывести
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Доступные протоколы</CardTitle>
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={14} className="mr-2" />
              Фильтр
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            {protocols.map((protocol) => (
              <div
                key={protocol.name}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedProtocol === protocol.name
                    ? 'border-primary bg-primary/5'
                    : 'border-border/30 bg-muted/20 hover:border-primary/50'
                }`}
                onClick={() => setSelectedProtocol(protocol.name)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{protocol.icon}</div>
                    <div>
                      <h3 className="font-bold">{protocol.name}</h3>
                      <p className="text-xs text-muted-foreground">{protocol.description}</p>
                    </div>
                  </div>
                  {protocol.connected ? (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <Icon name="Check" size={12} className="mr-1" />
                      Подключен
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      {protocol.type}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">TVL</p>
                    <p className="font-semibold">{protocol.tvl}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">APY</p>
                    <p className="font-semibold text-success">{protocol.apy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Баланс</p>
                    <p className="font-semibold">{protocol.balance}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="w-full mt-3"
                  variant={protocol.connected ? "outline" : "default"}
                >
                  {protocol.connected ? (
                    <>
                      <Icon name="ExternalLink" size={14} className="mr-2" />
                      Открыть
                    </>
                  ) : (
                    <>
                      <Icon name="Link" size={14} className="mr-2" />
                      Подключить
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProtocol && (
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Взаимодействие с {selectedProtocol}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProtocol(null)}>
                <Icon name="X" size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defiAmount">Сумма</Label>
              <div className="relative">
                <Input
                  id="defiAmount"
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
                <span className="font-medium">~$2.50</span>
              </div>
              {amount && (
                <div className="flex justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">Ожидаемый доход (год):</span>
                  <span className="font-bold text-success">
                    ~${(parseFloat(amount) * 0.12).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Icon name="Plus" size={16} className="mr-2" />
                Вложить
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Minus" size={16} className="mr-2" />
                Вывести
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
